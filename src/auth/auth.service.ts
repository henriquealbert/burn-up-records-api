import { compareSync } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.usersService.findById(data.id);

    const validPasssword = compareSync(data.password, user.password);

    if (!validPasssword) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = '';

    return {
      user,
      token
    };
  }
}
