import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from '../librus-auth/librus.types';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(signInDto: SignInDto): Promise<SignInResponse>;
}
