import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import { inspectKernelMigrationAdmission } from "./kernel-migration-admission.js";

const DIGEST = `sha256:${"a".repeat(64)}`;

function journal() {
  return createSupervisorExecutionEpisodeJournal({
    task_id: "T-migrate",
    task_revision: 1,
    state_fingerprint_digest: DIGEST,
    budget: {
      max_episodes: 2,
      max_agent_runs: 2,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: 10_000,
      max_changed_files: 10,
      max_diff_lines: 100,
      max_no_progress_episodes: 2,
    },
  });
}

describe("Kernel migration admission", () => {
  it("admits an absent or quiescent supervisor journal", () => {
    expect(inspectKernelMigrationAdmission(null)).toEqual({ admitted: true });
    expect(inspectKernelMigrationAdmission(journal())).toEqual({ admitted: true });
  });

  it("fails closed for malformed journals", () => {
    expect(inspectKernelMigrationAdmission({ kind: "unknown" })).toMatchObject({
      admitted: false,
      reason: "supervisor_journal_invalid",
    });
  });

  it("blocks an admitted operation intent", () => {
    const started = startSupervisorExecutionEpisode({
      journal: journal(),
      role: "EXECUTOR",
      kind: "side_effect",
      operation_identity: { command: "fixture" },
      precondition_fingerprint_digest: DIGEST,
      authority_ref: "fixture",
      authority_digest: DIGEST,
      work_order_ref: "fixture",
    });
    if (started.status !== "started") throw new Error("expected an admitted intent");
    expect(inspectKernelMigrationAdmission(started.journal)).toMatchObject({
      admitted: false,
      reason: "supervisor_operation_intent",
    });
  });

  it("blocks effect-in-doubt journals", () => {
    const stopped = stopSupervisorExecutionEpisode({
      journal: journal(),
      reason: "effect_in_doubt",
    });
    expect(inspectKernelMigrationAdmission(stopped)).toMatchObject({
      admitted: false,
      reason: "effect_in_doubt",
    });
  });
});
