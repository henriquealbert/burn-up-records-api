import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'E-mail is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
