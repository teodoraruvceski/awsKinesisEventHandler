import { UserLimit } from "../../types/user-limit";

export default interface IUserLimitRepository {
  addUserLimit(userLimit: UserLimit): Promise<void>;
  updateProgressUserLimit(userLimitId: string, progress: string): Promise<void>;
  resetUserLimit(userLimitId: string): Promise<void>;
}
