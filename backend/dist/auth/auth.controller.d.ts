import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: SignInDto): Promise<import("../librus-auth/librus.types").SignInResponse>;
}
