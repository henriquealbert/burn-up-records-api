import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { ReleasesModule } from 'src/releases/releases.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ReleasesModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
