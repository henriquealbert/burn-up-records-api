import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid e-mail' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid password' })
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Invalid avatar url' })
  avatarUrl?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'Invalid characters' })
  onboardingCompleted?: boolean;
}
