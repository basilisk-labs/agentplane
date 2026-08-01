import type { CommandCapability, CommandSession } from "./command-session.js";

export const CONTEXT_PROJECT_REQUIREMENTS = [
  "project",
] as const satisfies readonly CommandCapability[];

export const CONTEXT_TASK_WRITE_REQUIREMENTS = [
  "project",
  "config",
  "backend.read",
  "backend.write",
  "task.read",
  "task.write",
  "git.head",
  "git.diff",
  "git.mutate",
  "route.local",
  "policy",
  "approvals",
  "context.search",
] as const satisfies readonly CommandCapability[];

export const EVALUATOR_READ_REQUIREMENTS = [
  "project",
  "config",
  "backend.read",
  "task.read",
  "git.head",
  "git.diff",
  "route.local",
  "policy",
  "context.search",
] as const satisfies readonly CommandCapability[];

export const EVALUATOR_WRITE_REQUIREMENTS = [
  ...EVALUATOR_READ_REQUIREMENTS,
  "backend.write",
  "task.write",
  "git.mutate",
  "approvals",
] as const satisfies readonly CommandCapability[];

export const EVALUATOR_EXECUTE_REQUIREMENTS = [
  ...EVALUATOR_WRITE_REQUIREMENTS,
  "provider",
] as const satisfies readonly CommandCapability[];

export type ContextProjectSession = CommandSession<(typeof CONTEXT_PROJECT_REQUIREMENTS)[number]>;
export type ContextTaskWriteSession = CommandSession<
  (typeof CONTEXT_TASK_WRITE_REQUIREMENTS)[number]
>;
export type EvaluatorReadSession = CommandSession<(typeof EVALUATOR_READ_REQUIREMENTS)[number]>;
export type EvaluatorWriteSession = CommandSession<(typeof EVALUATOR_WRITE_REQUIREMENTS)[number]>;
export type EvaluatorExecuteSession = CommandSession<
  (typeof EVALUATOR_EXECUTE_REQUIREMENTS)[number]
>;
