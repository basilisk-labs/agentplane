import type { WorkflowDiagnostic, WorkflowErrorCode } from "./types.js";

type WorkflowEventName =
  | "workflow_build_started"
  | "workflow_build_completed"
  | "workflow_build_failed"
  | "workflow_publish_completed"
  | "workflow_publish_failed"
  | "workflow_restore_completed"
  | "workflow_restore_failed"
  | "workflow_doctor_check";

export type WorkflowEvent = {
  event: WorkflowEventName;
  code?: WorkflowErrorCode;
  path?: string;
  details?: Record<string, unknown>;
};

export function emitWorkflowEvent(event: WorkflowEvent): void {
  const payload = {
    ts: new Date().toISOString(),
    component: "workflow-runtime",
    ...event,
  };
  process.stderr.write(`${JSON.stringify(payload)}\n`);
}

export function diagnosticsSummary(diagnostics: WorkflowDiagnostic[]): string {
  const errors = diagnostics.filter((d) => d.severity === "ERROR").length;
  const warnings = diagnostics.filter((d) => d.severity === "WARN").length;
  const infos = diagnostics.filter((d) => d.severity === "INFO").length;
  return `errors=${errors} warnings=${warnings} infos=${infos}`;
}
