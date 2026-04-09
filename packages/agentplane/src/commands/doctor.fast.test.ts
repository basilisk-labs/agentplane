import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { afterEach, describe, expect, it, vi } from "vitest";

import { renderTaskReadme } from "@agentplaneorg/core";

import { runDoctor } from "./doctor.run.js";

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
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-fast-"));
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

async function addFrameworkCheckout(root: string): Promise<{
  repoBin: string;
  coreRoot: string;
}> {
  const packageRoot = path.join(root, "packages", "agentplane");
  const repoBin = path.join(packageRoot, "bin", "agentplane.js");
  const coreRoot = path.join(root, "packages", "core");
  await mkdir(path.join(packageRoot, "bin"), { recursive: true });
  await mkdir(path.join(packageRoot, "src"), { recursive: true });
  await mkdir(coreRoot, { recursive: true });
  await writeFile(repoBin, "#!/usr/bin/env node\n", "utf8");
  await writeFile(path.join(packageRoot, "src", "cli.ts"), "export const cli = true;\n", "utf8");
  await writeFile(
    path.join(packageRoot, "package.json"),
    '{\n  "name": "agentplane",\n  "version": "0.3.2"\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(coreRoot, "package.json"),
    '{\n  "name": "@agentplaneorg/core",\n  "version": "0.3.2"\n}\n',
    "utf8",
  );
  return { repoBin, coreRoot };
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("doctor.fast", () => {
  it("passes default checks for a normal initialized workspace", async () => {
    const ws = await mkWorkspace();
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("doctor --fix realigns a stale direct workflow artifact with branch_pr config", async () => {
    const ws = await mkWorkspace();
    await writeFile(
      path.join(ws.root, ".agentplane", "config.json"),
      '{\n  "version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
      "utf8",
    );

    const rcBefore = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rcBefore).toBe(1);

    const rcAfter = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: true, dev: false },
    );
    expect(rcAfter).toBe(0);

    const workflowText = await readFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), "utf8");
    const lastKnownGoodText = await readFile(
      path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
      "utf8",
    );
    expect(workflowText).toContain('mode: "branch_pr"');
    expect(workflowText).toContain("Workflow mode: {{ workflow.mode }}");
    expect(lastKnownGoodText).toContain('mode: "branch_pr"');
  });

  it("doctor --fix removes legacy untracked DONE task README collisions", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const taskId = "202604092306-LEGACY1";
    const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    await writeFile(
      path.join(taskDir, "README.md"),
      `${renderTaskReadme(
        {
          id: taskId,
          title: "Legacy closeout collision",
          status: "DONE",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["workflow"],
          verify: [],
          plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
          verification: { state: "ok", updated_at: null, updated_by: null, note: null },
          commit: {
            hash: "abcdef1234567890abcdef1234567890abcdef12",
            message: "✅ LEGACY1 close: reconcile task archive",
          },
          comments: [],
          events: [],
          doc_version: 3,
          doc_updated_at: "2026-04-09T00:00:00.000Z",
          doc_updated_by: "CODER",
          description: "Legacy closeout collision",
          id_source: "generated",
        },
        [
          "## Summary",
          "Legacy closeout collision",
          "",
          "## Scope",
          "- In scope: reproduce untracked DONE README cleanup.",
          "",
          "## Plan",
          "1. Run doctor --fix.",
          "",
          "## Verify Steps",
          "1. Run agentplane doctor --fix. Expected: the untracked DONE README collision is removed.",
          "",
          "## Verification",
          "<!-- BEGIN VERIFICATION RESULTS -->",
          "<!-- END VERIFICATION RESULTS -->",
          "",
          "## Findings",
        ].join("\n"),
      )}\n`,
      "utf8",
    );

    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: true, dev: false },
    );

    expect(rc).toBe(0);
    await expect(readFile(path.join(taskDir, "README.md"), "utf8")).rejects.toThrow();
  });

  it("doctor --fix keeps untracked non-DONE task README files", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const taskId = "202604092306-LEGACY2";
    const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
    const readmePath = path.join(taskDir, "README.md");
    await mkdir(taskDir, { recursive: true });
    await writeFile(
      readmePath,
      `${renderTaskReadme(
        {
          id: taskId,
          title: "Active task draft",
          status: "DOING",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["workflow"],
          verify: [],
          plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
          verification: { state: "pending", updated_at: null, updated_by: null, note: null },
          commit: null,
          comments: [],
          events: [],
          doc_version: 3,
          doc_updated_at: "2026-04-09T00:00:00.000Z",
          doc_updated_by: "CODER",
          description: "Active task draft",
          id_source: "generated",
        },
        [
          "## Summary",
          "Active task draft",
          "",
          "## Scope",
          "- In scope: verify doctor fix preserves non-DONE work.",
          "",
          "## Plan",
          "1. Run doctor --fix.",
          "",
          "## Verify Steps",
          "1. Run agentplane doctor --fix. Expected: active untracked README stays in place.",
          "",
          "## Verification",
          "<!-- BEGIN VERIFICATION RESULTS -->",
          "<!-- END VERIFICATION RESULTS -->",
          "",
          "## Findings",
        ].join("\n"),
      )}\n`,
      "utf8",
    );

    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: true, dev: false },
    );

    expect(rc).toBe(0);
    await expect(readFile(readmePath, "utf8")).resolves.toContain("Active task draft");
  });

  it("fails when both policy gateway files are missing", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    await rm(path.join(ws.root, "CLAUDE.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
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
  }, 60_000);

  it("prints runtime info when doctor runs inside a framework checkout", async () => {
    const ws = await mkWorkspace();
    const framework = await addFrameworkCheckout(ws.root);
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    const prevActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = framework.repoBin;
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("Runtime mode: repo-local");
      expect(output).toContain(`Active binary: ${framework.repoBin}`);
      expect(output).toContain(`Framework repo root: ${ws.root}`);
      expect(output).toContain(`Framework core root: ${framework.coreRoot}`);
    } finally {
      if (prevActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = prevActiveBin;
      stderr.mockRestore();
    }
  });
});
