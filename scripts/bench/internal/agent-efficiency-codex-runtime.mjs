import { spawn, spawnSync } from "node:child_process";
import { lstatSync, realpathSync } from "node:fs";
import path from "node:path";

export const CODEX_REPLAY_BINARY = "/Applications/ChatGPT.app/Contents/Resources/codex";
export const CODEX_REPLAY_CLI_VERSION = "0.145.0-alpha.18";
export const CODEX_REPLAY_MODEL = "gpt-5.6-terra";
export const CODEX_REPLAY_REASONING_EFFORT = "low";
export const CODEX_REPLAY_TURN_TIMEOUT_MS = 240_000;

const TRUSTED_PATH = "/Applications/ChatGPT.app/Contents/Resources:/opt/homebrew/bin:/usr/bin:/bin";
const MAX_JSONL_LINE_BYTES = 1024 * 1024;
const MAX_JSONL_TOTAL_BYTES = 16 * 1024 * 1024;
const MAX_STDERR_BYTES = 1024 * 1024;
const SUPERVISOR_COMMAND_TIMEOUT_MS = 120_000;
const PROVIDER_FIELDS = ["input_tokens", "output_tokens", "reasoning_output_tokens"];

export class ReplayDriverError extends Error {
  constructor(code) {
    super(code);
    this.name = "ReplayDriverError";
    this.code = code;
  }
}

export function fail(code) {
  throw new ReplayDriverError(code);
}

function byteLength(value) {
  return Buffer.byteLength(value, "utf8");
}

function integer(value, code) {
  if (!Number.isInteger(value) || value < 0) fail(code);
  return value;
}

export function buildCodexReplayEnvironment(source = process.env) {
  const result = {
    LANG: source.LANG || "C.UTF-8",
    LC_ALL: source.LC_ALL || "C.UTF-8",
    PATH: TRUSTED_PATH,
    TZ: "UTC",
  };
  if (
    Object.hasOwn(result, "HOME") ||
    Object.hasOwn(result, "CODEX_HOME") ||
    Object.hasOwn(result, "TMPDIR")
  ) {
    fail("ENVIRONMENT_ESCAPE");
  }
  return result;
}

export function runSanitizedCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: options.env ?? buildCodexReplayEnvironment(),
    input: options.input,
    maxBuffer: options.maxBuffer ?? 4 * 1024 * 1024,
    timeout: options.timeout ?? SUPERVISOR_COMMAND_TIMEOUT_MS,
  });
  if (result.error || result.status !== 0) fail(options.code ?? "SUPERVISOR_COMMAND");
  return result.stdout;
}

export function assertCodexBinary() {
  const stats = lstatSync(CODEX_REPLAY_BINARY, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) fail("CODEX_BINARY");
  if (path.resolve(realpathSync(CODEX_REPLAY_BINARY)) !== path.resolve(CODEX_REPLAY_BINARY)) {
    fail("CODEX_BINARY_REALPATH");
  }
  const version = runSanitizedCommand(CODEX_REPLAY_BINARY, ["--version"], {
    code: "CODEX_VERSION_COMMAND",
  }).trim();
  if (version !== `codex-cli ${CODEX_REPLAY_CLI_VERSION}`) fail("CODEX_VERSION_MISMATCH");
}

export function createCodexJsonlCollector() {
  return {
    finalStatus: null,
    lineBuffer: "",
    stderrBytes: 0,
    stdoutBytes: 0,
    turnCompletedEvents: 0,
    usage: null,
  };
}

export function acceptCodexJsonlLine(collector, line) {
  if (byteLength(line) > MAX_JSONL_LINE_BYTES) fail("CODEX_JSONL_LINE_LIMIT");
  if (!line.trim()) return;
  let event;
  try {
    event = JSON.parse(line);
  } catch {
    fail("CODEX_JSONL_PARSE");
  }
  if (event?.type === "item.completed" && event.item?.type === "agent_message") {
    const candidate =
      typeof event.item.text === "string"
        ? event.item.text
        : typeof event.item.content === "string"
          ? event.item.content
          : null;
    if (candidate === null) fail("CODEX_FINAL_STATUS_SHAPE");
    let parsed;
    try {
      parsed = JSON.parse(candidate);
    } catch {
      fail("CODEX_FINAL_STATUS_JSON");
    }
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed) ||
      Object.keys(parsed).length !== 1 ||
      !["blocked", "done", "reviewed"].includes(parsed.status)
    ) {
      fail("CODEX_FINAL_STATUS_SHAPE");
    }
    if (collector.finalStatus !== null) fail("CODEX_FINAL_STATUS_COUNT");
    collector.finalStatus = parsed.status;
    return;
  }
  if (event?.type !== "turn.completed") return;
  collector.turnCompletedEvents += 1;
  if (collector.turnCompletedEvents !== 1) fail("CODEX_TURN_COMPLETED_COUNT");
  const usage = event.usage;
  if (usage === null || typeof usage !== "object" || Array.isArray(usage)) {
    fail("CODEX_USAGE_SHAPE");
  }
  const allowedFields = new Set([
    "cache_write_input_tokens",
    "cached_input_tokens",
    ...PROVIDER_FIELDS,
    "total_tokens",
  ]);
  if (
    !["cached_input_tokens", ...PROVIDER_FIELDS].every((field) => Object.hasOwn(usage, field)) ||
    Object.keys(usage).some((field) => !allowedFields.has(field))
  ) {
    fail("CODEX_USAGE_SHAPE");
  }
  collector.usage = {
    cached_input_tokens: integer(usage.cached_input_tokens, "CODEX_CACHED_INPUT_TOKENS"),
    input_tokens: integer(usage.input_tokens, "CODEX_INPUT_TOKENS"),
    output_tokens: integer(usage.output_tokens, "CODEX_OUTPUT_TOKENS"),
    reasoning_output_tokens: integer(
      usage.reasoning_output_tokens,
      "CODEX_REASONING_OUTPUT_TOKENS",
    ),
    turn_completed_events: 1,
  };
}

