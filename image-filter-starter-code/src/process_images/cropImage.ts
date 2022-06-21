const axios = require("axios");
const sharp = require("sharp");

export async function cropImage(imageURL: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
                //* gets the image from url in the arraybuffer
                const response = await axios.get(imageURL, {
                responseType: "arraybuffer",
                });
                // converts the arraybuffer to base64
                const buffer = Buffer.from(response.data, "base64");
                const outpath = "/tmp/croppedImage.png";
            await sharp(buffer)
                .extract({ width: 500, height: 330, left: 120, top: 70 })
                .toFile(__dirname + outpath, () => {
                    resolve(__dirname + outpath);
                  });
        } catch (error) {
            reject(error);
        }
    });
}