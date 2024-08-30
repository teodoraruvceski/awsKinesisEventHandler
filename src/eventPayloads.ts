import * as yup from "yup";
import { LimitPeriod, LimitStatus, LimitType } from "./types/user-limit";
import { UserLimitEventType } from "./types/eventTypes/userLimitEvent";

const commonSchema = yup.object({
  brandId: yup.string().required(),
  currencyCode: yup.string().required(),
  userId: yup.string().required(),
  userLimitId: yup.string().required(),
});

const UserLimitCreatedPayloadSchema = commonSchema.shape({
  activeFrom: yup.number().required(),
  activeUntil: yup.number().optional(),
  createdAt: yup.number().optional(),
  nextResetTime: yup.number().optional(),
  period: yup.mixed<LimitPeriod>().oneOf(Object.values(LimitPeriod)).required(),
  status: yup.mixed<LimitStatus>().oneOf(Object.values(LimitStatus)).required(),
  type: yup.mixed<LimitType>().oneOf(Object.values(LimitType)).required(),
  value: yup.string().required(),
  previousLimitValue: yup.string().optional(),
  progress: yup.string().optional(),
});

export type UserLimitCreatedPayloadType = yup.InferType<
  typeof UserLimitCreatedPayloadSchema
>;

const UserLimitProgressChangedPayloadSchema = commonSchema.shape({
  amount: yup.string().required(),
  nextResetTime: yup.number().required(),
  previousProgress: yup.string().required(),
  remainingAmount: yup.string().optional(),
});

export type UserLimitProgressChangedPayloadType = yup.InferType<
  typeof UserLimitProgressChangedPayloadSchema
>;

const UserLimitResetPayloadSchema = commonSchema.shape({
  nextResetTime: yup.number().required(),
  period: yup.mixed<LimitPeriod>().oneOf(Object.values(LimitPeriod)).required(),
  resetAmount: yup.string().required(),
  resetPercentage: yup.string().required(),
  type: yup.mixed<LimitType>().oneOf(Object.values(LimitType)).required(),
  unusedAmount: yup.string().required(),
});

export type UserLimitResetPayloadType = yup.InferType<
  typeof UserLimitResetPayloadSchema
>;

export function validateSchema<T>(
  data: T,
  type: UserLimitEventType
): data is T {
  try {
    let schema: yup.ObjectSchema<any>;

    switch (type) {
      case UserLimitEventType.USER_LIMIT_CREATED:
        schema = UserLimitCreatedPayloadSchema;
        break;
      case UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED:
        schema = UserLimitProgressChangedPayloadSchema;
        break;
      case UserLimitEventType.USER_LIMIT_RESET:
        schema = UserLimitResetPayloadSchema;
        break;
      default:
        return false;
    }

    schema.validateSync(data);
    return true;
  } catch (error) {
    console.log("ERROR: Invalid payload.");
    return false;
  }
}

export type UserLimitPayloadType =
  | UserLimitCreatedPayloadType
  | UserLimitProgressChangedPayloadType
  | UserLimitResetPayloadType;
