export type FileStorage = {
  upload(key: string, data: Buffer | string): Promise<string>;
  getUrl(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
};
