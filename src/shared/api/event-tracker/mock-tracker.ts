import type { AnalyticsService } from "./types";

export const mockEventTracker: AnalyticsService = {
  track(event) {
    console.log(`[Mock分析] Event: ${event.name}`, event.properties ?? "");
  },

  identify(userId, traits) {
    console.log(`[Mock分析] Identify: ${userId}`, traits ?? "");
  },
};
