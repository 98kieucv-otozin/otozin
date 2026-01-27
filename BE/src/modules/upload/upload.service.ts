import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly publicUrl?: string;

  constructor(private readonly configService: ConfigService) {
    const r2Config = this.configService.get('r2') || {};

    // Validate R2 config
    if (!r2Config.accountId || !r2Config.accessKeyId || !r2Config.secretAccessKey || !r2Config.bucketName) {
      this.logger.warn('R2 configuration is incomplete. Upload URLs will not work.');
      // Initialize with empty values to avoid errors
      this.s3Client = null as any;
      this.bucketName = '';
      this.publicUrl = undefined;
      return;
    }

    // Initialize S3 client for R2 (S3-compatible API)
    try {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${r2Config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: r2Config.accessKeyId,
          secretAccessKey: r2Config.secretAccessKey,
        },
      });

      this.bucketName = r2Config.bucketName;
      this.publicUrl = r2Config.publicUrl;
    } catch (error) {
      this.logger.error('Failed to initialize S3 client for R2', error);
      this.s3Client = null as any;
      this.bucketName = '';
      this.publicUrl = undefined;
    }
  }

  /**
   * Generate presigned URLs for R2 upload
   * Sử dụng AWS SDK S3 client để tạo presigned URLs trực tiếp
   *
   * Best Practice:
   * - Presigned URL không có extension (linh hoạt hơn)
   * - Extension được quyết định khi upload file thực tế
   * - File name format: {subfolder}/{uuid}
   *
   * R2_PUBLIC_URL: (Optional) Custom domain để truy cập public files
   * - Nếu không set: R2 tự động có public URL mặc định
   * - Nếu set: Dùng custom domain (ví dụ: https://cdn.yourdomain.com)
   */
  async getUploadUrls(
    count: number,
    subfolder?: string,
  ): Promise<Array<{ url: string; key: string; publicUrl: string }>> {
    // Check if S3Client is initialized
    if (!this.s3Client || !this.bucketName) {
      throw new BadRequestException('R2 configuration is not complete. Please check your environment variables.');
    }

    const r2Config = this.configService.get('r2') || {};

    if (!r2Config.accountId || !r2Config.accessKeyId || !r2Config.secretAccessKey || !r2Config.bucketName) {
      throw new BadRequestException('R2 configuration is not complete. Please check your environment variables.');
    }

    if (count < 1 || count > 100) {
      throw new BadRequestException('Count must be between 1 and 100');
    }

    const folder = subfolder || 'car-for-sale';
    const results: Array<{ url: string; key: string; publicUrl: string }> = [];

    try {
      for (let i = 0; i < count; i++) {
        // Generate unique file name (UUID only, no extension)
        // Extension sẽ được quyết định khi upload file thực tế
        const id = randomUUID();
        const objectKey = `${folder}/${id}`;

        // Create PutObject command
        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: objectKey,
        });

        // Generate presigned URL (expires in 10 minutes)
        const presignedUrl = await getSignedUrl(this.s3Client, command, {
          expiresIn: 600, // 10 minutes
        });

        // Construct public URL
        let publicUrl = '';
        if (this.publicUrl) {
          // Use custom domain if configured
          publicUrl = `${this.publicUrl}/${objectKey}`;
        } else {
          // Use R2 default public URL format
          // Format: https://{accountId}.r2.cloudflarestorage.com/{bucketName}/{key}
          const accountId = r2Config.accountId;
          const bucketName = r2Config.bucketName;
          publicUrl = `https://${accountId}.r2.cloudflarestorage.com/${bucketName}/${objectKey}`;
        }

        results.push({
          url: presignedUrl,
          key: objectKey, // Return key để FE biết file name sau khi upload
          publicUrl: publicUrl, // Return public URL để FE hiển thị ảnh
        });
      }

      this.logger.log(`Generated ${results.length} presigned URLs for folder: ${folder}`);
      return results;
    } catch (error) {
      this.logger.error(`Failed to generate presigned URLs: ${error.message}`, error);
      throw new BadRequestException(`Failed to generate presigned URLs: ${error.message}`);
    }
  }
}


