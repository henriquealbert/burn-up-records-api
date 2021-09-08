import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Resolver(() => Track)
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Track)
  async createTrack(@Args('data') data: CreateTrackInput): Promise<Track> {
    return await this.tracksService.create(data);
  }

  @Query(() => [Track], { name: 'tracks' })
  async findAllTracks(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Track, { name: 'track' })
  async findTrackById(@Args('id') id: string) {
    return this.tracksService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Track)
  async updateTrack(
    @Args('id') id: string,
    @Args('data') data: UpdateTrackInput
  ): Promise<Track> {
    return await this.tracksService.update(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Track)
  async deleteTrack(@Args('id') id: string): Promise<Track> {
    return await this.tracksService.delete(id);
  }
}
