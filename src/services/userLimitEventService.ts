import {
  UserLimitCreatedPayloadType,
  UserLimitPayloadType,
  UserLimitResetPayloadType,
  UserLimitProgressChangedPayloadType,
  validateSchema,
} from "../eventPayloads";
import { UserLimitEventType } from "../types/eventTypes/userLimitEvent";
import IUserLimitRepository from "../repositories/interfaces/userLimitRepositoryInterface";

export default class UserLimitEventService {
  private userLimitRepository: IUserLimitRepository;

  constructor(userLimitRepository: IUserLimitRepository) {
    this.userLimitRepository = userLimitRepository;
  }

  public async handle(payload: UserLimitPayloadType, type: UserLimitEventType) {
    try {
      switch (type) {
        case UserLimitEventType.USER_LIMIT_CREATED:
          payload = payload as UserLimitCreatedPayloadType;
          if (await this.validateUserLimitCreatedEvent(payload)) {
            await this.userLimitRepository.addUserLimit(payload);
          }
          break;

        case UserLimitEventType.USER_LIMIT_RESET:
          payload = payload as UserLimitResetPayloadType;
          if (await this.validateUserLimitResetEvent(payload)) {
            await this.userLimitRepository.resetUserLimit(payload.userLimitId);
          }
          break;
        case UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED:
          payload = payload as UserLimitProgressChangedPayloadType;
          if (await this.validateUserLimitProgressChangedEvent(payload)) {
            const newProgress =
              Number(payload.amount) + Number(payload.previousProgress);
            await this.userLimitRepository.updateProgressUserLimit(
              payload.userLimitId,
              newProgress.toString()
            );
          }
          break;
        default:
          console.log("ERROR: Event Type not found.");
      }
    } catch (error) {
      console.log("ERROR: Event Type not found.");
    }
  }

  private async validateUserLimitCreatedEvent(
    payload: UserLimitCreatedPayloadType
  ) {
    return validateSchema<UserLimitCreatedPayloadType>(
      payload,
      UserLimitEventType.USER_LIMIT_CREATED
    );
  }

  private async validateUserLimitResetEvent(
    payload: UserLimitResetPayloadType
  ) {
    return validateSchema<UserLimitResetPayloadType>(
      payload,
      UserLimitEventType.USER_LIMIT_RESET
    );
  }

  private async validateUserLimitProgressChangedEvent(
    payload: UserLimitProgressChangedPayloadType
  ) {
    return validateSchema<UserLimitProgressChangedPayloadType>(
      payload,
      UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED
    );
  }
}
