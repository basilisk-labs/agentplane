import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { expect } from "vitest";
import {
  commitAll,
  configureGitUser,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";
import { buildOpenedPrMeta, buildObservedChangeRequestMeta } from "../shared/pr-meta/builders.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { projectKernelOperationalEvidence } from "./kernel-operational-projection.js";

export function git(root: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
export async function fixture(
  repositoryMode: "direct" | "branch_pr" = "branch_pr",
  securityCi = false,
  leaveReviewDirty = false,
) {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = repositoryMode;
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"]) {
    await writeFile(
      path.join(root, ".agentplane/policy", name),
      "# Fixture policy\nPreserve task authority and require independent review.\n",
    );
  }
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/context/\n.agentplane/cache/\n.agentplane/cache.sqlite\n.agentplane/cache.sqlite-wal\n.agentplane/cache.sqlite-shm\n",
  );
  await writeFile(path.join(root, "source.txt"), "before\n");
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ private: true, scripts: { test: "node check.mjs" } }),
  );
  await writeFile(
    path.join(root, "check.mjs"),
    "import assert from 'node:assert/strict'; import fs from 'node:fs'; assert.equal(fs.readFileSync('source.txt','utf8'),'after\\n');\n",
  );
  await commitAll(root, "seed");
  const base = git(root, "rev-parse", "HEAD");
  const journey = kernelReplayJourney("direct");
  const id = journey.task.id;
  git(root, "config", "agentplane.baseBranch", "main");
  git(root, "checkout", "-b", `task/${id}/repair`);
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as k.Sha256Digest;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(saved),
    writeTask: (next) => {
      saved = next;
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, identity);
  for (const [index, step] of journey.steps.entries()) {
    const input = structuredClone(step.input);
    input.authority = { ...input.authority!, repository_identity: identity };
    const result =
      index === 0 ? await adapter.create(journey.task, input) : await adapter.execute(input);
    expect(result.kind, JSON.stringify(result)).toBe("committed");
  }
  const task = saved! as TaskData;
  task.execution_contract = resolveExplicitExecutionContract({
    config,
    parsed: {
      route: "branch_pr",
      verify: ["git diff --check"],
      scopeRoots: securityCi ? ["source.txt", ".github"] : ["source.txt"],
      repositoryEffects: securityCi ? ["source_code", "ci"] : ["source_code"],
    },
    intent: { taskKind: "code", mutationScope: "code" },
  });
  task.execution_route = {
    requested_mode: "branch_pr",
    selected_mode: "branch_pr",
    repository_mode: repositoryMode,
    schema_version: 1,
    reason_codes: ["explicit_branch_pr"],
    frozen: true,
  };
  task.verify = ["git diff --check"];
  task.task_kind = "code";
  if (securityCi) task.risk_flags = ["security", "merge", "network"];
  task.mutation_scope = "code";
  task.extensions = {
    ...task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: "main",
      base_sha: base,
      repository_identity: identity,
    },
    implementation_commit: { hash: base },
  };
  task.plan_approval = {
    state: "approved",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "USER",
    note: "Fixture approved",
  };
  task.verification = {
    state: "ok",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "SUPERVISOR",
    note: "Previous implementation checked",
  };
  task.quality_review = {
    state: "rework",
    provenance: "evaluator_supplied",
    updated_at: "2026-10-06T01:00:00.000Z",
    updated_by: "EVALUATOR",
    note: "Repair source",
    evaluated_sha: base,
    evidence_refs: [`.agentplane/tasks/${id}/quality/review/quality-report.json`],
    findings: ["Repair source"],
  };
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  task.doc =
    "## Summary\nRepair source.\n\n## Plan\nRepair the approved source.\n\n## Verify Steps\n- git diff --check\n\n## Verification\nPrevious checks passed.\n";
  await command.taskBackend.writeTask(task);
  const prDir = path.join(root, ".agentplane", "tasks", id, "pr");
  await mkdir(prDir, { recursive: true });
  const at = "2026-10-06T00:00:00.000Z";
  const meta = buildObservedChangeRequestMeta({
    meta: buildOpenedPrMeta({
      taskId: id,
      branch: git(root, "branch", "--show-current"),
      base: "main",
      at,
      previousMeta: null,
    }),
    observed: {
      prNumber: 12,
      prUrl: "https://github.com/owner/project/pull/12",
      status: "OPEN",
      base: "main",
      headSha: base,
      mergedAt: null,
      mergeCommit: null,
    },
    at,
  });
  await writeFile(path.join(prDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  await commitAll(root, "task fixture");
  const implementation = git(root, "rev-parse", "HEAD");
  if (leaveReviewDirty) {
    // Model the native operational projection already present in completed tasks.
    // The dirty independent REWORK review below must survive metadata persistence.
    const repository = {
      schema_version: 1 as const,
      kind: "canonical_repository_evidence" as const,
      task_id: id,
      work_item_id: "implementation",
      task_revision: task.revision ?? 0,
      work_order_id: k.kernelDigest("fixture implementation order"),
      checkout: root,
      branch: git(root, "branch", "--show-current"),
      base_commit: base,
      implementation_commit: implementation,
      implementation_tree: git(root, "rev-parse", "HEAD^{tree}"),
      changed_paths: [] as string[],
      evaluator_target: implementation,
      implementation_evidence: {
        artifact_path: ".agentplane/tasks/fixture/implementation.json",
        implementation_commit: implementation,
        changed_paths: [] as string[],
      },
    };
    await projectKernelOperationalEvidence({
      command,
      task_id: id,
      repository_evidence: { ...repository, digest: k.kernelDigest(repository) },
      verification_evidence_digest: k.kernelDigest("fixture verification"),
      review_identity_digest: k.kernelDigest("fixture passing review"),
      evidence_refs: [],
      findings: ["Previous implementation passed"],
      projected_at: at,
    });
  }
  const current = (await command.taskBackend.getTask(id))!;
  await command.taskBackend.writeTask({
    ...current,
    commit: { hash: implementation, message: "Fixture implementation" },
    quality_review: { ...task.quality_review!, evaluated_sha: implementation },
  });
  if (leaveReviewDirty) {
    git(root, "diff", "--check");
    expect(
      await cmdVerifyParsed({
        ctx: command,
        cwd: root,
        rootOverride: undefined,
        taskId: id,
        state: "ok",
        by: "SUPERVISOR",
        note: "Native fixture verification passed.",
        details: ["affected_unit_integration", "critical_paths", "task_outcome"]
          .map(
            (check) =>
              `Check: ${check}\nCommand: git diff --check\nResult: pass\nEvidence: actual fixture Git check passed\nScope: task implementation`,
          )
          .join("\n\n"),
        quiet: true,
        allowCanonicalProjection: true,
      }),
    ).toBe(0);
  } else await commitAll(root, "record review");
  const persisted = (await command.taskBackend.getTask(id))!;
  return { root, id, kernel: persisted.extensions?.task_kernel };
}
