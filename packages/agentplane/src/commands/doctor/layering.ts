import fs from "node:fs/promises";
import path from "node:path";

type FileEntry = { absPath: string; relPath: string };

const BANNED_USECASE_IMPORTS = [
  "node:fs",
  "fs",
  "node:path",
  "path",
  "node:os",
  "os",
  "node:child_process",
  "child_process",
  "node:http",
  "http",
  "node:https",
  "https",
  "node:http2",
  "http2",
  "node:net",
  "net",
  "node:tls",
  "tls",
  "node:dgram",
  "dgram",
  "node:dns",
  "dns",
  "undici",
  "node-fetch",
  "got",
  "axios",
  "simple-git",
  "isomorphic-git",
  "@agentplaneorg/core/git",
] as const;

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
  const imports = new Set<string>();
  const patterns = [
    /^\s*(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']\s*;?/gm,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const dependency = match[1];
      if (dependency) imports.add(dependency);
    }
  }
  return [...imports];
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
  if (await isDirectory(cliRoot)) {
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
  } else {
    problems.push("Dev source checks requested but packages/agentplane/src/cli was not found.");
  }

  const roots = [path.join(agentplaneSrcRoot, "usecases"), path.join(agentplaneSrcRoot, "ports")];
  for (const root of roots) {
    // The clean usecase layer is introduced incrementally. Its absence must not make
    // doctor crash, while any future file placed there is checked immediately.
    if (!(await isDirectory(root))) continue;
    const files = await listTsFiles(root);
    for (const f of files) {
      const src = await fs.readFile(f.absPath, "utf8");
      const imports = extractImports(src);
      const hits = imports.filter((s) =>
        BANNED_USECASE_IMPORTS.some((b) => s === b || s.startsWith(`${b}/`)),
      );
      if (hits.length > 0) {
        problems.push(`${f.relPath} imports banned modules: ${hits.join(", ")}`);
      }
    }
  }

  return problems;
}
