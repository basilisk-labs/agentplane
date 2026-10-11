import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { readTask } from "@agentplaneorg/core/tasks";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import {
  createSupervisorEpisodeStore,
  openSupervisorExecutionEpisode,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  addTask,
  commitTarget,
  installFakeCodex,
  replaceCodexWithFailure,
  runEvaluatorCliInSeparateProcess,
  runWithFakeCodex,
  waitForFileText,
  writeVerificationRecord,
} from "./evaluator-execute-subprocess.testkit.js";

describe("evaluator execute supervisor episode", () => {
  it.each([false, true])(
    "handles a completed lifecycle operation with human stop %s",
    async (stopped) => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const taskId = "202609280000-EE18";
      await addTask(root, taskId);
      await commitTarget(root);
      const fakeBin = await installFakeCodex(root);
      const fingerprint = digestSupervisorEpisodeValue({ stage: "worktree.prepare" });
      const opened = await openSupervisorExecutionEpisode({
        git_root: root,
        task_id: taskId,
        task_revision: null,
        state_fingerprint_digest: fingerprint,
      });
      const started = startSupervisorExecutionEpisode({
        journal: opened.journal,
        role: "EXECUTOR",
        kind: "cli_operation",
        operation_identity: { id: "worktree.prepare" },
        precondition_fingerprint_digest: fingerprint,
        authority_ref: "workflow-operation:worktree.prepare",
        authority_digest: fingerprint,
      });
      if (started.status !== "started") throw new Error("expected lifecycle fixture intent");
      const completed = completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: { worktree_prepared: true },
        usage: {},
      });
      const saved = stopped
        ? stopSupervisorExecutionEpisode({ journal: completed, reason: "human_review" })
        : completed;
      await opened.store.write(saved);

      const execution = await runWithFakeCodex(root, taskId, fakeBin);

      if (stopped) {
        expect(execution.code).toBe(8);
        expect(validateSupervisorExecutionEpisodeJournal(await opened.store.read())).toEqual(saved);
        return;
      }
      expect(execution.code, execution.stderr).toBe(0);
      const journal = validateSupervisorExecutionEpisodeJournal(await opened.store.read());
      expect(journal).toMatchObject({
        status: "running",
        cursor: { phase: "ready" },
        usage: { episodes: 2, agent_runs: 1 },
        operations: [
          { role: "EXECUTOR", kind: "cli_operation", status: "completed" },
          { role: "EVALUATOR", kind: "evaluator_episode", status: "completed" },
        ],
      });
      expect(journal.operations[0]?.operation_key).toBe(started.operation_key);
      expect(journal.operations[0]?.result_digest).toBe(completed.operations[0]?.result_digest);
    },
  );

  it("persists one bounded EVALUATOR episode and applies its durable result", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE01";
    await addTask(root, taskId);
    await commitTarget(root);
    const verificationRecordPath = await writeVerificationRecord(root, taskId);
    const fakeBin = await installFakeCodex(root);

    const execution = await runWithFakeCodex(root, taskId, fakeBin);

    expect(execution.code, execution.stderr).toBe(0);
    expect(execution.stderr).toBe("");
    const payload = JSON.parse(execution.stdout) as {
      verdict: string;
      supervisor_episode: {
        status: string;
        cursor: { phase: string };
        usage: { episodes: number; agent_runs: number; total_tokens: number };
      };
    };
    expect(payload).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready" },
        usage: { episodes: 1, agent_runs: 1, total_tokens: 150 },
      },
    });
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      state: "pass",
      updated_by: "EVALUATOR",
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const journal = await createSupervisorEpisodeStore(journalPath).read();
    expect(journal).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 1, total_tokens: 150 },
      operations: [{ role: "EVALUATOR", kind: "evaluator_episode", status: "completed" }],
    });
    expect(JSON.stringify(journal)).not.toContain("evaluator_result");
    const completedOperation = (
      journal as { operations: { work_order_ref?: string | null }[] }
    ).operations.at(-1);
    if (!completedOperation?.work_order_ref)
      throw new Error("missing evaluator work order reference");
    const parsedWorkOrder: unknown = JSON.parse(
      await readFile(path.join(root, completedOperation.work_order_ref), "utf8"),
    );
    const workOrder = parsedWorkOrder as {
      evidence: { id: string; kind: string; path: string; required: boolean; sha256: string }[];
    };
    const verificationEvidence = workOrder.evidence.find(
      (evidence) => evidence.kind === "verification_log",
    );
    expect(verificationEvidence).toMatchObject({
      id: "verification-record-1",
      path: path.relative(root, verificationRecordPath).replaceAll("\\\\", "/"),
      required: true,
    });
    expect(verificationEvidence?.sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it("applies human_review and preserves its terminal supervisor stop", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE13";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const previousVerdict = process.env.AGENTPLANE_FAKE_CODEX_VERDICT;
    process.env.AGENTPLANE_FAKE_CODEX_VERDICT = "human_review";
    let execution;
    try {
      execution = await runWithFakeCodex(root, taskId, fakeBin);
    } finally {
      if (previousVerdict === undefined) delete process.env.AGENTPLANE_FAKE_CODEX_VERDICT;
      else process.env.AGENTPLANE_FAKE_CODEX_VERDICT = previousVerdict;
    }

    expect(execution.code, execution.stderr).toBe(0);
    expect(JSON.parse(execution.stdout)).toMatchObject({
      verdict: "human_review",
      supervisor_episode: {
        status: "stopped",
        cursor: { phase: "stopped" },
        stop: { reason: "human_review" },
      },
    });
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      state: "human_review",
      updated_by: "EVALUATOR",
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const persisted = validateSupervisorExecutionEpisodeJournal(
      await createSupervisorEpisodeStore(journalPath).read(),
    );
    expect(persisted).toMatchObject({
      status: "stopped",
      cursor: { phase: "stopped" },
      stop: { reason: "human_review" },
      operations: [{ status: "completed" }],
    });
  });

  it("applies a completed EVALUATOR result while keeping token usage informational", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE11";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    const decision = await buildTaskRouteDecision({
      cwd: root,
      rootOverride: root,
      taskId,
      includeRemote: false,
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    await store.write(
      createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: task.frontmatter.revision ?? null,
        state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
        budget: {
          max_episodes: 50,
          max_agent_runs: 50,
          max_input_tokens: 100,
          max_output_tokens: 1_000_000,
          max_total_tokens: 4_000_000,
          max_wall_time_ms: 4 * 60 * 60 * 1000,
          max_changed_files: 2000,
          max_diff_lines: null,
          max_no_progress_episodes: 3,
        },
      }),
    );

    const execution = await runWithFakeCodex(root, taskId, fakeBin);

    expect(execution.code, execution.stderr).toBe(0);
    expect(JSON.parse(execution.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready" },
        stop: null,
      },
    });
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      state: "pass",
      updated_by: "EVALUATOR",
    });
    const persisted = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(persisted).toMatchObject({
      status: "running",
      cursor: { phase: "ready" },
      stop: null,
      operations: [{ status: "completed" }],
    });
    expect(persisted.operations.at(-1)?.postcondition_fingerprint_digest).toMatch(
      /^sha256:[a-f0-9]{64}$/u,
    );
  });

  it("resumes a completed evaluator outcome without launching Codex again", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE02";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const initial = await runWithFakeCodex(root, taskId, fakeBin);
    expect(initial.code).toBe(0);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const advanced = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = advanced.operations.at(-1);
    if (!operation?.work_order_ref) throw new Error("missing evaluator work order reference");
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: advanced.task_revision,
      state_fingerprint_digest: operation.precondition_fingerprint_digest,
      budget: advanced.budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { resume: operation.work_order_ref },
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      work_order_ref: operation.work_order_ref,
      effect_ref: operation.effect_ref,
    });
    if (started.status !== "started") throw new Error("expected evaluator fixture intent");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: { persisted: true },
        usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
      }),
    );
    await replaceCodexWithFailure(fakeBin);

    const resumed = await runWithFakeCodex(root, taskId, fakeBin);

    expect(resumed.code).toBe(0);
    expect(JSON.parse(resumed.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: { cursor: { phase: "ready" }, usage: { total_tokens: 150 } },
    });
  });

  it("starts a new evaluator episode after a completed stale-state stop", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE05";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const initial = await runWithFakeCodex(root, taskId, fakeBin);
    expect(initial.code).toBe(0);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const readyBeforeStateChange = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(readyBeforeStateChange).toMatchObject({
      status: "running",
      stop: null,
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 1 },
    });

    const docIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          "Task state changed after the first evaluator episode.",
          "--updated-by",
          "CODER",
          "--root",
          root,
        ]),
      ).toBe(0);
    } finally {
      docIo.restore();
    }

    // task doc set changes the routed fingerprint but does not create a
    // stopped journal. A successful retry must therefore take the
    // stale-state branch returned by this command's own start attempt.
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toEqual(
      readyBeforeStateChange,
    );

    const repeated = await runWithFakeCodex(root, taskId, fakeBin);

    expect(repeated.code, repeated.stderr).toBe(0);
    expect(JSON.parse(repeated.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2, total_tokens: 300 },
      },
    });
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      usage: { episodes: 2, agent_runs: 2, total_tokens: 300 },
      operations: [
        { role: "EVALUATOR", kind: "evaluator_episode", status: "completed" },
        { role: "EVALUATOR", kind: "evaluator_episode", status: "completed" },
      ],
    });
  });

  it("completes an evaluator intent from its durable outcome without launching Codex again", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE03";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const initial = await runWithFakeCodex(root, taskId, fakeBin);
    expect(initial.code).toBe(0);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const advanced = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = advanced.operations.at(-1);
    if (!operation?.work_order_ref) throw new Error("missing evaluator work order reference");
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: advanced.task_revision,
      state_fingerprint_digest: operation.precondition_fingerprint_digest,
      budget: advanced.budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { resume: operation.work_order_ref },
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      work_order_ref: operation.work_order_ref,
      effect_ref: operation.effect_ref,
    });
    if (started.status !== "started") throw new Error("expected evaluator fixture intent");
    await store.write(started.journal);
    await replaceCodexWithFailure(fakeBin);

    const resumed = await runWithFakeCodex(root, taskId, fakeBin);

    expect(resumed.code).toBe(0);
    expect(JSON.parse(resumed.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: { cursor: { phase: "ready" }, usage: { total_tokens: 150 } },
    });
  });

  it("leaves an unrelated pending PLANNER intent unchanged", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE12";
    await addTask(root, taskId);
    await commitTarget(root);
    await writeVerificationRecord(root, taskId);
    const fakeBin = await installFakeCodex(root);
    const decision = await buildTaskRouteDecision({
      cwd: root,
      rootOverride: root,
      taskId,
      includeRemote: false,
    });
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: null,
      state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
      budget: {
        max_episodes: 50,
        max_agent_runs: 50,
        max_input_tokens: 3_000_000,
        max_output_tokens: 1_000_000,
        max_total_tokens: 4_000_000,
        max_wall_time_ms: 4 * 60 * 60 * 1000,
        max_changed_files: 2000,
        max_diff_lines: null,
        max_no_progress_episodes: 3,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "PLANNER",
      kind: "agent_episode",
      operation_identity: { purpose: "planning" },
      precondition_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
      authority_ref: "external-agent:planner",
      authority_digest: decision.workflowStep.preconditionFingerprint.digest,
      work_order_ref: ".agentplane/external-agent/planner-work-order.json",
      effect_ref: "external-agent:planner-result",
    });
    if (started.status !== "started") throw new Error("expected pending PLANNER intent");
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    await store.write(started.journal);

    const execution = await runWithFakeCodex(root, taskId, fakeBin);

    expect(execution.code).toBe(8);
    expect(execution.stderr).toContain("unrelated pending PLANNER agent_episode intent");
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toEqual(started.journal);
  });

  it("records a known read-only provider failure without reopening its intent", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE04";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);

    const failed = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failed.code).toBe(8);
    expect(failed.stderr).toContain(
      "Codex evaluator provider failed before returning a typed result",
    );
    expect(failed.stderr).toContain("classification=nonzero_exit exit_code=99 signal=none");

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const recorded = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(recorded).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      cursor: { phase: "stopped" },
      usage: { episodes: 1, agent_runs: 1, token_observed_agent_runs: 1 },
      operations: [
        {
          role: "EVALUATOR",
          kind: "evaluator_episode",
          status: "failed",
          provider_usage: {
            provider: "codex",
            thread_id: "failed-thread",
            turn_id: "failed-turn",
          },
        },
      ],
    });
    expect(recorded.operations[0]?.provider_usage?.work_order_id).toMatch(
      /^evaluator-work-order-/u,
    );
    expect(recorded.usage.wall_time_ms).toBeGreaterThan(0);
    expect(JSON.stringify(recorded)).not.toContain("provider diagnostics");

    const retry = await runWithFakeCodex(root, taskId, fakeBin);
    expect(retry.code).toBe(8);
    const afterRetry = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(afterRetry.usage).toMatchObject({ episodes: 1, agent_runs: 1 });

    await installFakeCodex(root);
    const replacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);
    expect(replacement.code, replacement.stderr).toBe(0);
    expect(JSON.parse(replacement.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2, total_tokens: 150 },
      },
    });
    const replaced = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(replaced.operations[0]).toEqual(recorded.operations[0]);
    expect(replaced).toMatchObject({
      operations: [
        { status: "failed" },
        {
          role: "EVALUATOR",
          kind: "evaluator_episode",
          status: "completed",
          replacement_of_operation_key: recorded.operations[0]?.operation_key,
        },
      ],
    });

    const interrupted = startSupervisorExecutionEpisode({
      journal: createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: replaced.task_revision,
        state_fingerprint_digest: replaced.state_fingerprint_digest,
        budget: replaced.budget,
      }),
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { fixture: "interrupted" },
      precondition_fingerprint_digest: replaced.state_fingerprint_digest,
    });
    if (interrupted.status !== "started") throw new Error("expected interrupted evaluator intent");
    await store.write(
      recoverSupervisorExecutionEpisodeJournal({
        journal: interrupted.journal,
        state_fingerprint_digest: replaced.state_fingerprint_digest,
      }),
    );
    const effectInDoubtReplacement = await runWithFakeCodex(root, taskId, fakeBin, [
      "--replacement",
    ]);
    expect(effectInDoubtReplacement.code).toBe(2);
    expect(effectInDoubtReplacement.stderr).toContain(
      "requires a terminal operation_failed journal",
    );

    const budgetLimited = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: replaced.task_revision,
      state_fingerprint_digest: replaced.state_fingerprint_digest,
      budget: { ...replaced.budget, max_episodes: 1, max_agent_runs: 1 },
    });
    const exhaustedIntent = startSupervisorExecutionEpisode({
      journal: budgetLimited,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { fixture: "budget-limited" },
      precondition_fingerprint_digest: replaced.state_fingerprint_digest,
    });
    if (exhaustedIntent.status !== "started") throw new Error("expected budget-limited intent");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal: exhaustedIntent.journal,
        operation_key: exhaustedIntent.operation_key,
        result: { fixture: "provider-failed" },
        failed: true,
      }),
    );
    const exhaustedReplacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);
    expect(exhaustedReplacement.code, exhaustedReplacement.stderr).toBe(0);
  });

  it("allows one replacement after external waiting following a real provider failure", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE09";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const failed = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failed.code).toBe(8);
    const recordedFailure = validateSupervisorExecutionEpisodeJournal(await store.read());
    const { digest: _ignoredDigest, ...failurePayload } = recordedFailure;
    const agedFailurePayload = {
      ...failurePayload,
      started_at: "2000-01-01T00:00:00.000Z",
    };
    await store.write(
      validateSupervisorExecutionEpisodeJournal({
        ...agedFailurePayload,
        digest: digestSupervisorEpisodeValue(agedFailurePayload),
      }),
    );
    await installFakeCodex(root);

    const replacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);

    expect(replacement.code, replacement.stderr).toBe(0);
    const recorded = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(recorded).toMatchObject({
      status: "running",
      usage: { episodes: 2, agent_runs: 2 },
      operations: [
        { status: "failed" },
        {
          status: "completed",
          replacement_of_operation_key: recordedFailure.operations[0]?.operation_key,
        },
      ],
    });
    expect(recorded.usage.wall_time_ms).toBeGreaterThanOrEqual(recordedFailure.usage.wall_time_ms);
  });

  it("allows failure replacement regardless of observed wall time", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE10";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const invocationLog = path.join(root, "provider-invocations.log");
    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    const decision = await buildTaskRouteDecision({
      cwd: root,
      rootOverride: root,
      taskId,
      includeRemote: false,
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    await store.write(
      createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: task.frontmatter.revision ?? null,
        state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
        budget: {
          max_episodes: 50,
          max_agent_runs: 50,
          max_input_tokens: 3_000_000,
          max_output_tokens: 1_000_000,
          max_total_tokens: 4_000_000,
          max_wall_time_ms: 1000,
          max_changed_files: 2000,
          max_diff_lines: null,
          max_no_progress_episodes: 3,
        },
      }),
    );
    const previousLog = process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;
    process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS = invocationLog;
    try {
      await replaceCodexWithFailure(fakeBin, 1100);
      const failed = await runWithFakeCodex(root, taskId, fakeBin);
      expect(failed.code).toBe(3);
      const recordedFailure = validateSupervisorExecutionEpisodeJournal(await store.read());
      expect(recordedFailure.usage.wall_time_ms).toBeGreaterThanOrEqual(1000);
      expect(recordedFailure.budget.max_wall_time_ms).toBe(1000);
      await installFakeCodex(root);

      const replacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);

      expect(replacement.code, replacement.stderr).toBe(0);
      expect(await readFile(invocationLog, "utf8")).toBe("provider-started\nprovider-started\n");
    } finally {
      if (previousLog === undefined) delete process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;
      else process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS = previousLog;
    }
  });

  it("atomically consumes one replacement authorization before any second provider start", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE06";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);
    const failed = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failed.code).toBe(8);

    await installFakeCodex(root);
    const invocationLog = path.join(
      path.dirname(root),
      `${taskId}-${path.basename(root)}-provider-invocations.log`,
    );
    await writeFile(invocationLog, "", "utf8");
    const previousPath = process.env.PATH;
    const previousInvocationLog = process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;
    const previousDelay = process.env.AGENTPLANE_FAKE_CODEX_DELAY_MS;
    process.env.PATH = `${fakeBin}${path.delimiter}${previousPath ?? ""}`;
    process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS = invocationLog;
    process.env.AGENTPLANE_FAKE_CODEX_DELAY_MS = "100";
    const io = captureStdIO();
    let codes: number[] = [];
    try {
      codes = await Promise.all(
        [1, 2].map(() =>
          runCli(["evaluator", "execute", taskId, "--replacement", "--json", "--root", root]),
        ),
      );
    } finally {
      io.restore();
      if (previousPath === undefined) delete process.env.PATH;
      else process.env.PATH = previousPath;
      if (previousInvocationLog === undefined) delete process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS;
      else process.env.AGENTPLANE_FAKE_CODEX_INVOCATIONS = previousInvocationLog;
      if (previousDelay === undefined) delete process.env.AGENTPLANE_FAKE_CODEX_DELAY_MS;
      else process.env.AGENTPLANE_FAKE_CODEX_DELAY_MS = previousDelay;
    }

    expect(codes.toSorted(), io.stderr).toEqual([0, 2]);
    const invocationContents = await readFile(invocationLog, "utf8");
    const invocationLines = invocationContents.trim().split("\n");
    expect(invocationLines).toEqual(["provider-started"]);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const concurrentJournal = await createSupervisorEpisodeStore(journalPath).read();
    const concurrentEpisode = validateSupervisorExecutionEpisodeJournal(concurrentJournal);
    expect(concurrentEpisode).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 2, agent_runs: 2 },
      operations: [{ status: "failed" }, { status: "completed" }],
    });
    expect(concurrentEpisode.operations[1]?.replacement_of_operation_key).toMatch(/^sha256:/u);
  });

  it("resumes a durably reserved replacement before provider intent", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE07";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);
    const failedExecution = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failedExecution.code).toBe(8);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const failedJournal = await store.read();
    const failed = validateSupervisorExecutionEpisodeJournal(failedJournal);
    const reserved = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal: failed,
      state_fingerprint_digest: `sha256:${"f".repeat(64)}`,
    });
    expect(await store.compareAndSwap(failed.digest, reserved)).toBe(true);
    const reservedJournal = await store.read();
    expect(validateSupervisorExecutionEpisodeJournal(reservedJournal)).toMatchObject({
      status: "running",
      cursor: {
        phase: "ready",
        operation_key: null,
        replacement_of_operation_key: failed.operations[0]?.operation_key,
      },
    });

    await installFakeCodex(root);
    const resumed = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);
    expect(resumed.code, resumed.stderr).toBe(0);
    const completedJournal = await store.read();
    const completed = validateSupervisorExecutionEpisodeJournal(completedJournal);
    expect(completed).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      operations: [
        { status: "failed" },
        {
          status: "completed",
          replacement_of_operation_key: failed.operations[0]?.operation_key,
        },
      ],
    });
  });

  it("allows exactly one provider start across independent replacement CLI processes", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE08";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);
    const failedExecution = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failedExecution.code).toBe(8);

    await installFakeCodex(root);
    const invocationLog = path.join(
      path.dirname(root),
      `${taskId}-${path.basename(root)}-process-provider-invocations.log`,
    );
    await writeFile(invocationLog, "", "utf8");
    const childEnv = {
      AGENTPLANE_FAKE_CODEX_INVOCATIONS: invocationLog,
      AGENTPLANE_FAKE_CODEX_DELAY_MS: "2000",
    };
    const winner = runEvaluatorCliInSeparateProcess({
      root,
      taskId,
      fakeBin,
      executeArgs: ["--replacement"],
      env: childEnv,
    });
    await waitForFileText(invocationLog, "provider-started\n");
    const loser = runEvaluatorCliInSeparateProcess({
      root,
      taskId,
      fakeBin,
      executeArgs: ["--replacement"],
      env: childEnv,
    });
    const executions = await Promise.all([winner, loser]);

    expect(
      executions.map((execution) => execution.code).toSorted(),
      JSON.stringify(executions, null, 2),
    ).toEqual([0, 2]);
    const invocationContents = await readFile(invocationLog, "utf8");
    const invocationLines = invocationContents.trim().split("\n");
    expect(invocationLines).toEqual(["provider-started"]);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const processJournal = await createSupervisorEpisodeStore(journalPath).read();
    const processEpisode = validateSupervisorExecutionEpisodeJournal(processJournal);
    expect(processEpisode).toMatchObject({
      status: "running",
      usage: { episodes: 2, agent_runs: 2 },
      operations: [{ status: "failed" }, { status: "completed" }],
    });
    expect(processEpisode.operations[1]?.replacement_of_operation_key).toMatch(/^sha256:/u);
  }, 90_000);
});
