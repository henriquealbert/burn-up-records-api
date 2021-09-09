import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Plan } from '../enums/plan.enum';

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

  @IsBoolean()
  @IsOptional()
  onboardingCompleted?: boolean;

  @IsEnum(Plan)
  @IsOptional()
  plan?: Plan;
}
