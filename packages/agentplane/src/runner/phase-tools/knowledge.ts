import {
  AGENT_SEMANTIC_RESULT_KIND,
  AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
  type AgentSemanticResult,
  type AgentSemanticResultKnowledgeRequest,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import path from "node:path";

import type { RunnerPhaseToolManifest } from "../types.js";
import {
  loadTaskKnowledgeRequestAudits,
  persistTaskKnowledgeRequestAudit,
  serveTaskKnowledgeRequest,
  taskKnowledgeRequestAuditPath,
  taskKnowledgeRequestReservationUnavailableResponse,
  withTaskKnowledgeRequestAuditReservation,
} from "../usecases/task-knowledge-request.js";

function knowledgeRequestSemanticResult(opts: {
  work_order_id: string;
  request: AgentSemanticResultKnowledgeRequest;
}): AgentSemanticResult {
  return {
    schema_version: AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
    kind: AGENT_SEMANTIC_RESULT_KIND,
    work_order_id: opts.work_order_id,
    status: "needs_context",
    summary: opts.request.reason,
    findings: [],
    uncertainty: [],
    knowledge_request: opts.request,
  };
}

export async function serveRunnerPhaseToolKnowledgeRequest(opts: {
  manifest: RunnerPhaseToolManifest;
  work_order: AgentWorkOrderV2;
  repository_root: string;
  run_dir: string;
  request: AgentSemanticResultKnowledgeRequest;
}) {
  const invocation = {
    run_id: opts.manifest.run_id,
    work_order_id: opts.work_order.work_order_id,
    state_fingerprint_digest: opts.work_order.state_fingerprint.digest,
  };
  const semanticResult = knowledgeRequestSemanticResult({
    work_order_id: opts.work_order.work_order_id,
    request: opts.request,
  });
  const reservation = await withTaskKnowledgeRequestAuditReservation({
    invocation,
    repository_root: opts.repository_root,
    role: opts.work_order.role,
    work: async () => {
      const prior = await loadTaskKnowledgeRequestAudits({
        runs_dir: path.dirname(opts.run_dir),
        invocation,
        role: opts.work_order.role,
      });
      const response = await serveTaskKnowledgeRequest({
        repository_root: opts.repository_root,
        invocation,
        work_order: opts.work_order,
        semantic_result: semanticResult,
        prior_audits: prior,
      });
      const auditPath = taskKnowledgeRequestAuditPath({
        run_dir: opts.run_dir,
        audit: response,
      });
      await persistTaskKnowledgeRequestAudit({ file_path: auditPath, audit: response });
      return {
        response,
        audit: { path: auditPath, digest: response.digest },
      };
    },
  });
  if (reservation.status === "reserved") return reservation.value;
  const response = taskKnowledgeRequestReservationUnavailableResponse({
    invocation,
    semantic_result: semanticResult,
    work_order: opts.work_order,
  });
  return { response, audit: null };
}
