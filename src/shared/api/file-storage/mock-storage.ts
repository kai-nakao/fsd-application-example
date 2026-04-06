import type { FileStorage } from "./types";

const store = new Map<string, string>();

export const mockFileStorage: FileStorage = {
  async upload(key, data) {
    const url = `/mock-storage/${key}`;
    store.set(key, typeof data === "string" ? data : data.toString("base64"));
    console.log(`[Mockストレージ] Upload: ${key}`);
    return url;
  },

  async getUrl(key) {
    if (!store.has(key)) return null;
    return `/mock-storage/${key}`;
  },

  async remove(key) {
    store.delete(key);
    console.log(`[Mockストレージ] Remove: ${key}`);
  },
};
