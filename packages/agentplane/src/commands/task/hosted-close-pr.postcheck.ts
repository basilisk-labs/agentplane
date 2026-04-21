import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

import type { HostedClosePrExecutionResult } from "./hosted-close-pr.types.js";

export function postcheckHostedClosePrResult(
  result: HostedClosePrExecutionResult,
): HostedClosePrExecutionResult {
  if (
    result.outcome.kind === "created-pr" &&
    (!Number.isInteger(result.outcome.prNumber) || result.outcome.prNumber <= 0)
  ) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `GitHub did not return a valid PR number for hosted closure branch ${result.outcome.closeBranch}.`,
    });
  }
  return result;
}
