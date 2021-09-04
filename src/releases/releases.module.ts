import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReleasesService } from './releases.service';
import { ReleasesResolver } from './releases.resolver';
import { Release } from './entities/release.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Release, User])],
  providers: [ReleasesResolver, ReleasesService]
})
export class ReleasesModule {}
