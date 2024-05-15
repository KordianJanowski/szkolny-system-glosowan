import { User } from "../users/entities/user.entity";
export interface LibrusAccountInfo {
    student: {
        nameSurname: string;
        class: string;
        index: string;
        educator: string;
    };
    account: {
        nameSurname: string;
        login: string;
    };
}
export interface SignInResponse {
    user: User;
    access_token: string;
}
