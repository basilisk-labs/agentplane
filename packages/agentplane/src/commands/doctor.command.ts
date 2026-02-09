import fs from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";

import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { warnMessage, successMessage } from "../cli/output.js";
import { loadCommandContext } from "./shared/task-backend.js";

type DoctorParsed = {
  fix: boolean;
};

export const doctorSpec: CommandSpec<DoctorParsed> = {
  id: ["doctor"],
  group: "Quality",
  summary:
    "Check structural invariants of an agentplane workspace (and optionally apply safe fixes).",
  options: [{ kind: "boolean", name: "fix", default: false, description: "Apply safe fixes." }],
  examples: [
    { cmd: "agentplane doctor", why: "Check layering and workspace invariants." },
    { cmd: "agentplane doctor --fix", why: "Apply safe-only fixes (idempotent)." },
  ],
  parse: (raw) => ({ fix: raw.opts.fix === true }),
};

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

async function checkLayering(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const agentplaneSrcRoot = path.join(repoRoot, "packages", "agentplane", "src");

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
  const entry = ".agentplane/.upgrade/";
  if (lines.some((l) => l.trim() === entry)) {
    return { changed: false, note: "OK: .gitignore already ignores .agentplane/.upgrade/." };
  }

  const next = `${existing.trimEnd()}\n${entry}\n`;
  await fs.writeFile(gitignorePath, next, "utf8");
  return { changed: true, note: "Fixed: added .agentplane/.upgrade/ to .gitignore." };
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

export const runDoctor: CommandHandler<DoctorParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const repoRoot = resolved.gitRoot;

  const problems = await checkLayering(repoRoot);
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
