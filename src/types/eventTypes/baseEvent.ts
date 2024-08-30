export default interface BaseEvent {
  aggregateId: string;
  context: {
    correlationId: string;
  };
  createdAt: number;
  eventId: string;
  sequenceNumber: number;
  source: string;
  type: string;
}
