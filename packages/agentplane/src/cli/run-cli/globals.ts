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
  { key: "version", forms: ["--version", "-v"], takesValue: false, scoped: false },
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

export function prescanJsonErrors(argv: readonly string[]): boolean {
  // If parseGlobalArgs throws (e.g. missing --root value), we still want to honor
  // `--json-errors` in the "scoped global" zone (before the command id).
  let hasRest = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;

    const def = GLOBAL_FLAG_FORMS.get(arg);
    if (!def) {
      // First non-global token is treated as the start of the command id.
      hasRest = true;
      break;
    }

    if (def.key === "jsonErrors" && !hasRest) return true;
    if (def.takesValue) {
      // Skip the value if present; do not throw on missing value here.
      i++;
    }
  }
  return false;
}

export function parseGlobalArgs(argv: string[]): { globals: ParsedArgs; rest: string[] } {
  let help = false;
  let version = false;
  let noUpdateCheck = false;
  let jsonErrors = false;
  let root: string | undefined;
  let allowNetwork = false;
  let outputMode: "text" | "json" | undefined;

  const rest: string[] = [];
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
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Missing value after --root (expected repository path)",
          });
        }
        root = next;
        i++;
        break;
      }
      case "outputMode": {
        const next = argv[i + 1];
        if (!next) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Missing value after --output (expected text|json)",
          });
        }
        const normalized = next.trim().toLowerCase();
        if (normalized !== "text" && normalized !== "json") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: `Invalid value for --output: ${next} (expected text|json)`,
          });
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
  return {
    globals: { help, version, noUpdateCheck, root, jsonErrors, allowNetwork, outputMode },
    rest,
  };
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

export async function runWithOutputMode(opts: {
  mode: CliOutputMode;
  command: string;
  run: () => Promise<number>;
}): Promise<number> {
  if (opts.mode === "text") return await opts.run();

  const stdoutWrite = process.stdout.write.bind(process.stdout);
  const stderrWrite = process.stderr.write.bind(process.stderr);
  let stdout = "";
  let stderr = "";

  process.stdout.write = ((chunk: unknown, ...rest: unknown[]) => {
    const encoding = typeof rest[0] === "string" ? (rest[0] as BufferEncoding) : undefined;
    stdout += chunkToString(chunk, encoding);
    const callback = rest.find((item) => typeof item === "function") as
      | ((error?: Error | null) => void)
      | undefined;
    callback?.(null);
    return true;
  }) as typeof process.stdout.write;

  process.stderr.write = ((chunk: unknown, ...rest: unknown[]) => {
    const encoding = typeof rest[0] === "string" ? (rest[0] as BufferEncoding) : undefined;
    stderr += chunkToString(chunk, encoding);
    const callback = rest.find((item) => typeof item === "function") as
      | ((error?: Error | null) => void)
      | undefined;
    callback?.(null);
    return true;
  }) as typeof process.stderr.write;

  try {
    const exitCode = await opts.run();
    let parsed: unknown;
    const trimmedStdout = stdout.trim();
    if (trimmedStdout.length > 0) {
      try {
        parsed = JSON.parse(trimmedStdout) as unknown;
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
      stdout: trimmedStdout,
      stderr: stderr.trim(),
    };
    if (parsed !== undefined) {
      payload.data = parsed;
    }
    stdoutWrite(`${JSON.stringify(payload, null, 2)}\n`);
    return exitCode;
  } finally {
    process.stdout.write = stdoutWrite;
    process.stderr.write = stderrWrite;
  }
}
