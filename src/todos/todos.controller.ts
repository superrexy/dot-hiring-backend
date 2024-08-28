import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

export type idString = string;

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create todo' })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Get all todos' })
  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Get todo by id' })
  @Get(':id')
  findOne(@Param('id') id: idString) {
    return this.todosService.findOne(+id);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Update todo status by id' })
  @Put(':id/status')
  updateStatus(@Param('id') id: idString) {
    return this.todosService.updateStatus(+id);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Update todo by id' })
  @Patch(':id')
  update(@Param('id') id: idString, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Delete todo by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
