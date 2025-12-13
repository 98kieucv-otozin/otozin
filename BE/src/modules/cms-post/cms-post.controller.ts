import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CmsPostService } from './cms-post.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Controller('cms-post')
export class CmsPostController {
  constructor(private readonly cmsPostService: CmsPostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.cmsPostService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.cmsPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cmsPostService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.cmsPostService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cmsPostService.remove(Number(id));
  }
} 