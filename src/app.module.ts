import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheHelperModule } from './common/cache-helper/cache-helper.module';
import { PostsModule } from './posts/posts.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    TodosModule,
    PostsModule,
    CacheHelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
