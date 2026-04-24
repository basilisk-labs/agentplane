import type { CommandContext } from "../shared/task-backend.js";

export type VerifyState = "ok" | "needs_rework";
export type VerifyCommandName = "task verify ok" | "task verify rework" | "verify";

export type VerifyStructuredFindingInput = {
  observation: string;
  impact: string;
  resolution: string;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
};

export type ResolvedVerifyRecordInput = {
  by: string;
  note: string;
  details: string | null;
};

export type ExecuteVerifyRecordCommandOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  finding?: VerifyStructuredFindingInput | null;
  collectIncidents?: boolean;
  quiet: boolean;
  command: VerifyCommandName;
};
