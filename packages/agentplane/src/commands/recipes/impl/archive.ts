import { readdir } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../../cli/fs-utils.js";
import { missingFileMessage } from "../../../cli/output.js";

export async function resolveRecipeRoot(extractedDir: string): Promise<string> {
  const rootManifest = path.join(extractedDir, "manifest.json");
  if (await fileExists(rootManifest)) return extractedDir;
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (dirs.length !== 1) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  const candidate = path.join(extractedDir, dirs[0]);
  if (!(await fileExists(path.join(candidate, "manifest.json")))) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  return candidate;
}
