import { execFile } from "node:child_process";
import { chmod, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
const hookScriptPath = path.join(workspaceRoot, "scripts", "run-pre-commit-hook.mjs");

async function setupTempGitRepo(opts: { stageSource?: boolean } = {}) {
  const stageSource = opts.stageSource ?? true;
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pre-commit-hook-"));
  tempRoots.push(root);

  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# demo\n", "utf8");
  if (stageSource) {
    await writeFile(path.join(root, "src", "app.ts"), "export const app = true;\n", "utf8");
    await execFileAsync("git", ["add", "README.md", "src/app.ts"], { cwd: root });
  } else {
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
  }

  return root;
}

async function writeExecutable(root: string, name: string, body: string) {
  const binDir = path.join(root, "node_modules", ".bin");
  await mkdir(binDir, { recursive: true });
  const filePath = path.join(binDir, name);
  await writeFile(filePath, body, "utf8");
  await chmod(filePath, 0o755);
  return filePath;
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

  it("fails fast for policy mirror edits before running expensive checks", async () => {
    const root = await setupTempGitRepo({ stageSource: false });
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "workflow.branch_pr.md"),
      "# stale mirror change\n",
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/policy/workflow.branch_pr.md"], { cwd: root });

    try {
      await execFileAsync(process.execPath, [hookScriptPath], {
        cwd: root,
        encoding: "utf8",
      });
      throw new Error("expected hook script to fail");
    } catch (error) {
      const err = error as { stdout?: string; stderr?: string };
      expect(err.stderr ?? "").toContain(
        "policy mirror edits must be made through canonical assets first.",
      );
      expect(err.stderr ?? "").toContain("packages/agentplane/assets/policy/");
      expect(err.stderr ?? "").toContain(".agentplane/policy/workflow.branch_pr.md");
      expect(err.stderr ?? "").toContain("bun run agents:sync");
      expect(err.stderr ?? "").not.toContain("pre-commit hook dependencies are missing");
      expect(err.stdout ?? "").toBe("");
    }
  });

  it("stops before test-fast when prettier fails", async () => {
    const root = await setupTempGitRepo();
    await writeExecutable(root, "prettier", "#!/bin/sh\necho PRETTIER_FAIL >&2\nexit 1\n");
    await writeExecutable(root, "eslint", "#!/bin/sh\necho ESLINT_SHOULD_NOT_RUN >&2\nexit 0\n");

    try {
      await execFileAsync(process.execPath, [hookScriptPath], {
        cwd: root,
        encoding: "utf8",
      });
      throw new Error("expected hook script to fail");
    } catch (error) {
      const err = error as { stdout?: string; stderr?: string };
      expect(err.stderr ?? "").toContain("PRETTIER_FAIL");
      expect(err.stderr ?? "").not.toContain("ESLINT_SHOULD_NOT_RUN");
      expect(err.stdout ?? "").not.toContain("test-fast");
    }
  });

  it("runs test-fast only after checks pass", async () => {
    const root = await setupTempGitRepo({ stageSource: false });
    await writeExecutable(root, "prettier", "#!/bin/sh\nexit 0\n");

    const result = await execFileAsync(process.execPath, [hookScriptPath], {
      cwd: root,
      encoding: "utf8",
    });
    expect(result.stdout).toContain("pre-commit: no staged files for ESLint, skipping.");
    expect(result.stdout).toContain(
      "pre-commit: skipping broad test-fast for artifact/docs-only staged scope",
    );
    expect(result.stderr).toBe("");
  });
});
