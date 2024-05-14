import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(login: string): Promise<User> {
    return await this.usersRepository.findOneBy({ login });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async isAlreadyExist(login: string): Promise<boolean> {
    const user = await this.findOne(login);
    if (user) {
      return true;
    }
    return false;
  }

  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: {  }) {
    const existingEntity = await this.usersRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedEntity = this.usersRepository.merge(existingEntity, updateUserDto);
    return await this.usersRepository.save(updatedEntity);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}