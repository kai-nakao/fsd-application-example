import type { EmailSender } from "./types";

export const mockEmailSender: EmailSender = {
  async send(to, subject, body) {
    console.log(`[Mockメール] To: ${to}, Subject: ${subject}, Body: ${body}`);
  },
};
