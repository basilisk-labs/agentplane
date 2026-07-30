import path from "node:path";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { RunnerInvocation, RunnerResult } from "../types.js";
import {
  loadTaskKnowledgeRequestAudits,
  persistTaskKnowledgeRequestAudit,
  serveTaskKnowledgeRequest,
  taskKnowledgeRequestAuditPath,
  taskKnowledgeRequestReservationUnavailableResponse,
  withTaskKnowledgeRequestAuditReservation,
} from "./task-knowledge-request.js";

function requestedKnowledge(result: RunnerResult) {
  const semantic = result.semantic_result?.value;
  return semantic?.kind === "agent_semantic_result" && semantic.status === "needs_context"
    ? semantic
    : null;
}

/**
 * The parent CLI owns this transition after a completed provider episode. The
 * bounded response is both returned to the caller and persisted for a later
 * continuation; provider code never receives repository search authority.
 */
export async function serveRunnerKnowledgeRequest(opts: {
  repository_root: string;
  invocation: Pick<RunnerInvocation, "run_id" | "run_dir" | "work_order_id">;
  /** Internal test seam for the bounded cross-process reservation wait. */
  reservation_wait_ms?: number;
  work_order: AgentWorkOrderV2 | undefined;
  result: RunnerResult;
}): Promise<RunnerResult> {
  const semanticResult = requestedKnowledge(opts.result);
  const workOrder = opts.work_order;
  if (!semanticResult || !workOrder) return opts.result;
  const requestInvocation = {
    run_id: opts.invocation.run_id,
    work_order_id: opts.invocation.work_order_id,
    state_fingerprint_digest: workOrder.state_fingerprint.digest,
  };
  const runsDir = path.dirname(opts.invocation.run_dir);
  const reservation = await withTaskKnowledgeRequestAuditReservation({
    invocation: requestInvocation,
    repository_root: opts.repository_root,
    role: workOrder.role,
    wait_ms: opts.reservation_wait_ms,
    work: async () => {
      const priorAudits = await loadTaskKnowledgeRequestAudits({
        runs_dir: runsDir,
        invocation: requestInvocation,
        role: workOrder.role,
      });
      const response = await serveTaskKnowledgeRequest({
        repository_root: opts.repository_root,
        invocation: requestInvocation,
        work_order: workOrder,
        semantic_result: semanticResult,
        prior_audits: priorAudits,
      });
      const auditPath = taskKnowledgeRequestAuditPath({
        run_dir: opts.invocation.run_dir,
        audit: response,
      });
      await persistTaskKnowledgeRequestAudit({ file_path: auditPath, audit: response });
      return {
        ...opts.result,
        knowledge_response: response,
        artifacts: [
          ...(opts.result.artifacts ?? []),
          { path: auditPath, label: "knowledge-request-audit" },
        ],
        output_paths: [...(opts.result.output_paths ?? []), auditPath],
        evidence: {
          ...opts.result.evidence,
          knowledge_request: {
            audit_path: auditPath,
            audit_digest: response.digest,
            outcome: response.outcome,
            round: response.round,
          },
        },
      };
    },
  });
  if (reservation.status === "busy") {
    return {
      ...opts.result,
      knowledge_response: taskKnowledgeRequestReservationUnavailableResponse({
        invocation: requestInvocation,
        semantic_result: semanticResult,
        work_order: workOrder,
      }),
    };
  }
  return reservation.value;
}
