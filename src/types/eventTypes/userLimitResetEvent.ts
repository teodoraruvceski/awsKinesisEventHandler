import { LimitPeriod, LimitType } from "../user-limit";
import BaseEvent from "./baseEvent";

export default interface UserLimitResetEvent extends BaseEvent {
  type: "USER_LIMIT_RESET";
  payload: {
    brandId: string;
    currencyCode: string;
    nextResetTime: number;
    period: LimitPeriod;
    resetAmount: string;
    resetPercentage: string;
    type: LimitType;
    unusedAmount: string;
    userId: string;
    userLimitId: string;
  };
}
