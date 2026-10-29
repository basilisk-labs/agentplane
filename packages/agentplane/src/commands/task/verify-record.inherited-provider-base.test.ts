import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  makeKernelRecord,
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { createCanonicalTask } from "./kernel-create.js";
import {
  runDirectTaskVerification,
  renderDirectTaskVerificationDetails,
} from "./direct-task-verification.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";
import { deriveBlockers } from "../shared/route-decision-blockers.js";
import { reduceRouteState } from "../shared/workflow-step-reducer.js";
import {
  routeState,
  prFlow as samplePrFlow,
  resume as sampleResume,
} from "../shared/workflow-step.testkit.js";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { retainProviderUpdateVerificationProof } from "../pr/provider-update-verification-proof.js";
import {
  resolveObservedVerificationChangeSet,
  reconcileVerificationExecutionContract,
} from "./verify-record-observed-changes.js";

async function fixture(overlap: boolean) {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_GLOBAL: os.devNull, GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "-b", "main");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.test");
  git("remote", "add", "origin", "https://github.com/example/repo.git");
  await writeFile(path.join(root, "overlap.ts"), "base\n");
  git("add", ".");
  git("commit", "-m", "frozen base");
  const B = git("rev-parse", "HEAD");
  git("checkout", "-b", "task/test");
  await writeFile(path.join(root, "own.ts"), "task\n");
  if (overlap) await writeFile(path.join(root, "overlap.ts"), "task overlap\n");
  git("add", ".");
  git("commit", "-m", "task implementation");
  const H = git("rev-parse", "HEAD");
  git("checkout", "main");
  await writeFile(path.join(root, "foreign.ts"), "canonical\n");
  if (overlap) await writeFile(path.join(root, "overlap.ts"), "task overlap\n");
  git("add", ".");
  git("commit", "-m", "canonical source");
  const R = git("rev-parse", "HEAD");
  git("checkout", "task/test");
  git("merge", "--no-ff", "main", "-m", "provider update");
  const merged = git("rev-parse", "HEAD");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  const task = makeTaskFixture({
    id: "202610290115-NHR7T2",
    title: "Verify original task",
    description: "scope invariant",
    owner: "CODER",
  });
  const contract = resolveTaskExecutionContract({ config, task, requestedMode: "branch_pr" });
  contract.authority.writable_roots = ["overlap.ts", "own.ts"];
  const command = { resolvedProject: { gitRoot: root }, config, memo: {} } as CommandContext;
  const execution = {
    selected_mode: "branch_pr",
    base_ref: B,
    base_sha: B,
  } as TaskExecutionContext;
  const observe = () =>
    resolveObservedVerificationChangeSet({
      ctx: command,
      task,
      evaluatedSha: git("rev-parse", "HEAD"),
      artifactTaskIds: [task.id],
      execution,
    });
  const params = {
    taskId: task.id,
    identity: {
      provider: "github" as const,
      hostname: "github.com",
      remote: "origin",
      sourceProject: "example/repo",
      targetProject: "example/repo",
      sourceUrl: "https://github.com/example/repo.git",
      targetUrl: "https://github.com/example/repo.git",
    },
    prNumber: 1,
    branch: "task/test",
    baseBranch: "main",
    expectedHeadSha: H,
    expectedBaseSha: R,
  };
  const fp = `sha256:${"a".repeat(64)}`;
  const journal = createSupervisorExecutionEpisodeJournal({
    task_id: task.id,
    task_revision: 1,
    state_fingerprint_digest: fp,
    budget: {
      max_episodes: 10,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { id: "provider.pr.update_branch", params },
    precondition_fingerprint_digest: fp,
    authority_ref: "workflow-operation:provider.pr.update_branch",
    authority_digest: fp,
    effect_ref: `provider.pr.update_branch:${task.id}:${fp}:${operationPayloadDigest({ id: "provider.pr.update_branch", type: "provider_update_branch", params })}`,
  });
  if (started.status !== "started") throw new Error("missing native intent");
  const store = createSupervisorEpisodeStore(
    await resolveSupervisorExecutionEpisodePath({ git_root: root, task_id: task.id }),
  );
  await store.write(started.journal);
  const completion = {
    status: "succeeded",
    observed_postconditions: [`provider_update_head:${merged}`],
    exit_code: 0,
  };
  await retainProviderUpdateVerificationProof({
    command,
    params,
    authority_digest: fp,
    observed_head_sha: merged,
    completion,
  });
  const complete = () =>
    store.write(
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: completion,
      }),
    );
  return { root, git, B, H, merged, task, contract, execution, observe, complete };
}

