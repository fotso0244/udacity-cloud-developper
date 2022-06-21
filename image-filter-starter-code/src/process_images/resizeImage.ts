const sharp = require("sharp");

export async function resizeImage(imageURL: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            await sharp(imageURL)
                .resize({
                    width: 256,
                    height: 256
                })
                .toFile("./tmp/imageResized.png");
                resolve("./tmp/imageResized.png");
            } catch (error) {
            reject(error);
        }
    });
}