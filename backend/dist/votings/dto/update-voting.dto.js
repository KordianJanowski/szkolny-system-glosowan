"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVotingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_voting_dto_1 = require("./create-voting.dto");
class UpdateVotingDto extends (0, mapped_types_1.PartialType)(create_voting_dto_1.CreateVotingDto) {
}
exports.UpdateVotingDto = UpdateVotingDto;
//# sourceMappingURL=update-voting.dto.js.map