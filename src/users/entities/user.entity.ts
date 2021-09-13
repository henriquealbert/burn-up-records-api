import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Role } from 'src/roles/roles.enum';

import { Release } from 'src/releases/entities/release.entity';
import { Plan } from '../enums/plan.enum';
import { hash } from 'bcrypt';

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

  @Column({ type: 'varchar', name: 'password' })
  @HideField()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }

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
