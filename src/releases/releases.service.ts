import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReleaseInput } from './dto/create-release.input';
import { UpdateReleaseInput } from './dto/update-release.input';
import { Release } from './entities/release.entity';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>
  ) {}

  async create(data: CreateReleaseInput): Promise<Release> {
    const release = this.releaseRepository.create(data);
    return await this.releaseRepository.save(release);
  }

  async findAll(): Promise<Release[]> {
    return await this.releaseRepository.find();
  }

  async findById(id: string): Promise<Release> {
    const release = await this.releaseRepository.findOne(id);
    if (!release) {
      throw new NotFoundException('Release not found');
    }
    return release;
  }

  async update(id: string, data: UpdateReleaseInput): Promise<Release> {
    const release = await this.findById(id);
    if (!release) {
      throw new NotFoundException('Release not found');
    }
    return this.releaseRepository.save({ ...release, ...data });
  }

  async delete(id: string): Promise<Release> {
    const release = await this.findById(id);
    const releaseDeleted = await this.releaseRepository.delete(id);
    if (!releaseDeleted) {
      throw new InternalServerErrorException();
    }
    return release;
  }

  async findByUserId(userId: string): Promise<Release[]> {
    const releases = await this.releaseRepository.find({
      where: { userId }
    });
    if (!releases) {
      throw new NotFoundException('Releases not found');
    }
    return releases;
  }
}
