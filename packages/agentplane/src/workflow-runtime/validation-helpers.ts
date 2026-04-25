import type { WorkflowDiagnostic } from "./types.js";

export function pushDiagnostic(diags: WorkflowDiagnostic[], diagnostic: WorkflowDiagnostic): void {
  diags.push(diagnostic);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
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
