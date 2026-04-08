export type { EventTracker, UserIdentifier, AnalyticsService, TrackEvent } from "./types";

// 差し替えポイント: 本番では posthogTracker 等に切り替え
import { mockEventTracker } from "./mock-tracker";
export const eventTracker = mockEventTracker;
