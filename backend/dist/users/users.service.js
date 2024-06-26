"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(login) {
        return await this.usersRepository.findOneBy({ login });
    }
    async findOneById(id) {
        return await this.usersRepository.findOneBy({ id });
    }
    async isAlreadyExist(login) {
        const user = await this.findOne(login);
        if (user) {
            return true;
        }
        return false;
    }
    async create(user) {
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }
    async update(id, updateUserDto) {
        const existingEntity = await this.usersRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        const updatedEntity = this.usersRepository.merge(existingEntity, updateUserDto);
        return await this.usersRepository.save(updatedEntity);
    }
    async remove(id) {
        return await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map