import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReleasesService } from './releases.service';
import { ReleasesResolver } from './releases.resolver';
import { Release } from './entities/release.entity';
import { UsersModule } from 'src/users/users.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Release]),
    forwardRef(() => UsersModule),
    forwardRef(() => TracksModule)
  ],
  providers: [ReleasesResolver, ReleasesService],
  exports: [ReleasesService]
})
export class ReleasesModule {}
