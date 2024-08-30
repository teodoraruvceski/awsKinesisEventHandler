"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLimitCreatedCommand {
    constructor(payload) {
        this.payload = payload;
        this.type = "USER_LIMIT_REATED";
    }
}
exports.default = UserLimitCreatedCommand;
