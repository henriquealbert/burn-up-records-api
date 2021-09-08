import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Release } from 'src/releases/entities/release.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  mixName: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  ISRC?: string;

  @Column({ nullable: true })
  EAN?: string;

  @Column()
  artists: string;

  @Column({ nullable: true })
  remixer?: string;

  @Column()
  genre: string;

  @Column()
  releaseId: string;

  @ManyToOne(() => Release, (release) => release.tracks)
  release: Release;
}
