import { hashSync } from 'bcrypt';

const saltOrRounds = 10;

export const hashPasswordTransform = {
  to(password: string): string {
    return hashSync(password, saltOrRounds);
  },
  from(hash: string): string {
    return hash;
  }
};
