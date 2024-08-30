"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLimitRepository = void 0;
class UserLimitRepository {
    constructor() {
        this.userLimits = [];
    }
    addUserLimit(userLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userLimits.push(userLimit);
            console.log("INFO: User limit created - user limit id:", userLimit.userLimitId);
        });
    }
    updateProgressUserLimit(userLimitId, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLimit = this.userLimits.find((x) => x.userLimitId == userLimitId);
            if (userLimit) {
                userLimit.progress = progress;
                console.log(`INFO: User limit progress update - user limit id: ${userLimitId}, progress: ${progress}`);
                return;
            }
            console.log("ERROR: User limit progress update failed - user limit id not found:", userLimitId);
        });
    }
    resetUserLimit(userLimitId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLimit = this.userLimits.find((x) => x.userLimitId == userLimitId);
            if (userLimit) {
                userLimit.progress = "0";
                console.log(`INFO: User limit progress reset - user limit id: ${userLimitId}`);
                return;
            }
            console.log("ERROR: Userlimit progress reset failed - user limit id not found:", userLimitId);
        });
    }
}
exports.UserLimitRepository = UserLimitRepository;
