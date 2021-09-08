import { CreateReleaseInput } from './create-release.input';
import { InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { Type } from '../enums/type.enum';
import { Royalty } from '../enums/royalty.enum';
import { Status } from '../enums/status.enum';

@InputType()
export class UpdateReleaseInput extends PartialType(CreateReleaseInput) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsEnum(Type)
  @IsOptional()
  type?: Type;

  @IsEnum(Royalty)
  @IsOptional()
  royalty?: Royalty;

  @IsBoolean()
  @IsOptional()
  contract?: boolean;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  catalog?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  artworkUrl?: string;
}
