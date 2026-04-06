export type TrackEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export type EventTracker = {
  track(event: TrackEvent): void;
  identify(userId: string, traits?: Record<string, string>): void;
};
