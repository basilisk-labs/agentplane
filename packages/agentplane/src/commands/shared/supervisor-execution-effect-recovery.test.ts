import { deepStrictEqual, strictEqual } from "node:assert/strict";
import {
  buildStateFingerprint,
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import { recoverProvenNotAppliedWorktreePreparation } from "./supervisor-execution-effect-recovery.js";

const testRuntime =
  "Bun" in globalThis
    ? ((await import("bun" + ":test")) as {
        test: (name: string, run: () => Promise<void>) => void;
      })
    : await import("vitest");
const runTest = testRuntime.test;

runTest("worktree recovery leaves a stopped provider update intent untouched", async () => {
  const taskId = "202610251417-RECOVR";
  const component = { state: "present", source: "test", value: { taskId } } as const;
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: "a".repeat(40),
    worktree: "/test/worktree",
    components: {
      task: component,
      git: component,
      backend_projection: component,
      policy: component,
      blueprint: component,
      knowledge: component,
      provider: component,
      authority: component,
    },
  });
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprint.digest,
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
  const effectRef = `provider.pr.update_branch:${taskId}:original`;
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: {
      id: "provider.pr.update_branch",
      type: "provider_update_branch",
      params: { taskId },
      preconditionFingerprint: fingerprint,
      authorityRef: `route:${taskId}:${fingerprint.digest}`,
      idempotencyKey: effectRef,
    },
    precondition_fingerprint_digest: fingerprint.digest,
    authority_ref: "workflow-operation:provider.pr.update_branch",
    authority_digest: fingerprint.digest,
    effect_ref: effectRef,
  });
  if (started.status !== "started") throw new Error("expected started operation");
  const stopped = recoverSupervisorExecutionEpisodeJournal({
    journal: started.journal,
    state_fingerprint_digest: fingerprint.digest,
  });
  let writes = 0;
  const actual = await recoverProvenNotAppliedWorktreePreparation({
    journal: stopped,
    operation: { id: "provider.pr.update_branch", idempotencyKey: effectRef },
    state_fingerprint_digest: fingerprint.digest,
    compare_and_swap: () => {
      writes += 1;
      return Promise.resolve(true);
    },
  });
  deepStrictEqual(actual, stopped);
  strictEqual(writes, 0);
});
