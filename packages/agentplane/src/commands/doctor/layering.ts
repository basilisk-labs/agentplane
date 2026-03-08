import fs from "node:fs/promises";
import path from "node:path";

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

async function isDirectory(absPath: string): Promise<boolean> {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

export async function checkLayering(repoRoot: string): Promise<string[]> {
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
