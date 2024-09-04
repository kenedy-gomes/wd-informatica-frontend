import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {
  private s3Client: S3Client;
  private readonly region = 'us-east-1';

  constructor() {
    this.s3Client = new S3Client({
      region:  this.region,
      credentials: {
        accessKeyId: environment.accessKeyId, 
        secretAccessKey: environment.secretAccessKey, 
      },
    });
  }

  async uploadFile(file: File, bucketName: string, key: string): Promise<string> {
    try {
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);
      const fileUrl = `https://${bucketName}.s3.${this.region}.amazonaws.com/${key}`;
      return fileUrl;
    } catch (err) {
      console.error('Erro ao fazer upload do arquivo para o S3', err);
      throw err;
    }
  }
}