export function finalizeCodexJsonlCollector(collector) {
  if (collector.lineBuffer.trim()) acceptCodexJsonlLine(collector, collector.lineBuffer);
  if (collector.turnCompletedEvents !== 1 || collector.usage === null) {
    fail("CODEX_TURN_COMPLETED_MISSING");
  }
  if (collector.finalStatus === null) fail("CODEX_FINAL_STATUS_MISSING");
  return {
    final_status: collector.finalStatus,
    provider_usage: collector.usage,
    stderr_bytes: collector.stderrBytes,
    stdout_bytes: collector.stdoutBytes,
  };
}

export function runCodexEpisode({ fixtureRoot, prompt, schemaPath }) {
  return new Promise((resolve, reject) => {
    const collector = createCodexJsonlCollector();
    const child = spawn(
      CODEX_REPLAY_BINARY,
      [
        "-a",
        "never",
        "-s",
        "workspace-write",
        "-m",
        CODEX_REPLAY_MODEL,
        "-c",
        `model_reasoning_effort=${JSON.stringify(CODEX_REPLAY_REASONING_EFFORT)}`,
        "-c",
        "sandbox_workspace_write.network_access=false",
        "-c",
        'shell_environment_policy.inherit="none"',
        "exec",
        "--json",
        "--ephemeral",
        "--ignore-user-config",
        "--ignore-rules",
        "--strict-config",
        "-C",
        fixtureRoot,
        "--output-schema",
        schemaPath,
        "-",
      ],
      {
        cwd: fixtureRoot,
        env: buildCodexReplayEnvironment(),
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
    let settled = false;
    let timeout;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      if (timeout) clearTimeout(timeout);
      if (error) reject(error);
      else resolve(value);
    };
    const abort = (code) => {
      try {
        child.kill("SIGKILL");
      } catch {
        // Best effort for the disposable fixture process.
      }
      finish(new ReplayDriverError(code));
    };
    timeout = setTimeout(() => abort("CODEX_TURN_TIMEOUT"), CODEX_REPLAY_TURN_TIMEOUT_MS);
    child.on("error", () => finish(new ReplayDriverError("CODEX_SPAWN")));
    child.stdin.on("error", () => abort("CODEX_STDIN"));
    child.stdout.on("data", (chunk) => {
      const text = chunk.toString("utf8");
      collector.stdoutBytes += Buffer.byteLength(chunk);
      if (collector.stdoutBytes > MAX_JSONL_TOTAL_BYTES) return abort("CODEX_JSONL_TOTAL_LIMIT");
      collector.lineBuffer += text;
      let newlineIndex = collector.lineBuffer.indexOf("\n");
      while (newlineIndex !== -1) {
        const line = collector.lineBuffer.slice(0, newlineIndex);
        collector.lineBuffer = collector.lineBuffer.slice(newlineIndex + 1);
        try {
          acceptCodexJsonlLine(collector, line);
        } catch (error) {
          return abort(error instanceof ReplayDriverError ? error.code : "CODEX_JSONL_EVENT");
        }
        newlineIndex = collector.lineBuffer.indexOf("\n");
      }
      if (byteLength(collector.lineBuffer) > MAX_JSONL_LINE_BYTES) {
        return abort("CODEX_JSONL_LINE_LIMIT");
      }
    });
    child.stderr.on("data", (chunk) => {
      collector.stderrBytes += Buffer.byteLength(chunk);
      if (collector.stderrBytes > MAX_STDERR_BYTES) abort("CODEX_STDERR_LIMIT");
    });
    child.on("close", (code, signal) => {
      if (settled) return;
      if (code !== 0 || signal) return finish(new ReplayDriverError("CODEX_EXIT"));
      try {
        finish(null, finalizeCodexJsonlCollector(collector));
      } catch (error) {
        finish(error instanceof ReplayDriverError ? error : new ReplayDriverError("CODEX_RESULT"));
      }
    });
    child.stdin.end(prompt);
  });
}
