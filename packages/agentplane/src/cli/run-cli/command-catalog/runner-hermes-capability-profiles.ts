import type { CommandCapability, CommandSession } from "./command-session.js";
import {
  TASK_READ_REQUIREMENTS,
  TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
  TASK_ROUTE_LOCAL_REQUIREMENTS,
  TASK_WRITE_REQUIREMENTS,
} from "./task-capability-profiles.js";

export const RUNNER_READ_REQUIREMENTS = [
  ...TASK_READ_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const RUNNER_WRITE_REQUIREMENTS = [
  ...TASK_WRITE_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const RUNNER_EXECUTION_REQUIREMENTS = [
  ...TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
  "context.search",
] as const satisfies readonly CommandCapability[];

export const HERMES_PROJECTION_REQUIREMENTS = [
  ...TASK_ROUTE_LOCAL_REQUIREMENTS,
  "context.search",
] as const satisfies readonly CommandCapability[];

export const HERMES_SUPERVISION_REQUIREMENTS = [
  ...RUNNER_EXECUTION_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const INSIGHTS_READ_REQUIREMENTS = [
  "project",
  "config",
] as const satisfies readonly CommandCapability[];

export type RunnerReadSession = CommandSession<(typeof RUNNER_READ_REQUIREMENTS)[number]>;
export type RunnerWriteSession = CommandSession<(typeof RUNNER_WRITE_REQUIREMENTS)[number]>;
export type RunnerExecutionSession = CommandSession<(typeof RUNNER_EXECUTION_REQUIREMENTS)[number]>;
export type HermesProjectionSession = CommandSession<
  (typeof HERMES_PROJECTION_REQUIREMENTS)[number]
>;
export type HermesSupervisionSession = CommandSession<
  (typeof HERMES_SUPERVISION_REQUIREMENTS)[number]
>;
export type InsightsReadSession = CommandSession<(typeof INSIGHTS_READ_REQUIREMENTS)[number]>;
