import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

type Violation = {
  rule: string;
  file: string;
  line: number;
  excerpt: string;
};

async function listFilesRecursive(rootDir: string): Promise<string[]> {
  const out: string[] = [];
  const stack: string[] = [rootDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    if (!dir) continue;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      out.push(abs);
    }
  }
  return out;
}

function lineNumberAt(text: string, index: number): number {
  // 1-based line numbers for humans.
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) {
    if (text.codePointAt(i) === 10) line++;
  }
  return line;
}

function lineExcerptAt(text: string, index: number): string {
  const start = text.lastIndexOf("\n", index);
  const end = text.indexOf("\n", index);
  const lineStart = start === -1 ? 0 : start + 1;
  const lineEnd = end === -1 ? text.length : end;
  return text.slice(lineStart, lineEnd).trimEnd();
}

describe("cli: legacy CLI regression guards", () => {
  it("does not allow legacy parsing/usage patterns under commands/", async () => {
    const repoRoot = process.cwd();
    const commandsRoot = path.join(repoRoot, "packages/agentplane/src/commands");
    const files = await listFilesRecursive(commandsRoot);
    const tsFiles = files
      .filter((abs) => abs.endsWith(".ts"))
      .filter((abs) => !abs.endsWith(".d.ts"))
      .filter((abs) => !abs.endsWith(".test.ts"));

    const rules: { id: string; re: RegExp }[] = [
      { id: "parseFlags", re: /\bparse[A-Za-z0-9]*Flags\s*\(/g },
      { id: "usageConst", re: /\bexport const [A-Z0-9_]+_USAGE(_EXAMPLE)?\b/g },
      { id: "usageMessage", re: /\busageMessage\s*\(/g },
      { id: "processArgv", re: /\bprocess\.argv\b/g },
    ];

    const violations: Violation[] = [];
    for (const abs of tsFiles) {
      const text = await readFile(abs, "utf8");
      const rel = path.relative(repoRoot, abs);
      for (const rule of rules) {
        rule.re.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = rule.re.exec(text))) {
          const idx = match.index ?? 0;
          violations.push({
            rule: rule.id,
            file: rel,
            line: lineNumberAt(text, idx),
            excerpt: lineExcerptAt(text, idx),
          });
        }
      }
    }

    if (violations.length > 0) {
      const rendered = violations
        .slice(0, 20)
        .map((v) => `${v.file}:${v.line} [${v.rule}] ${v.excerpt}`)
        .join("\n");
      expect.fail(`Legacy CLI patterns detected under commands/ (showing up to 20):\n${rendered}`);
    }
  });
});
