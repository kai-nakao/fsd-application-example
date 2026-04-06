export type EmailSender = {
  send(to: string, subject: string, body: string): Promise<void>;
};
