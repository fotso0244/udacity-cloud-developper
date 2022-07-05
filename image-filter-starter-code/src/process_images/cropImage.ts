//const axios = require("axios");
const sharp = require("sharp");

export async function cropImage(imageURL: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
                //* gets the image from url in the arraybuffer
                //const response = await axios.get(imageURL, {
                //responseType: "arraybuffer",
                //});
                // converts the arraybuffer to base64
                //const buffer = Buffer.from(response.data, "base64");
                const outpath = "/tmp/croppedImage.jpg";
            await sharp(imageURL)
                .extract({ width: 300, height: 300, left: 100, top: 70 })
                .jpeg({quality: 60, progressive: true, mozjpeg: true})
                .toFile(__dirname + outpath, () => {
                    resolve(__dirname + outpath);
                  });
        } catch (error) {
            reject(error);
        }
    });
}