import type { WorkflowDiagnostic } from "./types.js";
import { renderRemediationLines } from "../shared/diagnostic-remediation.js";
export { isRecord } from "../shared/guards.js";

export function pushDiagnostic(diags: WorkflowDiagnostic[], diagnostic: WorkflowDiagnostic): void {
  diags.push({
    ...diagnostic,
    remediation: diagnostic.remediation ?? remediationForWorkflowDiagnostic(diagnostic),
  });
}

export function remediationForWorkflowDiagnostic(
  diagnostic: Pick<WorkflowDiagnostic, "code" | "path" | "message">,
): NonNullable<WorkflowDiagnostic["remediation"]> {
  const safePath = diagnostic.path || ".agentplane/WORKFLOW.md";
  switch (diagnostic.code) {
    case "WF_MISSING_FILE": {
      return {
        code: diagnostic.code,
        why: "The repository has no workflow contract for agents to follow.",
        fix: "Restore .agentplane/WORKFLOW.md from the initialized template or last-known-good copy.",
        safeCommand: "agentplane doctor --fix",
        stopCondition:
          "Stop if .agentplane/workflows/last-known-good.md is also missing or contains unknown policy changes.",
      };
    }
    case "WF_SCHEMA_MISSING":
    case "WF_SCHEMA_TYPE":
    case "WF_SCHEMA_ENUM":
    case "WF_SCHEMA_RANGE":
    case "WF_SCHEMA_UNKNOWN_KEY": {
      return {
        code: diagnostic.code,
        why: `The workflow field ${safePath} does not match the supported schema.`,
        fix: "Edit the field to match the canonical workflow shape, then re-run workflow diagnostics.",
        safeCommand: "agentplane doctor",
        stopCondition:
          "Stop before editing if the field changes workflow mode, approval gates, or task paths without explicit approval.",
      };
    }
    case "WF_REQUIRED_SECTION_MISSING": {
      return {
        code: diagnostic.code,
        why: `The workflow document is missing a section agents rely on: ${safePath}.`,
        fix: "Restore the missing section from the generated workflow template or last-known-good copy.",
        safeCommand: "agentplane doctor --fix",
        stopCondition:
          "Stop if the missing section contains project-specific policy that cannot be inferred safely.",
      };
    }
    case "WF_TEMPLATE_UNKNOWN_VARIABLE":
    case "WF_TEMPLATE_UNKNOWN_FILTER": {
      return {
        code: diagnostic.code,
        why: "The workflow prompt template references a variable or filter the renderer cannot resolve.",
        fix: "Replace the template reference with a supported runtime/workflow variable or remove the unsupported filter.",
        safeCommand: "agentplane workflow build",
        stopCondition:
          "Stop if the template reference is part of a recipe or policy override outside the current task scope.",
      };
    }
    case "WF_POLICY_MISMATCH": {
      return {
        code: diagnostic.code,
        why: "The workflow contract and loaded config disagree on a policy-critical value.",
        fix: "Treat .agentplane/WORKFLOW.md as the canonical workflow source and reconcile lower-priority config.",
        safeCommand: "agentplane config show",
        stopCondition:
          "Stop if reconciling the value would change approval, network, or branch policy.",
      };
    }
    default: {
      return {
        code: diagnostic.code,
        why: diagnostic.message,
        fix: "Inspect the referenced workflow path and repair the contract before continuing agent work.",
        safeCommand: "agentplane doctor",
        stopCondition:
          "Stop if the repair path is ambiguous or requires changing policy outside the approved scope.",
      };
    }
  }
}

export function renderWorkflowDiagnostic(diagnostic: WorkflowDiagnostic): string {
  const lines = [
    `[${diagnostic.severity}] ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}`,
  ];
  const remediation = diagnostic.remediation ?? remediationForWorkflowDiagnostic(diagnostic);
  lines.push(...renderRemediationLines(remediation));
  return lines.join("\n");
}

export function expectBoolean(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  required: boolean,
): boolean | undefined {
  if (value === undefined) {
    if (required) {
      pushDiagnostic(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "boolean") {
    pushDiagnostic(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be a boolean.`,
    });
    return undefined;
  }
  return value;
}

export function expectString(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  required: boolean,
): string | undefined {
  if (value === undefined) {
    if (required) {
      pushDiagnostic(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "string") {
    pushDiagnostic(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be a string.`,
    });
    return undefined;
  }
  if (value.trim().length === 0) {
    pushDiagnostic(diags, {
      code: "WF_SCHEMA_RANGE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be non-empty.`,
    });
    return undefined;
  }
  return value;
}

export function expectIntegerInRange(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  min: number,
  max: number,
  required: boolean,
): number | undefined {
  if (value === undefined) {
    if (required) {
      pushDiagnostic(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "number" || !Number.isInteger(value)) {
    pushDiagnostic(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be an integer.`,
    });
    return undefined;
  }
  if (value < min || value > max) {
    pushDiagnostic(diags, {
      code: "WF_SCHEMA_RANGE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be in [${min}, ${max}].`,
    });
    return undefined;
  }
  return value;
}
