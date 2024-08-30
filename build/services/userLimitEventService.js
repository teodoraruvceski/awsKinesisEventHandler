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
const eventPayloads_1 = require("../eventPayloads");
const userLimitEvent_1 = require("../types/eventTypes/userLimitEvent");
class UserLimitEventService {
    constructor(userLimitRepository) {
        this.userLimitRepository = userLimitRepository;
    }
    handle(payload, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (type) {
                    case userLimitEvent_1.UserLimitEventType.USER_LIMIT_CREATED:
                        payload = payload;
                        if (yield this.validateUserLimitCreatedEvent(payload)) {
                            yield this.userLimitRepository.addUserLimit(payload);
                        }
                        return true;
                    case userLimitEvent_1.UserLimitEventType.USER_LIMIT_RESET:
                        payload = payload;
                        if (yield this.validateUserLimitResetEvent(payload)) {
                            yield this.userLimitRepository.resetUserLimit(payload.userLimitId);
                        }
                        return true;
                    case userLimitEvent_1.UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED:
                        payload = payload;
                        if (yield this.validateUserLimitProgressChangedEvent(payload)) {
                            yield this.userLimitRepository.updateProgressUserLimit(payload.userLimitId, payload.amount + payload.previousProgress);
                        }
                        return true;
                    default:
                        console.log("ERROR: Event Type not found.");
                        return false;
                }
            }
            catch (error) {
                console.log("ERROR: Event Type not found.");
                return false;
            }
        });
    }
    validateUserLimitCreatedEvent(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, eventPayloads_1.validateSchema)(payload, userLimitEvent_1.UserLimitEventType.USER_LIMIT_CREATED);
        });
    }
    validateUserLimitResetEvent(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, eventPayloads_1.validateSchema)(payload, userLimitEvent_1.UserLimitEventType.USER_LIMIT_RESET);
        });
    }
    validateUserLimitProgressChangedEvent(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, eventPayloads_1.validateSchema)(payload, userLimitEvent_1.UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED);
        });
    }
}
exports.default = UserLimitEventService;
