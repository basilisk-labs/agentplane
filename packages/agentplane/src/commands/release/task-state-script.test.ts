import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

async function writePackageVersion(root: string): Promise<void> {
  const packageDir = path.join(root, "packages", "agentplane");
  await mkdir(packageDir, { recursive: true });
  await writeFile(path.join(packageDir, "package.json"), '{"version":"0.6.7"}\n', "utf8");
}

describe("check-task-state script", () => {
  it("fails when a task directory is missing its README artifact", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-task-state-"));
    await writePackageVersion(root);
    await mkdir(path.join(root, ".agentplane", "tasks", "202605230000-HIDDEN"), {
      recursive: true,
    });

    try {
      await execFileAsync(
        "node",
        [path.join(process.cwd(), "scripts", "release", "check-task-registry-ready.mjs")],
        {
          cwd: root,
        },
      );
      throw new Error("expected check-task-registry-ready to fail");
    } catch (err) {
      const stderr =
        typeof (err as { stderr?: unknown }).stderr === "string"
          ? (err as { stderr: string }).stderr
          : "";
      expect(stderr).toContain(
        ".agentplane/tasks/202605230000-HIDDEN/README.md: missing task README artifact",
      );
    }
  });
});
