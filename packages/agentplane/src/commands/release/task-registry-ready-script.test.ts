import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/check-task-registry-ready.mjs");
const temps: string[] = [];

async function makeRepo(tasks: { id: string; status: string; title?: string }[]) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-task-registry-ready-"));
  temps.push(root);
  for (const task of tasks) {
    const dir = path.join(root, ".agentplane", "tasks", task.id);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, "README.md"),
      [
        "---",
        `id: ${task.id}`,
        `title: ${task.title ?? "Test task"}`,
        `status: ${task.status}`,
        "depends_on: []",
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
  }
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    `${JSON.stringify({ name: "agentplane", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  return root;
}

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (dir) await rm(dir, { recursive: true, force: true });
  }
});

describe("check-task-registry-ready script", () => {
  it("passes when no local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails with remediation when a local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DOING" }]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
    expect(result.stderr).toContain("finish, close, or explicitly move it out of the release scope");
  });
});
