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
  assertResultEvidenceIsFrozen,
  validateStrictEvaluatorResult,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";

const EVALUATOR_EPISODE_RECEIPT_FILE = "evaluator-episode.json";
const EVALUATOR_RESULT_SCHEMA_FILE = "evaluator-result.schema.json";
const MAX_PROVIDER_STDOUT_BYTES = 16 * 1024 * 1024;
const MAX_PROVIDER_STDERR_BYTES = 1024 * 1024;
const CODEX_EVALUATOR_TIMEOUT_MS = 10 * 60 * 1000;

const NON_EMPTY_STRING_SCHEMA = { type: "string", minLength: 1 } as const;

const EVALUATOR_RESULT_OUTPUT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "AgentPlane EvaluatorSgrResult",
  description:
    "Read-only EVALUATOR output. AgentPlane validates frozen evidence and owns all persistence.",
  type: "object",
  additionalProperties: false,
  properties: {
    schema_version: { type: "integer", enum: [1] },
    kind: { type: "string", enum: ["evaluator_result"] },
    evaluator_id: NON_EMPTY_STRING_SCHEMA,
    verdict: { type: "string", enum: ["pass", "rework", "blocked", "human_review"] },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: NON_EMPTY_STRING_SCHEMA,
          severity: { type: "string", enum: ["low", "medium", "high"] },
          summary: NON_EMPTY_STRING_SCHEMA,
          broken_invariant: NON_EMPTY_STRING_SCHEMA,
          evidence_refs: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                path: NON_EMPTY_STRING_SCHEMA,
                sha256: { type: "string", pattern: "^sha256:[a-f0-9]{64}$" },
                line: { type: "integer", minimum: 1 },
                lines: NON_EMPTY_STRING_SCHEMA,
                section: NON_EMPTY_STRING_SCHEMA,
              },
              required: ["path"],
            },
          },
        },
        required: ["id", "severity", "summary", "broken_invariant", "evidence_refs"],
      },
    },
    missing_tests: { type: "array", items: { type: "string" } },
    hidden_assumptions: { type: "array", items: { type: "string" } },
    recovery_context: NON_EMPTY_STRING_SCHEMA,
  },
  required: [
    "schema_version",
    "kind",
    "evaluator_id",
    "verdict",
    "findings",
    "missing_tests",
    "hidden_assumptions",
  ],
} as const;

function renderEvaluatorResultOutputSchemaJson(): string {
  return `${JSON.stringify(EVALUATOR_RESULT_OUTPUT_SCHEMA, null, 2)}\n`;
}

type EvaluatorEpisodeInvocation = {
  provider: "codex";
  repository_root: string;
  work_order_id: string;
  work_order_path: string;
  prompt: string;
  output_schema_path: string;
  argv: string[];
};

type EvaluatorEpisodeProviderResult = {
  raw_result: unknown;
  started_at: string;
  ended_at: string;
  stdout_bytes: number;
  stderr_bytes: number;
  provider_usage?: CodexProviderUsage | null;
};

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
  workspace_state: "unchanged";
  result_sha256: `sha256:${string}`;
};

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

async function prepareEvaluatorEpisodeInvocation(opts: {
  ctx: CommandContext;
  prepared: PreparedEvaluatorReview;
}): Promise<EvaluatorEpisodeInvocation> {
  const repositoryRoot = opts.ctx.resolvedProject.gitRoot;
  const reviewDir = path.dirname(opts.prepared.work_order_path);
  const outputSchemaPath = path.join(reviewDir, EVALUATOR_RESULT_SCHEMA_FILE);
  await writeFile(outputSchemaPath, renderEvaluatorResultOutputSchemaJson(), "utf8");
  const prompt = await readFile(opts.prepared.prompt_path, "utf8");
  return {
    provider: "codex",
    repository_root: repositoryRoot,
    work_order_id: opts.prepared.work_order.work_order_id,
    work_order_path: relative(repositoryRoot, opts.prepared.work_order_path),
    prompt,
    output_schema_path: outputSchemaPath,
    argv: evaluatorCodexArgv({ repositoryRoot, outputSchemaPath }),
  };
}

