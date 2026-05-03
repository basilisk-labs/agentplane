import { AsyncLocalStorage } from "node:async_hooks";

import { CliError } from "../../shared/errors.js";

export type ParsedArgs = {
  help: boolean;
  version: boolean;
  noUpdateCheck: boolean;
  root?: string;
  jsonErrors: boolean;
  allowNetwork: boolean;
  outputMode?: "text" | "json";
};

type GlobalFlagKey =
  | "help"
  | "version"
  | "noUpdateCheck"
  | "root"
  | "jsonErrors"
  | "allowNetwork"
  | "outputMode";

type GlobalFlagDef = {
  key: GlobalFlagKey;
  forms: readonly string[];
  takesValue: boolean;
  scoped: boolean;
};

const GLOBAL_FLAGS: readonly GlobalFlagDef[] = [
  { key: "help", forms: ["--help", "-h"], takesValue: false, scoped: false },
  { key: "version", forms: ["--version", "-v"], takesValue: false, scoped: true },
  { key: "noUpdateCheck", forms: ["--no-update-check"], takesValue: false, scoped: false },
  { key: "allowNetwork", forms: ["--allow-network"], takesValue: false, scoped: true },
  { key: "jsonErrors", forms: ["--json-errors"], takesValue: false, scoped: true },
  { key: "outputMode", forms: ["--output"], takesValue: true, scoped: false },
  { key: "root", forms: ["--root"], takesValue: true, scoped: false },
] as const;

const GLOBAL_FLAG_FORMS = new Map<string, GlobalFlagDef>(
  GLOBAL_FLAGS.flatMap((def) => def.forms.map((form) => [form, def] as const)),
);

export type CliOutputMode = "text" | "json";
const OUTPUT_MODE_ENV = "AGENTPLANE_OUTPUT";

export type ParsedGlobalArgsResult = {
  globals: ParsedArgs;
  rest: string[];
  jsonErrorMode: boolean;
  error?: CliError;
};

function makeGlobalUsageError(message: string): CliError {
  return new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message,
  });
}

export function parseGlobalArgs(argv: string[]): ParsedGlobalArgsResult {
  let help = false;
  let version = false;
  let noUpdateCheck = false;
  let jsonErrors = false;
  let root: string | undefined;
  let allowNetwork = false;
  let outputMode: "text" | "json" | undefined;

  const rest: string[] = [];
  const result = (error?: CliError): ParsedGlobalArgsResult => ({
    globals: { help, version, noUpdateCheck, root, jsonErrors, allowNetwork, outputMode },
    rest,
    jsonErrorMode: jsonErrors || outputMode === "json",
    ...(error ? { error } : {}),
  });

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;

    const def = GLOBAL_FLAG_FORMS.get(arg);
    if (!def) {
      rest.push(arg);
      continue;
    }

    if (def.scoped && rest.length > 0) {
      rest.push(arg);
      continue;
    }

    switch (def.key) {
      case "help": {
        help = true;
        break;
      }
      case "version": {
        version = true;
        break;
      }
      case "noUpdateCheck": {
        noUpdateCheck = true;
        break;
      }
      case "allowNetwork": {
        allowNetwork = true;
        break;
      }
      case "jsonErrors": {
        jsonErrors = true;
        break;
      }
      case "root": {
        const next = argv[i + 1];
        if (!next) {
          return result(
            makeGlobalUsageError("Missing value after --root (expected repository path)"),
          );
        }
        root = next;
        i++;
        break;
      }
      case "outputMode": {
        const next = argv[i + 1];
        if (!next) {
          return result(makeGlobalUsageError("Missing value after --output (expected text|json)"));
        }
        const normalized = next.trim().toLowerCase();
        if (normalized !== "text" && normalized !== "json") {
          return result(
            makeGlobalUsageError(`Invalid value for --output: ${next} (expected text|json)`),
          );
        }
        outputMode = normalized;
        i++;
        break;
      }
      default: {
        rest.push(arg);
        break;
      }
    }
  }
  return result();
}

