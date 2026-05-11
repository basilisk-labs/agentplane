import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

const repoRoot = process.cwd();

const allowedIndexLockFiles = new Map<string, string>([
  [
    "docs/internal/git-mutation-model.mdx",
    "documents that AgentPlane must not own Git index locks",
  ],
  [
    "packages/agentplane/src/commands/guard/impl/allow.test.ts",
    "creates a fake Git index lock to verify E_GIT_LOCKED",
  ],
  [
    "packages/agentplane/src/commands/guard/impl/commit.ts",
    "checks for pre-commit git index lock state before commit",
  ],
  [
    "packages/agentplane/src/commands/pr/integrate/internal/merge.ts",
    "checks for pre-integration git index lock state",
  ],
  [
    "packages/agentplane/src/shared/git-index-lock-guard.test.ts",
    "enforces the Git index lock ownership guard",
  ],
  ["packages/agentplane/src/shared/git-mutation.ts", "reads Git index lock state for diagnostics"],
]);

const requiredIndexLockFiles = [
  "docs/internal/git-mutation-model.mdx",
  "packages/agentplane/src/commands/guard/impl/allow.test.ts",
  "packages/agentplane/src/shared/git-mutation.ts",
];

const writeIntentPattern =
  /\b(?:appendFile|cp|mkdir|mv|open|rm|touch|unlink|writeFile)\b.*index\.lock|index\.lock.*\b(?:appendFile|cp|mkdir|mv|open|rm|touch|unlink|writeFile)\b/u;

async function trackedFiles(): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["ls-files", ".github", "docs/internal/git-mutation-model.mdx", "packages", "scripts"],
    {
      cwd: repoRoot,
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  return stdout.split("\n").filter(Boolean);
}

describe("Git index lock ownership guard", () => {
  it("keeps .git index.lock out of AgentPlane-owned lock paths", async () => {
    const filesWithIndexLock: string[] = [];
    const unexpectedFiles: string[] = [];
    const writeIntentLines: string[] = [];

    for (const file of await trackedFiles()) {
      const absolutePath = path.join(repoRoot, file);
      const contents = await readFile(absolutePath, "utf8");

      if (!contents.includes("index.lock")) {
        continue;
      }

      filesWithIndexLock.push(file);

      if (!allowedIndexLockFiles.has(file)) {
        unexpectedFiles.push(file);
      }

      if (file === "packages/agentplane/src/commands/guard/impl/allow.test.ts") {
        continue;
      }

      const lines = contents.split("\n");
      for (const [index, line] of lines.entries()) {
        if (writeIntentPattern.test(line)) {
          writeIntentLines.push(`${file}:${index + 1}: ${line.trim()}`);
        }
      }
    }

    expect(unexpectedFiles).toEqual([]);
    expect(writeIntentLines).toEqual([]);
    expect(filesWithIndexLock).toEqual(expect.arrayContaining(requiredIndexLockFiles));
  });
});
