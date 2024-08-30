import { UserLimitResetPayloadType, validateSchema } from "../eventPayloads";
import IUserLimitRepository from "../repositories/interfaces/userLimitRepositoryInterface";
import { UserLimitEventType } from "../types/eventTypes/userLimitEvent";
import Command from "./command";

export default class UserLimitResetCommand implements Command {
  private userLimitRepository: IUserLimitRepository;
  private payload: UserLimitResetPayloadType;
  constructor(
    payload: UserLimitResetPayloadType,
    userLimitRepository: IUserLimitRepository
  ) {
    this.userLimitRepository = userLimitRepository;
    this.payload = payload;
  }

  async execute() {
    if (!validateSchema(this.payload, UserLimitEventType.USER_LIMIT_RESET)) {
      console.log("Invalid payload.");
    }

    await this.userLimitRepository.resetUserLimit(this.payload.userLimitId);
  }
}
