import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { runDoctor } from "./doctor.command.js";

type TestWorkspace = {
  root: string;
};

const workspaces: string[] = [];
const execFileAsync = promisify(execFile);

const VALID_WORKFLOW = `---
version: 1
mode: direct
owners:
  orchestrator: CODER
approvals:
  require_plan: false
  require_verify: false
  require_network: true
retry_policy:
  normal_exit_continuation: true
  abnormal_backoff: exponential
  max_attempts: 5
timeouts:
  stall_seconds: 900
in_scope_paths:
  - packages/**
---

## Prompt Template
Repository: {{ runtime.repo_name }}
Workflow mode: {{ workflow.mode }}

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`;

async function mkWorkspace(): Promise<TestWorkspace> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", "workflows"), { recursive: true });
  await writeFile(path.join(root, "AGENTS.md"), "# AGENTS\n", "utf8");
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "version": 1,\n  "workflow_mode": "direct",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", "agents", "CODER.json"),
    '{\n  "role": "coder"\n}\n',
    "utf8",
  );
  const manifestPath = fileURLToPath(
    new URL("../../assets/framework.manifest.json", import.meta.url),
  );
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
    files?: { path?: string; required?: boolean }[];
  };
  for (const entry of manifest.files ?? []) {
    const relPath = typeof entry.path === "string" ? entry.path.replaceAll("\\", "/") : "";
    if (!entry.required || !relPath.startsWith(".agentplane/policy/")) continue;
    const absPath = path.join(root, relPath);
    await mkdir(path.dirname(absPath), { recursive: true });
    await writeFile(
      absPath,
      relPath.endsWith(".mjs") ? "export {};\n" : `# ${path.basename(relPath)}\n`,
      "utf8",
    );
  }
  await writeFile(path.join(root, ".agentplane", "WORKFLOW.md"), VALID_WORKFLOW, "utf8");
  await writeFile(
    path.join(root, ".agentplane", "workflows", "last-known-good.md"),
    VALID_WORKFLOW,
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

  it("fails default checks when both policy gateway files are missing", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    await rm(path.join(ws.root, "CLAUDE.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });

  it("passes default checks when only CLAUDE.md exists", async () => {
    const ws = await mkWorkspace();
    await writeFile(path.join(ws.root, "CLAUDE.md"), "# CLAUDE\n", "utf8");
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("supports workflow kill-switch for emergency rollback", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, ".agentplane", "WORKFLOW.md"), { force: true });
    const prev = process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
    process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = "off";
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
    } finally {
      if (prev === undefined) delete process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
      else process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = prev;
    }
  });

  it("does not fail when workflow has warning-only policy mismatch", async () => {
    const ws = await mkWorkspace();
    const warningOnlyWorkflow = VALID_WORKFLOW.replace("require_plan: false", "require_plan: true");
    await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), warningOnlyWorkflow, "utf8");
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
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

  it("warns but does not fail when DONE task references an unknown historical commit hash", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            {
              id: "202602111801-DEF456",
              status: "DONE",
              commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
            },
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
    expect(rc).toBe(0);
  });

  it("warns but does not fail when DONE task commit points to a close commit subject", async () => {
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
    expect(rc).toBe(0);
  });

  it("fails when the managed policy tree is incomplete for the active gateway", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, ".agentplane", "policy", "workflow.upgrade.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });
});
