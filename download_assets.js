const fs = require('fs');
const https = require('https');
const path = require('path');

const videos = [
    "https://video.wixstatic.com/video/84770f_96602ed08f7a4c3f8c6feb2929570156/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/ea4192_7b6ed0314b814c54936b65acbc8efd0c/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/11062b_6ec38afbe78f4fbdbdb799c40dd5993f/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/84770f_9027ced3c06346188607c8818ec63344/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/84770f_e5dd8d7df4d24c4f9b9be82688b890ae/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/84770f_324e475f2f114e9099aca2235f304c95/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/11062b_9ce0d5374032428a84b73a4cf1afac89/480p/mp4/file.mp4"
];

const images = [
    "https://static.wixstatic.com/media/ea4192_8fac1e9c91a342b9b532b09496b73282~mv2.png/v1/fill/w_63,h_54,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/RENSNCELogoBW.png",
    "https://static.wixstatic.com/media/ea4192_9f6ac4d3ed884737b7ec09f650cf8967~mv2.png/v1/crop/x_0,y_240,w_1920,h_548/fill/w_202,h_58,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ea4192_9f6ac4d3ed884737b7ec09f650cf8967~mv2.png",
    "https://static.wixstatic.com/media/84770f_96602ed08f7a4c3f8c6feb2929570156f000.png/v1/fill/w_943,h_550,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/84770f_96602ed08f7a4c3f8c6feb2929570156f000.png",
    "https://static.wixstatic.com/media/ea4192_7b6ed0314b814c54936b65acbc8efd0cf002.jpg/v1/fill/w_943,h_487,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ea4192_7b6ed0314b814c54936b65acbc8efd0cf002.jpg",
    "https://static.wixstatic.com/media/11062b_6ec38afbe78f4fbdbdb799c40dd5993ff000.jpg/v1/fill/w_943,h_179,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/11062b_6ec38afbe78f4fbdbdb799c40dd5993ff000.jpg",
    "https://static.wixstatic.com/media/ea4192_f7e6f4419609459c93f71c127c833eb8~mv2.png/v1/fill/w_943,h_179,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/TSPBanner9.png",
    "https://static.wixstatic.com/media/84770f_9027ced3c06346188607c8818ec63344f000.png/v1/fill/w_565,h_565,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/84770f_9027ced3c06346188607c8818ec63344f000.png",
    "https://static.wixstatic.com/media/ea4192_2e78f790ae48487b853dce5f6e24144b~mv2.png/v1/fill/w_443,h_1740,fp_0.35_0.50,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/ea4192_2e78f790ae48487b853dce5f6e24144b~mv2.png",
    "https://static.wixstatic.com/media/ea4192_f218bf1ba6bd4fc783621c97269c6134~mv2.png/v1/fill/w_457,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/TSPBanner9.png"
];

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const download = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file async. (But we don't check the result)
            console.error(`Error downloading ${url}: ${err.message}`);
            reject(err);
        });
    });
};

const videoDir = path.join('public', 'videos', 'scraped');
const imageDir = path.join('public', 'artifacts', 'scraped');

ensureDir(videoDir);
ensureDir(imageDir);

(async () => {
    try {
        for (let i = 0; i < videos.length; i++) {
            await download(videos[i], path.join(videoDir, `video_${i + 1}.mp4`));
        }

        for (let i = 0; i < images.length; i++) {
            let filename = `image_${i + 1}.png`;
            const url = images[i];

            // Try to extract original name
            const match = url.match(/\/([^\/]+)\.(png|jpg)/);
            if (match) {
                filename = match[0].substring(1); // remove leading slash
            }

            await download(url, path.join(imageDir, filename));
        }
        console.log('All downloads completed.');
    } catch (err) {
        console.error('Download chain failed:', err);
    }
})();
