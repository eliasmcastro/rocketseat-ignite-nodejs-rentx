import fs from 'fs';
import { resolve } from 'path';

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: `${folder}/${file}`,
          ACL: 'public-read',
          Body: fileContent,
        }),
      );
      return file;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    } finally {
      await fs.promises.unlink(originalName);
    }
  }

  async delete(file: string, folder: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: `${process.env.AWS_BUCKET}`,
          Key: `${folder}/${file}`,
        }),
      );
    } catch (err) {
      console.error('Error deleting file:', err);
      throw err;
    }
  }
}

export { S3StorageProvider };
