import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

import { runCli } from "./run-cli.js";
import { captureStdIO, mkGitRepoRoot, silenceStdIO, writeDefaultConfig } from "@agentplane/testkit";

function runBunx(args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("bunx", args, {
      cwd,
      stdio: "ignore",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`bunx ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("runCli docs cli", () => {
  it("writes an MDX file derived from the spec-backed help JSON shape", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const outRel = "cli-reference.generated.mdx";
      const outAbs = path.join(root, outRel);
      const code = await runCli(["docs", "cli", "--out", outAbs, "--root", root]);
      expect(code).toBe(0);

      const outPath = io.stdout.trim();
      expect(outPath).toBe(outAbs);

      const text = await readFile(outPath, "utf8");
      expect(text).toContain("# CLI Reference (Generated)");
      expect(text).toContain("## Task");
      expect(text).toContain("### task new");
      expect(text).toContain("### task run");
      expect(text).toContain("### cleanup merged");
      expect(text).not.toContain("### cleanup\n");
      expect(text).not.toContain("### task\n");
      expect(text).not.toContain("### task doc\n");
      expect(text).not.toContain("### task verify\n");
      expect(text).not.toContain("## Framework Dev");
      expect(text).not.toContain("## Maintenance");
      expect(text).not.toContain("### task export");
      expect(text).toContain(
        "Allow the optional tasks export snapshot plus artifacts under the active task subtree; standalone path scope.",
      );
      expect(text).toContain(
        "Allow base branch edits; branch override only, not a path allowlist.",
      );
      expect(text).toContain("Notes:");
      expect(text).toContain(
        "Protected path-scoped overrides can stand alone without a duplicate explicit prefix",
      );
      expect(text).not.toContain("Allow task workflow artifacts (tasks/ and .agentplane/tasks/).");

      await runBunx(["prettier", "--write", outPath], root);
      const formatted = await readFile(outPath, "utf8");
      expect(formatted).toBe(text);
    } finally {
      io.restore();
    }
  });
});
