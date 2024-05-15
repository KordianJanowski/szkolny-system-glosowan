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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVotingDto = void 0;
const class_validator_1 = require("class-validator");
class CreateVotingDto {
}
exports.CreateVotingDto = CreateVotingDto;
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateVotingDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(1500),
    __metadata("design:type", String)
], CreateVotingDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(100),
    __metadata("design:type", Array)
], CreateVotingDto.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.Max)(94670856000000),
    __metadata("design:type", Number)
], CreateVotingDto.prototype, "expiration_time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVotingDto.prototype, "is_visible_before_voting_end", void 0);
//# sourceMappingURL=create-voting.dto.js.map