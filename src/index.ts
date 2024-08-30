import * as mockedEvents from "./events.json";
import { v4 as uuidv4 } from "uuid";
import UserLimitEventService from "./services/userLimitEventService";
import { UserLimitRepository } from "./repositories/userLimitRepository_InMemory";
import KinesisEventsReader from "./kinesisEventsReader";

const transformToKinesisRecord = (event: any) => {
  return {
    eventID: uuidv4(),
    eventName: "aws:kinesis:record",
    eventVersion: "1.0",
    eventSource: "aws:kinesis",
    awsRegion: "us-east-1",
    eventSourceARN:
      "arn:aws:kinesis:us-east-1:123456789012:stream/example-stream",
    invokeIdentityArn: "arn:aws:iam::123456789012:role/example-role",
    kinesis: {
      approximateArrivalTimestamp: 123,
      partitionKey: event.aggregateId,
      data: Buffer.from(JSON.stringify(event)).toString("base64"),
      kinesisSchemaVersion: "1.0",
      sequenceNumber: event.sequenceNumber?.toString(),
    },
  };
};
const events = Array.isArray(mockedEvents)
  ? mockedEvents
  : Object.values(mockedEvents);

const kinesisRecords = events.map(transformToKinesisRecord);

const kinesisPayload = {
  Records: kinesisRecords,
};

const eventsReader = new KinesisEventsReader(
  new UserLimitEventService(new UserLimitRepository())
);

// Starting reader for kinesis events using mocked event data
// We could use a real kinesis stream
eventsReader.readEvents(kinesisPayload);
