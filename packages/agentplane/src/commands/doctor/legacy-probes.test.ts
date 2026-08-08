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
    expect(
      COMPATIBILITY_RETIREMENT_MANIFEST.adapters.every(
        (adapter) => adapter.migration_command.trim().length > 0,
      ),
    ).toBe(true);
    expect(
      COMPATIBILITY_RETIREMENT_MANIFEST.adapters.every(
        (adapter) =>
          adapter.remove_in !== null ||
          adapter.retirement_policy.support_until !== null ||
          adapter.retirement_policy.minimum_zero_usage_releases !== null ||
          adapter.retirement_policy.archive_conversion !== null ||
          adapter.retirement_policy.kind === "permanent_historical_reader",
      ),
    ).toBe(true);

    const duplicate = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    duplicate.adapters.push(structuredClone(duplicate.adapters[0]!));
    expect(() => validateCompatibilityRetirementManifest(duplicate)).toThrow(/duplicate adapter/u);

    const malformedSemver = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST) as unknown as {
      adapters: { introduced_in: string }[];
    };
    malformedSemver.adapters[0]!.introduced_in = "v0.7";
    expect(() => validateCompatibilityRetirementManifest(malformedSemver)).toThrow();

    const invertedWindow = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST) as unknown as {
      adapters: { introduced_in: string; deprecated_in: string | null }[];
    };
    invertedWindow.adapters[0]!.introduced_in = "0.7.1";
    invertedWindow.adapters[0]!.deprecated_in = "0.7.0";
    expect(() => validateCompatibilityRetirementManifest(invertedWindow)).toThrow(
      /precedes introduced_in/u,
    );

    const unknownProbe = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST) as unknown as {
      adapters: { usage_probe: { kind: string } }[];
    };
    unknownProbe.adapters[0]!.usage_probe.kind = "unknown_probe";
    expect(() => validateCompatibilityRetirementManifest(unknownProbe)).toThrow();

    const missingMigration = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST) as unknown as {
      adapters: { migration_command: string | null }[];
    };
    missingMigration.adapters[0]!.migration_command = null;
    expect(() => validateCompatibilityRetirementManifest(missingMigration)).toThrow();

    const unboundedRetirement = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    unboundedRetirement.adapters[0]!.retirement_policy = {
      kind: "zero_usage_window",
      support_until: null,
      minimum_zero_usage_releases: null,
      archive_conversion: null,
      compatibility_scope: "migration_only",
    };
    expect(() => validateCompatibilityRetirementManifest(unboundedRetirement)).toThrow(
      /missing its required bound/u,
    );

    const unsafePermanentReader = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    unsafePermanentReader.adapters[2]!.retirement_policy.compatibility_scope = "recovery_only";
    expect(() => validateCompatibilityRetirementManifest(unsafePermanentReader)).toThrow(
      /missing its required bound/u,
    );

    const staleSource = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    staleSource.adapters[0]!.source_paths = ["packages/agentplane/src/missing-legacy-adapter.ts"];
    await expect(
      validateCompatibilityRetirementSourcePaths(process.cwd(), staleSource),
    ).rejects.toThrow(/missing or not a file/u);

    const directorySource = structuredClone(COMPATIBILITY_RETIREMENT_MANIFEST);
    directorySource.adapters[0]!.source_paths = ["packages/agentplane/src/commands/doctor"];
    await expect(
      validateCompatibilityRetirementSourcePaths(process.cwd(), directorySource),
    ).rejects.toThrow(/missing or not a file/u);
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
    expect(report.retirement_summary).toEqual({
      scheduled_removal: 3,
      support_window: 1,
      zero_usage_window: 3,
      archive_conversion: 2,
      permanent_historical_reader: 3,
    });
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
        retirement_summary: { permanent_historical_reader: number };
        adapters: { id: string; status: string; migration_command: string }[];
      };
      expect(report.kind).toBe("agentplane.doctor.legacy");
      expect(report.summary.total).toBe(COMPATIBILITY_RETIREMENT_MANIFEST.adapters.length);
      expect(report.summary.blocked).toBeGreaterThan(0);
      expect(report.adapters.map((adapter) => adapter.id)).toEqual(
        COMPATIBILITY_RETIREMENT_MANIFEST.adapters.map((adapter) => adapter.id),
      );
      expect(report.adapters.every((adapter) => adapter.migration_command.trim().length > 0)).toBe(
        true,
      );
      expect(report.retirement_summary.permanent_historical_reader).toBe(3);
    } finally {
      io.restore();
    }

    const humanIo = captureStdIO();
    try {
      const code = await runDoctorLegacy(
        { cwd: root, rootOverride: root, outputMode: "human" },
        { json: false },
      );
      expect(code).toBe(0);
      expect(
        humanIo.stdout.split("\n").filter((line) => line.startsWith("  migrate=")),
      ).toHaveLength(COMPATIBILITY_RETIREMENT_MANIFEST.adapters.length);
      expect(humanIo.stdout).not.toContain("manual policy decision required");
      expect(humanIo.stdout).toContain(
        "Retirement policies: remove=3 support=1 zero_usage=3 archive=2 permanent_reader=3",
      );
      expect(humanIo.stdout).toContain(
        "policy=permanent_historical_reader scope=historical_reader",
      );
      expect(humanIo.stdout).toContain(
        "removal_blocker=The published workspace upgrade promise needs a defined support window after observed usage reaches zero.",
      );
      expect(humanIo.stdout).toContain("removal_blocker=none");
    } finally {
      humanIo.restore();
    }
  });
});
