import { UserLimitCreatedPayloadType, validateSchema } from "../eventPayloads";
import IUserLimitRepository from "../repositories/interfaces/userLimitRepositoryInterface";
import { UserLimitEventType } from "../types/eventTypes/userLimitEvent";
import Command from "./command";

export default class UserLimitCreatedCommand implements Command {
  private userLimitRepository: IUserLimitRepository;
  private payload: UserLimitCreatedPayloadType;
  constructor(
    payload: UserLimitCreatedPayloadType,
    userLimitRepository: IUserLimitRepository
  ) {
    this.userLimitRepository = userLimitRepository;
    this.payload = payload;
  }

  async execute() {
    if (!validateSchema(this.payload, UserLimitEventType.USER_LIMIT_CREATED)) {
      console.log("Invalid payload.");
    }

    await this.userLimitRepository.addUserLimit(this.payload);
  }
}
