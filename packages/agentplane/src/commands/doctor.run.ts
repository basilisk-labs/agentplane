import fs from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";

import type { CommandHandler } from "../cli/spec/spec.js";
import { warnMessage, successMessage } from "../cli/output.js";
import { RUNTIME_GITIGNORE_LINES } from "../shared/runtime-artifacts.js";
import { execFileAsync, gitEnv } from "./shared/git.js";
import { loadCommandContext } from "./shared/task-backend.js";
import type { DoctorParsed } from "./doctor.spec.js";

type FileEntry = { absPath: string; relPath: string };

async function listTsFiles(rootDir: string): Promise<FileEntry[]> {
  const out: FileEntry[] = [];
  async function walk(absDir: string) {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.name.startsWith(".")) continue;
      if (ent.name === "__snapshots__") continue;
      if (ent.name === "node_modules") continue;
      const abs = path.join(absDir, ent.name);
      if (ent.isDirectory()) {
        await walk(abs);
        continue;
      }
      if (ent.isFile() && ent.name.endsWith(".ts")) {
        out.push({ absPath: abs, relPath: path.relative(rootDir, abs) });
      }
    }
  }
  await walk(rootDir);
  return out;
}

function extractImports(source: string): string[] {
  const imports: string[] = [];
  const re = /^\s*import\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']\s*;?/gm;
  for (const match of source.matchAll(re)) {
    imports.push(match[1] ?? "");
  }
  return imports.filter(Boolean);
}

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(absPath: string): Promise<boolean> {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

async function checkWorkspace(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const requiredFiles = [
    path.join(repoRoot, "AGENTS.md"),
    path.join(repoRoot, ".agentplane", "config.json"),
  ];
  for (const filePath of requiredFiles) {
    if (!(await pathExists(filePath))) {
      problems.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
    }
  }

  const agentsDir = path.join(repoRoot, ".agentplane", "agents");
  if (!(await isDirectory(agentsDir))) {
    problems.push("Missing required directory: .agentplane/agents");
    return problems;
  }

  const entries = await fs.readdir(agentsDir);
  const hasJson = entries.some((name) => name.endsWith(".json"));
  if (!hasJson) {
    problems.push("No agent profiles found in .agentplane/agents (*.json expected).");
  }
  return problems;
}

async function checkLayering(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const agentplaneSrcRoot = path.join(repoRoot, "packages", "agentplane", "src");
  if (!(await isDirectory(agentplaneSrcRoot))) {
    problems.push(
      "Dev source checks requested but packages/agentplane/src was not found in this workspace.",
    );
    return problems;
  }

  const cliRoot = path.join(agentplaneSrcRoot, "cli");
  const cliFiles = await listTsFiles(cliRoot);
  for (const f of cliFiles) {
    const src = await fs.readFile(f.absPath, "utf8");
    const imports = extractImports(src);
    const hits = imports.filter(
      (s) =>
        s.includes("/adapters/") ||
        s.includes("../adapters") ||
        s.includes("../../adapters") ||
        s.includes("../../../adapters"),
    );
    if (hits.length > 0) {
      problems.push(`${f.relPath} imports adapters directly: ${hits.join(", ")}`);
    }
  }

  const roots = [path.join(agentplaneSrcRoot, "usecases"), path.join(agentplaneSrcRoot, "ports")];
  const banned = [
    "node:fs",
    "node:fs/promises",
    "fs",
    "fs/promises",
    "node:path",
    "path",
    "simple-git",
    "isomorphic-git",
  ];
  for (const root of roots) {
    const files = await listTsFiles(root);
    for (const f of files) {
      const src = await fs.readFile(f.absPath, "utf8");
      const imports = extractImports(src);
      const hits = imports.filter((s) => banned.some((b) => s === b || s.startsWith(`${b}/`)));
      if (hits.length > 0) {
        problems.push(`${f.relPath} imports banned modules: ${hits.join(", ")}`);
      }
    }
  }

  return problems;
}

async function safeFixGitignore(repoRoot: string): Promise<{ changed: boolean; note: string }> {
  const gitignorePath = path.join(repoRoot, ".gitignore");
  let existing = "";
  try {
    existing = await fs.readFile(gitignorePath, "utf8");
  } catch {
    // If .gitignore doesn't exist, do not create it implicitly (keep doctor safe).
    return { changed: false, note: "Skip: .gitignore not found." };
  }

  const lines = existing.split(/\r?\n/);
  const existingSet = new Set(lines.map((line) => line.trimEnd()));
  const missing = RUNTIME_GITIGNORE_LINES.filter((line) => !existingSet.has(line));
  if (missing.length === 0) {
    return { changed: false, note: "OK: .gitignore already contains agentplane runtime ignores." };
  }

  const nextLines = [...lines];
  if (nextLines.length > 0 && nextLines.at(-1) !== "") nextLines.push("");
  nextLines.push(...missing, "");
  const next = `${nextLines.join("\n")}`.replaceAll(/\n{2,}$/g, "\n");
  await fs.writeFile(gitignorePath, next, "utf8");
  return {
    changed: true,
    note: `Fixed: added agentplane runtime ignores to .gitignore (${missing.length} lines).`,
  };
}

async function safeFixTaskIndex(repoRoot: string): Promise<{ changed: boolean; note: string }> {
  try {
    // Best-effort: rebuilding the index is a side-effect of listing tasks for the local backend.
    const ctx = await loadCommandContext({ cwd: repoRoot, rootOverride: null });
    await ctx.taskBackend.listTasks();
    return { changed: true, note: "OK: rebuilt tasks index cache (best-effort)." };
  } catch {
    return { changed: false, note: "Skip: could not rebuild tasks index cache." };
  }
}

type TaskSnapshotRecord = {
  id?: unknown;
  status?: unknown;
  commit?: { hash?: unknown } | null;
};

async function checkDoneTaskCommitInvariants(repoRoot: string): Promise<string[]> {
  const tasksPath = path.join(repoRoot, ".agentplane", "tasks.json");
  let raw = "";
  try {
    raw = await fs.readFile(tasksPath, "utf8");
  } catch {
    return [];
  }

  let parsed: { tasks?: unknown };
  try {
    parsed = JSON.parse(raw) as { tasks?: unknown };
  } catch {
    return [`Invalid JSON snapshot: ${path.relative(repoRoot, tasksPath)}`];
  }
  const all = Array.isArray(parsed.tasks) ? (parsed.tasks as TaskSnapshotRecord[]) : [];
  const done = all.filter((t) => {
    const status = typeof t.status === "string" ? t.status : "";
    return status.toUpperCase() === "DONE";
  });
  if (done.length === 0) return [];

  const problems: string[] = [];
  const hashes = new Set<string>();
  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) {
      problems.push(
        `DONE task is missing implementation commit hash: ${id} (finish with --commit <hash>).`,
      );
      continue;
    }
    hashes.add(hash);
  }
  if (hashes.size === 0) return problems;

  const subjectByHash = new Map<string, string>();
  for (const hash of hashes) {
    try {
      const { stdout } = await execFileAsync("git", ["show", "-s", "--format=%s", hash], {
        cwd: repoRoot,
        env: gitEnv(),
      });
      subjectByHash.set(hash, String(stdout ?? "").trim());
    } catch {
      subjectByHash.set(hash, "");
    }
  }

  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) continue;
    const subject = subjectByHash.get(hash) ?? "";
    if (!subject) {
      problems.push(`DONE task references unknown commit hash: ${id} -> ${hash}`);
      continue;
    }
    if (/\bclose:/iu.test(subject)) {
      problems.push(
        `DONE task implementation commit points to a close commit: ${id} -> ${hash} (${subject})`,
      );
    }
  }

  return problems;
}

export const runDoctor: CommandHandler<DoctorParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const repoRoot = resolved.gitRoot;

  const problems = await checkWorkspace(repoRoot);
  problems.push(...(await checkDoneTaskCommitInvariants(repoRoot)));
  if (p.dev) {
    problems.push(...(await checkLayering(repoRoot)));
  }
  if (problems.length > 0) {
    console.error(warnMessage(`doctor found ${problems.length} problem(s):`));
    for (const prob of problems) console.error(`- ${prob}`);
    return 1;
  }

  if (p.fix) {
    const fix = await safeFixGitignore(repoRoot);
    console.log(successMessage("doctor fix", undefined, fix.note));
    const idx = await safeFixTaskIndex(repoRoot);
    console.log(successMessage("doctor fix", undefined, idx.note));
  }

  console.log(successMessage("doctor", undefined, "OK"));
  return 0;
};
