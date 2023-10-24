import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    const user: any = await this.usersService.login(email, pass);
    const payload = { sub: user.userId, email: user.email };
    if (user) {
      return {
        access_token: await this.jwtService.signAsync(payload),
        statusCode: HttpStatus.OK,
        message: 'Success',

      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Email or password is invalid',

      }
    }
  }
}