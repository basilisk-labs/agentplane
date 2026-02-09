import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, it } from "vitest";

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
  // Good enough for guardrails: we only care about obvious static imports.
  const re = /^\s*import\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']\s*;?/gm;
  for (const match of source.matchAll(re)) {
    imports.push(match[1] ?? "");
  }
  return imports.filter(Boolean);
}

function assertNoImports(relPath: string, imports: string[], banned: string[]) {
  const hits = imports.filter((s) => banned.some((b) => s === b || s.startsWith(`${b}/`)));
  if (hits.length === 0) return;
  throw new Error(`${relPath} imports banned modules: ${hits.join(", ")}`);
}

describe("architecture layering guardrails", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(here, "..", "..", "..", "..");
  const agentplaneSrcRoot = path.join(repoRoot, "packages", "agentplane", "src");

  it("cli/ must not import adapters/ directly", async () => {
    const cliRoot = path.join(agentplaneSrcRoot, "cli");
    const files = await listTsFiles(cliRoot);
    for (const f of files) {
      const src = await fs.readFile(f.absPath, "utf8");
      const imports = extractImports(src);
      // Enforce direct imports only; indirect deps are allowed for now.
      const hits = imports.filter(
        (s) =>
          s.includes("/adapters/") ||
          s.includes("../adapters") ||
          s.includes("../../adapters") ||
          s.includes("../../../adapters"),
      );
      if (hits.length > 0) {
        throw new Error(`${f.relPath} imports adapters directly: ${hits.join(", ")}`);
      }
    }
  });

  it("usecases/ and ports/ must not import node I/O or git libraries directly", async () => {
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
        assertNoImports(f.relPath, imports, banned);
      }
    }
  });
});
