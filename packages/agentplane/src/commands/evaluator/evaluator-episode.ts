import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { CommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  createCodexResultEventCollector,
  type CodexProviderUsage,
} from "../../runner/adapters/codex-result-transport.js";
import type { EvaluatorSgrResult } from "../../evaluators/sgr-result.js";

import {
  assertFrozenEvaluatorArtifactsCurrent,
  assertResultEvidenceIsFrozen,
  validateStrictEvaluatorResult,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";

const EVALUATOR_EPISODE_RECEIPT_FILE = "evaluator-episode.json";
const MAX_PROVIDER_STDOUT_BYTES = 16 * 1024 * 1024;
const MAX_PROVIDER_STDERR_BYTES = 1024 * 1024;
type EvaluatorEpisodeInvocation = {
  provider: "codex";
  repository_root: string;
  work_order_id: string;
  work_order_path: string;
  prompt: string;
  output_schema_path: string;
  timeout_ms: number;
  argv: string[];
};

type EvaluatorEpisodeProviderResult = {
  raw_result: unknown;
  started_at: string;
  ended_at: string;
  stdout_bytes: number;
  stderr_bytes: number;
  provider_usage?: CodexProviderUsage | null;
  provider_usage_status?: "observed" | "partial" | "unavailable";
  provider_thread_id?: string | null;
  provider_turn_id?: string | null;
};

type EvaluatorProviderFailureKind =
  | "nonzero_exit"
  | "malformed_structured_result"
  | "missing_structured_result"
  | "provider_error"
  | "stdin_write_failure"
  | "stderr_limit"
  | "stdout_limit"
  | "timeout";

class EvaluatorProviderFailure extends Error {
  readonly kind: EvaluatorProviderFailureKind;
  readonly exit_code: number | null;
  readonly signal: string | null;

  constructor(opts: {
    kind: EvaluatorProviderFailureKind;
    exit_code?: number | null;
    signal?: string | null;
    message?: string;
  }) {
    super(opts.message ?? `Codex evaluator provider failure: ${opts.kind}`);
    this.name = "EvaluatorProviderFailure";
    this.kind = opts.kind;
    this.exit_code = opts.exit_code ?? null;
    this.signal = opts.signal ?? null;
  }
}

type EvaluatorProviderFailureObservation = {
  started_at: string;
  ended_at: string;
  stdout_bytes: number;
  stderr_bytes: number;
  provider_usage_status: "observed" | "partial" | "unavailable";
  provider_usage: CodexProviderUsage | null;
  provider_thread_id: string | null;
  provider_turn_id: string | null;
};

class ObservedEvaluatorProviderFailure extends Error {
  readonly kind: EvaluatorProviderFailureKind | "provider_error";
  readonly exit_code: number | null;
  readonly signal: string | null;

  constructor(
    readonly failure: Error,
    readonly observation: EvaluatorProviderFailureObservation,
  ) {
    super(failure.message);
    this.name = "ObservedEvaluatorProviderFailure";
    this.kind = failure instanceof EvaluatorProviderFailure ? failure.kind : "provider_error";
    this.exit_code = failure instanceof EvaluatorProviderFailure ? failure.exit_code : null;
    this.signal = failure instanceof EvaluatorProviderFailure ? failure.signal : null;
  }
}

export type EvaluatorEpisodeProvider = (
  invocation: EvaluatorEpisodeInvocation,
) => Promise<EvaluatorEpisodeProviderResult>;

export type EvaluatorEpisodeReceipt = {
  schema_version: 1;
  kind: "evaluator_episode_receipt";
  work_order_id: string;
  provider: "codex";
  authority: { sandbox: "read-only"; writable_roots: [] };
  argv: string[];
  started_at: string;
  ended_at: string;
  stdout_bytes: number;
  stderr_bytes: number;
  provider_usage: CodexProviderUsage | null;
  provider_usage_status?: "observed" | "partial" | "unavailable";
  provider_thread_id?: string | null;
  provider_turn_id?: string | null;
  workspace_state: "unchanged";
  result_sha256: `sha256:${string}`;
};

export type EvaluatorProviderFailureReceipt = {
  schema_version: 1;
  kind: "evaluator_provider_failure_receipt";
  work_order_id: string;
  provider: "codex";
  authority: { sandbox: "read-only"; writable_roots: [] };
  argv: string[];
  started_at: string;
  ended_at: string;
  stdout_bytes: number;
  stderr_bytes: number;
  provider_usage: CodexProviderUsage | null;
  provider_usage_status: "observed" | "partial" | "unavailable";
  provider_thread_id: string | null;
  provider_turn_id: string | null;
  workspace_state: "unchanged";
  failure: ReturnType<typeof evaluatorProviderFailureRecord>;
};

export class EvaluatorEpisodeFailureError extends CliError {
  constructor(
    readonly receipt: EvaluatorProviderFailureReceipt,
    message?: string,
  ) {
    super({
      code: "E_RUNTIME",
      message:
        message ??
        "Codex evaluator provider failed before returning a typed result " +
          `(classification=${receipt.failure.classification} exit_code=${receipt.failure.exit_code ?? "unknown"} signal=${receipt.failure.signal ?? "none"}). ` +
          "The typed result was not applied.",
    });
  }
}

function providerFailureObservation(opts: {
  failure: unknown;
  result: EvaluatorEpisodeProviderResult | null;
  message?: string;
}): EvaluatorProviderFailureObservation {
  if (opts.failure instanceof ObservedEvaluatorProviderFailure) {
    return opts.failure.observation;
  }
  if (opts.result) {
    return {
      started_at: opts.result.started_at,
      ended_at: opts.result.ended_at,
      stdout_bytes: opts.result.stdout_bytes,
      stderr_bytes: opts.result.stderr_bytes,
      provider_usage_status:
        opts.result.provider_usage_status ??
        (opts.result.provider_usage === null ? "unavailable" : "partial"),
      provider_usage: opts.result.provider_usage ?? null,
      provider_thread_id:
        opts.result.provider_thread_id ?? opts.result.provider_usage?.thread_id ?? null,
      provider_turn_id: opts.result.provider_turn_id ?? opts.result.provider_usage?.turn_id ?? null,
    };
  }
  const now = new Date().toISOString();
  return {
    started_at: now,
    ended_at: now,
    stdout_bytes: 0,
    stderr_bytes: 0,
    provider_usage_status: "unavailable",
    provider_usage: null,
    provider_thread_id: null,
    provider_turn_id: null,
  };
}

async function persistEvaluatorProviderFailure(opts: {
  prepared: PreparedEvaluatorReview;
  invocation: EvaluatorEpisodeInvocation;
  failure: unknown;
  result: EvaluatorEpisodeProviderResult | null;
  message?: string;
}): Promise<never> {
  const receipt: EvaluatorProviderFailureReceipt = {
    schema_version: 1,
    kind: "evaluator_provider_failure_receipt",
    work_order_id: opts.invocation.work_order_id,
    provider: "codex",
    authority: { sandbox: "read-only", writable_roots: [] },
    argv: opts.invocation.argv,
    ...providerFailureObservation({ failure: opts.failure, result: opts.result }),
    workspace_state: "unchanged",
    failure: evaluatorProviderFailureRecord(opts.failure),
  };
  await writeEvaluatorReceipt({ prepared: opts.prepared, receipt });
  throw new EvaluatorEpisodeFailureError(receipt, opts.message);
}

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function relative(root: string, value: string): string {
  return path.relative(root, value).replaceAll("\\", "/");
}

async function readWorkspaceState(repositoryRoot: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all", "--ignored=matching"],
      { cwd: repositoryRoot, maxBuffer: 2 * 1024 * 1024 },
    );
    return stdout;
  } catch (error) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `Unable to attest evaluator workspace state: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}

function assertUnchangedWorkspace(opts: { before: string; after: string }): void {
  if (opts.before === opts.after) return;
  throw new CliError({
    code: "E_VALIDATION",
    message:
      "Evaluator episode is unacceptable because the read-only provider changed repository state. The typed result was not applied.",
  });
}

function evaluatorCodexArgv(opts: { repositoryRoot: string; outputSchemaPath: string }): string[] {
  return [
    "codex",
    "-a",
    "never",
    "exec",
    "--ignore-user-config",
    "--strict-config",
    "--disable",
    "hooks",
    "--ephemeral",
    "--json",
    "-C",
    opts.repositoryRoot,
    "-s",
    "read-only",
    "--output-schema",
    opts.outputSchemaPath,
    "-",
  ];
}

export function evaluatorProviderFailureRecord(error: unknown): {
  kind: "evaluator_provider_failure";
  classification: EvaluatorProviderFailureKind | "unclassified";
  exit_code: number | null;
  signal: string | null;
} {
  const failure = error instanceof ObservedEvaluatorProviderFailure ? error.failure : error;
  if (failure instanceof EvaluatorProviderFailure) {
    return {
      kind: "evaluator_provider_failure",
      classification: failure.kind,
      exit_code: failure.exit_code,
      signal: failure.signal,
    };
  }
  return {
    kind: "evaluator_provider_failure",
    classification: "unclassified",
    exit_code: null,
    signal: null,
  };
}

async function prepareEvaluatorEpisodeInvocation(opts: {
  ctx: CommandContext;
  prepared: PreparedEvaluatorReview;
}): Promise<EvaluatorEpisodeInvocation> {
  const repositoryRoot = opts.ctx.resolvedProject.gitRoot;
  const outputSchemaPath = opts.prepared.output_schema_path;
  const prompt = await readFile(opts.prepared.prompt_path, "utf8");
  return {
    provider: "codex",
    repository_root: repositoryRoot,
    work_order_id: opts.prepared.work_order.work_order_id,
    work_order_path: relative(repositoryRoot, opts.prepared.work_order_path),
    prompt,
    output_schema_path: outputSchemaPath,
    timeout_ms: opts.ctx.config.runner.timeouts.wall_clock_ms,
    argv: evaluatorCodexArgv({ repositoryRoot, outputSchemaPath }),
  };
}

function tail(value: string, next: string, limit: number): string {
  const combined = `${value}${next}`;
  return combined.length <= limit ? combined : combined.slice(-limit);
}

function terminateEvaluatorProcess(child: ReturnType<typeof spawn>): void {
  // `codex` starts a launcher that can keep the inherited stdio pipes open
  // after the launcher dies. Give the provider its own process group and
  // terminate that group, so a timeout always settles the EVALUATOR episode.
  if (process.platform !== "win32" && typeof child.pid === "number" && child.pid > 0) {
    try {
      process.kill(-child.pid, "SIGKILL");
      return;
    } catch {
      // Fall through to the direct child when the group no longer exists.
    }
  }
  child.kill("SIGKILL");
}

export const executeCodexEvaluatorEpisode: EvaluatorEpisodeProvider = async (invocation) =>
  await new Promise<EvaluatorEpisodeProviderResult>((resolve, reject) => {
    const [command, ...args] = invocation.argv;
    if (!command) {
      reject(new Error("Evaluator invocation is missing the provider executable."));
      return;
    }
    const startedAt = new Date().toISOString();
    const collector = createCodexResultEventCollector();
    const child = spawn(command, args, {
      cwd: invocation.repository_root,
      detached: process.platform !== "win32",
      env: {
        ...process.env,
        AGENTPLANE_EVALUATOR_WORK_ORDER_ID: invocation.work_order_id,
        AGENTPLANE_EVALUATOR_SANDBOX: "read-only",
      },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let settled = false;
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let stderrTail = "";
    let stdoutBuffer = "";
    let limitError: Error | null = null;
    let stdinError: Error | null = null;
    const timeout =
      invocation.timeout_ms > 0
        ? setTimeout(() => {
            limitError = new EvaluatorProviderFailure({
              kind: "timeout",
              message: `Codex evaluator exceeded ${invocation.timeout_ms}ms.`,
            });
            terminateEvaluatorProcess(child);
          }, invocation.timeout_ms)
        : null;
    const finish = (error?: Error, value?: EvaluatorEpisodeProviderResult) => {
      if (settled) return;
      settled = true;
      if (timeout !== null) clearTimeout(timeout);
      if (error) {
        const usage = collector.readUsageObservation();
        reject(
          new ObservedEvaluatorProviderFailure(error, {
            started_at: startedAt,
            ended_at: new Date().toISOString(),
            stdout_bytes: stdoutBytes,
            stderr_bytes: stderrBytes,
            provider_usage_status: usage.status,
            provider_usage: usage.usage,
            provider_thread_id: usage.thread_id,
            provider_turn_id: usage.turn_id,
          }),
        );
      } else if (value) resolve(value);
    };
    child.on("error", (error) =>
      finish(
        new EvaluatorProviderFailure({
          kind: "provider_error",
          message: error.message,
        }),
      ),
    );
    child.stdout.on("data", (chunk: Buffer) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > MAX_PROVIDER_STDOUT_BYTES) {
        limitError = new EvaluatorProviderFailure({
          kind: "stdout_limit",
          message: "Codex evaluator exceeded the stdout safety limit.",
        });
        terminateEvaluatorProcess(child);
        return;
      }
      stdoutBuffer += chunk.toString("utf8");
      let newline = stdoutBuffer.indexOf("\n");
      while (newline !== -1) {
        const line = stdoutBuffer.slice(0, newline);
        stdoutBuffer = stdoutBuffer.slice(newline + 1);
        collector.observeStdoutLine(line);
        newline = stdoutBuffer.indexOf("\n");
      }
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderrBytes += chunk.length;
      stderrTail = tail(stderrTail, chunk.toString("utf8"), 4096);
      if (stderrBytes > MAX_PROVIDER_STDERR_BYTES) {
        limitError = new EvaluatorProviderFailure({
          kind: "stderr_limit",
          message: "Codex evaluator exceeded the stderr safety limit.",
        });
        terminateEvaluatorProcess(child);
      }
    });
    child.stdin.once("error", (error) => {
      if (settled) return;
      stdinError = error;
      terminateEvaluatorProcess(child);
    });
    child.on("close", (code, signal) => {
      if (limitError) {
        finish(limitError);
        return;
      }
      if (stdinError) {
        finish(
          new EvaluatorProviderFailure({
            kind: "stdin_write_failure",
            exit_code: code,
            signal,
          }),
        );
        return;
      }
      if (code !== 0 || signal) {
        finish(
          new EvaluatorProviderFailure({
            kind: "nonzero_exit",
            exit_code: code,
            signal,
          }),
        );
        return;
      }
      try {
        if (stdoutBuffer.trim()) collector.observeStdoutLine(stdoutBuffer);
        const rawText = collector.readLastAgentMessage();
        if (rawText === null) {
          throw new EvaluatorProviderFailure({ kind: "missing_structured_result" });
        }
        const providerUsage = collector.readUsage();
        const usageObservation = collector.readUsageObservation();
        finish(undefined, {
          raw_result: JSON.parse(rawText) as unknown,
          started_at: startedAt,
          ended_at: new Date().toISOString(),
          stdout_bytes: stdoutBytes,
          stderr_bytes: stderrBytes,
          provider_usage: providerUsage,
          provider_usage_status: usageObservation.status,
          provider_thread_id: usageObservation.thread_id,
          provider_turn_id: usageObservation.turn_id,
        });
      } catch (error) {
        finish(
          error instanceof EvaluatorProviderFailure
            ? error
            : new EvaluatorProviderFailure({
                kind: "malformed_structured_result",
                message: error instanceof Error ? error.message : String(error),
              }),
        );
      }
    });
    child.stdin.end(invocation.prompt);
  });

export async function executePreparedEvaluatorEpisode(opts: {
  ctx: CommandContext;
  prepared: PreparedEvaluatorReview;
  executor?: EvaluatorEpisodeProvider;
}): Promise<{ result: EvaluatorSgrResult; receipt: EvaluatorEpisodeReceipt }> {
  await assertFrozenEvaluatorArtifactsCurrent({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workOrder: opts.prepared.work_order,
  });
  const invocation = await prepareEvaluatorEpisodeInvocation({
    ctx: opts.ctx,
    prepared: opts.prepared,
  });
  const before = await readWorkspaceState(invocation.repository_root);
  let providerResult: EvaluatorEpisodeProviderResult | null = null;
  let providerFailure: unknown = null;
  try {
    providerResult = await (opts.executor ?? executeCodexEvaluatorEpisode)(invocation);
  } catch (error) {
    providerFailure = error;
  }
  const after = await readWorkspaceState(invocation.repository_root);
  assertUnchangedWorkspace({ before, after });
  if (providerFailure !== null || providerResult === null) {
    return await persistEvaluatorProviderFailure({
      prepared: opts.prepared,
      invocation,
      failure: providerFailure,
      result: providerResult,
    });
  }
  let result: EvaluatorSgrResult;
  try {
    result = validateStrictEvaluatorResult(providerResult.raw_result);
    if (result.evaluator_id !== opts.prepared.work_order.evaluator.id) {
      throw new Error("Evaluator episode result id does not match the prepared work order.");
    }
    assertResultEvidenceIsFrozen({ workOrder: opts.prepared.work_order, result });
    if (result.verdict !== "pass" && !result.recovery_context) {
      throw new Error(
        "Evaluator episode rework, blocked, and human_review results require a bounded recovery_context.",
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return await persistEvaluatorProviderFailure({
      prepared: opts.prepared,
      invocation,
      failure: new EvaluatorProviderFailure({
        kind: "malformed_structured_result",
        message,
      }),
      result: providerResult,
      message,
    });
  }
  const canonicalResult = `${JSON.stringify(result, null, 2)}\n`;
  const receipt: EvaluatorEpisodeReceipt = {
    schema_version: 1,
    kind: "evaluator_episode_receipt",
    work_order_id: invocation.work_order_id,
    provider: "codex",
    authority: { sandbox: "read-only", writable_roots: [] },
    argv: invocation.argv,
    started_at: providerResult.started_at,
    ended_at: providerResult.ended_at,
    stdout_bytes: providerResult.stdout_bytes,
    stderr_bytes: providerResult.stderr_bytes,
    provider_usage: providerResult.provider_usage ?? null,
    provider_usage_status:
      providerResult.provider_usage_status ??
      (providerResult.provider_usage === null ? "unavailable" : "partial"),
    provider_thread_id:
      providerResult.provider_thread_id ?? providerResult.provider_usage?.thread_id ?? null,
    provider_turn_id:
      providerResult.provider_turn_id ?? providerResult.provider_usage?.turn_id ?? null,
    workspace_state: "unchanged",
    result_sha256: sha256(canonicalResult),
  };
  // These artifacts make a completed provider result recoverable before the
  // task mutation that applies its verdict. A restart can validate and apply
  // this outcome instead of asking the provider to repeat the evaluation.
  await writeFile(opts.prepared.result_path, canonicalResult, "utf8");
  await writeEvaluatorReceipt({ prepared: opts.prepared, receipt });
  return {
    result,
    receipt,
  };
}

async function writeEvaluatorReceipt(opts: {
  prepared: PreparedEvaluatorReview;
  receipt: EvaluatorEpisodeReceipt | EvaluatorProviderFailureReceipt;
}): Promise<string> {
  const receiptPath = path.join(
    path.dirname(opts.prepared.work_order_path),
    EVALUATOR_EPISODE_RECEIPT_FILE,
  );
  await writeFile(receiptPath, `${JSON.stringify(opts.receipt, null, 2)}\n`, "utf8");
  return receiptPath;
}
