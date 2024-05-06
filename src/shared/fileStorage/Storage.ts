import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "config";
import { fileData, fileStorage } from "../../types";

export class S3Storage implements fileStorage {
  private readonly s3client: S3Client;
  constructor() {
    this.s3client = new S3Client({
      region: config.get("s3.region"),
      credentials: {
        accessKeyId: config.get("s3.accessKeyId"),
        secretAccessKey: config.get("s3.secretAccessKey"),
      },
    });
  }

  async uploadFile(fileData: fileData): Promise<any> {
    const payload = {
      Bucket: config.get("s3.bucket"),
      Key: fileData.filename,
      Body: fileData.fileData,
    } as PutObjectCommandInput;

    const data = await this.s3client.send(new PutObjectCommand(payload));
    return data;
  }
}
