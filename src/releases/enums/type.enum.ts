import { registerEnumType } from '@nestjs/graphql';

export enum Type {
  SINGLE = 'SINGLE',
  EP = 'EP',
  ALBUM = 'ALBUM'
}

registerEnumType(Type, {
  name: 'Type'
});
