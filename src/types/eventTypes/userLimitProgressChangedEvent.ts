import BaseEvent from "./baseEvent";

export default interface UserLimitProgressChangedEvent extends BaseEvent {
  type: "USER_LIMIT_PROGRESS_CHANGED";
  payload: {
    amount: string;
    brandId: string;
    currencyCode: string;
    nextResetTime: number;
    previousProgress: string;
    remainingAmount: string;
    userId: string;
    userLimitId: string;
  };
}
