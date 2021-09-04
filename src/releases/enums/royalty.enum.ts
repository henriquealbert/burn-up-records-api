import { registerEnumType } from '@nestjs/graphql';

export enum Royalty {
  ALL = '100%',
  HALF = '50%',
  STANDARD = '40%'
}

registerEnumType(Royalty, {
  name: 'Royalty'
});