function tail(value: string, next: string, limit: number): string {
  const combined = `${value}${next}`;
  return combined.length <= limit ? combined : combined.slice(-limit);
}

const executeCodexEvaluatorEpisode: EvaluatorEpisodeProvider = async (invocation) =>
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
    const timeout = setTimeout(() => {
      limitError = new Error(`Codex evaluator exceeded ${CODEX_EVALUATOR_TIMEOUT_MS}ms.`);
      child.kill("SIGKILL");
    }, CODEX_EVALUATOR_TIMEOUT_MS);
    const finish = (error?: Error, value?: EvaluatorEpisodeProviderResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (error) reject(error);
      else if (value) resolve(value);
    };
    child.on("error", (error) => finish(error));
    child.stdout.on("data", (chunk: Buffer) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > MAX_PROVIDER_STDOUT_BYTES) {
        limitError = new Error("Codex evaluator exceeded the stdout safety limit.");
        child.kill("SIGKILL");
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
        limitError = new Error("Codex evaluator exceeded the stderr safety limit.");
        child.kill("SIGKILL");
      }
    });
    child.on("close", (code, signal) => {
      if (limitError) {
        finish(limitError);
        return;
      }
      if (code !== 0 || signal) {
        finish(
          new Error(
            `Codex evaluator exited before returning a typed result (code=${code ?? "null"} signal=${signal ?? "none"}); provider diagnostics were withheld.`,
          ),
        );
        return;
      }
      try {
        if (stdoutBuffer.trim()) collector.observeStdoutLine(stdoutBuffer);
        const rawText = collector.readLastAgentMessage();
        if (rawText === null) throw new Error("Codex evaluator returned no structured result.");
        const providerUsage = collector.readUsage();
        finish(undefined, {
          raw_result: JSON.parse(rawText) as unknown,
          started_at: startedAt,
          ended_at: new Date().toISOString(),
          stdout_bytes: stdoutBytes,
          stderr_bytes: stderrBytes,
          provider_usage: providerUsage,
        });
      } catch (error) {
        finish(error instanceof Error ? error : new Error(String(error)));
      }
    });
    child.stdin.end(invocation.prompt);
  });

export async function executePreparedEvaluatorEpisode(opts: {
  ctx: CommandContext;
  prepared: PreparedEvaluatorReview;
  executor?: EvaluatorEpisodeProvider;
}): Promise<{ result: EvaluatorSgrResult; receipt: EvaluatorEpisodeReceipt }> {
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
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "Codex evaluator provider failed before returning a typed result. The typed result was not applied.",
    });
  }
  const result = validateStrictEvaluatorResult(providerResult.raw_result);
  if (result.evaluator_id !== opts.prepared.work_order.evaluator.id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator episode result id does not match the prepared work order.",
    });
  }
  assertResultEvidenceIsFrozen({ workOrder: opts.prepared.work_order, result });
  if (result.verdict !== "pass" && !result.recovery_context) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Evaluator episode rework, blocked, and human_review results require a bounded recovery_context.",
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
    workspace_state: "unchanged",
    result_sha256: sha256(canonicalResult),
  };
  // These artifacts make a completed provider result recoverable before the
  // task mutation that applies its verdict. A restart can validate and apply
  // this outcome instead of asking the provider to repeat the evaluation.
  await writeFile(opts.prepared.result_path, canonicalResult, "utf8");
  await writeEvaluatorEpisodeReceipt({ prepared: opts.prepared, receipt });
  return {
    result,
    receipt,
  };
}

export async function writeEvaluatorEpisodeReceipt(opts: {
  prepared: PreparedEvaluatorReview;
  receipt: EvaluatorEpisodeReceipt;
}): Promise<string> {
  const receiptPath = path.join(
    path.dirname(opts.prepared.work_order_path),
    EVALUATOR_EPISODE_RECEIPT_FILE,
  );
  await writeFile(receiptPath, `${JSON.stringify(opts.receipt, null, 2)}\n`, "utf8");
  return receiptPath;
}
