import {
  buildWorkOrderContextManifest,
  WORK_ORDER_CONTEXT_FILENAME,
} from "../../runner/context/work-order-context.js";
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
  type SupervisorExecutionEpisodeJournal,
  type SupervisorExecutionUsage,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { gitRevParse } from "@agentplaneorg/core/git";

import {
  putEvaluatorEvidenceObject,
  readEvaluatorEvidenceObject,
} from "../evaluator/evaluator-evidence-store.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";

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

type ExternalAgentObservedUsage = Partial<
  Pick<
    SupervisorExecutionUsage,
    | "input_tokens"
    | "output_tokens"
    | "total_tokens"
    | "visible_output_tokens"
    | "reasoning_tokens"
    | "cached_input_tokens"
    | "prepared_context_bytes"
  >
>;

export type ExternalAgentHostUsageObservation = {
  schema_version: 1;
  observed_by: "host_transport";
  state: "observed" | "partial" | "unavailable" | "unallocatable";
  reason: string | null;
  provider_usage: SupervisorExecutionEpisodeJournal["operations"][number]["provider_usage"] | null;
  usage: ExternalAgentObservedUsage | null;
};

import type { ExternalImplementationVerificationCheckpoint } from "./external-agent-implementation-checkpoint.js";

export type ExternalAgentExchange = {
  schema_version: 1;
  kind: "external_agent_exchange";
  status: "prepared" | "issued" | "result_received" | "accepted" | "consumed" | "retired";
  issue_digest_version?: 2;
  result_format?: "semantic_payload_v1";
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  role: AgentWorkOrderRole;
  purpose: string;
  checkout: string;
  work_order_id: string;
  work_order_ref: string;
  result_schema_ref: string;
  result_schema_object?: Awaited<ReturnType<typeof putEvaluatorEvidenceObject>>;
  result_ref: string;
  evaluator_work_order_ref: string | null;
  baseline: {
    head: string | null;
    changed_paths: string[];
    task_artifacts?: Record<string, string>;
  };
  result_digest: string | null;
  result: ExternalAgentResultEnvelope | null;
  postcondition_fingerprint: string | null;
  verification_checkpoint?: ExternalImplementationVerificationCheckpoint;
  host_usage?: ExternalAgentHostUsageObservation;
  created_at: string;
  updated_at: string;
};

const EXTERNAL_USAGE_FIELDS = [
  "input_tokens",
  "output_tokens",
  "total_tokens",
  "visible_output_tokens",
  "reasoning_tokens",
  "cached_input_tokens",
  "prepared_context_bytes",
] as const;

function validOptionalIdentity(value: unknown): value is string | null {
  return value === null || (typeof value === "string" && value.trim().length > 0);
}

export function externalAgentUsageAccounting(opts: { exchange: ExternalAgentExchange }): {
  usage: ExternalAgentObservedUsage;
  provider_usage?: SupervisorExecutionEpisodeJournal["operations"][number]["provider_usage"];
  usage_attribution: NonNullable<
    SupervisorExecutionEpisodeJournal["operations"][number]["usage_attribution"]
  >;
} {
  const observation = opts.exchange.host_usage;
  if (!observation) {
    return {
      usage: {},
      usage_attribution: {
        state: "unavailable",
        reason: "legacy_external_host_usage_unavailable",
      },
    };
  }
  const provider = observation.provider_usage;
  const usage = observation.usage;
  const validProvider =
    provider === null ||
    (typeof provider?.provider === "string" &&
      provider.provider.trim().length > 0 &&
      typeof provider.run_id === "string" &&
      provider.run_id.trim().length > 0 &&
      provider.work_order_id === opts.exchange.work_order_id &&
      validOptionalIdentity(provider.thread_id) &&
      validOptionalIdentity(provider.turn_id));
  const validUsage =
    usage === null ||
    (Object.keys(usage).every((key) =>
      EXTERNAL_USAGE_FIELDS.includes(key as (typeof EXTERNAL_USAGE_FIELDS)[number]),
    ) &&
      Object.values(usage).every((value) => Number.isSafeInteger(value) && Number(value) >= 0));
  const observedTrio =
    usage !== null &&
    Number.isSafeInteger(usage.input_tokens) &&
    Number.isSafeInteger(usage.output_tokens) &&
    Number.isSafeInteger(usage.total_tokens);
  const hasUsage = usage !== null && Object.keys(usage).length > 0;
  const validState =
    (observation.state === "observed" && provider !== null && observedTrio) ||
    (observation.state === "partial" && provider !== null && hasUsage && !observedTrio) ||
    ((observation.state === "unavailable" || observation.state === "unallocatable") &&
      usage === null);
  if (
    observation.schema_version !== 1 ||
    observation.observed_by !== "host_transport" ||
    !validProvider ||
    !validUsage ||
    !validState ||
    (observation.reason !== null &&
      (typeof observation.reason !== "string" || observation.reason.trim().length === 0))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent host usage observation is invalid or does not match the exchange.",
    });
  }
  return {
    usage: usage ?? {},
    ...(provider ? { provider_usage: provider } : {}),
    usage_attribution: { state: observation.state, reason: observation.reason },
  };
}

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
  let exchange: ExternalAgentExchange;
  try {
    exchange = JSON.parse(
      await readStableRegularTextNoFollow(filePath, "external exchange"),
    ) as ExternalAgentExchange;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
  if (exchange.result_schema_object)
    await validateExternalSchemaObject(path.dirname(filePath), exchange);
  return exchange;
}

