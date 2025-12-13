import { Module } from '@nestjs/common';
import { CmsPostController } from './cms-post.controller';
import { CmsPostService } from './cms-post.service';

@Module({
  controllers: [CmsPostController],
  providers: [CmsPostService],
})
export class CmsPostModule {} 