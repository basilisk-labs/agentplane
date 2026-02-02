import { access, lstat, rename } from "node:fs/promises";

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getPathKind(filePath: string): Promise<"file" | "dir" | null> {
  try {
    const stats = await lstat(filePath);
    return stats.isDirectory() ? "dir" : "file";
  } catch {
    return null;
  }
}

export async function backupPath(filePath: string): Promise<string> {
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "");
  let dest = `${filePath}.bak-${stamp}`;
  if (await fileExists(dest)) {
    dest = `${filePath}.bak-${stamp}-${Math.random().toString(36).slice(2, 8)}`;
  }
  await rename(filePath, dest);
  return dest;
}
