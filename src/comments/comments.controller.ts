import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getAllComments(@Param('id') id: string) {
    return await this.commentsService.findAll(+id);
  }
}
