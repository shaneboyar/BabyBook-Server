import shortid from "shortid";
import { writeFile, unlink } from "fs";
import { Storage } from "@google-cloud/storage";

// Creates a client from a Google service account key.
const storage = new Storage({ keyFilename: "./gcs-creds.json" });
const BUCKET_NAME = "baby-book-bucket";
const bucket = storage.bucket(BUCKET_NAME);

export const upload = async (file: any): Promise<any> => {
  const { createReadStream } = await file;
  const stream = createReadStream();
  const name = `${shortid.generate()}.jpg`;
  const remoteFile = bucket.file(name);

  const options = {
    destination: name,
    resumable: false,
    validation: "crc32c"
  };

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = remoteFile.createWriteStream(options);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);
    writeStream.on("error", e => reject(e));
    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });
  const [{ mediaLink }] = await remoteFile.getMetadata();
  return mediaLink;
};
