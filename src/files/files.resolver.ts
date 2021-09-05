import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { GqlAuthGuard } from 'src/auth/auth.guard';

import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<string> {
    return await this.filesService.uploadFileToS3(file);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteFile(@Args('fileName') fileName: string): Promise<boolean> {
    return await this.filesService.deleteFileFromS3(fileName);
  }
}
