import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from 'src/common/transformers/crypto-transform';

import { Role } from 'src/roles/roles.enum';

import { Release } from 'src/releases/entities/release.entity';
import { Plan } from '../enums/plan.enum';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Release, (release) => release.user, { nullable: false })
  releases: Release[];

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true, default: false })
  onboardingCompleted?: boolean;

  @Column({ type: 'enum', enum: Plan, default: Plan.FREE })
  plan: Plan;
}
