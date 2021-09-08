import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateTrackInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Mix name is required' })
  mixName: string;

  @IsString()
  @IsNotEmpty({ message: 'Url is required' })
  url: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'ISRC is required' })
  ISRC?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'EAN/UPC is required' })
  EAN?: string;

  @IsString()
  @IsNotEmpty({ message: 'Artist(s) is required' })
  artists: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Remixer is required' })
  remixer?: string;

  @IsString()
  @IsNotEmpty({ message: 'Genre is required' })
  genre?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Release ID is required' })
  releaseId: string;
}
