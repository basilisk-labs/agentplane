import { randomUUID } from "node:crypto";
import { link, mkdir, readdir, realpath, rm, unlink } from "node:fs/promises";
import path from "node:path";

import { isRecord } from "../../shared/guards.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import type { RunnerContextBundle, RunnerInvocation, RunnerPhaseToolResponse } from "../types.js";
import { RUNNER_PHASE_TOOL_BROKER_DIR_ENV, RUNNER_PHASE_TOOL_TOKEN_ENV } from "./contract.js";
import { invokeRunnerPhaseTool } from "./dispatch.js";
import type { RunnerPhaseToolGrant } from "./token.js";

const REQUEST_SUFFIX = ".request.json";
const RESPONSE_SUFFIX = ".response.json";
const MAX_REQUEST_BYTES = 1024 * 1024;
const MAX_BROKER_REQUESTS = 64;
const CLIENT_TIMEOUT_MS = 120_000;
const POLL_MS = 20;
const REQUEST_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

type RunnerPhaseToolBrokerRequest = {
  schema_version: 1;
  kind: "runner_phase_tool_broker_request";
  request_id: string;
  token: string;
  tool: string;
  input: unknown;
};

export type RunnerPhaseToolBroker = {
  directory: string;
  stop: () => Promise<void>;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requestPath(directory: string, requestId: string): string {
  return path.join(directory, `${requestId}${REQUEST_SUFFIX}`);
}

function responsePath(directory: string, requestId: string): string {
  return path.join(directory, `${requestId}${RESPONSE_SUFFIX}`);
}

function parseRequest(value: unknown, requestId: string): RunnerPhaseToolBrokerRequest {
  if (
    !isRecord(value) ||
    value.schema_version !== 1 ||
    value.kind !== "runner_phase_tool_broker_request" ||
    value.request_id !== requestId ||
    typeof value.token !== "string" ||
    value.token.length === 0 ||
    typeof value.tool !== "string" ||
    value.tool.length === 0
  ) {
    throw new Error("Run-scoped phase-tool broker request is invalid.");
  }
  return value as RunnerPhaseToolBrokerRequest;
}

function parseResponse(value: unknown): RunnerPhaseToolResponse {
  if (
    !isRecord(value) ||
    value.schema_version !== 1 ||
    value.kind !== "runner_phase_tool_response" ||
    (value.status !== "ok" && value.status !== "denied") ||
    typeof value.code !== "string" ||
    typeof value.tool !== "string"
  ) {
    throw new Error("Run-scoped phase-tool broker response is invalid.");
  }
  return value as RunnerPhaseToolResponse;
}

function brokerDenial(tool: string, message: string): RunnerPhaseToolResponse {
  return {
    schema_version: 1,
    kind: "runner_phase_tool_response",
    status: "denied",
    code: "invalid_input",
    tool,
    run_id: null,
    work_order_id: null,
    data: { message },
    audit: null,
  };
}

async function removeBrokerFile(filePath: string): Promise<void> {
  try {
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
  }
}

async function publishBrokerFile(filePath: string, contents: string, label: string): Promise<void> {
  const stagedPath = path.join(
    path.dirname(filePath),
    `.${path.basename(filePath)}.${randomUUID()}.tmp`,
  );
  await writeNewStableRegularFileNoFollow(stagedPath, contents, `${label} staging file`);
  try {
    await link(stagedPath, filePath);
  } finally {
    await removeBrokerFile(stagedPath);
  }
}

export function runnerPhaseToolBrokerDirectory(opts: {
  repository_root: string;
  run_id: string;
  token_id: string;
}): string {
  const segment = `${opts.run_id}-${opts.token_id}`;
  if (
    segment.includes("/") ||
    segment.includes("\\") ||
    segment.includes("\0") ||
    path.basename(segment) !== segment
  ) {
    throw new Error("Run-scoped phase-tool broker identity must be one path segment.");
  }
  return path.join(opts.repository_root, ".agentplane", "tmp", "runner-phase-tools", segment);
}

export function attachRunnerPhaseToolBrokerEnv(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  grant: RunnerPhaseToolGrant | null;
}): void {
  if (!opts.grant || opts.grant.record.claims.allowed_tools.length === 0) return;
  opts.invocation.env[RUNNER_PHASE_TOOL_TOKEN_ENV] = opts.grant.token;
  opts.invocation.env[RUNNER_PHASE_TOOL_BROKER_DIR_ENV] = runnerPhaseToolBrokerDirectory({
    repository_root: opts.bundle.repository.git_root,
    run_id: opts.bundle.execution.run_id,
    token_id: opts.grant.record.claims.token_id,
  });
}

