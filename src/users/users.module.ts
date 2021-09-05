import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { ReleasesModule } from 'src/releases/releases.module';
import { Release } from 'src/releases/entities/release.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Release]),
    forwardRef(() => ReleasesModule)
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
