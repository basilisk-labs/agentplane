import {
  authorizeSupervisorTokenBudgetEpoch,
  digestSupervisorEpisodeValue,
} from "@agentplaneorg/core/schemas";

import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { CommandContext } from "../shared/task-backend.js";

type TaskSupervisorBudgetEpochParsed = {
  taskId: string;
  expectedJournalDigest: string;
  stateFingerprintDigest: string;
  maxInputTokens: number;
  maxOutputTokens: number;
  maxTotalTokens: number;
  by: "USER";
  json: boolean;
};

const SHA256_PATTERN = /^sha256:[0-9a-f]{64}$/u;

export const taskSupervisorBudgetEpochSpec: CommandSpec<TaskSupervisorBudgetEpochParsed> = {
  id: ["task", "supervisor", "budget-epoch"],
  group: "Task",
  summary: "Authorize one new token budget epoch after a telemetry-only supervisor stop.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "expected-journal-digest",
      valueHint: "<sha256>",
      required: true,
      description: "Exact stopped supervisor journal authorized by the user.",
    },
    {
      kind: "string",
      name: "state-fingerprint",
      valueHint: "<sha256>",
      required: true,
      description: "Exact current task route fingerprint authorized by the user.",
    },
    {
      kind: "string",
      name: "max-input-tokens",
      valueHint: "<positive-integer>",
      required: true,
      description: "Maximum input tokens in the new epoch.",
    },
    {
      kind: "string",
      name: "max-output-tokens",
      valueHint: "<positive-integer>",
      required: true,
      description: "Maximum output tokens in the new epoch.",
    },
    {
      kind: "string",
      name: "max-total-tokens",
      valueHint: "<positive-integer>",
      required: true,
      description: "Maximum total tokens in the new epoch.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<USER>",
      required: true,
      description: "Explicit human actor authorizing the new spend epoch.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit the authorized epoch as JSON.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["expected-journal-digest", "state-fingerprint"] as const) {
      if (typeof raw.opts[key] !== "string" || !SHA256_PATTERN.test(raw.opts[key])) {
        throw usageError({
          spec: taskSupervisorBudgetEpochSpec,
          message: `--${key} must be a sha256 digest.`,
        });
      }
    }
    for (const key of ["max-input-tokens", "max-output-tokens", "max-total-tokens"] as const) {
      const value = raw.opts[key];
      if (
        typeof value !== "string" ||
        !/^\d+$/u.test(value) ||
        !Number.isSafeInteger(Number(value)) ||
        Number(value) <= 0
      ) {
        throw usageError({
          spec: taskSupervisorBudgetEpochSpec,
          message: `--${key} must be a positive safe integer.`,
        });
      }
    }
    if (raw.opts.by !== "USER") {
      throw usageError({
        spec: taskSupervisorBudgetEpochSpec,
        message: "--by must be USER for a new token budget epoch.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    expectedJournalDigest: String(raw.opts["expected-journal-digest"]),
    stateFingerprintDigest: String(raw.opts["state-fingerprint"]),
    maxInputTokens: Number(raw.opts["max-input-tokens"]),
    maxOutputTokens: Number(raw.opts["max-output-tokens"]),
    maxTotalTokens: Number(raw.opts["max-total-tokens"]),
    by: "USER",
    json: raw.opts.json === true,
  }),
};

const emitter = createCliEmitter();

export function makeRunTaskSupervisorBudgetEpochHandler(
  getContext: (command: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, parsed: TaskSupervisorBudgetEpochParsed): Promise<number> => {
    const command = await getContext("task supervisor budget-epoch");
    const decision = await buildTaskRouteDecision({
      ctx: command,
      cwd: command.resolvedProject.gitRoot,
      rootOverride: null,
      includeRemote: false,
      freshHead: true,
      taskId: parsed.taskId,
    });
    if (decision.workflowStep.preconditionFingerprint.digest !== parsed.stateFingerprintDigest) {
      throw usageError({
        spec: taskSupervisorBudgetEpochSpec,
        message: "Token budget epoch state fingerprint is stale; recompute task next-action.",
      });
    }
    const budget = {
      max_input_tokens: parsed.maxInputTokens,
      max_output_tokens: parsed.maxOutputTokens,
      max_total_tokens: parsed.maxTotalTokens,
    };
    const authorityRef = `user:${parsed.taskId}:supervisor-token-budget-epoch:${parsed.expectedJournalDigest}`;
    const authorityDigest = digestSupervisorEpisodeValue({
      schema_version: 1,
      kind: "supervisor_token_budget_epoch_authority",
      task_id: parsed.taskId,
      expected_journal_digest: parsed.expectedJournalDigest,
      authorized_state_fingerprint_digest: parsed.stateFingerprintDigest,
      authorized_by: parsed.by,
      budget,
    });
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const opened = await openSupervisorExecutionEpisode({
        git_root: command.resolvedProject.gitRoot,
        task_id: parsed.taskId,
        task_revision: null,
        state_fingerprint_digest: parsed.stateFingerprintDigest,
        recover_intent: false,
      });
      const authorized = authorizeSupervisorTokenBudgetEpoch({
        journal: opened.journal,
        expected_journal_digest: parsed.expectedJournalDigest,
        authorized_state_fingerprint_digest: parsed.stateFingerprintDigest,
        authorized_by: parsed.by,
        authority_ref: authorityRef,
        authority_digest: authorityDigest,
        budget,
      });
      if (
        authorized.digest === opened.journal.digest ||
        (await opened.store.compareAndSwap(opened.journal.digest, authorized))
      ) {
        const result = {
          task_id: parsed.taskId,
          journal_digest: authorized.digest,
          previous_journal_digest: parsed.expectedJournalDigest,
          state_fingerprint_digest: parsed.stateFingerprintDigest,
          authority_ref: authorityRef,
          authority_digest: authorityDigest,
          budget,
        };
        if (parsed.json) emitter.json(result);
        else
          emitter.report(
            [
              { label: "journal", value: authorized.digest },
              { label: "authority", value: authorityDigest },
            ],
            { header: infoMessage(`supervisor token budget epoch authorized: ${parsed.taskId}`) },
          );
        return 0;
      }
    }
    throw new Error("Supervisor journal changed while authorizing the token budget epoch.");
  };
}
