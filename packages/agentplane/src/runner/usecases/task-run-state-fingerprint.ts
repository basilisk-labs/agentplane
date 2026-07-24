import {
  StateFingerprintPreconditionError,
  executePreparedOperation,
  type StateBoundOperationResult,
  type StateFingerprint,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import { exitCodeForError } from "../../cli/exit-codes.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { captureRunnerStateFingerprint } from "../state-fingerprint.js";
import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";

export type StateBoundRunnerExecution = StateBoundOperationResult<RunnerResult> & {
  precondition_policy: StateFingerprintPolicy;
};

export async function executeStateBoundRunnerInvocation(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  precondition_fingerprint?: StateFingerprint;
  precondition_policy?: StateFingerprintPolicy;
  apply: (invocation: RunnerInvocation) => Promise<RunnerResult>;
}): Promise<StateBoundRunnerExecution> {
  const preconditionFingerprint = opts.precondition_fingerprint;
  const preconditionPolicy = opts.precondition_policy;
  if (!preconditionFingerprint || !preconditionPolicy) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Runner prepared state is missing its fingerprint for ` +
        `${opts.task_id}:${opts.invocation.run_id}.`,
      context: {
        reason_code: "state_fingerprint_missing",
        task_id: opts.task_id,
        run_id: opts.invocation.run_id,
      },
    });
  }

  try {
    return {
      ...(await executePreparedOperation({
        prepared: {
          operation: opts.invocation,
          precondition_fingerprint: preconditionFingerprint,
          precondition_policy: preconditionPolicy,
        },
        capture_state: async () =>
          await captureRunnerStateFingerprint({
            ctx: opts.ctx,
            bundle: opts.bundle,
          }),
        apply: opts.apply,
      })),
      precondition_policy: preconditionPolicy,
    };
  } catch (error) {
    if (error instanceof StateFingerprintPreconditionError) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Runner refused stale prepared state for ` + `${opts.task_id}:${opts.invocation.run_id}.`,
        context: {
          reason_code: error.reason_code,
          task_id: opts.task_id,
          run_id: opts.invocation.run_id,
          fingerprint: error.diagnostic,
        },
      });
    }
    throw error;
  }
}
