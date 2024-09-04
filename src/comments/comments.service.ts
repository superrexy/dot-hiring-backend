import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  private getNestedLevel(level: number) {
    if (level === 1)
      return {
        Comment: {},
      };

    return {
      Comment: {
        include: this.getNestedLevel(level - 1),
      },
    };
  }

  async findAll(postId: number) {
    const comments = await this.prisma.comment.count({
      where: {
        postId,
      },
    });

    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        Comment: {
          where: { comment_nested_id: null },
          include: this.getNestedLevel(comments),
        },
      },
    });

    if (!post) throw new NotFoundException();

    return post.Comment;
  }
}
