import { InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsBoolean,
  IsUUID,
  IsOptional
} from 'class-validator';
import { Royalty } from '../enums/royalty.enum';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

@InputType()
export class CreateReleaseInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  descritpion: string;

  @IsDate()
  @IsNotEmpty({ message: 'Release date is required' })
  date: Date;

  @IsEnum(Type)
  @IsNotEmpty({ message: 'Type is required' })
  type: Type;

  @IsEnum(Royalty)
  @IsOptional()
  royalty?: Royalty;

  @IsBoolean()
  @IsOptional()
  contract?: boolean;

  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: Status;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsNotEmpty({ message: 'Catalog is required' })
  catalog: string;

  @IsUUID()
  @IsNotEmpty({ message: 'User is required' })
  userId: string;
}
