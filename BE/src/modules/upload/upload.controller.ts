import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { GetUploadUrlDto } from './dto';
import { JwtAuthGuard, RoleGuard } from '../../shared/guards';
import { UserRole } from '../../common/interfaces/user.interface';
import { Roles } from '../../common/decorators';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('presigned-urls')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.DEALER, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async getUploadUrls(@Body() getUploadUrlDto: GetUploadUrlDto) {
    const results = await this.uploadService.getUploadUrls(
      getUploadUrlDto.count,
      getUploadUrlDto.subfolder,
    );

    return {
      success: true,
      uploadUrls: results.map((r) => r.url), // Presigned URLs để upload
      keys: results.map((r) => r.key), // File keys để FE biết file name sau khi upload
      publicUrls: results.map((r) => r.publicUrl), // Public URLs để hiển thị ảnh
      count: results.length,
    };
  }
}


