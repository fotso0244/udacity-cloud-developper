const sharp = require("sharp");

export async function getMetadata(imageURL: any): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const metadata: string[] = await sharp(imageURL).metadata();
            console.log(metadata);
            resolve(metadata);
        } catch (error) {
            reject(`An error occured during processing: ${error}`);
        }
    });
}
