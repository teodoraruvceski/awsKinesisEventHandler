"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class KinesisEventsReader {
    constructor(service) {
        this.service = service;
    }
    readEvents(kinesisPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const record of kinesisPayload.Records) {
                const eventData = this.transformRecord(record.kinesis.data);
                try {
                    yield this.service.handle(eventData.payload, eventData.type);
                }
                catch (error) {
                    console.error(`Validation error for event ${eventData.type}:`, error);
                }
            }
        });
    }
    transformRecord(data) {
        const decodedData = Buffer.from(data, "base64").toString("utf-8");
        return JSON.parse(decodedData);
    }
}
exports.default = KinesisEventsReader;
