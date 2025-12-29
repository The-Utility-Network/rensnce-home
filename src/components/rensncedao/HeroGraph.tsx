'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroGraph() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const gl = canvas.getContext('webgl', {
            premultipliedAlpha: false, // Ensure we control alpha blending perfectly
            alpha: true
        });

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Shader Sources
        const vsSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;

        // Fragment Shader: Reads Top Half (RGB) and Bottom Half (Alpha)
        // Correcting orientation: "flipped upside down" means we likely need to invert the Y lookup.
        const fsSource = `
            precision mediump float;
            uniform sampler2D u_image;
            varying vec2 v_texCoord;

            void main() {
                // Video Structure: Top Half = RGB, Bottom Half = Alpha
                
                // Mask (Bottom Half): Y ranges from 0.0 to 0.5
                vec2 alphaUV = vec2(v_texCoord.x, v_texCoord.y * 0.5);
                vec4 alphaMask = texture2D(u_image, alphaUV);

                // Force Pure White Color
                // We ignore the top-half color because it seems to produce black artifacts for the dot.
                // Since the desired look is "White/Silver" lines, we just use White (1.0) * Alpha.
                
                gl_FragColor = vec4(1.0, 1.0, 1.0, alphaMask.r);
            }
        `;

        // Helper to compile shaders
        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
                return null;
            }
            return program;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        gl.useProgram(program);

        // Buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Full screen quad (-1 to 1)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0,
        ]), gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();

        // Compute UV Crop
        const updateTextureCoords = () => {
            if (!video.videoWidth || !video.videoHeight) return;

            // Calculate render aspect ratios with DPR awareness (canvas.width is physical pixels)
            const canvasAspect = canvas.width / canvas.height;
            // Content aspect is Video Width / (Half Video Height)
            const videoContentAspect = video.videoWidth / (video.videoHeight / 2);

            let scaleX = 1;
            let scaleY = 1;

            if (canvasAspect > videoContentAspect) {
                // Canvas is Wider: scale Y to zoom in (crop top/bottom)
                scaleY = canvasAspect / videoContentAspect;
            } else {
                // Canvas is Taller: scale X to zoom in (crop left/right)
                scaleX = videoContentAspect / canvasAspect;
            }

            // Center crop UVs
            const rangeX = 1.0 / scaleX;
            const rangeY = 1.0 / scaleY;

            const minX = 0.5 - (rangeX / 2);
            const maxX = 0.5 + (rangeX / 2);
            const minY = 0.5 - (rangeY / 2);
            const maxY = 0.5 + (rangeY / 2);

            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                minX, minY,
                maxX, minY,
                minX, maxY,
                minX, maxY,
                maxX, minY,
                maxX, maxY,
            ]), gl.STATIC_DRAW);
        };

        // Attribute Locations
        const positionLocation = gl.getAttribLocation(program, "a_position");
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

        // Texture Setup
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Ensure Video Plays
        video.play().catch(e => console.error(e));

        // Video State for Resize Check
        let prevVideoWidth = 0;
        let prevVideoHeight = 0;

        // Resize Handler
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            updateTextureCoords(); // Recalculate cover logic
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        // Initial setup once video metadata loads (listener added before render loop starts to be safe)
        window.addEventListener('resize', handleResize);
        video.addEventListener('loadedmetadata', handleResize);

        // Rendering Loop
        let animationFrameId: number;

        const render = () => {
            if (!gl || !video) return;

            // Check for dimension changes (e.g. metadata loaded)
            if (video.videoWidth !== prevVideoWidth || video.videoHeight !== prevVideoHeight) {
                prevVideoWidth = video.videoWidth;
                prevVideoHeight = video.videoHeight;
                handleResize(); // Force UV update
            }

            // Update texture with video frame
            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
            }

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);

            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(texCoordLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationFrameId = requestAnimationFrame(render);
        };

        handleResize(); // Initial Size
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            video.removeEventListener('loadedmetadata', handleResize);
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Hidden Source Video */}
            <video
                ref={videoRef}
                src="/hero_wave.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="hidden"
                crossOrigin="anonymous" // Important if hosted externally, effectively ignored for local but good practice
            />

            {/* WebGL Canvas - Normal blend to allow transparency to work naturally over black background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/80" />
        </div>
    );
}
