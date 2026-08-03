import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { captureStdIO } from "@agentplane/testkit";
import { afterEach, describe, expect, it } from "vitest";

import { runDoctorLegacy } from "../doctor-legacy.run.js";
import {
  COMPATIBILITY_RETIREMENT_MANIFEST,
  validateCompatibilityRetirementManifest,
  validateCompatibilityRetirementSourcePaths,
} from "./legacy-manifest.js";
import { inspectLegacyCompatibilityUsage } from "./legacy-probes.js";

const execFileAsync = promisify(execFile);
const roots: string[] = [];

const WORKFLOW_V2 = `---
version: 2
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

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`;

async function fixture(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-legacy-"));
  roots.push(root);
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Doctor Legacy Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "doctor-legacy@example.com"], { cwd: root });
  await mkdir(path.join(root, ".agentplane", "tasks"), { recursive: true });
  await writeFile(path.join(root, ".agentplane", "WORKFLOW.md"), WORKFLOW_V2, "utf8");
  await execFileAsync("git", ["add", ".agentplane/WORKFLOW.md"], { cwd: root });
  await execFileAsync("git", ["commit", "-q", "-m", "test: seed doctor legacy fixture"], {
    cwd: root,
  });
  return root;
}

function taskReadme(id: string, docVersion: 2 | 3): string {
  return renderTaskReadme(
    {
      id,
      title: `Task ${id}`,
      description: "Legacy probe fixture.",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      commit: null,
      comments: [],
      events: [],
      revision: 1,
      doc_version: docVersion,
      doc_updated_at: "2026-08-03T00:00:00.000Z",
      doc_updated_by: "CODER",
      sections: {
        Summary: "Fixture.",
        Scope: "Fixture.",
        Plan: "Fixture.",
        "Verify Steps": "Fixture.",
        Verification: "",
        "Rollback Plan": "Fixture.",
        Findings: "",
      },
    },
    "",
  );
}

