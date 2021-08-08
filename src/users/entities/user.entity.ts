import { ObjectType, Field, ID, HideField } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hashPasswordTransform } from 'src/common/transformers/crypto-transform'
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string
}
