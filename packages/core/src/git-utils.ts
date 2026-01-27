import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { resolveProject } from "./project-root.js";

const execFileAsync = promisify(execFile);

async function gitLines(cwd: string, args: string[]): Promise<string[]> {
  const { stdout } = await execFileAsync("git", args, { cwd });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function getStagedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitLines(resolved.gitRoot, ["diff", "--name-only", "--cached"]);
}

export async function getUnstagedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const lines = await gitLines(resolved.gitRoot, ["status", "--porcelain"]);
  const files: string[] = [];
  for (const line of lines) {
    const status = line.slice(0, 2);
    const filePart = line.slice(3).trim();
    if (!filePart) continue;
    const name = filePart.includes("->") ? filePart.split("->").at(-1)?.trim() : filePart;
    if ((status === "??" || status[1] !== " ") && name) {
      files.push(name);
    }
  }
  return files;
}