function statusMap(report: Awaited<ReturnType<typeof inspectLegacyCompatibilityUsage>>) {
  return Object.fromEntries(report.adapters.map((adapter) => [adapter.id, adapter.status]));
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("doctor legacy", () => {
  it("validates the packaged manifest and every registered source path", async () => {
    expect(validateCompatibilityRetirementManifest(COMPATIBILITY_RETIREMENT_MANIFEST)).toEqual(
      COMPATIBILITY_RETIREMENT_MANIFEST,
    );
    await expect(
      validateCompatibilityRetirementSourcePaths(process.cwd()),
    ).resolves.toBeUndefined();

    const duplicate = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    duplicate.adapters.push(structuredClone(duplicate.adapters[0]!));
    expect(() => validateCompatibilityRetirementManifest(duplicate)).toThrow(/duplicate adapter/u);
  });

  it("classifies unused and unobservable compatibility without changing the workspace", async () => {
    const root = await fixture();
    const before = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all"],
      {
        cwd: root,
      },
    );
    const report = await inspectLegacyCompatibilityUsage({
      repoRoot: root,
      manifest: COMPATIBILITY_RETIREMENT_MANIFEST,
    });
    const after = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all"],
      {
        cwd: root,
      },
    );

    expect(statusMap(report)).toMatchObject({
      "config.legacy_json": "unused",
      "workflow.contract_v1": "unused",
      "task.readme_pre_v3": "unused",
      "runner.agent_work_context_v1": "unknown",
      "supervisor.execution_episode_v0": "unused",
      "runner.task_local_storage": "unused",
      "runner.result_manifest_v1": "unused",
      "context.profile_aliases": "unknown",
      "context.workspace_pre_maximum_assimilation_v2": "unused",
      "pr.legacy_protected_conflict": "unused",
      "cleanup.git_replacement_refs": "unused",
      "commit.historical_forms": "unknown",
    });
    expect(after.stdout).toBe(before.stdout);
  });

  it("reports mixed current and legacy workspace evidence", async () => {
    const root = await fixture();
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}\n", "utf8");
    await writeFile(
      path.join(root, ".agentplane", "WORKFLOW.md"),
      WORKFLOW_V2.replace("version: 2", "version: 1"),
      "utf8",
    );
    const taskId = "202608030000-LEGACY";
    const taskRoot = path.join(root, ".agentplane", "tasks", taskId);
    const runRoot = path.join(taskRoot, "runs", "legacy-run");
    await mkdir(runRoot, { recursive: true });
    await writeFile(path.join(taskRoot, "README.md"), taskReadme(taskId, 2), "utf8");
    await writeFile(path.join(runRoot, "result.json"), '{"schema_version":1}\n', "utf8");
    await mkdir(path.join(root, "context", "wiki"), { recursive: true });
    await writeFile(path.join(root, "context", "wiki", "legacy.md"), "# Legacy\n", "utf8");
    await mkdir(path.join(root, ".agentplane", "cache"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "cache", "integration-queue.json"),
      JSON.stringify({
        schema_version: 1,
        entries: [{ task_id: taskId, legacy_protected_conflict_adoption: {} }],
      }),
      "utf8",
    );
    const gitDirResult = await execFileAsync("git", ["rev-parse", "--git-common-dir"], {
      cwd: root,
    });
    const gitDir = gitDirResult.stdout.trim();
    const episodePath = path.resolve(
      root,
      gitDir,
      "agentplane",
      "supervisor",
      "episodes",
      taskId,
      "journal.json",
    );
    await mkdir(path.dirname(episodePath), { recursive: true });
    await writeFile(episodePath, '{"schema_version":0}\n', "utf8");
    const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const head = headResult.stdout.trim();
    await execFileAsync("git", ["update-ref", `refs/replace/${"1".repeat(40)}`, head], {
      cwd: root,
    });

    const report = await inspectLegacyCompatibilityUsage({
      repoRoot: root,
      manifest: COMPATIBILITY_RETIREMENT_MANIFEST,
    });

    expect(statusMap(report)).toMatchObject({
      "config.legacy_json": "used",
      "workflow.contract_v1": "used",
      "task.readme_pre_v3": "used",
      "supervisor.execution_episode_v0": "used",
      "runner.task_local_storage": "used",
      "runner.result_manifest_v1": "used",
      "context.workspace_pre_maximum_assimilation_v2": "used",
      "pr.legacy_protected_conflict": "used",
      "cleanup.git_replacement_refs": "used",
    });
    expect(report.summary.used).toBe(9);
    expect(report.summary.unknown).toBe(3);
  });

  it("reports blocked probes and emits the stable JSON command contract", async () => {
    const root = await fixture();
    await writeFile(path.join(root, ".agentplane", "WORKFLOW.md"), "not front matter\n", "utf8");
    const direct = await inspectLegacyCompatibilityUsage({
      repoRoot: root,
      manifest: COMPATIBILITY_RETIREMENT_MANIFEST,
    });
    expect(statusMap(direct)["workflow.contract_v1"]).toBe("blocked");

    const io = captureStdIO();
    try {
      const code = await runDoctorLegacy(
        { cwd: root, rootOverride: root, outputMode: "json" },
        { json: true },
      );
      expect(code).toBe(0);
      const report = JSON.parse(io.stdout) as {
        kind: string;
        summary: { total: number; blocked: number };
        adapters: { id: string; status: string }[];
      };
      expect(report.kind).toBe("agentplane.doctor.legacy");
      expect(report.summary.total).toBe(COMPATIBILITY_RETIREMENT_MANIFEST.adapters.length);
      expect(report.summary.blocked).toBeGreaterThan(0);
      expect(report.adapters.map((adapter) => adapter.id)).toEqual(
        COMPATIBILITY_RETIREMENT_MANIFEST.adapters.map((adapter) => adapter.id),
      );
    } finally {
      io.restore();
    }
  });
});
