import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Type } from '../enums/type.enum';
import { Status } from '../enums/status.enum';
import { Royalty } from '../enums/royalty.enum';

import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity()
export class Release {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  date?: Date;

  @Column({ type: 'enum', enum: Type, default: Type.SINGLE })
  type?: Type;

  @Column({ type: 'enum', enum: Royalty, default: Royalty.STANDARD })
  royalty?: Royalty;

  @Column({ default: false })
  contract?: boolean;

  @Column({ type: 'enum', enum: Status, default: Status.ANALISE })
  status?: Status;

  @Column()
  notes?: string;

  @Column()
  catalog?: string;

  @ManyToOne(() => User, (user) => user.releases)
  user: User;

  // TODO: Add tracks, add artwork
}
