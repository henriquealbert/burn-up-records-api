import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { ReleasesModule } from 'src/releases/releases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => ReleasesModule)
  ],
  providers: [TracksResolver, TracksService],
  exports: [TracksService]
})
export class TracksModule {}
