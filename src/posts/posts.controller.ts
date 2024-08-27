import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse()
  @ApiOperation({ summary: 'Flush all posts on databases' })
  @Get('flush')
  async flush() {
    return await this.postsService.flush();
  }

  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Seed posts from JSONPlaceholder' })
  @Get('seed')
  async seed() {
    return await this.postsService.seed();
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Find all posts' })
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Find a post by ID' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }
}
