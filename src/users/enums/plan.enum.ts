import { registerEnumType } from '@nestjs/graphql';

export enum Plan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

registerEnumType(Plan, {
  name: 'Plan'
});
