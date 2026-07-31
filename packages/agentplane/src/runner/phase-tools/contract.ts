import {
  KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import {
  RUNNER_PHASE_TOOL_NAMES,
  type RunnerAdapterCapabilities,
  type RunnerContextBundle,
  type RunnerPhaseToolDescriptor,
  type RunnerPhaseToolManifest,
  type RunnerPhaseToolName,
} from "../types.js";

export const RUNNER_PHASE_TOOL_TOKEN_ENV = "AGENTPLANE_RUNNER_PHASE_TOOL_TOKEN";
export const RUNNER_PHASE_TOOL_BROKER_DIR_ENV = "AGENTPLANE_RUNNER_PHASE_TOOL_BROKER_DIR";
export const RUNNER_PHASE_TOOL_GRANT_RELATIVE_PATH = "phase-tools/grant.json";
export const RUNNER_PHASE_TOOL_AUDIT_RELATIVE_DIRECTORY = "phase-tools/audits";

const TOOL_CLASS_BY_NAME: Record<
  RunnerPhaseToolName,
  AgentWorkOrderV2["authority"]["allowed_tool_classes"][number]
> = {
  report_result: "report_result",
  report_blocker: "report_blocker",
  request_knowledge: "knowledge_request",
  knowledge_search: "knowledge_read",
  knowledge_show: "knowledge_read",
};

const REPOSITORY_TOOL_CLASSES = new Set([
  "repository_read",
  "workspace_write",
  "git_read",
  "git_write",
  "run_checks",
]);

const NON_EMPTY_STRING = {
  type: "string",
  minLength: 1,
} as const;

const STRING_ARRAY = {
  type: "array",
  items: { type: "string" },
} as const;

function inputSchema(tool: RunnerPhaseToolName): Record<string, unknown> {
  if (tool === "report_result") {
    return {
      $ref: "https://agentplane.org/schemas/agent-semantic-result.schema.json",
    };
  }
  if (tool === "report_blocker") {
    return {
      type: "object",
      additionalProperties: false,
      properties: {
        summary: NON_EMPTY_STRING,
        recommended_action: NON_EMPTY_STRING,
        findings: STRING_ARRAY,
        uncertainty: STRING_ARRAY,
      },
      required: ["summary"],
    };
  }
  if (tool === "request_knowledge") {
    return {
      type: "object",
      additionalProperties: false,
      properties: {
        query: NON_EMPTY_STRING,
        reason: NON_EMPTY_STRING,
        desired_kind: {
          type: "string",
          enum: [...KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES],
        },
        blocking: { type: "boolean" },
      },
      required: ["query", "reason", "desired_kind", "blocking"],
    };
  }
  if (tool === "knowledge_search") {
    return {
      type: "object",
      additionalProperties: false,
      properties: {
        query: NON_EMPTY_STRING,
        desired_kind: {
          type: "string",
          enum: [...KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES],
        },
      },
      required: ["query"],
    };
  }
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      ref: NON_EMPTY_STRING,
      digest: {
        type: "string",
        pattern: "^sha256:[0-9a-f]{64}$",
      },
    },
    required: ["ref", "digest"],
  };
}

function descriptor(opts: {
  tool: RunnerPhaseToolName;
  work_order: AgentWorkOrderV2;
  capabilities: RunnerAdapterCapabilities | undefined;
}): RunnerPhaseToolDescriptor {
  const requested = opts.work_order.authority.allowed_tool_classes.includes(
    TOOL_CLASS_BY_NAME[opts.tool],
  );
  const capability = opts.capabilities?.phase_tools?.[opts.tool];
  const available = capability?.availability === "available";
  const allowed = requested && available;
  const transport = capability?.transport ?? "none";
  const runScoped = transport === "run_scoped_command";
  const reason = requested
    ? available
      ? null
      : (capability?.note ?? "The adapter does not expose this phase tool.")
    : `The work order does not grant ${TOOL_CLASS_BY_NAME[opts.tool]}.`;
  return {
    name: opts.tool,
    allowed,
    transport,
    enforcement: capability?.enforcement ?? "advisory",
    invocation: allowed && runScoped ? `agentplane task run tool ${opts.tool}` : null,
    input_mode: runScoped ? "stdin_json" : "terminal_result",
    input_schema: inputSchema(opts.tool),
    reason,
  };
}

export function buildRunnerPhaseToolManifest(opts: {
  bundle: RunnerContextBundle;
  token: RunnerPhaseToolManifest["token"];
  grant_path: string;
  audit_directory: string;
}): RunnerPhaseToolManifest | null {
  const workOrder = opts.bundle.work_order;
  const task = opts.bundle.task;
  if (!workOrder || !task) return null;
  const phase = opts.bundle.route_decision?.oracle.phase ?? "semantic_episode";
  const tools = RUNNER_PHASE_TOOL_NAMES.map((tool) =>
    descriptor({
      tool,
      work_order: workOrder,
      capabilities: opts.bundle.execution.adapter_capabilities,
    }),
  );
  return {
    schema_version: 1,
    kind: "runner_phase_tool_manifest",
    run_id: opts.bundle.execution.run_id,
    work_order_id: workOrder.work_order_id,
    task_id: task.metadata.task_id,
    phase,
    role: workOrder.role,
    global_help_required: false,
    token: opts.token,
    tools,
    repository_tool_classes: workOrder.authority.allowed_tool_classes
      .filter((toolClass) => REPOSITORY_TOOL_CLASSES.has(toolClass))
      .toSorted(),
    grant_path: opts.grant_path,
    audit_directory: opts.audit_directory,
  };
}

export function runScopedPhaseToolNames(manifest: RunnerPhaseToolManifest): RunnerPhaseToolName[] {
  return manifest.tools
    .filter(
      (tool): tool is RunnerPhaseToolDescriptor & { name: RunnerPhaseToolName } =>
        tool.allowed && tool.transport === "run_scoped_command",
    )
    .map((tool) => tool.name);
}
