import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReleasesService } from './releases.service';
import { ReleasesResolver } from './releases.resolver';
import { Release } from './entities/release.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Release, User]),
    forwardRef(() => UsersModule)
  ],
  providers: [ReleasesResolver, ReleasesService],
  exports: [ReleasesService]
})
export class ReleasesModule {}
