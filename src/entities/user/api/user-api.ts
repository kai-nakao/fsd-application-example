import { db } from "@shared/api/db";
import type { User } from "../model";

export async function getUsers(): Promise<User[]> {
  return db.users;
}

export async function getUserById(id: string): Promise<User | undefined> {
  return db.users.find((user) => user.id === id);
}
