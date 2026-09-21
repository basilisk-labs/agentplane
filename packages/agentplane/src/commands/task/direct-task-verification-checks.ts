import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { localRuntimeEvidence, type LocalRuntimeEvidence } from "../../shared/runtime-env.js";
import {
  parseDeclaredTaskCheck,
  parseDeclaredTaskCheckSequence,
} from "../shared/declared-check.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";

export type DirectTaskCheck = {
  runtime?: LocalRuntimeEvidence;
  failure_kind?: "infrastructure";
  command: string;
  declared_command?: string;
  script: string | null;
  check_ids: string[];
  exit_code: number | null;
  duration_ms: number;
  stdout_tail: string;
  stderr_tail: string;
};

export type ParsedDirectTaskCheck = {
  executable: string;
  args: string[];
  script: string | null;
};

export type DirectTaskVerificationResult = {
  status: "passed" | "failed" | "unsupported";
  artifact_path: string;
  checks: DirectTaskCheck[];
  reason: string | null;
};

export type DirectTaskVerificationInputIdentity = Readonly<{
  schema_version: 1;
  kind: "direct_task_verification_input";
  cwd: string;
  commands: readonly string[];
  platform: NodeJS.Platform;
  arch: string;
  node: string;
  runtimes: readonly LocalRuntimeEvidence[];
}>;

export function renderDirectTaskVerificationDetails(opts: {
  task: Pick<TaskData, "execution_contract">;
  taskId: string;
  workflow: "direct" | "branch_pr";
  result: DirectTaskVerificationResult;
}): string {
  const checks = opts.result.checks;
  const selectedChecks = (
    opts.task.execution_contract?.verification.contract?.selected_checks ?? []
  ).filter((checkId) => checkId !== "hosted_integration");
  if (opts.result.status === "passed" && selectedChecks.length > 0) {
    const contractDetails = selectedChecks
      .map((checkId) => {
        const matching = checks.filter((check) => check.check_ids.includes(checkId));
        if (matching.length === 0) return null;
        return matching
          .map((check, index) =>
            [
              `Check: ${checkId}`,
              `Command: ${check.command}`,
              "Result: pass",
              `Evidence: ${opts.result.artifact_path}#check-${String(checks.indexOf(check) + 1)}`,
              `Scope: ${opts.workflow} task ${opts.taskId} Verification Contract check ${checkId}${matching.length > 1 ? ` (${String(index + 1)}/${String(matching.length)})` : ""}`,
            ].join("\n"),
          )
          .join("\n\n");
      })
      .filter((details): details is string => details !== null)
      .join("\n\n");
    if (contractDetails) return contractDetails;
  }
  return checks
    .map((check, index) =>
      [
        `Command: ${check.command}`,
        `Result: ${check.exit_code === 0 ? "pass" : "fail"}`,
        `Evidence: ${opts.result.artifact_path}#check-${String(index + 1)}`,
        `Scope: ${opts.workflow} task ${opts.taskId} declared verification`,
      ].join("\n"),
    )
    .join("\n\n");
}

export function parseDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  return parseDeclaredTaskCheck(command);
}

/** Material inputs that must remain equal before immutable check evidence can be reused. */
export function directTaskVerificationInputIdentity(opts: {
  cwd: string;
  commands: readonly string[];
}): DirectTaskVerificationInputIdentity {
  const commands = [...new Set(opts.commands)];
  const env = verificationChildEnv();
  return Object.freeze({
    schema_version: 1,
    kind: "direct_task_verification_input",
    cwd: path.resolve(opts.cwd),
    commands,
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    runtimes: commands.flatMap(
      (command) =>
        parseDeclaredTaskCheckSequence(command)?.map(({ executable }) =>
          localRuntimeEvidence(executable, env, opts.cwd),
        ) ?? [],
    ),
  });
}
