import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.create(data)
  }

  @Query(() => [User], { name: 'users' })
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Query(() => User, { name: 'findUserById' })
  async findUserById(@Args('id') id: string): Promise<User> {
    return await this.usersService.findById(id)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput
  ): Promise<User> {
    return await this.usersService.update({ id, ...data })
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.delete(id)
  }
}
