import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>
  ) {}

  async create(data: CreateTrackInput): Promise<Track> {
    const track = this.trackRepository.create(data);
    return await this.trackRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, data: UpdateTrackInput): Promise<Track> {
    const track = await this.findById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.trackRepository.save({ ...track, ...data });
  }

  async delete(id: string): Promise<Track> {
    const track = await this.findById(id);
    const trackDeleted = await this.trackRepository.delete(id);
    if (!trackDeleted) {
      throw new InternalServerErrorException();
    }
    return track;
  }
}
