import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { CacheHelperService } from './cache-helper.service';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [CacheHelperService],
  exports: [CacheHelperService],
})
export class CacheHelperModule {}
