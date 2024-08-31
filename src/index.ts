import UserLimitEventService from "./services/userLimitEventService";
import { UserLimitRepository } from "./repositories/userLimitRepository_InMemory";
import KinesisEventsReader from "./kinesisEventsReader";
import { kinesisPayload } from "./helpers/kinesisEventsMockDataSetup";

const eventsReader = new KinesisEventsReader(
  new UserLimitEventService(new UserLimitRepository())
);

// Starting reader for kinesis events using mocked event data
// We could use a real kinesis stream
eventsReader.readEvents(kinesisPayload);
