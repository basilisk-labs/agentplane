import type { LoadedConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";

import type { EvaluatorArtifactPreparationPort } from "../../../commands/evaluator/evaluator-artifact-port.js";
import type { CommandContext } from "../../../commands/shared/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import {
  PreparationTraceRecorder,
  type PreparationTraceEvent,
} from "../../../shared/preparation-trace.js";
import { exitCodeForError } from "../../exit-codes.js";
import type { HelpJson } from "../../spec/help-render.js";

import { createCapabilityScopedCommandContext } from "./command-context-port.js";

export type CommandCapability =
  | "project"
  | "config"
  | "backend.read"
  | "backend.write"
  | "task.read"
  | "task.write"
  | "git.head"
  | "git.diff"
  | "git.mutate"
  | "route.local"
  | "route.remote"
  | "policy"
  | "approvals"
  | "context.search"
  | "evaluator.artifacts.write"
  | "provider"
  | "output";

export type CommandPreparationNode =
  | "project"
  | "config"
  | "command_context"
  | "evaluator_artifacts"
  | "output";

export type CommandPreparationTrace = Omit<
  PreparationTraceEvent,
  "command" | "capability" | "node"
> & {
  command: string;
  capability: CommandCapability;
  node: CommandPreparationNode;
};

type AsyncCommandCapability = Exclude<CommandCapability, "output">;
type CommandCapabilityValue<TCapability extends AsyncCommandCapability> =
  TCapability extends "project"
    ? ResolvedProject
    : TCapability extends "config"
      ? LoadedConfig
      : TCapability extends "evaluator.artifacts.write"
        ? EvaluatorArtifactPreparationPort
        : CommandContext;

type CommandSessionOutput<TCapabilities extends CommandCapability> = "output" extends TCapabilities
  ? { getHelpJsonForDocs: () => readonly HelpJson[] }
  : object;

export type CommandSession<TCapabilities extends CommandCapability = never> = {
  readonly requirements: readonly TCapabilities[];
  require: <TCapability extends Exclude<TCapabilities, "output">>(
    capability: TCapability,
    commandForErrorContext: string,
  ) => Promise<CommandCapabilityValue<TCapability>>;
  trace: () => readonly CommandPreparationTrace[];
} & CommandSessionOutput<TCapabilities>;

export type CommandSessionResolvers = {
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>;
  getResolvedProject: (commandForErrorContext: string) => Promise<ResolvedProject>;
  getLoadedConfig: (commandForErrorContext: string) => Promise<LoadedConfig>;
  getEvaluatorArtifactPort: (
    commandForErrorContext: string,
  ) => Promise<EvaluatorArtifactPreparationPort>;
  getHelpJsonForDocs: () => readonly HelpJson[];
  onPreparationTrace?: (event: CommandPreparationTrace) => void;
  now?: () => number;
};

const CONTEXT_CAPABILITIES = new Set<CommandCapability>([
  "backend.read",
  "backend.write",
  "task.read",
  "task.write",
  "git.head",
  "git.diff",
  "git.mutate",
  "route.local",
  "route.remote",
  "policy",
  "approvals",
  "context.search",
  "provider",
]);

export function isCommandContextCapability(capability: CommandCapability): boolean {
  return CONTEXT_CAPABILITIES.has(capability);
}

export function preparationNodeForCapability(
  capability: CommandCapability,
): CommandPreparationNode {
  if (capability === "evaluator.artifacts.write") return "evaluator_artifacts";
  if (capability === "project" || capability === "config" || capability === "output") {
    return capability;
  }
  return "command_context";
}

export function validateCommandRequirements(requirements: readonly CommandCapability[]): void {
  if (new Set(requirements).size !== requirements.length) {
    throw new Error("Command capability requirements must not contain duplicates");
  }
  const hasPreparedRuntime = requirements.some(
    (capability) =>
      isCommandContextCapability(capability) || capability === "evaluator.artifacts.write",
  );
  const needsConfig = hasPreparedRuntime || requirements.includes("config");
  const needsProject = needsConfig || requirements.includes("project");
  if (needsConfig && !requirements.includes("config")) {
    throw new Error("Command context capabilities require the config capability");
  }
  if (needsProject && !requirements.includes("project")) {
    throw new Error("Command config/context capabilities require the project capability");
  }
}

function undeclaredCapabilityError(opts: {
  command: string;
  capability: CommandCapability;
  operation?: string;
}): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_INTERNAL"),
    code: "E_INTERNAL",
    message: opts.operation
      ? `Internal error: command "${opts.command}" attempted operation "${opts.operation}" requiring undeclared capability "${opts.capability}"`
      : `Internal error: command "${opts.command}" attempted undeclared capability "${opts.capability}"`,
  });
}

const NODE_DEPENDENCIES: Record<CommandPreparationNode, readonly CommandPreparationNode[]> = {
  project: [],
  config: ["project"],
  command_context: ["config"],
  evaluator_artifacts: ["config"],
  output: [],
};

function commandContextProjection(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const context = value as Partial<CommandContext>;
  return {
    resolved_project: context.resolvedProject ?? null,
    config: context.config ?? null,
    backend_id: context.backendId ?? null,
    backend_config_path: context.backendConfigPath ?? null,
  };
}

function nodeProjection(node: CommandPreparationNode, value: unknown): unknown {
  if (node === "command_context") return commandContextProjection(value);
  if (node === "evaluator_artifacts") return { prepared: value !== null && value !== undefined };
  return value;
}

