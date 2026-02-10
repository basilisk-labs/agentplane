import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const EXIT_CODE_BY_ERROR: Record<string, number> = {
  E_INTERNAL: 1,
  E_USAGE: 2,
  E_VALIDATION: 3,
  E_IO: 4,
  E_GIT: 5,
  E_BACKEND: 6,
  E_NETWORK: 7,
};

async function listTsFiles(root: string): Promise<string[]> {
  const out: string[] = [];
  const q: string[] = [root];
  while (q.length > 0) {
    const dir = q.pop();
    if (!dir) break;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) q.push(full);
      else if (entry.isFile() && full.endsWith(".ts")) out.push(full);
    }
  }
  return out;
}

function lineNumberAt(text: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) {
    if (text.codePointAt(i) === 10) line += 1;
  }
  return line;
}

describe("CliError exit code contract", () => {
  it("does not hardcode mismatching exitCode for a given ErrorCode", async () => {
    const repoRoot = path.resolve(import.meta.dirname, "../../../..");
    const roots = [
      path.join(repoRoot, "packages", "agentplane", "src"),
      path.join(repoRoot, "packages", "core", "src"),
    ];
    const fileLists = await Promise.all(roots.map((r) => listTsFiles(r)));
    const files = fileLists.flat();

    const violations: string[] = [];
    for (const filePath of files) {
      const text = await readFile(filePath, "utf8");
      let idx = 0;
      for (;;) {
        const found = text.indexOf("new CliError({", idx);
        if (found === -1) break;
        idx = found + 1;

        // Scope matching to the first close of this call site to avoid bleeding into
        // subsequent CliError literals.
        const end = text.indexOf("});", found);
        const window =
          end !== -1 && end - found < 4000
            ? text.slice(found, end + 3)
            : text.slice(found, found + 800);
        const exitMatch = /exitCode:\s*(\d+)/u.exec(window);
        const codeMatch = /code:\s*"(E_[A-Z_]+)"/u.exec(window);
        if (!exitMatch || !codeMatch) continue;

        const code = codeMatch[1] ?? "";
        const expected = EXIT_CODE_BY_ERROR[code];
        if (expected === undefined) continue;
        const actual = Number(exitMatch[1]);
        if (!Number.isFinite(actual) || actual === expected) continue;

        const line = lineNumberAt(text, found);
        violations.push(
          `${path.relative(repoRoot, filePath)}:${line}: code=${code} exitCode=${actual} expected=${expected}`,
        );
      }
    }

    expect(violations, violations.join("\n")).toEqual([]);
  }, 20_000);
});
