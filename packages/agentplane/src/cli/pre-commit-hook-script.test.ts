import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
const hookScriptPath = path.join(workspaceRoot, "scripts", "run-pre-commit-hook.mjs");

async function setupTempGitRepo() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pre-commit-hook-"));
  tempRoots.push(root);

  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# demo\n", "utf8");
  await writeFile(path.join(root, "src", "app.ts"), "export const app = true;\n", "utf8");
  await execFileAsync("git", ["add", "README.md", "src/app.ts"], { cwd: root });

  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("run-pre-commit-hook.mjs", () => {
  it("prints bootstrap guidance when local hook tools are missing", async () => {
    const root = await setupTempGitRepo();

    try {
      await execFileAsync(process.execPath, [hookScriptPath], {
        cwd: root,
        encoding: "utf8",
      });
      throw new Error("expected hook script to fail");
    } catch (error) {
      const err = error as { stdout?: string; stderr?: string };
      expect(err.stderr ?? "").toContain(
        "pre-commit hook dependencies are missing for this checkout.",
      );
      expect(err.stderr ?? "").toContain("Missing local tools:");
      expect(err.stderr ?? "").toContain("prettier:");
      expect(err.stderr ?? "").toContain("eslint:");
      expect(err.stderr ?? "").toContain("bun run framework:dev:bootstrap");
      expect(err.stderr ?? "").toContain(
        "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command>",
      );
      expect(err.stdout ?? "").toBe("");
    }
  });
});
