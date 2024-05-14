import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { LibrusAccountInfo, SignInResponse } from 'src/librus-auth/librus.types';
import Librus from '../librus-auth/librus-client'
import { errorResponseLibrus } from 'src/librus-auth/librus-error-response';
import { schoolSymbol } from 'src/utils/constants/school';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Payload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const client = new Librus();
    await client.authorize(signInDto.login, signInDto.password);
    const info: LibrusAccountInfo = await client.info.getAccountInfo();

    // if authorize is denied, api returns blank values
    if (JSON.stringify(info) === JSON.stringify(errorResponseLibrus)) {
      throw new HttpException('Nieprawidłowy login i/lub hasło.', HttpStatus.UNAUTHORIZED);
    }

    if (info.student.class.split(' ')[2] !== schoolSymbol) {
      throw new HttpException(
        'Nie jesteś ze szkoły Technikum im. św. Józefa w Kaliszu',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // index 0 is name, index 1 is surname
    const nameSurname: string[] = info.student.nameSurname.split(' ');
    // index 0 is number of class, index 1 is digit, index 2 is school symbol
    const splitedStudentClass: string[] = info.student.class.split(' ');

    let name: string = nameSurname[0];

    // if user is parent
    if (!info.account.login.includes('u')) {
      name = `Rodzic ${nameSurname[0]}`
    }

    // if user is teacher
    if (!info.student) {
      name = `Nauczyciel ${nameSurname[0]}`
    }

    // if user is student
    const surname: string = nameSurname[1];
    const studentClass: string = info.student ? splitedStudentClass[0] + splitedStudentClass[1] : '';

    const user = await this.usersService.findOne(info.account.login);
    if (user) {
      // updates user's class, if user changed class
      if (user.class !== studentClass && info.student) {
        user.class = studentClass;
        await this.usersService.update(user.id, user);
      }

      const payload: Payload = { sub: user.id, login: user.login, roles: user.roles }

      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    const newUser = {
      name,
      surname,
      class: studentClass,
      login: info.account.login,
      roles: [Role.User],
      votingsIds: []
    };

    const createdUser: User = await this.usersService.create(newUser as any);
    const payload: Payload = { sub: createdUser.id, login: createdUser.login, roles: newUser.roles }

    return {
      user: createdUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
