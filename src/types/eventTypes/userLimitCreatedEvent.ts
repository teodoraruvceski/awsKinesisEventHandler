import { LimitPeriod, LimitStatus, LimitType } from "../user-limit";
import BaseEvent from "./baseEvent";

export default interface UserLimitCreatedEvent extends BaseEvent {
  type: "USER_LIMIT_CREATED";
  payload: {
    activeFrom: number;
    brandId: string;
    currencyCode: string;
    nextResetTime: number;
    period: LimitPeriod;
    status: LimitStatus;
    type: LimitType;
    userId: string;
    userLimitId: string;
    value: string;
  };
}
