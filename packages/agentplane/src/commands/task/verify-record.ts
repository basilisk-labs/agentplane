import type { CommandContext } from "../shared/task-backend.js";

import { executeVerifyRecordCommand } from "./verify-record-execute.js";
import type { VerifyStructuredFindingInput } from "./verify-record.types.js";

type VerifyFindingOptions = {
  observation?: string;
  impact?: string;
  resolution?: string;
  promote?: boolean;
  external?: boolean;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
};

function buildVerifyStructuredFinding(
  opts: VerifyFindingOptions,
): VerifyStructuredFindingInput | null {
  if (
    typeof opts.observation !== "string" ||
    typeof opts.impact !== "string" ||
    typeof opts.resolution !== "string"
  ) {
    return null;
  }
  return {
    observation: opts.observation,
    impact: opts.impact,
    resolution: opts.resolution,
    promote: opts.promote === true,
    external: opts.external === true,
    localOnly: opts.localOnly === true,
    repoFixable: opts.repoFixable === true,
    incidentScope: opts.incidentScope,
    incidentTags: opts.incidentTags ?? [],
    incidentMatch: opts.incidentMatch ?? [],
    incidentAdvice: opts.incidentAdvice,
    incidentRule: opts.incidentRule,
  };
}

export async function cmdTaskVerifyOk(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  collectIncidents?: boolean;
  observation?: string;
  impact?: string;
  resolution?: string;
  promote?: boolean;
  external?: boolean;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({
    ...opts,
    state: "ok",
    command: "task verify ok",
    finding: buildVerifyStructuredFinding(opts),
  });
}

export async function cmdTaskVerifyRework(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  collectIncidents?: boolean;
  observation?: string;
  impact?: string;
  resolution?: string;
  promote?: boolean;
  external?: boolean;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({
    ...opts,
    state: "needs_rework",
    command: "task verify rework",
    finding: buildVerifyStructuredFinding(opts),
  });
}

export async function cmdVerifyParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: "ok" | "needs_rework";
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  collectIncidents?: boolean;
  observation?: string;
  impact?: string;
  resolution?: string;
  promote?: boolean;
  external?: boolean;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({
    ...opts,
    command: "verify",
    finding: buildVerifyStructuredFinding(opts),
  });
}
