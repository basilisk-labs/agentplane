/* eslint-disable @typescript-eslint/no-unused-vars */
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  checkBranchPrBatchIncludedTaskDrift,
  checkBranchPrDoneTaskOpenPrDrift,
} from "./doctor/branch-pr.js";
import { runDoctor } from "./doctor.run.js";

type TestWorkspace = {
  root: string;
};

const workspaces: string[] = [];
const execFileAsync = promisify(execFile);
const DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS = 60_000;
const DOCTOR_COMMAND_TIMEOUT_MS = 60_000;
const REDMINE_ENV_KEYS = [
  "AGENTPLANE_REDMINE_URL",
  "AGENTPLANE_REDMINE_API_KEY",
  "AGENTPLANE_REDMINE_PROJECT_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE",
] as const;

function readCurrentCliVersion(): string {
  const packageJsonPath = fileURLToPath(new URL("../../package.json", import.meta.url));
  const parsed = JSON.parse(readFileSync(packageJsonPath, "utf8")) as unknown;
  if (
    parsed &&
    typeof parsed === "object" &&
    "version" in parsed &&
    typeof parsed.version === "string" &&
    parsed.version.trim().length > 0
  ) {
    return parsed.version;
  }
  return "0.0.0";
}

const currentCliVersion = readCurrentCliVersion();

function spyOnStderrWrite() {
  return vi
    .spyOn(process.stderr, "write")
    .mockImplementation((() => true) as typeof process.stderr.write);
}

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
  - "**"
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

function workflowWithRedmineBackend(): string {
  return VALID_WORKFLOW.replace(
    "retry_policy:\n",
    'tasks:\n  backend:\n    config_path: ".agentplane/backends/redmine/backend.json"\nretry_policy:\n',
  );
}

async function mkWorkspace(): Promise<TestWorkspace> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", "workflows"), { recursive: true });
  await writeFile(path.join(root, "AGENTS.md"), "# AGENTS\n", "utf8");
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "schema_version": 1,\n  "workflow_mode": "direct",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
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

