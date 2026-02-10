import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  ensureDir,
  expectCliError,
  gitInit,
  makeTempDir,
  pathExists,
  real,
  runCli,
  writeText,
} from "./critical/harness.js";

async function canCreateSymlink(): Promise<boolean> {
  try {
    const base = await makeTempDir("agentplane-critical-symlink-probe-");
    const target = path.join(base, "target");
    const link = path.join(base, "link");
    await ensureDir(target);
    const { symlink } = await import("node:fs/promises");
    await symlink(target, link);
    return true;
  } catch {
    return false;
  }
}

describe("critical: symlink root", () => {
  it("config show must not climb to a real parent repo when cwd is a symlinked child", async () => {
    if (!(await canCreateSymlink())) return;

    const realParent = await makeTempDir("agentplane-critical-real-parent-");
    await gitInit(realParent);
    await writeText(
      path.join(realParent, ".agentplane", "config.json"),
      JSON.stringify({ schema_version: 1, sentinel: "REAL_PARENT_CONFIG" }, null, 2) + "\n",
    );

    const realChild = path.join(realParent, "child");
    await ensureDir(realChild);

    const linkRoot = await makeTempDir("agentplane-critical-link-root-");
    const linkChild = path.join(linkRoot, "child-link");
    const { symlink } = await import("node:fs/promises");
    await symlink(realChild, linkChild);

    const res = await runCli(["config", "show"], { cwd: linkChild });
    expectCliError(res, 5, "E_GIT");
    expect(res.stdout.trim()).toBe("");
    expect(res.stderr).not.toContain("REAL_PARENT_CONFIG");

    // Sanity: the symlink points to the expected location.
    expect(await real(linkChild)).toBe(await real(realChild));
  });

  it("init via a symlinked cwd initializes the symlink target, not the parent", async () => {
    if (!(await canCreateSymlink())) return;

    const realParent = await makeTempDir("agentplane-critical-real-parent-");
    await gitInit(realParent);

    const realChild = path.join(realParent, "child");
    await ensureDir(realChild);

    const linkRoot = await makeTempDir("agentplane-critical-link-root-");
    const linkChild = path.join(linkRoot, "child-link");
    const { symlink } = await import("node:fs/promises");
    await symlink(realChild, linkChild);

    const res = await runCli(["init", "--yes"], { cwd: linkChild });
    expect(res.code).toBe(0);

    expect(await pathExists(path.join(realChild, ".git"))).toBe(true);
    expect(await pathExists(path.join(realChild, ".agentplane", "config.json"))).toBe(true);
    expect(await pathExists(path.join(realParent, ".agentplane"))).toBe(false);

    const show = await runCli(["config", "show"], { cwd: linkChild });
    expect(show.code).toBe(0);
    expect(show.stdout).toContain('"workflow_mode": "direct"');
  });
});
