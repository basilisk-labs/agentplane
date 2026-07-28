import { readdir } from "node:fs/promises";
import path from "node:path";

export async function verificationRecordPaths(taskRoot: string): Promise<string[]> {
  try {
    const entries = await readdir(path.join(taskRoot, "verification"), { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(taskRoot, "verification", entry.name))
      .toSorted();
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
}
