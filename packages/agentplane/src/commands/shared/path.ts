import { realpath } from "node:fs/promises";
import path from "node:path";

export async function resolvePathFallback(filePath: string): Promise<string> {
  try {
    return await realpath(filePath);
  } catch {
    return path.resolve(filePath);
  }
}

export function isPathWithin(parent: string, candidate: string): boolean {
  const rel = path.relative(parent, candidate);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}
