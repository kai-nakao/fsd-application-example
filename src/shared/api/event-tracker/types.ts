export type TrackEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export type EventTracker = {
  track(event: TrackEvent): void;
};

export type UserIdentifier = {
  identify(userId: string, traits?: Record<string, string>): void;
};

export type AnalyticsService = EventTracker & UserIdentifier;
