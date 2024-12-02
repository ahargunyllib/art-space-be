import { v7, validate } from "uuid";

export function generateUUID() {
  return v7();
}

export function isValidUUID(uuid: string): boolean {
  return validate(uuid);
}
