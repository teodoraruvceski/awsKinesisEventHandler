"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const yup = __importStar(require("yup"));
const user_limit_1 = require("./types/user-limit");
const userLimitEvent_1 = require("./types/eventTypes/userLimitEvent");
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
  period: yup.mixed().oneOf(Object.values(user_limit_1.LimitPeriod)).required(),
  status: yup.mixed().oneOf(Object.values(user_limit_1.LimitStatus)).required(),
  type: yup.mixed().oneOf(Object.values(user_limit_1.LimitType)).required(),
  value: yup.string().required(),
  previousLimitValue: yup.string().optional(),
  progress: yup.string().optional(),
});
const UserLimitProgressChangedPayloadSchema = commonSchema.shape({
  amount: yup.string().required(),
  nextResetTime: yup.number().required(),
  previousProgress: yup.string().required(),
  remainingAmount: yup.string().optional(),
});
const UserLimitResetPayloadSchema = commonSchema.shape({
  nextResetTime: yup.number().required(),
  period: yup.mixed().oneOf(Object.values(user_limit_1.LimitPeriod)).required(),
  resetAmount: yup.string().required(),
  resetPercentage: yup.string().required(),
  type: yup.mixed().oneOf(Object.values(user_limit_1.LimitType)).required(),
  unusedAmount: yup.string().required(),
});
function validateSchema(data, type) {
  try {
    let schema;
    switch (type) {
      case userLimitEvent_1.UserLimitEventType.USER_LIMIT_CREATED:
        schema = UserLimitCreatedPayloadSchema;
        break;
      case userLimitEvent_1.UserLimitEventType.USER_LIMIT_PROGRESS_CHANGED:
        schema = UserLimitProgressChangedPayloadSchema;
        break;
      case userLimitEvent_1.UserLimitEventType.USER_LIMIT_RESET:
        schema = UserLimitResetPayloadSchema;
        break;
      default:
        console.log("ERROR: Invalid payload.");
        return false;
    }
    schema.validateSync(data);
    return true;
  } catch (error) {
    console.log("ERROR: Invalid payload.");
    return false;
  }
}
exports.validateSchema = validateSchema;
