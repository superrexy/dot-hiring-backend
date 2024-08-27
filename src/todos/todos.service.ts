import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CacheHelperService } from '../common/cache-helper/cache-helper.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cacheHelper: CacheHelperService,
  ) {}

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
      const todos = await this.cacheHelper.get<Todo[]>('todos');
      if (todos) return todos;
      else
        return await this.httpService.axiosRef
          .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`)
          .then((response) => {
            this.cacheHelper.set('todos', response.data);
            return response.data;
          });
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async findOne(id: number) {
    try {
      const todo = await this.cacheHelper.get<Todo>(`todo-${id}`);
      if (todo) return todo;
      else
        return await this.httpService.axiosRef
          .get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then((response) => {
            this.cacheHelper.set(`todo-${id}`, response.data);
            return response.data;
          });
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
        .then((response) => {
          this.cacheHelper.del(`todo-${id}`);
          return response;
        });
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    try {
      return this.httpService.axiosRef
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo}`)
        .then(() => {
          this.cacheHelper.del(`todo-${id}`);
        });
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
