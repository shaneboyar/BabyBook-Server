import shortid from "shortid";
import { writeFile, unlinkSync } from "fs";
import { Storage } from "@google-cloud/storage";

// Creates a client from a Google service account key.
const storage = new Storage({ keyFilename: "./gcs-creds.json" });
const BUCKET_NAME = "baby-book-bucket";
const bucket = storage.bucket(BUCKET_NAME);

export const upload = async (fileString: any): Promise<any> => {
  const name = `${shortid.generate()}.jpg`;
  bucket.file(name);

  const options = {
    destination: name,
    resumable: true,
    validation: "crc32c"
    // metadata: {
    //   metadata: {
    //     event: 'Fall trip to the zoo'
    //   }
    // }
  };

  return new Promise((resolve, reject) => {
    const TMP_FILE_PATH = "tmpfile.jpg";
    writeFile(TMP_FILE_PATH, fileString, { encoding: "base64" }, () => {
      return bucket.upload(TMP_FILE_PATH, options, function(
        err,
        file,
        { mediaLink }
      ) {
        if (file) {
          console.log("file exists?");
          resolve(mediaLink);
        } else {
          reject(err);
        }
        unlinkSync(TMP_FILE_PATH);
      });
    });
  });
};

// const options = {
//   destination: 'new-image.png',
//   resumable: true,
//   validation: 'crc32c',
//   metadata: {
//     metadata: {
//       event: 'Fall trip to the zoo'
//     }
//   }
// };