describe("exact frozen base verification after native provider update", () => {
  it("reruns completed canonical Task verification at the combined head before routing fresh EVAL", async () => {
    const f = await fixture(false);
    await f.complete();
    const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
    command.config.workflow_mode = "branch_pr";
    const seed = { ...f.task, verify: ["node check.cjs"], execution_contract: f.contract };
    const created = await createCanonicalTask(command, seed);
    const identity = (await resolveLogicalRepositoryIdentity({
      git_root: f.root,
      task: created.task,
    })) as k.Sha256Digest;
    const raw = readKernelRecord(created.task, identity);
    if (raw.kind !== "canonical") throw new Error("missing canonical fixture");
    const original = makeKernelRecord(
      identity,
      {
        ...raw.record.aggregate,
        state: "COMPLETED",
        current_plan: {
          revision: 1,
          digest: k.kernelDigest("fixture plan"),
          state: "APPROVED",
          approval_actor_id: "USER",
          approval_evidence_digest: k.kernelDigest("fixture approval"),
          work_items: [],
        },
        final_validation: {
          status: "PASSED",
          identity: {
            implementation_identity: k.kernelDigest(f.H),
            check_id: "fixture-check",
            command_digest: k.kernelDigest(["node check.cjs"]),
            toolchain_digest: k.kernelDigest("node"),
            environment_digest: k.kernelDigest("fixture"),
          },
          evidence_digests: [k.kernelDigest("old verification")],
          observed_at: "2026-10-29T00:00:00.000Z",
        },
      },
      raw.record.events,
    );
    const task = {
      ...created.task,
      status: "DONE" as const,
      commit: { hash: f.H, message: "original implementation" },
      verification: { state: "ok" as const },
      quality_review: {
        state: "pass" as const,
        updated_by: "EVALUATOR",
        provenance: "evaluator_supplied" as const,
        evaluated_sha: f.H,
        updated_at: "2026-10-29T00:00:00.000Z",
        note: "old head review",
        findings: ["old head only"],
        evidence_refs: ["old/quality-report.json"],
      },
      extensions: {
        ...created.task.extensions,
        [TASK_KERNEL_EXTENSION]: original,
        task_execution_context: {
          schema_version: 1,
          base_ref: f.B,
          base_sha: f.B,
          source: "creation_checkout",
          repository_identity: identity,
        },
      },
    };
    await command.taskBackend.writeTask!(task);
    const read = readKernelRecord((await command.taskBackend.getTask(task.id))!, identity);
    if (read.kind !== "canonical") throw new Error(JSON.stringify(read));
    expect(read.record.aggregate.state).toBe("COMPLETED");
    expect(task.execution_contract?.verification.contract?.digest).toBeTruthy();
    const execution = await resolveTaskExecutionContext({
      ctx: command,
      tasks: [task],
      primaryTaskId: task.id,
    });
    // Check the combined tree, including the canonical file outside writable scope.
    await writeFile(
      path.join(f.root, "check.cjs"),
      "const fs=require('node:fs'); if(fs.readFileSync('foreign.ts','utf8')!=='canonical\\n'||fs.readFileSync('own.ts','utf8')!=='task\\n')process.exit(1);fs.writeFileSync('checked-head.txt','combined');\n",
    );
    const verification = await resolveImplementationVerificationTask({
      command,
      checkout: f.root,
      task: (await command.taskBackend.getTask(task.id))!,
      workflow: "branch_pr",
    });
    const observed = verification.snapshot;
    const reconciled = observed.execution_contract;
    expect(observed.evaluated_sha).toBe(f.merged);
    expect(observed.inherited_paths).toEqual(["foreign.ts"]);
    const resume = {
      ...sampleResume,
      task_id: task.id,
      task_status: "DONE",
      branch: "task/test",
      pr_branch: "task/test",
      head_sha: f.merged,
      workspace_root: f.root,
    };
    const flow = samplePrFlow("OPEN");
    flow.task = { id: task.id, status: "DONE", verification: "ok" };
    flow.branch = { name: "task/test", headSha: f.merged, metaHeadSha: f.merged };
    if (flow.pr.state === "OPEN") flow.pr.headSha = f.merged;
    const blockers = async () =>
      deriveBlockers({
        ctx: command,
        task: (await command.taskBackend.getTask(task.id))!,
        resume,
        workflowMode: "branch_pr",
        execution,
        prFlow: flow,
        batchOwnership: { role: "none" },
        cleanupProbe: { state: "not_requested" },
        taskWorktreeCleanliness: {
          state: "clean",
          branch: "task/test",
          worktreePath: f.root,
          changedPaths: [],
        },
        conflictRework: null,
      });
    const step = async () =>
      reduceRouteState(
        routeState({
          task: (await command.taskBackend.getTask(task.id))!,
          resume,
          prFlow: flow,
          blockers: await blockers(),
          qualityReviewTargetSha: f.merged,
        }),
      );
    const beforeStep = await step();
    expect(beforeStep.id).toBe("agent.verification");
    const checks = await runDirectTaskVerification({
      command,
      cwd: f.root,
      task_id: task.id,
      task: { ...task, execution_contract: reconciled },
      additional_only: true,
      additional_commands: [{ command: "node check.cjs" }],
    });
    expect(checks.status).toBe("passed");
    expect(await readFile(path.join(f.root, "checked-head.txt"), "utf8")).toBe("combined");
    await mkdir(path.join(f.root, ".agentplane", "tasks", task.id), { recursive: true });
    await cmdVerifyParsed({
      ctx: command,
      cwd: f.root,
      taskId: task.id,
      state: "ok",
      by: "SUPERVISOR",
      note: "Fresh combined-tree verification",
      details: renderDirectTaskVerificationDetails({
        task,
        taskId: task.id,
        workflow: "branch_pr",
        result: checks,
      }),
      verificationSnapshot: {
        execution_contract: reconciled,
        evaluated_sha: f.merged,
        ...observed,
      },
      allowCanonicalProjection: true,
      localOnly: false,
      quiet: true,
    });
    f.git("add", ".agentplane");
    f.git("commit", "-m", "retain native verification artifacts");
    flow.branch.headSha = f.git("rev-parse", "HEAD");
    if (flow.pr.state === "OPEN") flow.pr.headSha = flow.branch.headSha;
    resume.head_sha = flow.branch.headSha;
    const after = (await command.taskBackend.getTask(task.id))!;
    expect(after.execution_contract?.authority).toEqual(reconciled.authority);
    const afterBlockers = await blockers();
    expect(afterBlockers.filter((item) => item.code === "verification_required")).toEqual([]);
    const afterStep = await step();
    expect(afterStep.id).toBe("agent.quality_review");
    expect(after.extensions?.[TASK_KERNEL_EXTENSION]).toEqual(original);
    expect(after.quality_review?.evaluated_sha).toBe(f.H);
    expect(after.extensions?.task_execution_context).toEqual(
      task.extensions.task_execution_context,
    );
  });
  it.each([false, true])(
    "retains full frozen coverage and scopes actual Task edits, overlap=%s",
    async (overlap) => {
      const f = await fixture(overlap);
      const provisional = await f.observe();
      expect(provisional.inherited_paths).toEqual([]);
      await f.complete();
      const observed = await f.observe();
      expect(observed.changed_paths).toEqual([
        "foreign.ts",
        ...(overlap ? ["overlap.ts"] : []),
        "own.ts",
      ]);
      expect(observed.inherited_paths).toEqual(["foreign.ts"]);
      const contract = reconcileVerificationExecutionContract({
        contract: f.contract,
        ...observed,
      });
      expect(contract.observed.changed_paths).toEqual([
        ...(overlap ? ["overlap.ts"] : []),
        "own.ts",
      ]);
      expect(contract.observed.authority_violations).not.toContain("writable_scope:foreign.ts");
      expect(contract.verification.contract?.observed.changed_files).toContain("foreign.ts");
      expect(f.execution.base_ref).toBe(f.B);
      expect(f.execution.base_sha).toBe(f.B);
      await writeFile(path.join(f.root, "foreign.ts"), "later Task edit\n");
      f.git("add", "foreign.ts");
      f.git("commit", "-m", "later source edit");
      const changed = await f.observe();
      expect(changed.inherited_paths).toEqual([]);
      expect(
        reconcileVerificationExecutionContract({ contract: f.contract, ...changed }).observed
          .authority_violations,
      ).toContain("writable_scope:foreign.ts");
    },
  );
});
