import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {
  constructor() {
    AWS.config.update({
      accessKeyId: environment.AWS_ACCESS_KEY_ID, 
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
      region: 'ap-south-1',
    });
  }

  async uploadFileToS3(file: File, strfilename : string, bucketName: string) {
    const s3 = new AWS.S3();
    var params,contentType;
    if (strfilename.toUpperCase().indexOf("PDF") >= 0) {
      contentType = 'application/pdf';
        params = { Bucket: bucketName, Key: strfilename, ContentType: contentType, Body: file };
    }else{
      params = { Bucket: bucketName, Key: strfilename, Body: file };
    }

    try {
      const data = await s3.upload(params).promise();
      return { status: 'success', location: data.Location };
    } catch (error) {
      return {
        status: 'error',
        message: (error instanceof Error) ? error.message : 'Unknown error',
      };
    }
  }
}