import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";

export function acrValidationError(code: string, message: string): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `${code}: ${message}`,
    context: withDiagnosticContext(
      { reason_code: code },
      {
        state: "ACR validation failed.",
        likelyCause: message,
        hint: "ACR is a derived evidence record; regenerate it from task, policy, verification, and Git state instead of hand-editing it.",
        nextAction: {
          command: "agentplane acr explain <task-id>",
          reason: "inspect the current ACR readiness summary before retrying the gate",
          reasonCode: code,
        },
        remediation: acrRemediationForCode(code, message),
      },
    ),
  });
}

function acrRemediationForCode(
  code: string,
  message: string,
): NonNullable<Parameters<typeof withDiagnosticContext>[1]["remediation"]> {
  if (code.includes("PLAN")) {
    return {
      code,
      why: "The ACR cannot prove that the implementation followed an approved plan.",
      fix: "Approve the task plan through AgentPlane, then regenerate or refresh the task-local ACR.",
      safeCommand: "agentplane task plan approve <task-id> --by ORCHESTRATOR",
      stopCondition:
        "Stop if the plan is missing, stale, or no longer matches the implementation scope.",
    };
  }
  if (code.includes("VERIFICATION")) {
    return {
      code,
      why: "The ACR cannot prove that required checks ran and passed.",
      fix: "Run the task Verify Steps, record verification through AgentPlane, then regenerate the ACR.",
      safeCommand: "agentplane task verify-show <task-id>",
      stopCondition:
        "Stop if a required check must be skipped without explicit approval and recorded risk.",
    };
  }
  if (code.includes("EVIDENCE") || code.includes("DIGEST")) {
    return {
      code,
      why: "The ACR evidence does not match the current repository artifact state.",
      fix: "Regenerate the ACR from current task evidence and verify the digest again.",
      safeCommand: "agentplane acr generate <task-id> --work-commit HEAD --write --refresh",
      stopCondition:
        "Stop if the evidence mismatch points to uncommitted or unintended task artifact changes.",
    };
  }
  if (code.includes("GIT")) {
    return {
      code,
      why: "The ACR Git range cannot be validated locally.",
      fix: "Confirm the base and work commits exist and that work_commit descends from base_commit.",
      safeCommand: "git merge-base --is-ancestor <base_commit> <work_commit>",
      stopCondition:
        "Stop if the recorded commits are from another branch, checkout, or repository.",
    };
  }
  if (code.includes("POLICY")) {
    return {
      code,
      why: "The ACR records a policy decision that is not merge-ready.",
      fix: "Resolve the failed policy decision or record an approved policy override when allowed.",
      safeCommand: "agentplane acr explain <task-id>",
      stopCondition: "Stop if resolving the policy failure requires changing repository policy.",
    };
  }
  return {
    code,
    why: message,
    fix: "Inspect the ACR target, regenerate it from canonical task evidence, and rerun validation.",
    safeCommand: "agentplane acr validate <task-id> --mode local",
    stopCondition: "Stop if the target ACR was hand-edited or cannot be traced to a task README.",
  };
}
