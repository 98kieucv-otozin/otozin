import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq, isNull } from 'drizzle-orm';
import { DRIZZLE_DB } from '../../database/drizzle/drizzle.module';
import { posts } from '../../database/drizzle/schema';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from '../../common/interfaces/post.interface';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class CmsPostService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: NodePgDatabase,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, author } = createPostDto;
    const [post] = await this.db
      .insert(posts)
      .values({ title, content, author })
      .returning({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author: posts.author,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      });
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      created_at: post.createdAt?.toISOString() || new Date().toISOString(),
      updated_at: post.updatedAt?.toISOString() || new Date().toISOString(),
    };
  }

  async findAll(): Promise<Post[]> {
    const result = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author: posts.author,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(isNull(posts.deletedAt))
      .orderBy(posts.createdAt);
    return result.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      created_at: post.createdAt?.toISOString() || new Date().toISOString(),
      updated_at: post.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  }

  async findOne(id: number): Promise<Post> {
    const [post] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author: posts.author,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);
    if (!post) throw new NotFoundException('Post not found');
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      created_at: post.createdAt?.toISOString() || new Date().toISOString(),
      updated_at: post.updatedAt?.toISOString() || new Date().toISOString(),
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const updateData: any = {};
    if (updatePostDto.title !== undefined) updateData.title = updatePostDto.title;
    if (updatePostDto.content !== undefined) updateData.content = updatePostDto.content;
    updateData.updatedAt = new Date();

    const [post] = await this.db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author: posts.author,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      });

    if (!post) throw new NotFoundException('Post not found');
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      created_at: post.createdAt?.toISOString() || new Date().toISOString(),
      updated_at: post.updatedAt?.toISOString() || new Date().toISOString(),
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({ id: posts.id });
    if (result.length === 0) throw new NotFoundException('Post not found');
  }
}
