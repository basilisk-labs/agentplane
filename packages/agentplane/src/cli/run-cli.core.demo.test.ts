import path from "node:path";
import { readFile, readdir, writeFile } from "node:fs/promises";

import {
  captureStdIO,
  commitAll,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  pathExists,
  runCli,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { describe } from "vitest";

describe("runCli demo", () => {
  it("creates a first-success task artifact and ACR without touching user source files", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeConfig(root, defaultConfig());
    await writeFile(path.join(root, "parser.js"), "export const parser = true;\n", "utf8");
    await commitAll(root, "baseline");

    const io = captureStdIO();
    try {
      const code = await runCli(["demo", "--root", root]);
      expect(code, io.stderr).toBe(0);
      expect(io.stdout).toContain("Agentplane demo");
      expect(io.stdout).toContain("task_readme:");
      expect(io.stdout).toContain("acr:");
    } finally {
      io.restore();
    }

    const taskIds = await readdir(path.join(root, ".agentplane", "tasks"));
    expect(taskIds).toHaveLength(1);
    const taskId = taskIds[0];
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const acrPath = path.join(root, ".agentplane", "tasks", taskId, "acr.json");
    const readme = await readFile(readmePath, "utf8");
    const acr = JSON.parse(await readFile(acrPath, "utf8")) as { task?: { task_id?: string } };

    expect(readme).toContain("Agentplane demo: first traceable task");
    expect(readme).toContain("DEMO - VERIFY - ok");
    expect(acr.task?.task_id).toBe(taskId);
    expect(await readFile(path.join(root, "parser.js"), "utf8")).toBe(
      "export const parser = true;\n",
    );
  });

  it("supports dry-run without writing task artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeConfig(root, defaultConfig());

    const io = captureStdIO();
    try {
      const code = await runCli(["demo", "--dry-run", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as { dry_run?: boolean; taskId?: string };
      expect(payload.dry_run).toBe(true);
      expect(payload.taskId).toBe("<generated>");
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".agentplane", "tasks"))).toBe(false);
  });

  it("creates ACR evidence on repositories whose base branch is not main", async () => {
    const root = await mkGitRepoRootWithBranch("master");
    await writeConfig(root, defaultConfig());
    await writeFile(path.join(root, "parser.js"), "export const parser = true;\n", "utf8");
    await commitAll(root, "baseline");

    const io = captureStdIO();
    try {
      const code = await runCli(["demo", "--json", "--root", root]);
      expect(code, io.stderr).toBe(0);
    } finally {
      io.restore();
    }

    const taskIds = await readdir(path.join(root, ".agentplane", "tasks"));
    expect(taskIds).toHaveLength(1);
    expect(await pathExists(path.join(root, ".agentplane", "tasks", taskIds[0], "acr.json"))).toBe(
      true,
    );
  });
});
