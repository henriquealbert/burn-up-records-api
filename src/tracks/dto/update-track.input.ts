import { CreateTrackInput } from './create-track.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  mixName?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  ISRC?: string;

  @IsString()
  @IsOptional()
  EAN?: string;

  @IsString()
  @IsOptional()
  artists?: string;

  @IsString()
  @IsOptional()
  remixer?: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
