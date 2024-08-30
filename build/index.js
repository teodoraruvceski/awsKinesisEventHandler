"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockedEvents = __importStar(require("./events.json"));
const uuid_1 = require("uuid");
const userLimitEventService_1 = __importDefault(require("./services/userLimitEventService"));
const userLimitRepository_InMemory_1 = require("./repositories/userLimitRepository_InMemory");
const kinesisEventsReader_1 = __importDefault(require("./kinesisEventsReader"));
const transformToKinesisRecord = (event) => {
    var _a;
    return {
        eventID: (0, uuid_1.v4)(),
        eventName: "aws:kinesis:record",
        eventVersion: "1.0",
        eventSource: "aws:kinesis",
        awsRegion: "us-east-1",
        eventSourceARN: "arn:aws:kinesis:us-east-1:123456789012:stream/example-stream",
        invokeIdentityArn: "arn:aws:iam::123456789012:role/example-role",
        kinesis: {
            approximateArrivalTimestamp: 123,
            partitionKey: event.aggregateId,
            data: Buffer.from(JSON.stringify(event)).toString("base64"),
            kinesisSchemaVersion: "1.0",
            sequenceNumber: (_a = event.sequenceNumber) === null || _a === void 0 ? void 0 : _a.toString(),
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
const eventsReader = new kinesisEventsReader_1.default(new userLimitEventService_1.default(new userLimitRepository_InMemory_1.UserLimitRepository()));
// Starting reader for kinesis events using mocked event data
// We could use a real kinesis stream
eventsReader.readEvents(kinesisPayload);
