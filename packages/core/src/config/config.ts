import type { AgentplaneConfig as AgentplaneConfigShape } from "./schema.impl.js";

export type AgentplaneConfig = AgentplaneConfigShape;
export { defaultConfig, setByDottedKey } from "./defaults.js";
export { loadConfig, saveConfig, type LoadedConfig } from "./io.js";
export { validateConfig } from "./validation.js";
export {
  configRawToWorkflowFrontMatter,
  readWorkflowConfigRaw,
  readWorkflowMarkdown,
  workflowFrontMatterToConfigRaw,
  writeWorkflowConfigRaw,
  type WorkflowMarkdown,
} from "./workflow-file.js";

export type WorkflowMode = AgentplaneConfig["workflow_mode"];
export type StatusCommitPolicy = AgentplaneConfig["status_commit_policy"];
export type CommitAutomation = AgentplaneConfig["commit_automation"];
export type ExecutionProfile = AgentplaneConfig["execution"]["profile"];
export type ReasoningEffort = AgentplaneConfig["execution"]["reasoning_effort"];
export type TextVerbosity = AgentplaneConfig["execution"]["text_verbosity"];
export type RunnerAdapterId = AgentplaneConfig["runner"]["default_adapter"];
export type RunnerTraceMode = AgentplaneConfig["runner"]["trace"]["mode"];
export type RunnerTraceRetention = AgentplaneConfig["runner"]["trace"]["retention"];
export type RunnerTraceCompression = AgentplaneConfig["runner"]["trace"]["compression"];
export type RunnerTimeoutReason = "idle" | "wall_clock";
export type RunnerCustomEnforcementConfig = NonNullable<
  NonNullable<AgentplaneConfig["runner"]["custom"]>["enforcement"]
>;
export type RunnerCustomConfig = NonNullable<AgentplaneConfig["runner"]["custom"]>;
export type FeedbackConfig = AgentplaneConfig["feedback"];
export type RunnerTraceConfig = {
  mode: RunnerTraceMode;
  max_tail_bytes: number;
  capture_stderr: boolean;
  retention?: RunnerTraceRetention;
  compression?: RunnerTraceCompression;
  redact_patterns?: string[];
};
export type RunnerTimeoutConfig = AgentplaneConfig["runner"]["timeouts"];
export type AcrConfig = AgentplaneConfig["acr"];
