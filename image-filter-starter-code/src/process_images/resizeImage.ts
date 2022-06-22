const axios = require("axios");
const sharp = require("sharp");

export async function resizeImage(imageURL: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            //* gets the image from url in the arraybuffer
            const response = await axios.get(imageURL, {
                responseType: "arraybuffer",
                });
                // converts the arraybuffer to base64
                const buffer = Buffer.from(response.data, "base64");
                const outpath = "/tmp/resizeImage.png";
            await sharp(buffer)
                .resize({ width: 1080, height: 920 })
                .toFile(__dirname + outpath, () => {
                    resolve(__dirname + outpath);
                  });
            } catch (error) {
            reject(error);
        }
    });
}