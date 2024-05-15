import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(login: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    isAlreadyExist(login: string): Promise<boolean>;
    create(user: User): Promise<User>;
    update(id: number, updateUserDto: {}): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
