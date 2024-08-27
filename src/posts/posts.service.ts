import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.post.findFirst({
      where: { id },
    });

    if (!data) throw new NotFoundException();

    return data;
  }

  async flush() {
    return await this.prisma.post.deleteMany();
  }

  async seed() {
    const data = await this.httpService.axiosRef
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.data);

    return await this.prisma.post.createMany({
      data: data.map((post) => ({
        userId: post.userId,
        title: post.title,
        body: post.body,
      })),
    });
  }
}
