import type { CommandCapability, CommandSession } from "./command-session.js";

export const TASK_READ_REQUIREMENTS = [
  "project",
  "config",
  "backend.read",
  "task.read",
] as const satisfies readonly CommandCapability[];

export const TASK_WRITE_REQUIREMENTS = [
  ...TASK_READ_REQUIREMENTS,
  "backend.write",
  "task.write",
  "policy",
  "approvals",
] as const satisfies readonly CommandCapability[];

export const TASK_LIFECYCLE_REQUIREMENTS = [
  ...TASK_WRITE_REQUIREMENTS,
  "git.head",
  "git.diff",
  "git.mutate",
  "route.local",
] as const satisfies readonly CommandCapability[];

export const TASK_ROUTE_LOCAL_REQUIREMENTS = [
  ...TASK_READ_REQUIREMENTS,
  "git.head",
  "git.diff",
  "route.local",
  "policy",
  "approvals",
] as const satisfies readonly CommandCapability[];

export const TASK_ROUTE_REQUIREMENTS = [
  ...TASK_ROUTE_LOCAL_REQUIREMENTS,
  "route.remote",
  "provider",
] as const satisfies readonly CommandCapability[];

export type TaskReadSession = CommandSession<(typeof TASK_READ_REQUIREMENTS)[number]>;
export type TaskWriteSession = CommandSession<(typeof TASK_WRITE_REQUIREMENTS)[number]>;
export type TaskLifecycleSession = CommandSession<(typeof TASK_LIFECYCLE_REQUIREMENTS)[number]>;
export type TaskRouteLocalSession = CommandSession<(typeof TASK_ROUTE_LOCAL_REQUIREMENTS)[number]>;
export type TaskRouteSession = CommandSession<(typeof TASK_ROUTE_REQUIREMENTS)[number]>;
