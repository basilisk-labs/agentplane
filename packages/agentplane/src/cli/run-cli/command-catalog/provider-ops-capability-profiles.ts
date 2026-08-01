import type { CommandCapability, CommandSession } from "./command-session.js";
import { PROJECT_REQUIREMENTS } from "./project-capability-profiles.js";
import {
  TASK_READ_REQUIREMENTS,
  TASK_LIFECYCLE_REQUIREMENTS,
  TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
} from "./task-capability-profiles.js";

export const PROVIDER_READ_REQUIREMENTS = [
  ...TASK_READ_REQUIREMENTS,
  "git.head",
  "git.diff",
  "route.local",
  "policy",
  "approvals",
  "route.remote",
  "provider",
] as const satisfies readonly CommandCapability[];

export const PROVIDER_WRITE_REQUIREMENTS = [
  ...TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const LOCAL_OPS_WRITE_REQUIREMENTS = [
  ...TASK_LIFECYCLE_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const INTEGRATION_QUEUE_LIST_REQUIREMENTS = [
  ...PROJECT_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS = [
  "project",
  "config",
  "git.head",
  "git.diff",
  "policy",
  "approvals",
  "route.remote",
  "provider",
] as const satisfies readonly CommandCapability[];

export const INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS = [
  ...PROVIDER_READ_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const INTEGRATION_QUEUE_EXECUTION_REQUIREMENTS = [
  ...PROVIDER_WRITE_REQUIREMENTS,
] as const satisfies readonly CommandCapability[];

export const RELEASE_PLAN_REQUIREMENTS = [
  "project",
  "config",
  "git.head",
  "git.diff",
  "policy",
  "approvals",
] as const satisfies readonly CommandCapability[];

export const RELEASE_PUBLISH_REQUIREMENTS = [
  ...RELEASE_PLAN_REQUIREMENTS,
  "git.mutate",
  "provider",
] as const satisfies readonly CommandCapability[];

export type ProviderReadSession = CommandSession<(typeof PROVIDER_READ_REQUIREMENTS)[number]>;
export type ProviderWriteSession = CommandSession<(typeof PROVIDER_WRITE_REQUIREMENTS)[number]>;
export type LocalOpsWriteSession = CommandSession<(typeof LOCAL_OPS_WRITE_REQUIREMENTS)[number]>;
export type IntegrationQueueListSession = CommandSession<
  (typeof INTEGRATION_QUEUE_LIST_REQUIREMENTS)[number]
>;
export type IntegrationQueueProviderReadSession = CommandSession<
  (typeof INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS)[number]
>;
export type IntegrationQueueTaskProviderReadSession = CommandSession<
  (typeof INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS)[number]
>;
export type IntegrationQueueExecutionSession = CommandSession<
  (typeof INTEGRATION_QUEUE_EXECUTION_REQUIREMENTS)[number]
>;
export type ReleasePlanSession = CommandSession<(typeof RELEASE_PLAN_REQUIREMENTS)[number]>;
export type ReleasePublishSession = CommandSession<(typeof RELEASE_PUBLISH_REQUIREMENTS)[number]>;
