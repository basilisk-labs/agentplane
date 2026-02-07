import { readFile } from "node:fs/promises";

import { atomicWriteFile, canonicalizeJson } from "@agentplaneorg/core";

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function writeTextIfChanged(filePath: string, content: string): Promise<boolean> {
  const existing = await readTextIfExists(filePath);
  if (existing !== null && existing === content) return false;
  await atomicWriteFile(filePath, content, "utf8");
  return true;
}

export async function writeJsonStableIfChanged(filePath: string, obj: unknown): Promise<boolean> {
  const stable = canonicalizeJson(obj);
  const text = `${JSON.stringify(stable, null, 2)}\n`;
  return await writeTextIfChanged(filePath, text);
}
