/* eslint-disable prettier/prettier */
import { Users } from 'entities/Users';
import { Repository } from 'typeorm';
import {
  LoginDto,
} from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

export class UsersService {
  constructor(
    @InjectRepository(Users)
    private adminRepo: Repository<Users>,
  ) {}

  //Login Function
  async login(email:string,password:string) {
    let matched = false;
    const login = await this.adminRepo.findOne({
      where: {
        email: email,
      },
    });
    if (login !== null) {
      matched = comparePassword(password, login.password);
      if (matched) {
        return login;
      }
    }
    return false;
  }

}