function externalSchemaRoot(directory: string): string {
  return path.resolve(directory, "../../..");
}

async function validateExternalSchemaObject(
  directory: string,
  exchange: ExternalAgentExchange,
): Promise<void> {
  const root = externalSchemaRoot(directory);
  const { artifact } = await readEvaluatorEvidenceObject({
    gitRoot: root,
    objectRoot: "schemas/objects",
    artifact: exchange.result_schema_object,
  });
  if (
    artifact.kind !== "result_schema" ||
    artifact.logical_name !== "external-result-schema" ||
    path.resolve(exchange.result_schema_ref) !== path.join(root, artifact.path)
  )
    throw new Error("External result schema object does not match the exchange identity.");
}

export async function writeExternalAgentExchange(
  filePath: string,
  exchange: ExternalAgentExchange,
): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await atomicWriteFile(filePath, `${JSON.stringify(exchange, null, 2)}\n`, "utf8");
}

export async function writeExternalAgentResult(
  filePath: string,
  result: ExternalAgentResultEnvelope,
): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await atomicWriteFile(filePath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
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
}): Promise<ExternalAgentExchange> {
  await mkdir(opts.paths.directory, { recursive: true, mode: 0o700 });
  await atomicWriteFile(
    opts.paths.work_order,
    `${JSON.stringify(validateAgentWorkOrderV2(opts.work_order), null, 2)}\n`,
    "utf8",
  );
  await atomicWriteFile(
    path.join(opts.paths.directory, WORK_ORDER_CONTEXT_FILENAME),
    `${JSON.stringify(buildWorkOrderContextManifest(opts.work_order, opts.paths.work_order), null, 2)}\n`,
    "utf8",
  );
  let exchange = opts.exchange;
  let historical = false;
  try {
    await readStableRegularTextNoFollow(
      opts.paths.result_schema,
      "historical external result schema",
    );
    historical = true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (!historical && exchange.result_format === "semantic_payload_v1") {
    const root = externalSchemaRoot(opts.paths.directory);
    const artifact = await putEvaluatorEvidenceObject({
      gitRoot: root,
      taskQualityRoot: path.join(root, "schemas"),
      logicalName: "external-result-schema",
      kind: "result_schema",
      extension: ".json",
      mediaType: "application/schema+json",
      contents: renderAgentSemanticResultSchemaJson({ role: opts.work_order.role }),
    });
    exchange = {
      ...exchange,
      result_schema_ref: path.join(root, artifact.path),
      result_schema_object: artifact,
    };
    await validateExternalSchemaObject(opts.paths.directory, exchange);
  } else if (!historical) {
    await atomicWriteFile(
      opts.paths.result_schema,
      `${JSON.stringify(resultEnvelopeSchema(), null, 2)}\n`,
      "utf8",
    );
    await atomicWriteFile(
      opts.paths.semantic_result_schema,
      renderAgentSemanticResultSchemaJson(),
      "utf8",
    );
  }
  // Publish the exchange only after the immutable schema object is readable.
  await writeExternalAgentExchange(opts.paths.exchange, exchange);
  return exchange;
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
  const compact = opts.exchange.result_format === "semantic_payload_v1" && raw.kind === undefined;
  if (
    !compact &&
    (!exactKeys(raw, [
      "kind",
      "result",
      "role",
      "schema_version",
      "state_fingerprint",
      "task_id",
      "transition_id",
    ]) ||
      raw.schema_version !== 1 ||
      raw.kind !== "agent_action_result")
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
    if (!compact && raw[field] !== expected) {
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
      semantic_result: compact ? raw : raw.result,
      ...(compact ? { format: "semantic_payload_v1" } : {}),
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
  const identity = {
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
    ...(exchange.result_schema_object
      ? { result_schema_object: exchange.result_schema_object }
      : {}),
    result_ref: exchange.result_ref,
    evaluator_work_order_ref: exchange.evaluator_work_order_ref,
    baseline: exchange.baseline,
    work_order: validateAgentWorkOrderV2(opts.work_order),
    ...(exchange.result_format ? { result_format: exchange.result_format } : {}),
  };
  return sha256(
    JSON.stringify(
      exchange.issue_digest_version === 2
        ? { ...identity, issue_digest_version: 2 }
        : { ...identity, created_at: exchange.created_at },
    ),
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
