import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';

import { CurrentUser } from './currentUser';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Release } from 'src/releases/entities/release.entity';
import { ReleasesService } from 'src/releases/releases.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly releasesRepository: ReleasesService
  ) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findUserById(@Args('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'userByEmail' })
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput
  ): Promise<User> {
    return await this.usersService.update(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField()
  async releases(@Parent() user: User): Promise<Release[]> {
    return this.releasesRepository.findByUserId(user.id);
  }
}
