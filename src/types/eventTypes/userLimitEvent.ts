import UserLimitCreatedEvent from "./userLimitCreatedEvent";
import UserLimitResetEvent from "./userLimitResetEvent";
import UserLimitProgressChangedEvent from "./userLimitProgressChangedEvent";

export type UserLimitEvent =
  | UserLimitCreatedEvent
  | UserLimitProgressChangedEvent
  | UserLimitResetEvent;

export enum UserLimitEventType {
  USER_LIMIT_CREATED = "USER_LIMIT_CREATED",
  USER_LIMIT_PROGRESS_CHANGED = "USER_LIMIT_PROGRESS_CHANGED",
  USER_LIMIT_RESET = "USER_LIMIT_RESET",
}
