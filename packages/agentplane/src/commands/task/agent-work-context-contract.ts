import {
  AGENT_WORK_CONTEXT_V1_KIND,
  AGENT_WORK_CONTEXT_V1_VERSION,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

type AgentWorkContextSourceKind =
  | "static"
  | "task_backend"
  | "local_git"
  | "pr_artifact"
  | "task_doc"
  | "blueprint_resolver"
  | "snapshot_digest"
  | "remote_provider";

type AgentWorkContextFreshness =
  | "static"
  | "live_local"
  | "computed_local"
  | "cached_artifact"
  | "remote_live"
  | "remote_skipped";

type AgentWorkContextConfidence = "high" | "medium" | "low" | "skipped";

export type AgentWorkContextSourceConfidence = {
  source: AgentWorkContextSourceKind;
  freshness: AgentWorkContextFreshness;
  confidence: AgentWorkContextConfidence;
  note?: string;
};

/**
 * The v1 brief surface keeps this tag-only compatibility view. The optional v2 payload is typed
 * from the canonical core model and is populated only by the RF-05b view builder.
 */
export interface AgentWorkContextContract {
  kind: typeof AGENT_WORK_CONTEXT_V1_KIND;
  version: typeof AGENT_WORK_CONTEXT_V1_VERSION;
  work_order?: AgentWorkOrderV2;
}

export function agentWorkContextContract(): AgentWorkContextContract {
  return {
    kind: AGENT_WORK_CONTEXT_V1_KIND,
    version: AGENT_WORK_CONTEXT_V1_VERSION,
  };
}
