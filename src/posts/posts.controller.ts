import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create a post' })
  @Post()
  async create(@Body() payload: CreatePostDto) {
    return await this.postsService.create(payload);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Update a post by ID' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: CreatePostDto) {
    return await this.postsService.update(id, payload);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Delete a post by ID' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postsService.delete(id);
  }

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
