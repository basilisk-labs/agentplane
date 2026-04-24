import type { CommandContext } from "../shared/task-backend.js";

import { executeVerifyRecordCommand } from "./verify-record-execute.js";

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
    finding:
      typeof opts.observation === "string" &&
      typeof opts.impact === "string" &&
      typeof opts.resolution === "string"
        ? {
            observation: opts.observation,
            impact: opts.impact,
            resolution: opts.resolution,
            localOnly: opts.localOnly === true,
            repoFixable: opts.repoFixable === true,
            incidentScope: opts.incidentScope,
            incidentTags: opts.incidentTags ?? [],
            incidentMatch: opts.incidentMatch ?? [],
            incidentAdvice: opts.incidentAdvice,
            incidentRule: opts.incidentRule,
          }
        : null,
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
    finding:
      typeof opts.observation === "string" &&
      typeof opts.impact === "string" &&
      typeof opts.resolution === "string"
        ? {
            observation: opts.observation,
            impact: opts.impact,
            resolution: opts.resolution,
            localOnly: opts.localOnly === true,
            repoFixable: opts.repoFixable === true,
            incidentScope: opts.incidentScope,
            incidentTags: opts.incidentTags ?? [],
            incidentMatch: opts.incidentMatch ?? [],
            incidentAdvice: opts.incidentAdvice,
            incidentRule: opts.incidentRule,
          }
        : null,
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
    finding:
      typeof opts.observation === "string" &&
      typeof opts.impact === "string" &&
      typeof opts.resolution === "string"
        ? {
            observation: opts.observation,
            impact: opts.impact,
            resolution: opts.resolution,
            localOnly: opts.localOnly === true,
            repoFixable: opts.repoFixable === true,
            incidentScope: opts.incidentScope,
            incidentTags: opts.incidentTags ?? [],
            incidentMatch: opts.incidentMatch ?? [],
            incidentAdvice: opts.incidentAdvice,
            incidentRule: opts.incidentRule,
          }
        : null,
  });
}
