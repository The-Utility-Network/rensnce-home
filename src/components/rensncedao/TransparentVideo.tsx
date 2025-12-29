'use client';

import React, { useEffect, useRef } from 'react';

interface TransparentVideoProps {
    src: string;
    className?: string;
    forceWhite?: boolean; // If true, ignores RGB color and renders pure white based on alpha source
}

export default function TransparentVideo({ src, className, forceWhite = false }: TransparentVideoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const container = containerRef.current;
        if (!canvas || !video || !container) return;

        const gl = canvas.getContext('webgl', {
            premultipliedAlpha: false,
            alpha: true
        });

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        const vsSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;

        const fsSource = `
            precision mediump float;
            uniform sampler2D u_image;
            varying vec2 v_texCoord;
            uniform bool u_forceWhite;

            void main() {
                // Video layout: Top half = RGB color, Bottom half = Alpha mask
                // No Y flip applied, so direct UV mapping
                
                // Top Half: RGB Color (y from 0.5 to 1.0 of video)
                vec2 colorUV = vec2(v_texCoord.x, v_texCoord.y * 0.5 + 0.5);
                
                // Bottom Half: Alpha Mask (y from 0.0 to 0.5 of video)
                vec2 alphaUV = vec2(v_texCoord.x, v_texCoord.y * 0.5);

                vec4 color = texture2D(u_image, colorUV);
                vec4 alphaMask = texture2D(u_image, alphaUV);

                float alpha = alphaMask.r;

                if (u_forceWhite) {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
                } else {
                    gl_FragColor = vec4(color.rgb, alpha);
                }
            }
        `;

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
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
                console.error('Program link error:', gl.getProgramInfoLog(program));
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        ]), gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();

        // Attribute Locations
        const positionLocation = gl.getAttribLocation(program, "a_position");
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
        const forceWhiteLocation = gl.getUniformLocation(program, "u_forceWhite");

        // Texture Setup
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Don't flip Y - we handle UV mapping directly in shader
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Enable alpha blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        video.play().catch(e => console.error("AutoPlay Error:", e));

        // Logic to maintain aspect ratio (contain) within the container - shows full video without clipping
        const updateTextureCoords = () => {
            if (!video.videoWidth || !video.videoHeight) return;

            const canvasAspect = canvas.width / canvas.height;
            const videoContentAspect = video.videoWidth / (video.videoHeight / 2); // Half height for content

            let scaleX = 1;
            let scaleY = 1;

            // Contain logic: scale DOWN instead of up to fit entire video
            if (canvasAspect > videoContentAspect) {
                // Canvas is wider than video - scale X down to fit
                scaleX = videoContentAspect / canvasAspect;
            } else {
                // Canvas is taller than video - scale Y down to fit
                scaleY = canvasAspect / videoContentAspect;
            }

            // For contain, we use full texture coords (0-1) but adjust position buffer instead
            // Since we want full texture visible, just use standard 0-1 coords
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
            ]), gl.STATIC_DRAW);
        };

        const handleResize = () => {
            // Match canvas size to container size * pixel ratio
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            updateTextureCoords();
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        // Use ResizeObserver for container resizing
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(container);

        video.addEventListener('loadedmetadata', handleResize);

        // Render Loop
        let animationFrameId: number;
        let prevVideoWidth = 0;
        let prevVideoHeight = 0;

        const render = () => {
            if (!gl || !video) return;

            // Clear with transparent background
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            if (video.videoWidth !== prevVideoWidth || video.videoHeight !== prevVideoHeight) {
                prevVideoWidth = video.videoWidth;
                prevVideoHeight = video.videoHeight;
                handleResize();
            }

            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
            }

            gl.useProgram(program);
            gl.uniform1i(forceWhiteLocation, forceWhite ? 1 : 0);

            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(texCoordLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            resizeObserver.disconnect();
            video.removeEventListener('loadedmetadata', handleResize);
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
        };
    }, [src, forceWhite]);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className || ''}`}>
            <video
                ref={videoRef}
                src={src}
                className="hidden"
                autoPlay
                loop
                muted
                playsInline
                crossOrigin="anonymous"
            />
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