async function configureRedmineBackend(
  root: string,
  opts?: { canonicalStateFieldId?: string | null },
): Promise<void> {
  await mkdir(path.join(root, ".agentplane", "backends", "redmine"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "WORKFLOW.md"),
    workflowWithRedmineBackend(),
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    JSON.stringify(
      {
        id: "redmine",
        version: 1,
        settings: {
          owner_agent: "CODER",
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  const envLines = [
    "AGENTPLANE_REDMINE_URL=https://redmine.example.test",
    "AGENTPLANE_REDMINE_API_KEY=test-key",
    "AGENTPLANE_REDMINE_PROJECT_ID=test-project",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID=1",
    ...(opts?.canonicalStateFieldId
      ? [`AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE=${opts.canonicalStateFieldId}`]
      : []),
  ];
  await writeFile(path.join(root, ".env"), `${envLines.join("\n")}\n`, "utf8");
}

async function withIsolatedRedmineEnv<T>(fn: () => Promise<T>): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const key of REDMINE_ENV_KEYS) {
    previous.set(key, process.env[key]);
    delete process.env[key];
  }
  try {
    return await fn();
  } finally {
    for (const key of REDMINE_ENV_KEYS) {
      const value = previous.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function gitInitWithCommit(root: string, subject: string): Promise<string> {
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Doctor Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "doctor@example.com"], { cwd: root });
  await writeFile(path.join(root, "file.txt"), `${subject}\n`, "utf8");
  await execFileAsync("git", ["add", "file.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "--no-verify", "-m", subject], { cwd: root });
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

describe(
  "doctor.command baseline and open PR drift",
  { timeout: DOCTOR_COMMAND_TIMEOUT_MS },
  () => {
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

    it("keeps WORKFLOW.md presence required even when workflow contract checks are disabled", async () => {
      const ws = await mkWorkspace();
      await rm(path.join(ws.root, ".agentplane", "WORKFLOW.md"), { force: true });
      const stderr = spyOnStderrWrite();
      const prev = process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
      process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = "off";
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(1);
        const output = stderr.mock.calls.flat().join("\n");
        expect(output).toContain("Missing required file: .agentplane/WORKFLOW.md");
      } finally {
        stderr.mockRestore();
        if (prev === undefined) delete process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
        else process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = prev;
      }
    });

    it("does not fail when workflow has warning-only policy mismatch", async () => {
      const ws = await mkWorkspace();
      const warningOnlyWorkflow = VALID_WORKFLOW.replace(
        "require_plan: false",
        "require_plan: true",
      );
      await writeFile(
        path.join(ws.root, ".agentplane", "WORKFLOW.md"),
        warningOnlyWorkflow,
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
    });

    it("warns when a verified branch_pr task is already shipped on base but still open", async () => {
      const ws = await mkWorkspace();
      const shippedHash = await gitInitWithCommit(ws.root, "feat: shipped payload");
      await writeFile(
        path.join(ws.root, ".agentplane", "config.json"),
        '{\n  "schema_version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
        "utf8",
      );
      const branchPrWorkflow = VALID_WORKFLOW.replace("mode: direct", 'mode: "branch_pr"');
      await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), branchPrWorkflow, "utf8");
      await writeFile(
        path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
        branchPrWorkflow,
        "utf8",
      );

      const taskId = "202604050900-DRGFT1";
      const branchName = `task/${taskId}/sync-local`;
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: taskId,
                title: "Shipped branch_pr drift",
                description: "Doctor should surface shipped-but-open branch_pr tasks.",
                status: "DOING",
                priority: "med",
                owner: "CODER",
                depends_on: [],
                tags: ["workflow"],
                verify: [],
                plan_approval: {
                  state: "approved",
                  updated_at: "2026-04-05T09:00:00.000Z",
                  updated_by: "ORCHESTRATOR",
                  note: null,
                },
                verification: {
                  state: "ok",
                  updated_at: "2026-04-05T09:10:00.000Z",
                  updated_by: "CODER",
                  note: "verified",
                },
                commit: {
                  hash: shippedHash,
                  message: "feat: shipped payload",
                },
                comments: [],
                doc_version: 3,
                doc_updated_at: "2026-04-05T09:10:00.000Z",
                doc_updated_by: "CODER",
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(path.join(taskDir, "pr"), { recursive: true });
      await writeFile(
        path.join(taskDir, "README.md"),
        renderTaskReadme(
          {
            id: taskId,
            title: "Shipped branch_pr drift",
            description: "Doctor should surface shipped-but-open branch_pr tasks.",
            status: "DOING",
            priority: "med",
            owner: "CODER",
            depends_on: [],
            tags: ["workflow"],
            verify: [],
            plan_approval: {
              state: "approved",
              updated_at: "2026-04-05T09:00:00.000Z",
              updated_by: "ORCHESTRATOR",
              note: null,
            },
            verification: {
              state: "ok",
              updated_at: "2026-04-05T09:10:00.000Z",
              updated_by: "CODER",
              note: "verified",
            },
            commit: {
              hash: shippedHash,
              message: "feat: shipped payload",
            },
            comments: [],
            events: [],
            revision: 1,
            doc_version: 3,
            doc_updated_at: "2026-04-05T09:10:00.000Z",
            doc_updated_by: "CODER",
            sections: {
              Summary: "Shipped branch_pr drift",
              Scope: "- In scope: detect shipped-but-open branch_pr tasks.",
              Plan: "1. Run doctor.",
              "Verify Steps":
                "1. Run agentplane doctor. Expected: warning mentions shipped branch_pr drift.",
              Verification:
                "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
              "Rollback Plan": "- Revert.",
              Findings: "",
            },
          },
          "",
        ),
        "utf8",
      );
      await writeFile(
        path.join(taskDir, "pr", "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: branchName,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );
      await execFileAsync(
        "git",
        [
          "add",
          ".agentplane/WORKFLOW.md",
          ".agentplane/workflows/last-known-good.md",
          ".agentplane/tasks.json",
          `.agentplane/tasks/${taskId}/README.md`,
          `.agentplane/tasks/${taskId}/pr/meta.json`,
        ],
        { cwd: ws.root },
      );
      await execFileAsync("git", ["commit", "--no-verify", "-m", "chore doctor fixture"], {
        cwd: ws.root,
      });

      const stderr = spyOnStderrWrite();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.mock.calls.flat().join("\n");
        expect(output).toContain(
          "branch_pr tasks appear shipped on the base branch but remain open",
        );
        expect(output).toContain("agentplane task normalize --sync-branch-pr-state");
        expect(output).toContain(taskId);
      } finally {
        stderr.mockRestore();
      }
    });

    it("warns when a DONE branch_pr task still has open PR artifacts", async () => {
      const ws = await mkWorkspace();
      const shippedHash = await gitInitWithCommit(ws.root, "feat: shipped payload");
      await writeFile(
        path.join(ws.root, ".agentplane", "config.json"),
        '{\n  "schema_version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
        "utf8",
      );
      const branchPrWorkflow = VALID_WORKFLOW.replace("mode: direct", 'mode: "branch_pr"');
      await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), branchPrWorkflow, "utf8");
      await writeFile(
        path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
        branchPrWorkflow,
        "utf8",
      );

      const taskId = "202604050901-DONEPR";
      const branchName = `task/${taskId}/open-pr`;
      await execFileAsync("git", ["branch", branchName, shippedHash], { cwd: ws.root });
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(path.join(taskDir, "pr"), { recursive: true });
      await writeFile(
        path.join(taskDir, "README.md"),
        renderTaskReadme(
          {
            id: taskId,
            title: "DONE task with open PR artifacts",
            description: "Doctor should surface DONE branch_pr tasks whose PR is still open.",
            status: "DONE",
            priority: "med",
            owner: "CODER",
            depends_on: [],
            tags: ["workflow"],
            verify: [],
            plan_approval: {
              state: "approved",
              updated_at: "2026-04-05T09:00:00.000Z",
              updated_by: "ORCHESTRATOR",
              note: null,
            },
            verification: {
              state: "ok",
              updated_at: "2026-04-05T09:10:00.000Z",
              updated_by: "CODER",
              note: "verified",
            },
            commit: {
              hash: shippedHash,
              message: "feat: shipped payload",
            },
            comments: [],
            events: [],
            revision: 1,
            doc_version: 3,
            doc_updated_at: "2026-04-05T09:10:00.000Z",
            doc_updated_by: "CODER",
            sections: {
              Summary: "DONE task with open PR artifacts",
              Scope: "- In scope: detect DONE branch_pr tasks whose PR is still open.",
              Plan: "1. Run doctor.",
              "Verify Steps":
                "1. Run agentplane doctor. Expected: warning mentions DONE branch_pr tasks with open PR artifacts.",
              Verification:
                "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
              "Rollback Plan": "- Revert.",
              Findings: "",
            },
          },
          "",
        ),
        "utf8",
      );
      await writeFile(
        path.join(taskDir, "pr", "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: branchName,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );
      await execFileAsync(
        "git",
        [
          "add",
          ".agentplane/WORKFLOW.md",
          ".agentplane/workflows/last-known-good.md",
          `.agentplane/tasks/${taskId}/README.md`,
          `.agentplane/tasks/${taskId}/pr/meta.json`,
        ],
        { cwd: ws.root },
      );
      await execFileAsync("git", ["commit", "--no-verify", "-m", "chore doctor fixture"], {
        cwd: ws.root,
      });

      const stderr = spyOnStderrWrite();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.mock.calls.flat().join("\n");
        expect(output).toContain("DONE branch_pr tasks still have open or unmerged PR artifacts");
        expect(output).toContain(
          "agentplane task normalize --sync-branch-pr-state --task-id <task-id>",
        );
        expect(output).toContain(taskId);
      } finally {
        stderr.mockRestore();
      }
    });

    it("detects DONE branch_pr open-PR drift from live backend state even when tasks.json is stale", async () => {
      const ws = await mkWorkspace();
      const shippedHash = await gitInitWithCommit(ws.root, "feat: projection-only shipped payload");
      await writeFile(
        path.join(ws.root, ".agentplane", "config.json"),
        '{\n  "schema_version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
        "utf8",
      );
      const branchPrWorkflow = VALID_WORKFLOW.replace("mode: direct", 'mode: "branch_pr"');
      await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), branchPrWorkflow, "utf8");
      await writeFile(
        path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
        branchPrWorkflow,
        "utf8",
      );

      const taskId = "202604050902-PROJPR";
      const branchName = `task/${taskId}/projection-only-open-pr`;
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify({ tasks: [] }, null, 2),
        "utf8",
      );
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(path.join(taskDir, "pr"), { recursive: true });
      await writeFile(
        path.join(taskDir, "README.md"),
        renderTaskReadme(
          {
            id: taskId,
            title: "Projection-only DONE task with open PR artifacts",
            description:
              "Doctor should use the current projection/task docs, not just legacy tasks.json snapshots.",
            status: "DONE",
            priority: "med",
            owner: "CODER",
            depends_on: [],
            tags: ["workflow"],
            verify: [],
            plan_approval: {
              state: "approved",
              updated_at: "2026-04-05T09:00:00.000Z",
              updated_by: "ORCHESTRATOR",
              note: null,
            },
            verification: {
              state: "ok",
              updated_at: "2026-04-05T09:10:00.000Z",
              updated_by: "CODER",
              note: "verified",
            },
            commit: {
              hash: shippedHash,
              message: "feat: projection-only shipped payload",
            },
            comments: [],
            events: [],
            revision: 1,
            doc_version: 3,
            doc_updated_at: "2026-04-05T09:10:00.000Z",
            doc_updated_by: "CODER",
            sections: {
              Summary: "Projection-only DONE task with open PR artifacts",
              Scope: "- In scope: detect DONE branch_pr tasks from projection snapshots.",
              Plan: "1. Run doctor.",
              "Verify Steps":
                "1. Run agentplane doctor. Expected: warning mentions DONE branch_pr tasks with open PR artifacts even when tasks.json is stale.",
              Verification:
                "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
              "Rollback Plan": "- Revert.",
              Findings: "",
            },
          },
          "",
        ),
        "utf8",
      );
      await writeFile(
        path.join(taskDir, "pr", "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: branchName,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );
      await execFileAsync("git", ["branch", branchName, shippedHash], { cwd: ws.root });
      const ctx = {
        backendId: "local",
        config: {
          workflow_mode: "branch_pr",
          paths: { workflow_dir: ".agentplane/tasks" },
        },
        resolvedProject: { gitRoot: ws.root },
        taskBackend: {
          listTasks: vi.fn().mockResolvedValue([
            {
              id: taskId,
              status: "DONE",
              commit: {
                hash: shippedHash,
                message: "feat: projection-only shipped payload",
              },
            },
          ]),
        },
      } as unknown as Parameters<typeof checkBranchPrDoneTaskOpenPrDrift>[0];
      const findings = await checkBranchPrDoneTaskOpenPrDrift(ctx);
      expect(findings).toHaveLength(1);
      expect(findings[0]).toContain(
        "DONE branch_pr tasks still have open or unmerged PR artifacts",
      );
      expect(findings[0]).toContain(
        "agentplane task normalize --sync-branch-pr-state --task-id <task-id>",
      );
      expect(findings[0]).toContain(taskId);
    });

    it("ignores DONE branch_pr PR artifacts when the task branch was already deleted", async () => {
      const ws = await mkWorkspace();
      const shippedHash = await gitInitWithCommit(ws.root, "feat: already-shipped payload");
      await writeFile(
        path.join(ws.root, ".agentplane", "config.json"),
        '{\n  "schema_version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
        "utf8",
      );
      const branchPrWorkflow = VALID_WORKFLOW.replace("mode: direct", 'mode: "branch_pr"');
      await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), branchPrWorkflow, "utf8");
      await writeFile(
        path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
        branchPrWorkflow,
        "utf8",
      );

      const taskId = "202604050905-GONEBR";
      const branchName = `task/${taskId}/deleted-head`;
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: taskId,
                status: "DONE",
                commit: {
                  hash: shippedHash,
                  message: "feat: already-shipped payload",
                },
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(path.join(taskDir, "pr"), { recursive: true });
      await writeFile(
        path.join(taskDir, "README.md"),
        renderTaskReadme(
          {
            id: taskId,
            title: "DONE task with deleted branch_pr artifacts",
            description:
              "Doctor should stay quiet once the task branch has already been deleted and only stale PR metadata remains.",
            status: "DONE",
            priority: "med",
            owner: "CODER",
            depends_on: [],
            tags: ["workflow"],
            verify: [],
            plan_approval: {
              state: "approved",
              updated_at: "2026-04-05T09:00:00.000Z",
              updated_by: "ORCHESTRATOR",
              note: null,
            },
            verification: {
              state: "ok",
              updated_at: "2026-04-05T09:10:00.000Z",
              updated_by: "CODER",
              note: "verified",
            },
            commit: {
              hash: shippedHash,
              message: "feat: already-shipped payload",
            },
            comments: [],
            events: [],
            revision: 1,
            doc_version: 3,
            doc_updated_at: "2026-04-05T09:10:00.000Z",
            doc_updated_by: "CODER",
            sections: {
              Summary: "DONE task with deleted branch_pr artifacts",
              Scope:
                "- In scope: keep doctor quiet when only stale PR metadata remains after branch deletion.",
              Plan: "1. Run doctor.",
              "Verify Steps":
                "1. Run agentplane doctor. Expected: deleted task branches do not produce open-PR drift warnings.",
              Verification:
                "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
              "Rollback Plan": "- Revert.",
              Findings: "",
            },
          },
          "",
        ),
        "utf8",
      );
      await writeFile(
        path.join(taskDir, "pr", "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: branchName,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const ctx = {
        backendId: "local",
        config: {
          workflow_mode: "branch_pr",
          paths: { workflow_dir: ".agentplane/tasks" },
        },
        resolvedProject: { gitRoot: ws.root },
        taskBackend: {
          listTasks: vi.fn().mockResolvedValue([
            {
              id: taskId,
              status: "DONE",
              commit: {
                hash: shippedHash,
                message: "feat: already-shipped payload",
              },
            },
          ]),
        },
      } as unknown as Parameters<typeof checkBranchPrDoneTaskOpenPrDrift>[0];

      const findings = await checkBranchPrDoneTaskOpenPrDrift(ctx);
      expect(findings).toHaveLength(0);
    });

    it("warns when a closed branch_pr batch primary left included tasks open", async () => {
      const ws = await mkWorkspace();
      const primaryTaskId = "202604051100-PRIMARY";
      const includedTaskId = "202604051100-INCLUD";
      const mergeCommit = "abc1234567890abc1234567890abc1234567890";
      await mkdir(path.join(ws.root, ".agentplane", "tasks", primaryTaskId, "pr"), {
        recursive: true,
      });
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks", primaryTaskId, "pr", "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: primaryTaskId,
            branch: `task/${primaryTaskId}/batch`,
            batch: {
              schema_version: 1,
              primary_task_id: primaryTaskId,
              included_task_ids: [includedTaskId],
              closure_policy: "all_or_fail",
            },
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            status: "MERGED",
            merge_commit: mergeCommit,
            merged_at: "2026-04-05T10:00:00.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const ctx = {
        backendId: "local",
        config: {
          workflow_mode: "branch_pr",
          paths: { workflow_dir: ".agentplane/tasks" },
        },
        resolvedProject: { gitRoot: ws.root },
        taskBackend: {
          listTasks: vi.fn().mockResolvedValue([
            {
              id: primaryTaskId,
              status: "DONE",
              commit: { hash: mergeCommit, message: "Merge primary" },
            },
            {
              id: includedTaskId,
              status: "DOING",
              commit: null,
            },
          ]),
        },
      } as unknown as Parameters<typeof checkBranchPrBatchIncludedTaskDrift>[0];

      const findings = await checkBranchPrBatchIncludedTaskDrift(ctx);
      expect(findings).toHaveLength(1);
      expect(findings[0]).toContain("branch_pr batch included tasks are not closed");
      expect(findings[0]).toContain(`${primaryTaskId}->${includedTaskId}`);
    });

    it("ignores duplicate no-op and stacked-root DONE branch_pr records in open-PR drift checks", async () => {
      const ws = await mkWorkspace();
      const shippedHash = await gitInitWithCommit(ws.root, "feat: stacked root shipped payload");
      await writeFile(
        path.join(ws.root, ".agentplane", "config.json"),
        '{\n  "schema_version": 1,\n  "workflow_mode": "branch_pr",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
        "utf8",
      );
      const branchPrWorkflow = VALID_WORKFLOW.replace("mode: direct", 'mode: "branch_pr"');
      await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), branchPrWorkflow, "utf8");
      await writeFile(
        path.join(ws.root, ".agentplane", "workflows", "last-known-good.md"),
        branchPrWorkflow,
        "utf8",
      );

      const duplicateTaskId = "202604051000-DUPENO";
      const stackedTaskId = "202604051010-STAKED";
      const stackedRootTaskId = "202604051020-ROOTED";
      for (const [taskId, payload] of [
        [
          duplicateTaskId,
          {
            title: "Duplicate no-op task",
            result_summary: "Closed as duplicate of 202604051111-CANON1.",
            commit: null,
            branch: `task/${duplicateTaskId}/duplicate-noop`,
          },
        ],
        [
          stackedTaskId,
          {
            title: "Stacked task aliasing root branch",
            result_summary: `Integrated on main with the stacked branch_pr merge rooted at ${stackedRootTaskId}.`,
            commit: {
              hash: shippedHash,
              message: `🧩 ${stackedRootTaskId} integrate: squash task/${stackedRootTaskId}/stacked-root`,
            },
            branch: `task/${stackedRootTaskId}/stacked-root`,
          },
        ],
      ] as const) {
        const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
        await mkdir(path.join(taskDir, "pr"), { recursive: true });
        await writeFile(
          path.join(taskDir, "README.md"),
          renderTaskReadme(
            {
              id: taskId,
              title: payload.title,
              description: payload.title,
              status: "DONE",
              priority: "med",
              owner: "CODER",
              depends_on: [],
              tags: ["workflow"],
              verify: [],
              plan_approval: {
                state: "approved",
                updated_at: "2026-04-05T10:00:00.000Z",
                updated_by: "ORCHESTRATOR",
                note: null,
              },
              verification: {
                state: "ok",
                updated_at: "2026-04-05T10:10:00.000Z",
                updated_by: "CODER",
                note: "verified",
              },
              commit: payload.commit,
              result_summary: payload.result_summary,
              comments: [],
              events: [],
              revision: 1,
              doc_version: 3,
              doc_updated_at: "2026-04-05T10:10:00.000Z",
              doc_updated_by: "CODER",
              sections: {
                Summary: payload.title,
                Scope: "- In scope: keep doctor quiet for non-actionable DONE branch_pr records.",
                Plan: "1. Run doctor.",
                "Verify Steps":
                  "1. Run agentplane doctor. Expected: duplicate/no-op and stacked-root alias records do not produce open-PR drift warnings.",
                Verification:
                  "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
                "Rollback Plan": "- Revert.",
                Findings: "",
              },
            },
            "",
          ),
          "utf8",
        );
        await writeFile(
          path.join(taskDir, "pr", "meta.json"),
          JSON.stringify(
            {
              schema_version: 1,
              task_id: taskId,
              branch: payload.branch,
              base: "main",
              created_at: "2026-04-05T10:00:00.000Z",
              updated_at: "2026-04-05T10:00:00.000Z",
              head_sha: shippedHash,
              last_verified_sha: null,
              last_verified_at: null,
              verify: { status: "pass" },
            },
            null,
            2,
          ),
          "utf8",
        );
      }

      const ctx = {
        backendId: "local",
        config: {
          workflow_mode: "branch_pr",
          paths: { workflow_dir: ".agentplane/tasks" },
        },
        resolvedProject: { gitRoot: ws.root },
        taskBackend: {
          listTasks: vi.fn().mockResolvedValue([
            { id: duplicateTaskId, status: "DONE", commit: null },
            {
              id: stackedTaskId,
              status: "DONE",
              commit: {
                hash: shippedHash,
                message: `🧩 ${stackedRootTaskId} integrate: squash task/${stackedRootTaskId}/stacked-root`,
              },
              result_summary: `Integrated on main with the stacked branch_pr merge rooted at ${stackedRootTaskId}.`,
            },
          ]),
        },
      } as unknown as Parameters<typeof checkBranchPrDoneTaskOpenPrDrift>[0];

      const findings = await checkBranchPrDoneTaskOpenPrDrift(ctx);
      expect(findings).toHaveLength(0);
    });

    it("rejects legacy direct Redmine backend configs with a cloud migration message", async () => {
      const ws = await mkWorkspace();
      await configureRedmineBackend(ws.root);
      await expect(
        withIsolatedRedmineEnv(async () => {
          await runDoctor(
            { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
            { fix: false, dev: false },
          );
        }),
      ).rejects.toThrow(/direct Redmine task backend has moved to AgentPlane Cloud sync/u);
    });

    it("fails dev checks when monorepo source tree is unavailable", async () => {
      const ws = await mkWorkspace();
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: true },
      );
      expect(rc).toBe(1);
    });
  },
);
