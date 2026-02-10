import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  expectCliError,
  gitHead,
  gitInit,
  listDirRecursive,
  makeTempDir,
  ensureDir,
  pathExists,
  runCli,
  writeText,
} from "./critical/harness.js";

describe("critical: scope leak", () => {
  it("init does not target a parent git repo", { timeout: 60_000 }, async () => {
    const parent = await makeTempDir("agentplane-critical-parent-");
    await gitInit(parent);

    const child = path.join(parent, "child");
    await ensureDir(child);
    // child is inside a parent git repo, but init must be scoped to child.
    const res = await runCli(["init", "--yes"], { cwd: child });
    expect(res.code).toBe(0);

    expect(await pathExists(path.join(child, ".git"))).toBe(true);
    expect(await pathExists(path.join(child, ".agentplane", "config.json"))).toBe(true);
    expect(await pathExists(path.join(parent, ".agentplane"))).toBe(false);
  });

  it(
    "config show from a child dir must not read parent .agentplane/config.json",
    { timeout: 60_000 },
    async () => {
      const parent = await makeTempDir("agentplane-critical-parent-");
      await gitInit(parent);
      await writeText(
        path.join(parent, ".agentplane", "config.json"),
        JSON.stringify({ schema_version: 1, sentinel: "PARENT_CONFIG" }, null, 2) + "\n",
      );

      const child = path.join(parent, "child");
      await ensureDir(child);

      const res = await runCli(["config", "show"], { cwd: child });
      expectCliError(res, 5, "E_GIT");
      expect(res.stdout.trim()).toBe("");
      expect(res.stderr).toContain("Not a git repository");
      expect(res.stderr).not.toContain("PARENT_CONFIG");
    },
  );

  it("task list from a child dir must not see parent tasks", { timeout: 60_000 }, async () => {
    const parent = await makeTempDir("agentplane-critical-parent-");
    await gitInit(parent);

    // Create a parent task directory tree that would be visible if the CLI climbed to the parent.
    await writeText(
      path.join(parent, ".agentplane", "tasks", "202601010101-ABCDEF", "README.md"),
      "---\n" +
        'id: "202601010101-ABCDEF"\n' +
        'title: "parent task"\n' +
        'status: "TODO"\n' +
        'priority: "med"\n' +
        'owner: "CODER"\n' +
        "depends_on: []\n" +
        "tags: []\n" +
        "verify: []\n" +
        "comments: []\n" +
        "doc_version: 2\n" +
        'doc_updated_at: "2026-01-01T00:00:00.000Z"\n' +
        'doc_updated_by: "CODER"\n' +
        'description: "x"\n' +
        "---\n\n## Summary\n\nx\n",
    );

    const child = path.join(parent, "child");
    await ensureDir(child);
    const res = await runCli(["task", "list"], { cwd: child });
    expectCliError(res, 5, "E_GIT");
    expect(res.stdout.trim()).toBe("");
  });

  it(
    "init in a standalone directory creates .git/.agentplane only inside that directory",
    { timeout: 60_000 },
    async () => {
      const root = await makeTempDir("agentplane-critical-standalone-");
      const child = path.join(root, "child");
      await ensureDir(child);

      const res = await runCli(["init", "--yes"], { cwd: child });
      expect(res.code).toBe(0);

      expect(await pathExists(path.join(child, ".git"))).toBe(true);
      expect(await pathExists(path.join(child, ".agentplane", "config.json"))).toBe(true);
      expect(await pathExists(path.join(root, ".git"))).toBe(false);
      expect(await pathExists(path.join(root, ".agentplane"))).toBe(false);

      // Ensure init produced a commit in the created repo.
      const head = await gitHead(child);
      expect(head).toMatch(/^[0-9a-f]{40}$/);
    },
  );

  it(
    "commands must not create .agentplane side-effects in non-repo directories",
    { timeout: 60_000 },
    async () => {
      const root = await makeTempDir("agentplane-critical-side-effects-");
      const before = await listDirRecursive(root);

      const res = await runCli(["task", "list"], { cwd: root });
      expectCliError(res, 5, "E_GIT");

      const after = await listDirRecursive(root);
      expect(after).toEqual(before);
    },
  );
});
