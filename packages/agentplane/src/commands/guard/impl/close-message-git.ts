import { readFile } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { NumstatEntry } from "./close-message-render.js";

function isMissingCommitObjectError(err: unknown): boolean {
  const stderr = (err as { stderr?: unknown }).stderr;
  const text =
    err instanceof Error
      ? [err.message, typeof stderr === "string" ? stderr : ""]
          .filter((part) => part.trim().length > 0)
          .join("\n")
      : String(err);
  return (
    /bad object/i.test(text) || /unknown revision/i.test(text) || /ambiguous argument/i.test(text)
  );
}

export async function gitNumstatForCommit(
  gitRoot: string,
  commit: string,
): Promise<NumstatEntry[]> {
  let stdout: string | Buffer;
  try {
    ({ stdout } = await execFileAsync("git", ["show", "--numstat", "--format=", commit], {
      cwd: gitRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: 10 * 1024 * 1024,
    }));
  } catch (err) {
    if (isMissingCommitObjectError(err)) return [];
    throw err;
  }
  const text = Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout);
  const entries: NumstatEntry[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("\t");
    if (parts.length < 3) continue;
    const [aRaw, dRaw, fileRaw] = parts;
    const file = String(fileRaw ?? "").trim();
    if (!file) continue;
    const added = aRaw === "-" ? 0 : Number(aRaw);
    const deleted = dRaw === "-" ? 0 : Number(dRaw);
    const churn = (Number.isFinite(added) ? added : 0) + (Number.isFinite(deleted) ? deleted : 0);
    entries.push({
      file,
      added: Number.isFinite(added) ? added : 0,
      deleted: Number.isFinite(deleted) ? deleted : 0,
      churn,
    });
  }
  return entries;
}

export function extractPrNumber(value: string | undefined): number | undefined {
  const match = /PR\s+#(\d+)/iu.exec(value ?? "");
  if (!match?.[1]) return undefined;
  const parsed = Number(match[1]);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

type MaybePrMeta = {
  pr_number?: unknown;
};

export async function readPrNumberFromMeta(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<number | undefined> {
  const metaPath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "pr", "meta.json");
  try {
    const parsed = JSON.parse(await readFile(metaPath, "utf8")) as MaybePrMeta;
    const value = parsed.pr_number;
    return typeof value === "number" && Number.isInteger(value) && value > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}
