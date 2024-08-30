import {
  UserLimitCreatedPayloadType,
  UserLimitPayloadType,
  UserLimitResetPayloadType,
  UserLimitProgressChangedPayloadType,
  validateSchema,
} from "../eventPayloads";
import { UserLimitEventType } from "../types/eventTypes/userLimitEvent";
import IUserLimitRepository from "../repositories/interfaces/userLimitRepositoryInterface";
import CommandHandler from "../commands/commandHandler";
import UserLimitCreatedCommand from "../commands/userLimitCreatedCommand";
import UserLimitProgressUpdatedCommand from "../commands/userLimitProgressUpdatedCommand";
import UserLimitResetCommand from "../commands/userLimitResetCommand";

export default class UserLimitEventService {
  private userLimitRepository: IUserLimitRepository;
  private commandHandler: CommandHandler;
  constructor(userLimitRepository: IUserLimitRepository) {
    this.userLimitRepository = userLimitRepository;
    this.commandHandler = new CommandHandler();
  }

  public async handle(payload: UserLimitPayloadType, type: UserLimitEventType) {
    try {
      switch (type) {
        case UserLimitEventType.USER_LIMIT_CREATED:
          this.commandHandler.setCommand(
            new UserLimitCreatedCommand(
              payload as UserLimitCreatedPayloadType,
              this.userLimitRepository
            )
          );
          break;

        case UserLimitEventType.USER_LIMIT_RESET:
          payload = payload as UserLimitResetPayloadType;
          this.commandHandler.setCommand(
            new UserLimitResetCommand(
              payload as UserLimitResetPayloadType,
              this.userLimitRepository
            )
          );
          break;
        case UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED:
          payload = payload as UserLimitProgressChangedPayloadType;
          this.commandHandler.setCommand(
            new UserLimitProgressUpdatedCommand(
              payload as UserLimitProgressChangedPayloadType,
              this.userLimitRepository
            )
          );
          break;
        default:
          console.log("ERROR: Event Type not found.");
      }
      this.commandHandler.handleCommand();
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
