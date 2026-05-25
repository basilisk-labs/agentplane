const AGENT_WORK_CONTEXT_CONTRACT_KIND = "agentplane.agent_work_context" as const;
const AGENT_WORK_CONTEXT_CONTRACT_VERSION = 1 as const;

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

export type AgentWorkContextContract = {
  kind: typeof AGENT_WORK_CONTEXT_CONTRACT_KIND;
  version: typeof AGENT_WORK_CONTEXT_CONTRACT_VERSION;
};

export function agentWorkContextContract(): AgentWorkContextContract {
  return {
    kind: AGENT_WORK_CONTEXT_CONTRACT_KIND,
    version: AGENT_WORK_CONTEXT_CONTRACT_VERSION,
  };
}
