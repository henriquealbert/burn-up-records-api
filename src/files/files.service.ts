import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createWriteStream, createReadStream, unlink } from 'fs';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

@Injectable()
export class FilesService {
  async uploadFileToS3(file: FileUpload): Promise<string> {
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const filename = `${uuidv4()}-${file.filename}`;
    const unlinkFile = promisify(unlink);

    return new Promise(async (resolve, reject) =>
      file
        .createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => {
          s3.upload(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Body: createReadStream(`./uploads/${filename}`),
              Key: filename,
              ACL: 'public-read'
            },
            async (err, data) => {
              await unlinkFile(`./uploads/${filename}`); // delete local file
              if (err) {
                Logger.error(err);
                reject(null);
              }

              resolve(data.Location);
            }
          );
        })
        .on('error', () => reject(null))
    );
  }

  async deleteFileFromS3(filename: string): Promise<boolean> {
    if (!filename) {
      throw new NotFoundException('File not found');
    }
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: filename
        },
        (err) => {
          if (err) {
            Logger.error(err);
            reject(false);
          }
          resolve(true);
        }
      );
    });
  }
}
