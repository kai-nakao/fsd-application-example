export type { FileStorage } from "./types";

// 差し替えポイント: 本番では s3Storage 等に切り替え
import { mockFileStorage } from "./mock-storage";
export const fileStorage = mockFileStorage;
