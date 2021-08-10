import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  id: string;
  email: string;
  password: string;
}
