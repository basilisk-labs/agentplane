import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  renderAgentSemanticResultSchemaJson,
  validateAgentSemanticResultForWorkOrder,
  validateAgentWorkOrderV2,
  type AgentSemanticResult,
  type AgentWorkOrderRole,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { gitRevParse } from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";

export type ExternalAgentResultEnvelope = {
  schema_version: 1;
  kind: "agent_action_result";
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  role: AgentWorkOrderRole;
  result: AgentSemanticResult;
};

export type ExternalAgentExchange = {
  schema_version: 1;
  kind: "external_agent_exchange";
  status: "issued" | "accepted" | "consumed";
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  role: AgentWorkOrderRole;
  purpose: string;
  checkout: string;
  work_order_id: string;
  work_order_ref: string;
  result_schema_ref: string;
  result_ref: string;
  evaluator_work_order_ref: string | null;
  baseline: {
    head: string | null;
    changed_paths: string[];
  };
  result_digest: string | null;
  result: ExternalAgentResultEnvelope | null;
  postcondition_fingerprint: string | null;
  created_at: string;
  updated_at: string;
};

export type ExternalAgentExchangePaths = {
  directory: string;
  exchange: string;
  work_order: string;
  result_schema: string;
  semantic_result_schema: string;
  result: string;
};

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function safeSegment(value: string, label: string): string {
  const normalized = value.trim();
  if (
    !normalized ||
    normalized === "." ||
    normalized === ".." ||
    normalized.includes("\0") ||
    normalized.includes("/") ||
    normalized.includes("\\") ||
    path.basename(normalized) !== normalized
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} must be one safe path segment.`,
    });
  }
  return normalized;
}

function fingerprintSegment(value: string): string {
  if (!/^sha256:[0-9a-f]{64}$/u.test(value)) {
    throw new CliError({ code: "E_VALIDATION", message: "Invalid exchange state fingerprint." });
  }
  return value.slice("sha256:".length);
}

export async function resolveExternalAgentExchangePaths(opts: {
  git_root: string;
  common_git_dir?: string;
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
}): Promise<ExternalAgentExchangePaths> {
  const taskId = safeSegment(opts.task_id, "External-agent task id");
  const transitionId = safeSegment(opts.transition_id, "External-agent transition id");
  const commonGitDir = opts.common_git_dir
    ? path.resolve(opts.common_git_dir)
    : path.resolve(opts.git_root, await gitRevParse(opts.git_root, ["--git-common-dir"]));
  const directory = path.join(
    commonGitDir,
    "agentplane",
    "external-agent",
    taskId,
    transitionId,
    fingerprintSegment(opts.state_fingerprint),
  );
  return {
    directory,
    exchange: path.join(directory, "exchange.json"),
    work_order: path.join(directory, "work-order.json"),
    result_schema: path.join(directory, "result-schema.json"),
    semantic_result_schema: path.join(directory, "semantic-result.schema.json"),
    result: path.join(directory, "result.json"),
  };
}

export async function readExternalAgentExchange(
  filePath: string,
): Promise<ExternalAgentExchange | null> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as ExternalAgentExchange;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

export async function writeExternalAgentExchange(
  filePath: string,
  exchange: ExternalAgentExchange,
): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await atomicWriteFile(filePath, `${JSON.stringify(exchange, null, 2)}\n`, "utf8");
}

function resultEnvelopeSchema(): Record<string, unknown> {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "Agentplane external-agent result envelope (v1)",
    type: "object",
    additionalProperties: false,
    required: [
      "schema_version",
      "kind",
      "task_id",
      "transition_id",
      "state_fingerprint",
      "role",
      "result",
    ],
    properties: {
      schema_version: { const: 1 },
      kind: { const: "agent_action_result" },
      task_id: { type: "string", minLength: 1 },
      transition_id: { type: "string", pattern: "^tr_[0-9a-f]{32}$" },
      state_fingerprint: { type: "string", pattern: "^sha256:[0-9a-f]{64}$" },
      role: { enum: ["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"] },
      result: { $ref: "semantic-result.schema.json" },
    },
  };
}

export async function persistExternalAgentExchangeArtifacts(opts: {
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
  exchange: ExternalAgentExchange;
}): Promise<void> {
  await mkdir(opts.paths.directory, { recursive: true, mode: 0o700 });
  await Promise.all([
    atomicWriteFile(
      opts.paths.work_order,
      `${JSON.stringify(validateAgentWorkOrderV2(opts.work_order), null, 2)}\n`,
      "utf8",
    ),
    atomicWriteFile(
      opts.paths.result_schema,
      `${JSON.stringify(resultEnvelopeSchema(), null, 2)}\n`,
      "utf8",
    ),
    atomicWriteFile(
      opts.paths.semantic_result_schema,
      renderAgentSemanticResultSchemaJson(),
      "utf8",
    ),
  ]);
  await writeExternalAgentExchange(opts.paths.exchange, opts.exchange);
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const keys = Object.keys(value).toSorted();
  return keys.length === expected.length && keys.every((key, index) => key === expected[index]);
}

export function validateExternalAgentResultEnvelope(opts: {
  raw: unknown;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): ExternalAgentResultEnvelope {
  if (!opts.raw || typeof opts.raw !== "object" || Array.isArray(opts.raw)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result must be an object.",
    });
  }
  const raw = opts.raw as Record<string, unknown>;
  if (
    !exactKeys(raw, [
      "kind",
      "result",
      "role",
      "schema_version",
      "state_fingerprint",
      "task_id",
      "transition_id",
    ]) ||
    raw.schema_version !== 1 ||
    raw.kind !== "agent_action_result"
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result envelope does not match schema version 1.",
    });
  }
  for (const [field, expected] of [
    ["task_id", opts.exchange.task_id],
    ["transition_id", opts.exchange.transition_id],
    ["state_fingerprint", opts.exchange.state_fingerprint],
    ["role", opts.exchange.role],
  ] as const) {
    if (raw[field] !== expected) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `External-agent result ${field} does not match the issued exchange.`,
      });
    }
  }
  let result: AgentSemanticResult;
  try {
    result = validateAgentSemanticResultForWorkOrder({
      work_order: opts.work_order,
      semantic_result: raw.result,
    });
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid external-agent semantic result: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
  return {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: opts.exchange.task_id,
    transition_id: opts.exchange.transition_id,
    state_fingerprint: opts.exchange.state_fingerprint,
    role: opts.exchange.role,
    result,
  };
}

export function externalAgentResultDigest(result: ExternalAgentResultEnvelope): string {
  return sha256(JSON.stringify(result));
}

export function externalAgentIssueDigest(opts: {
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): string {
  const exchange = opts.exchange;
  return sha256(
    JSON.stringify({
      schema_version: exchange.schema_version,
      kind: exchange.kind,
      task_id: exchange.task_id,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      role: exchange.role,
      purpose: exchange.purpose,
      checkout: exchange.checkout,
      work_order_id: exchange.work_order_id,
      work_order_ref: exchange.work_order_ref,
      result_schema_ref: exchange.result_schema_ref,
      result_ref: exchange.result_ref,
      evaluator_work_order_ref: exchange.evaluator_work_order_ref,
      baseline: exchange.baseline,
      created_at: exchange.created_at,
      work_order: validateAgentWorkOrderV2(opts.work_order),
    }),
  );
}

export async function readExternalAgentResult(filePath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as unknown;
  } catch (error) {
    throw new CliError({
      code: "E_USAGE",
      message: `Unable to read external-agent result JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}

export async function readExternalAgentWorkOrder(filePath: string): Promise<AgentWorkOrderV2> {
  try {
    return validateAgentWorkOrderV2(JSON.parse(await readFile(filePath, "utf8")));
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Unable to read issued AgentWorkOrder: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}