async function assertBrokerDirectory(directory: string, expectedRealPath: string): Promise<void> {
  if ((await realpath(directory)) !== expectedRealPath) {
    throw new Error("Run-scoped phase-tool broker directory changed during execution.");
  }
}

export async function startRunnerPhaseToolBroker(opts: {
  repository_root: string;
  run_dir: string;
  directory: string;
}): Promise<RunnerPhaseToolBroker> {
  await mkdir(opts.directory, { recursive: true, mode: 0o700 });
  const expectedRealPath = await realpath(opts.directory);
  let stopped = false;
  let handled = 0;
  const processed = new Set<string>();
  const loop = (async () => {
    while (!stopped) {
      await assertBrokerDirectory(opts.directory, expectedRealPath);
      const entries = await readdir(opts.directory, { withFileTypes: true });
      const requests = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(REQUEST_SUFFIX))
        .map((entry) => entry.name.slice(0, -REQUEST_SUFFIX.length))
        .filter((requestId) => REQUEST_ID_PATTERN.test(requestId) && !processed.has(requestId))
        .toSorted();
      for (const requestId of requests) {
        processed.add(requestId);
        handled += 1;
        let response: RunnerPhaseToolResponse;
        try {
          if (handled > MAX_BROKER_REQUESTS) {
            response = brokerDenial(
              "unknown",
              `Run-scoped phase-tool broker accepts at most ${MAX_BROKER_REQUESTS} calls.`,
            );
          } else {
            const request = parseRequest(
              JSON.parse(
                await readStableRegularTextNoFollow(
                  requestPath(opts.directory, requestId),
                  "runner phase-tool broker request",
                  { max_bytes: MAX_REQUEST_BYTES },
                ),
              ) as unknown,
              requestId,
            );
            response = await invokeRunnerPhaseTool({
              repository_root: opts.repository_root,
              run_dir: opts.run_dir,
              token: request.token,
              tool: request.tool,
              input: request.input,
            });
          }
        } catch (error) {
          response = brokerDenial(
            "unknown",
            error instanceof Error ? error.message : "Run-scoped phase-tool request failed.",
          );
        }

        await assertBrokerDirectory(opts.directory, expectedRealPath);
        await publishBrokerFile(
          responsePath(opts.directory, requestId),
          `${JSON.stringify(response)}\n`,
          "runner phase-tool broker response",
        );
      }
      if (!stopped) await delay(POLL_MS);
    }
  })();
  return {
    directory: opts.directory,
    stop: async () => {
      stopped = true;
      await loop;
      await assertBrokerDirectory(opts.directory, expectedRealPath);
      await rm(opts.directory, { recursive: true });
    },
  };
}

export async function invokeRunnerPhaseToolThroughBroker(opts: {
  directory: string;
  token: string;
  tool: string;
  input: unknown;
  timeout_ms?: number;
}): Promise<RunnerPhaseToolResponse> {
  const requestId = randomUUID();
  const request: RunnerPhaseToolBrokerRequest = {
    schema_version: 1,
    kind: "runner_phase_tool_broker_request",
    request_id: requestId,
    token: opts.token,
    tool: opts.tool,
    input: opts.input,
  };
  const requestFile = requestPath(opts.directory, requestId);
  const responseFile = responsePath(opts.directory, requestId);
  await publishBrokerFile(
    requestFile,
    `${JSON.stringify(request)}\n`,
    "runner phase-tool broker request",
  );
  const deadline = Date.now() + (opts.timeout_ms ?? CLIENT_TIMEOUT_MS);
  try {
    while (Date.now() < deadline) {
      try {
        return parseResponse(
          JSON.parse(
            await readStableRegularTextNoFollow(responseFile, "runner phase-tool broker response", {
              max_bytes: MAX_REQUEST_BYTES,
            }),
          ) as unknown,
        );
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      }
      await delay(POLL_MS);
    }
    throw new Error("Run-scoped phase-tool broker response timed out.");
  } finally {
    await Promise.all([removeBrokerFile(requestFile), removeBrokerFile(responseFile)]);
  }
}

export async function executeWithRunnerPhaseToolBroker<T>(opts: {
  invocation: RunnerInvocation;
  execute: () => Promise<T>;
}): Promise<T> {
  const directory = opts.invocation.env[RUNNER_PHASE_TOOL_BROKER_DIR_ENV];
  const token = opts.invocation.env[RUNNER_PHASE_TOOL_TOKEN_ENV];
  if (!directory || !token) return await opts.execute();
  const broker = await startRunnerPhaseToolBroker({
    repository_root: opts.invocation.repository_root,
    run_dir: opts.invocation.run_dir,
    directory,
  });
  try {
    return await opts.execute();
  } finally {
    await broker.stop();
  }
}
