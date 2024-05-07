import { PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import config from "config";
import { fileData, fileStorage } from "../../types";
import { Upload } from "@aws-sdk/lib-storage";

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
      Bucket: config.get("s3.bucketName"),
      Key: fileData.fileName,
      Body: fileData.fileData,
    } as PutObjectCommandInput;

    const upload = new Upload({
      client: this.s3client,
      params: payload,
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    return await upload.done();
  }
}
