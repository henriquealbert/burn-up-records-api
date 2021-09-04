import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from 'src/common/transformers/crypto-transform';

import { Role } from 'src/roles/roles.enum';

import { Release } from 'src/releases/entities/release.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Release, (release) => release.user)
  releases: Release[];
}
