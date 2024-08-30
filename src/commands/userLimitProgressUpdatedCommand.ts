import {
  UserLimitProgressChangedPayloadType,
  validateSchema,
} from "../eventPayloads";
import IUserLimitRepository from "../repositories/interfaces/userLimitRepositoryInterface";
import { UserLimitEventType } from "../types/eventTypes/userLimitEvent";
import Command from "./command";

export default class UserLimitProgressUpdatedCommand implements Command {
  private userLimitRepository: IUserLimitRepository;
  private payload: UserLimitProgressChangedPayloadType;
  constructor(
    payload: UserLimitProgressChangedPayloadType,
    userLimitRepository: IUserLimitRepository
  ) {
    this.userLimitRepository = userLimitRepository;
    this.payload = payload;
  }

  async execute() {
    if (
      !validateSchema(
        this.payload,
        UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED
      )
    ) {
      console.log("Invalid payload.");
    }

    const newProgress =
      Number(this.payload.amount) + Number(this.payload.previousProgress);
    await this.userLimitRepository.updateProgressUserLimit(
      this.payload.userLimitId,
      newProgress.toString()
    );
  }
}