export function resolveOutputMode(modeFromFlag: "text" | "json" | undefined): CliOutputMode {
  if (modeFromFlag) return modeFromFlag;
  const fromEnv = process.env[OUTPUT_MODE_ENV]?.trim().toLowerCase();
  if (!fromEnv || fromEnv === "text") return "text";
  if (fromEnv === "json") return "json";
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Invalid ${OUTPUT_MODE_ENV}: ${fromEnv} (expected text|json)`,
  });
}

function chunkToString(chunk: unknown, encoding?: BufferEncoding): string {
  if (typeof chunk === "string") return chunk;
  if (chunk instanceof Uint8Array) return Buffer.from(chunk).toString(encoding);
  return String(chunk);
}

type StructuredOutputStore = {
  stdout: string[];
  stderr: string[];
};

const structuredOutputStore = new AsyncLocalStorage<StructuredOutputStore>();

let passthroughStdoutWrite = process.stdout.write.bind(process.stdout);
let passthroughStderrWrite = process.stderr.write.bind(process.stderr);

function appendStructuredChunk(
  channel: keyof StructuredOutputStore,
  chunk: unknown,
  rest: readonly unknown[],
): boolean {
  const store = structuredOutputStore.getStore();
  if (!store) return false;

  const encoding = typeof rest[0] === "string" ? (rest[0] as BufferEncoding) : undefined;
  store[channel].push(chunkToString(chunk, encoding));
  const callback = rest.find((item) => typeof item === "function") as
    | ((error?: Error | null) => void)
    | undefined;
  callback?.(null);
  return true;
}

const structuredStdoutWrite = ((chunk: unknown, ...rest: unknown[]) => {
  if (appendStructuredChunk("stdout", chunk, rest)) return true;
  return passthroughStdoutWrite(chunk as never, ...(rest as []));
}) as typeof process.stdout.write;

const structuredStderrWrite = ((chunk: unknown, ...rest: unknown[]) => {
  if (appendStructuredChunk("stderr", chunk, rest)) return true;
  return passthroughStderrWrite(chunk as never, ...(rest as []));
}) as typeof process.stderr.write;

function ensureStructuredOutputProxyInstalled(): void {
  if (process.stdout.write !== structuredStdoutWrite) {
    passthroughStdoutWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = structuredStdoutWrite;
  }
  if (process.stderr.write !== structuredStderrWrite) {
    passthroughStderrWrite = process.stderr.write.bind(process.stderr);
    process.stderr.write = structuredStderrWrite;
  }
}

async function collectStructuredOutput(run: () => Promise<number>): Promise<{
  exitCode: number;
  stdout: string;
  stderr: string;
}> {
  ensureStructuredOutputProxyInstalled();

  return await structuredOutputStore.run({ stdout: [], stderr: [] }, async () => {
    const exitCode = await run();
    const store = structuredOutputStore.getStore();
    return {
      exitCode,
      stdout: store?.stdout.join("").trim() ?? "",
      stderr: store?.stderr.join("").trim() ?? "",
    };
  });
}

export async function runWithOutputMode(opts: {
  mode: CliOutputMode;
  command: string;
  run: () => Promise<number>;
}): Promise<number> {
  if (opts.mode === "text") return await opts.run();

  const { exitCode, stdout, stderr } = await collectStructuredOutput(opts.run);
  let parsed: unknown;
  if (stdout.length > 0) {
    try {
      parsed = JSON.parse(stdout) as unknown;
    } catch {
      parsed = undefined;
    }
  }
  const payload: Record<string, unknown> = {
    schema_version: 1,
    mode: "agent_json_v1",
    command: opts.command,
    ok: exitCode === 0,
    exit_code: exitCode,
    stdout,
    stderr,
  };
  if (parsed !== undefined) {
    payload.data = parsed;
  }
  passthroughStdoutWrite(`${JSON.stringify(payload, null, 2)}\n`);
  return exitCode;
}