function cachePolicy(node: CommandPreparationNode): {
  cacheability: "exact" | "none";
  cachePolicyReason: string;
} {
  if (node === "evaluator_artifacts") {
    return {
      cacheability: "none",
      cachePolicyReason: "Evaluator artifact preparation exposes a write port.",
    };
  }
  return {
    cacheability: "exact",
    cachePolicyReason: "The structured preparation result has explicit fingerprint inputs.",
  };
}

export function createCommandSession<
  const TRequirements extends readonly CommandCapability[],
>(opts: {
  command: string;
  requirements: TRequirements;
  resolvers: CommandSessionResolvers;
}): CommandSession<TRequirements[number]> {
  validateCommandRequirements(opts.requirements);
  const allowed = new Set<CommandCapability>(opts.requirements);
  const traces: CommandPreparationTrace[] = [];
  const nodeValues = new Map<CommandPreparationNode, unknown>();
  const nodePromises = new Map<CommandPreparationNode, Promise<unknown>>();
  const now = opts.resolvers.now ?? (() => performance.now());

  const recorder = new PreparationTraceRecorder({
    emit: (event) => {
      const commandEvent = event as CommandPreparationTrace;
      traces.push(commandEvent);
      opts.resolvers.onPreparationTrace?.(commandEvent);
    },
  });

  const record = (event: {
    capability: CommandCapability;
    node: CommandPreparationNode;
    status: "resolved" | "reused" | "denied" | "failed";
    durationMs: number;
    value?: unknown;
    reason?: string;
  }): void => {
    const dependencyValues = Object.fromEntries(
      NODE_DEPENDENCIES[event.node].map((dependency) => [
        dependency,
        nodeProjection(dependency, nodeValues.get(dependency)),
      ]),
    );
    const projection = nodeProjection(event.node, event.value);
    recorder.record({
      command: opts.command,
      capability: event.capability,
      node: event.node,
      scope: `command:${opts.command}`,
      status: event.status,
      durationMs: event.durationMs,
      dependencies: NODE_DEPENDENCIES[event.node],
      fingerprintInputs:
        event.status === "denied"
          ? { declared_requirements: opts.requirements }
          : { ...dependencyValues, result: projection },
      output: projection,
      ...cachePolicy(event.node),
      reason: event.reason,
    });
  };

  const deny = (capability: CommandCapability, operation?: string): never => {
    const node = preparationNodeForCapability(capability);
    record({
      capability,
      node,
      status: "denied",
      durationMs: 0,
      reason: "capability_not_declared",
    });
    throw undeclaredCapabilityError({ command: opts.command, capability, operation });
  };

  const resolveNode = async (
    capability: AsyncCommandCapability,
    commandForErrorContext: string,
  ): Promise<unknown> => {
    if (!allowed.has(capability)) deny(capability);
    const node = preparationNodeForCapability(capability);
    const existing = nodePromises.get(node);
    if (existing) {
      record({
        capability,
        node,
        status: "reused",
        durationMs: 0,
        value: nodeValues.get(node),
      });
      return await existing;
    }
    const startedAt = now();
    const promise = (async () => {
      switch (node) {
        case "project": {
          return await opts.resolvers.getResolvedProject(commandForErrorContext);
        }
        case "config": {
          await resolveNode("project", commandForErrorContext);
          return await opts.resolvers.getLoadedConfig(commandForErrorContext);
        }
        case "command_context": {
          await resolveNode("config", commandForErrorContext);
          return createCapabilityScopedCommandContext({
            command: await opts.resolvers.getCtx(commandForErrorContext),
            allowed,
            deny,
          });
        }
        case "evaluator_artifacts": {
          await resolveNode("config", commandForErrorContext);
          return await opts.resolvers.getEvaluatorArtifactPort(commandForErrorContext);
        }
        case "output": {
          throw new Error("Output capability is resolved synchronously");
        }
      }
    })();
    nodePromises.set(node, promise);
    try {
      const value = await promise;
      nodeValues.set(node, value);
      record({
        capability,
        node,
        status: "resolved",
        durationMs: Math.max(0, now() - startedAt),
        value,
      });
      return value;
    } catch (error) {
      nodePromises.delete(node);
      record({
        capability,
        node,
        status: "failed",
        durationMs: Math.max(0, now() - startedAt),
        value: error instanceof Error ? { error: error.name } : null,
        reason: "resolver_failed",
      });
      throw error;
    }
  };

  const getHelpJsonForDocs = (): readonly HelpJson[] => {
    const capability = "output" as const;
    if (!allowed.has(capability)) deny(capability);
    const node = preparationNodeForCapability(capability);
    if (nodeValues.has(node)) {
      record({
        capability,
        node,
        status: "reused",
        durationMs: 0,
        value: nodeValues.get(node),
      });
      return nodeValues.get(node) as readonly HelpJson[];
    }
    const startedAt = now();
    try {
      const value = opts.resolvers.getHelpJsonForDocs();
      nodeValues.set(node, value);
      record({
        capability,
        node,
        status: "resolved",
        durationMs: Math.max(0, now() - startedAt),
        value,
      });
      return value;
    } catch (error) {
      record({
        capability,
        node,
        status: "failed",
        durationMs: Math.max(0, now() - startedAt),
        value: error instanceof Error ? { error: error.name } : null,
        reason: "resolver_failed",
      });
      throw error;
    }
  };

  return {
    requirements: [...opts.requirements],
    require: async (capability, commandForErrorContext) =>
      (await resolveNode(
        capability as AsyncCommandCapability,
        commandForErrorContext,
      )) as CommandCapabilityValue<typeof capability>,
    getHelpJsonForDocs,
    trace: () => [...traces],
  } as CommandSession<TRequirements[number]>;
}
