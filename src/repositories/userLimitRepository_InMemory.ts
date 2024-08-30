import IUserLimitRepository from "./interfaces/userLimitRepositoryInterface";
import { UserLimit } from "../types/user-limit";

export class UserLimitRepository implements IUserLimitRepository {
  private userLimits: UserLimit[] = [];

  async addUserLimit(userLimit: UserLimit): Promise<void> {
    this.userLimits.push(userLimit);
    console.log(
      "INFO: User limit created - user limit id:",
      userLimit.userLimitId
    );
  }

  async updateProgressUserLimit(
    userLimitId: string,
    progress: string
  ): Promise<void> {
    const userLimit = this.userLimits.find((x) => x.userLimitId == userLimitId);
    if (userLimit) {
      userLimit.progress = progress;
      console.log(
        `INFO: User limit progress update - user limit id: ${userLimitId}, progress: ${progress}`
      );
      return;
    }
    console.log(
      "ERROR: User limit progress update failed - user limit id not found:",
      userLimitId
    );
  }

  async resetUserLimit(userLimitId: string): Promise<void> {
    const userLimit = this.userLimits.find((x) => x.userLimitId == userLimitId);
    if (userLimit) {
      userLimit.progress = "0";
      console.log(
        `INFO: User limit progress reset - user limit id: ${userLimitId}`
      );
      return;
    }
    console.log(
      "ERROR: Userlimit progress reset failed - user limit id not found:",
      userLimitId
    );
  }
}
