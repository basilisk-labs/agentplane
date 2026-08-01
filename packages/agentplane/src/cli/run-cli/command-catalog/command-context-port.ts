import type { CommandContext } from "../../../commands/shared/task-backend.js";

import type { CommandCapability } from "./command-session.js";

type CapabilityDenial = (capability: CommandCapability, operation: string) => never;

const BACKEND_READ_MEMBERS = new Set<PropertyKey>([
  "id",
  "capabilities",
  "listProjectionTasks",
  "getLastListWarnings",
  "observeProjection",
  "inspectConfiguration",
]);
const TASK_READ_MEMBERS = new Set<PropertyKey>(["listTasks", "getTask", "getTasks", "getTaskDoc"]);
const BACKEND_WRITE_MEMBERS = new Set<PropertyKey>([
  "assertLocalMutationReady",
  "normalizeTasks",
  "refreshProjection",
  "refreshProjectionBeforeTaskStart",
  "migrateCanonicalState",
  "sync",
]);
const TASK_WRITE_MEMBERS = new Set<PropertyKey>([
  "writeTask",
  "writeTaskWithResult",
  "writeTaskWithProjectionTransition",
  "writeTasks",
  "setTaskDoc",
  "touchTaskDocMetadata",
  "generateTaskId",
]);

const GIT_HEAD_MEMBERS = new Set<PropertyKey>(["headCommit", "headHashSubject"]);
const GIT_DIFF_MEMBERS = new Set<PropertyKey>([
  "statusChangedPaths",
  "statusStagedPaths",
  "statusUntrackedPaths",
  "statusUnstagedTrackedPaths",
]);

function operationName(owner: string, property: PropertyKey): string {
  return `${owner}.${typeof property === "symbol" ? (property.description ?? "symbol") : property}`;
}

function boundValue(target: object, property: PropertyKey, receiver: unknown): unknown {
  const value = Reflect.get(target, property, receiver) as unknown;
  return typeof value === "function"
    ? (...args: unknown[]) => Reflect.apply(value, target, args) as unknown
    : value;
}

function deniedValue(
  target: object,
  property: PropertyKey,
  capability: CommandCapability,
  owner: string,
  deny: CapabilityDenial,
): unknown {
  const value = Reflect.get(target, property, target) as unknown;
  if (typeof value === "function") {
    return () => deny(capability, operationName(owner, property));
  }
  return deny(capability, operationName(owner, property));
}

function createTaskBackendPort(opts: {
  command: CommandContext;
  allowed: ReadonlySet<CommandCapability>;
  deny: CapabilityDenial;
}): CommandContext["taskBackend"] {
  const target = opts.command.taskBackend;
  return new Proxy(target, {
    get: (backend, property, receiver) => {
      const value = Reflect.get(backend, property, receiver) as unknown;
      if (value === undefined) return;
      const capability = requiredTaskBackendCapability(property);
      if (opts.allowed.has(capability)) {
        return boundValue(backend, property, receiver);
      }
      return deniedValue(backend, property, capability, "taskBackend", opts.deny);
    },
    set: (_backend, property) => opts.deny("task.write", operationName("taskBackend", property)),
    defineProperty: (_backend, property) =>
      opts.deny("task.write", operationName("taskBackend", property)),
    deleteProperty: (_backend, property) =>
      opts.deny("task.write", operationName("taskBackend", property)),
  });
}

function requiredTaskBackendCapability(property: PropertyKey): CommandCapability {
  if (BACKEND_READ_MEMBERS.has(property)) return "backend.read";
  if (TASK_READ_MEMBERS.has(property)) return "task.read";
  if (BACKEND_WRITE_MEMBERS.has(property)) return "backend.write";
  if (TASK_WRITE_MEMBERS.has(property)) return "task.write";
  return "backend.write";
}

function requiredGitCapability(property: PropertyKey): CommandCapability {
  if (GIT_HEAD_MEMBERS.has(property)) return "git.head";
  if (GIT_DIFF_MEMBERS.has(property)) return "git.diff";
  return "git.mutate";
}

function createGitPort(opts: {
  command: CommandContext;
  allowed: ReadonlySet<CommandCapability>;
  deny: CapabilityDenial;
}): CommandContext["git"] {
  const target = opts.command.git;
  return new Proxy(target, {
    get: (git, property, receiver) => {
      if (property === "gitRoot") return Reflect.get(git, property, receiver);
      const value = Reflect.get(git, property, receiver) as unknown;
      if (value === undefined) return;
      const capability = requiredGitCapability(property);
      if (opts.allowed.has(capability)) {
        return boundValue(git, property, receiver);
      }
      return deniedValue(git, property, capability, "git", opts.deny);
    },
    set: (_git, property) => opts.deny("git.mutate", operationName("git", property)),
    defineProperty: (_git, property) => opts.deny("git.mutate", operationName("git", property)),
    deleteProperty: (_git, property) => opts.deny("git.mutate", operationName("git", property)),
  });
}

export function createCapabilityScopedCommandContext(opts: {
  command: CommandContext;
  allowed: ReadonlySet<CommandCapability>;
  deny: CapabilityDenial;
}): CommandContext {
  let taskBackend: CommandContext["taskBackend"] | null = null;
  let git: CommandContext["git"] | null = null;
  return new Proxy(opts.command, {
    get: (command, property, receiver) => {
      if (property === "taskBackend") {
        taskBackend ??= createTaskBackendPort(opts);
        return taskBackend;
      }
      if (property === "git") {
        git ??= createGitPort(opts);
        return git;
      }
      return Reflect.get(command, property, receiver) as unknown;
    },
    set: (_command, property) => opts.deny("task.write", operationName("commandContext", property)),
    defineProperty: (_command, property) =>
      opts.deny("task.write", operationName("commandContext", property)),
    deleteProperty: (_command, property) =>
      opts.deny("task.write", operationName("commandContext", property)),
  });
}
