import { randomUUID } from "node:crypto";
import { mkdir, rename } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../../cli/fs-utils.js";

export async function archivePrArtifacts(taskDir: string): Promise<string | null> {
  const prDir = path.join(taskDir, "pr");
  if (!(await fileExists(prDir))) return null;
  const archiveRoot = path.join(taskDir, "pr-archive");
  await mkdir(archiveRoot, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "");
  let dest = path.join(archiveRoot, stamp);
  if (await fileExists(dest)) {
    dest = path.join(archiveRoot, `${stamp}-${randomUUID().slice(0, 8)}`);
  }
  await rename(prDir, dest);
  return dest;
}
