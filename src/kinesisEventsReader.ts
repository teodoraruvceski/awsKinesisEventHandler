import {
  UserLimitEvent,
  UserLimitEventType,
} from "./types/eventTypes/userLimitEvent";
import UserLimitEventService from "./services/userLimitEventService";
import {
  KinesisStreamEvent,
  Context,
  KinesisStreamHandler,
  KinesisStreamRecordPayload,
  KinesisStreamRecord,
} from "aws-lambda";

type ExtendedKinesisStreamRecord = KinesisStreamRecord & {
  type: UserLimitEventType;
};

export default class KinesisEventsReader {
  private service: any;
  constructor(service: UserLimitEventService) {
    this.service = service;
  }

  public async readEvents(kinesisPayload: KinesisStreamEvent) {
    for (const record of kinesisPayload.Records as ExtendedKinesisStreamRecord[]) {
      const eventData = this.transformRecord(record.kinesis.data);

      try {
        await this.service.handle(
          eventData.payload,
          eventData.type as UserLimitEventType
        );
      } catch (error) {
        console.error(`Validation error for event ${eventData.type}:`, error);
      }
    }
  }

  private transformRecord(data: any) {
    const decodedData = Buffer.from(data, "base64").toString("utf-8");
    return JSON.parse(decodedData) as UserLimitEvent;
  }
}
