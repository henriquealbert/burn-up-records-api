import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '48h'
        }
      })
    })
  ],
  providers: [AuthResolver, AuthService, UsersService, JwtStrategy]
})
export class AuthModule {}
