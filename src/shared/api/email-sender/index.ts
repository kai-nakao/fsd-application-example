export type { EmailSender } from "./types";

// 差し替えポイント: 本番では resendSender 等に切り替え
import { mockEmailSender } from "./mock-sender";
export const emailSender = mockEmailSender;
