import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { runDoctor } from "./doctor.command.js";

type TestWorkspace = {
  root: string;
};

const workspaces: string[] = [];
const execFileAsync = promisify(execFile);

async function mkWorkspace(): Promise<TestWorkspace> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await writeFile(path.join(root, "AGENTS.md"), "# AGENTS\n", "utf8");
  await writeFile(path.join(root, ".agentplane", "config.json"), '{\n  "version": 1\n}\n', "utf8");
  await writeFile(
    path.join(root, ".agentplane", "agents", "CODER.json"),
    '{\n  "role": "coder"\n}\n',
    "utf8",
  );
  return { root };
}

async function gitInitWithCommit(root: string, subject: string): Promise<string> {
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Doctor Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "doctor@example.com"], { cwd: root });
  await writeFile(path.join(root, "file.txt"), `${subject}\n`, "utf8");
  await execFileAsync("git", ["add", "file.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", subject], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("doctor.command", () => {
  it("passes default checks for a normal initialized workspace without monorepo src folders", async () => {
    const ws = await mkWorkspace();
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("fails default checks when AGENTS.md is missing", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });

  it("fails dev checks when monorepo source tree is unavailable", async () => {
    const ws = await mkWorkspace();
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: true },
    );
    expect(rc).toBe(1);
  });

  it("fails when DONE task misses implementation commit hash", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            { id: "202602111800-ABC123", status: "DONE", commit: null },
            { id: "202602111801-DEF456", status: "TODO" },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });

  it("fails when DONE task commit points to a close commit subject", async () => {
    const ws = await mkWorkspace();
    const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [{ id: "202602111802-ABC123", status: "DONE", commit: { hash: closeHash } }],
        },
        null,
        2,
      ),
      "utf8",
    );
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });
});
