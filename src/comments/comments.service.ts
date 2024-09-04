import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  private getNestedLevel(level: number) {
    if (level === 1)
      return {
        where: {
          comment_nested_id: null,
        },
      };

    return {
      where: {
        comment_nested_id: null,
      },
      include: {
        Comment: {
          include: {
            Comment: true,
          },
        },
      },
    };
  }

  async findAll(postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        Comment: this.getNestedLevel(10000),
      },
    });
    console.log(post);

    if (!post) throw new NotFoundException();

    return post.Comment;
  }
}
