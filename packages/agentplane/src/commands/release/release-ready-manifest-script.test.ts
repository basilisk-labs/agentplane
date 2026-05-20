import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/manifest.mjs");
const roots: string[] = [];

async function makeRoot(taskStatus: "DONE" | "DOING") {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-ready-manifest-"));
  roots.push(root);
  await mkdir(path.join(root, "packages", "core"), { recursive: true });
  await mkdir(path.join(root, "packages", "recipes"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await mkdir(path.join(root, "docs", "releases"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", "tasks", "202605200810-C88A12"), {
    recursive: true,
  });

  await writeFile(
    path.join(root, "packages", "core", "package.json"),
    `${JSON.stringify({ name: "@agentplaneorg/core", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "recipes", "package.json"),
    `${JSON.stringify({ name: "@agentplaneorg/recipes", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    `${JSON.stringify(
      {
        name: "agentplane",
        version: "0.6.3",
        dependencies: {
          "@agentplaneorg/core": "0.6.3",
          "@agentplaneorg/recipes": "0.6.3",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(path.join(root, "docs", "releases", "v0.6.3.md"), "# v0.6.3\n", "utf8");
  await writeFile(
    path.join(root, ".agentplane", "tasks", "202605200810-C88A12", "README.md"),
    [
      "---",
      'id: "202605200810-C88A12"',
      'title: "Release-ready manifest task registry gate"',
      `status: "${taskStatus}"`,
      "depends_on: []",
      "---",
      "",
    ].join("\n"),
    "utf8",
  );
  return root;
}

async function runReleaseReady(root: string) {
  const result = await execFileAsync(
    "node",
    [SCRIPT_PATH, "release-ready", "--json", "--sha", "abc123", "--ref", "refs/heads/main"],
    { cwd: root },
  );
  return JSON.parse(String(result.stdout ?? "")) as {
    ready: boolean;
    reasonCode: string;
    message: string;
    taskRegistry: { ready: boolean; reasonCode: string; message: string };
  };
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("manifest script release-ready command", () => {
  it("emits ready when package, notes, and task registry gates pass", async () => {
    const root = await makeRoot("DONE");

    const payload = await runReleaseReady(root);

    expect(payload.ready).toBe(true);
    expect(payload.reasonCode).toBe("ready");
    expect(payload.taskRegistry).toEqual({
      ready: true,
      reasonCode: "ready",
      message: "Task registry is release-ready.",
    });
  });

  it("fails closed when task registry still has a DOING task", async () => {
    const root = await makeRoot("DOING");

    const payload = await runReleaseReady(root);

    expect(payload.ready).toBe(false);
    expect(payload.reasonCode).toBe("task_registry_not_release_ready");
    expect(payload.message).toContain("Task registry is not release-ready");
    expect(payload.taskRegistry.ready).toBe(false);
    expect(payload.taskRegistry.message).toContain("DOING task blocks release readiness");
  });
});
