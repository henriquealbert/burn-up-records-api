import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReleasesService } from './releases.service';
import { Release } from './entities/release.entity';
import { CreateReleaseInput } from './dto/create-release.input';
import { UpdateReleaseInput } from './dto/update-release.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Resolver(() => Release)
export class ReleasesResolver {
  constructor(private readonly releasesService: ReleasesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Release)
  async createRelease(
    @Args('data') data: CreateReleaseInput
  ): Promise<Release> {
    return await this.releasesService.create(data);
  }

  @Query(() => [Release], { name: 'releases' })
  async findAllReleases(): Promise<Release[]> {
    return this.releasesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Release, { name: 'release' })
  async findReleaseById(@Args('id') id: string) {
    return this.releasesService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Release)
  async updateRelease(
    @Args('id') id: string,
    @Args('data') data: UpdateReleaseInput
  ): Promise<Release> {
    return await this.releasesService.update(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Release)
  async deleteRelease(@Args('id') id: string): Promise<Release> {
    return await this.releasesService.delete(id);
  }
}
