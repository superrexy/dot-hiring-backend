import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(private readonly httpService: HttpService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      return await this.httpService.axiosRef
        .post<Todo>(`https://jsonplaceholder.typicode.com/todos`, createTodoDto)
        .then((response) => response.data);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async findAll() {
    try {
      return await this.httpService.axiosRef
        .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`)
        .then((response) => response.data);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async findOne(id: number) {
    try {
      return await this.httpService.axiosRef
        .get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => response.data);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    try {
      return await this.httpService.axiosRef
        .put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          ...todo,
          ...updateTodoDto,
        })
        .then((response) => response.data);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    try {
      return this.httpService.axiosRef
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo}`)
        .then(() => null);
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
