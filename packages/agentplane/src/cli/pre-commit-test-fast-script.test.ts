import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
const scriptPath = path.join(workspaceRoot, "scripts", "run-pre-commit-test-fast.mjs");

async function setupTempGitRepo() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pre-commit-test-fast-"));
  tempRoots.push(root);

  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Agentplane Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "agentplane-test@example.com"], {
    cwd: root,
  });

  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# demo\n", "utf8");
  await writeFile(path.join(root, "src", "app.ts"), "export const app = true;\n", "utf8");
  await execFileAsync("git", ["add", "README.md", "src/app.ts"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "init"], { cwd: root });

  return root;
}

async function installFakeBun(root: string) {
  const binDir = path.join(root, "fake-bin");
  const logPath = path.join(root, "fake-bun.log");
  await mkdir(binDir, { recursive: true });
  const bunPath = path.join(binDir, "bun");
  await writeFile(bunPath, '#!/bin/sh\nprintf \'%s\\n\' "$*" >> "$FAKE_BUN_LOG"\nexit 0\n', {
    mode: 0o755,
  });
  return { binDir, logPath };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("run-pre-commit-test-fast.mjs", () => {
  it("skips broad test-fast for task-artifact-only staged changes", async () => {
    const root = await setupTempGitRepo();
    const { binDir, logPath } = await installFakeBun(root);

    await mkdir(path.join(root, ".agentplane", "tasks", "202604070443-T8F4ZZ"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "tasks", "202604070443-T8F4ZZ", "README.md"),
      "# task\n",
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/tasks/202604070443-T8F4ZZ/README.md"], {
      cwd: root,
    });

    const result = await execFileAsync(process.execPath, [scriptPath], {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
        FAKE_BUN_LOG: logPath,
      },
    });

    expect(result.stdout).toContain("skipping broad test-fast for artifact/docs-only staged scope");
    await expect(readFile(logPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("runs test:precommit for code-bearing staged changes", async () => {
    const root = await setupTempGitRepo();
    const { binDir, logPath } = await installFakeBun(root);

    await writeFile(path.join(root, "src", "app.ts"), "export const app = false;\n", "utf8");
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const result = await execFileAsync(process.execPath, [scriptPath], {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ""}`,
        FAKE_BUN_LOG: logPath,
      },
    });

    expect(result.stdout).toBe("");
    const log = await readFile(logPath, "utf8");
    expect(log).toContain("run test:precommit");
  });
});
