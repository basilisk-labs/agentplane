import {
  type ExecFileOptions,
  type ExecFileOptionsWithBufferEncoding,
  type StdioOptions,
} from "node:child_process";
import path from "node:path";
import type { Stream, Readable as ReadableStream } from "node:stream";
import { fileURLToPath } from "node:url";

import * as execaModule from "execa";
import type { ResultPromise } from "execa";

type ProcessStdioOption = "pipe" | "ignore" | "inherit" | "ipc" | Stream | number | undefined;
type ExecFileCompatOptions = ExecFileOptions | ExecFileOptionsWithBufferEncoding;
type ExecFileStringOptions = ExecFileOptions & { encoding?: BufferEncoding };
type ExecFileBufferOptions = ExecFileOptionsWithBufferEncoding & { encoding: "buffer" | null };
type ManagedProcess = ResultPromise;

export type RunProcessOptions = {
  command: string;
  args?: readonly string[];
  cwd?: string | URL;
  env?: NodeJS.ProcessEnv;
  input?: string | Buffer | ReadableStream;
  encoding?: BufferEncoding | null;
  maxBuffer?: number;
  timeoutMs?: number;
  stdin?: ProcessStdioOption;
  stdout?: ProcessStdioOption;
  stderr?: ProcessStdioOption;
  stdio?: StdioOptions;
  cleanup?: boolean;
  reject?: boolean;
  extendEnv?: boolean;
  stripFinalNewline?: boolean;
  windowsHide?: boolean;
  detached?: boolean;
  buffer?: boolean;
};

export type RunProcessResult<TOutput extends string | Buffer = string | Buffer> = {
  command: string;
  escapedCommand: string;
  exitCode: number;
  stdout: TOutput;
  stderr: TOutput;
  failed: boolean;
  timedOut: boolean;
  killed: boolean;
  isCanceled: boolean;
  signal?: string;
  all?: TOutput;
};

type ExecFileAsyncResult<TOutput extends string | Buffer> = {
  stdout: TOutput;
  stderr: TOutput;
};

type RunProcessFn = {
  (
    opts: RunProcessOptions & { encoding?: BufferEncoding | undefined },
  ): Promise<RunProcessResult<string>>;
  (opts: RunProcessOptions & { encoding: null }): Promise<RunProcessResult<Buffer>>;
  (opts: RunProcessOptions): Promise<RunProcessResult<string>>;
};

type RunProcessSyncFn = {
  (opts: RunProcessOptions & { encoding?: BufferEncoding | undefined }): RunProcessResult<string>;
  (opts: RunProcessOptions & { encoding: null }): RunProcessResult<Buffer>;
  (opts: RunProcessOptions): RunProcessResult<string>;
};

type StartProcessFn = {
  (opts: RunProcessOptions & { encoding?: BufferEncoding | undefined }): ManagedProcess;
  (opts: RunProcessOptions & { encoding: null }): ManagedProcess;
  (opts: RunProcessOptions): ManagedProcess;
};

type ExecaCompatModule = typeof execaModule & {
  default?: typeof execaModule.execa;
  sync?: typeof execaModule.execaSync;
};

const execaCompat = execaModule as ExecaCompatModule;
const execa = execaCompat.execa ?? execaCompat.default;
const execaSync = execaCompat.execaSync ?? execaCompat.sync;
const execaUsesBufferEncoding = Boolean(execaCompat.execa);

if (!execa || !execaSync) {
  throw new Error("Unsupported execa module shape: expected execa/execaSync exports");
}

type ExecFileAsyncFn = {
  (
    file: string,
    args?: readonly string[] | ExecFileStringOptions | null,
    options?: ExecFileStringOptions | null,
  ): Promise<ExecFileAsyncResult<string>>;
  (
    file: string,
    args?: readonly string[] | ExecFileBufferOptions | null,
    options?: ExecFileBufferOptions | null,
  ): Promise<ExecFileAsyncResult<Buffer>>;
  (
    file: string,
    args?: readonly string[] | ExecFileCompatOptions | null,
    options?: ExecFileCompatOptions | null,
  ): Promise<ExecFileAsyncResult<string | Buffer>>;
};

function normalizeProcessError(err: unknown): unknown {
  if (!err || typeof err !== "object") return err;
  const error = err as {
    code?: number | string;
    exitCode?: number;
    killed?: boolean;
    isTerminated?: boolean;
    isForcefullyTerminated?: boolean;
  };
  if (typeof error.code !== "number" && typeof error.exitCode === "number") {
    error.code = error.exitCode;
  }
  if (typeof error.killed !== "boolean") {
    error.killed = error.isTerminated === true || error.isForcefullyTerminated === true;
  }
  return error;
}

function normalizeProcessResult<TOutput extends string | Buffer>(
  result: unknown,
  binaryOutput = false,
): RunProcessResult<TOutput> {
  const normalized = result as RunProcessResult<TOutput> & {
    all?: unknown;
    isTerminated?: boolean;
    isForcefullyTerminated?: boolean;
  };
  normalized.stdout = normalizeBinaryOutput(normalized.stdout, binaryOutput) as TOutput;
  normalized.stderr = normalizeBinaryOutput(normalized.stderr, binaryOutput) as TOutput;
  if (normalized.all !== undefined) {
    normalized.all = normalizeBinaryOutput(normalized.all, binaryOutput) as TOutput;
  }
  if (typeof normalized.killed !== "boolean") {
    normalized.killed =
      normalized.isTerminated === true || normalized.isForcefullyTerminated === true;
  }
  return normalized;
}

function normalizeBinaryOutput(value: unknown, binaryOutput: boolean): unknown {
  if (value instanceof Uint8Array && !Buffer.isBuffer(value)) {
    return Buffer.from(value);
  }
  if (binaryOutput && typeof value === "string") {
    return Buffer.from(value, "latin1");
  }
  return value;
}

function isBunRuntime(): boolean {
  return typeof (process.versions as NodeJS.ProcessVersions & { bun?: string }).bun === "string";
}

function resolveCwd(cwd: string | URL | undefined): string | undefined {
  if (cwd == null) return undefined;
  return cwd instanceof URL ? fileURLToPath(cwd) : cwd;
}

function assertSafeExecutable(command: string): void {
  if (!command.trim()) throw new Error("process command must be non-empty");
  if (/[\0\r\n]/u.test(command)) throw new Error("process command contains invalid characters");
}

function assertSupportedExecutable(command: string): void {
  assertSafeExecutable(command);
  if (command !== command.trim()) {
    throw new Error("process command must not include surrounding whitespace");
  }

  switch (command) {
    case "bash": {
      return;
    }
    case "bun": {
      return;
    }
    case "cat": {
      return;
    }
    case "chmod": {
      return;
    }
    case "gh": {
      return;
    }
    case "git": {
      return;
    }
    case "node": {
      return;
    }
    case "npm": {
      return;
    }
    case "ps": {
      return;
    }
    case "sh": {
      return;
    }
    case "tar": {
      return;
    }
    case "unzip": {
      return;
    }
    case "zip": {
      return;
    }
    default: {
      throw new Error(`process command is not in the allowed executable set: ${command}`);
    }
  }
}

function normalizeSupportedExecutable(command: string): string {
  if (command === process.execPath) return "node";
  if (!path.isAbsolute(command)) return command;

  const basename = path.basename(command).toLowerCase();
  return basename === "node" || basename === "node.exe" ? "node" : command;
}

function sanitizeGitArg(arg: string): string {
  if (arg === "--upload-pack" || arg.startsWith("--upload-pack=")) {
    throw new Error("git --upload-pack is not allowed in managed process execution");
  }
  return arg;
}

function sanitizeGitArgs(args: readonly string[]): string[] {
  return args.map((arg) => sanitizeGitArg(arg));
}

function runExeca(command: string, args: readonly string[], options: never): ManagedProcess {
  assertSupportedExecutable(command);
  switch (command) {
    case "bash": {
      return execa("bash", args, options) as ManagedProcess;
    }
    case "bun": {
      return execa("bun", args, options) as ManagedProcess;
    }
    case "cat": {
      return execa("cat", args, options) as ManagedProcess;
    }
    case "chmod": {
      return execa("chmod", args, options) as ManagedProcess;
    }
    case "gh": {
      return execa("gh", args, options) as ManagedProcess;
    }
    case "git": {
      return execa("git", sanitizeGitArgs(args), options) as ManagedProcess;
    }
    case "node": {
      return execa("node", args, options) as ManagedProcess;
    }
    case "npm": {
      return execa("npm", args, options) as ManagedProcess;
    }
    case "ps": {
      return execa("ps", args, options) as ManagedProcess;
    }
    case "sh": {
      return execa("sh", args, options) as ManagedProcess;
    }
    case "tar": {
      return execa("tar", args, options) as ManagedProcess;
    }
    case "unzip": {
      return execa("unzip", args, options) as ManagedProcess;
    }
    case "zip": {
      return execa("zip", args, options) as ManagedProcess;
    }
    default: {
      throw new Error(`process command is not in the allowed executable set: ${command}`);
    }
  }
}

function runExecaSync(
  command: string,
  args: readonly string[],
  options: never,
  binaryOutput: boolean,
): RunProcessResult<string | Buffer> {
  assertSupportedExecutable(command);
  switch (command) {
    case "bash": {
      return normalizeProcessResult<string | Buffer>(
        execaSync("bash", args, options),
        binaryOutput,
      );
    }
    case "bun": {
      return normalizeProcessResult<string | Buffer>(execaSync("bun", args, options), binaryOutput);
    }
    case "cat": {
      return normalizeProcessResult<string | Buffer>(execaSync("cat", args, options), binaryOutput);
    }
    case "chmod": {
      return normalizeProcessResult<string | Buffer>(
        execaSync("chmod", args, options),
        binaryOutput,
      );
    }
    case "gh": {
      return normalizeProcessResult<string | Buffer>(execaSync("gh", args, options), binaryOutput);
    }
    case "git": {
      return normalizeProcessResult<string | Buffer>(
        execaSync("git", sanitizeGitArgs(args), options),
        binaryOutput,
      );
    }
    case "node": {
      return normalizeProcessResult<string | Buffer>(
        execaSync("node", args, options),
        binaryOutput,
      );
    }
    case "npm": {
      return normalizeProcessResult<string | Buffer>(execaSync("npm", args, options), binaryOutput);
    }
    case "ps": {
      return normalizeProcessResult<string | Buffer>(execaSync("ps", args, options), binaryOutput);
    }
    case "sh": {
      return normalizeProcessResult<string | Buffer>(execaSync("sh", args, options), binaryOutput);
    }
    case "tar": {
      return normalizeProcessResult<string | Buffer>(execaSync("tar", args, options), binaryOutput);
    }
    case "unzip": {
      return normalizeProcessResult<string | Buffer>(
        execaSync("unzip", args, options),
        binaryOutput,
      );
    }
    case "zip": {
      return normalizeProcessResult<string | Buffer>(execaSync("zip", args, options), binaryOutput);
    }
    default: {
      throw new Error(`process command is not in the allowed executable set: ${command}`);
    }
  }
}

function buildProcessOptions(opts: RunProcessOptions) {
  assertSafeExecutable(opts.command);
  const binaryOutput = opts.encoding === null;
  return {
    cwd: resolveCwd(opts.cwd),
    env: opts.env ?? process.env,
    encoding: binaryOutput
      ? isBunRuntime()
        ? "latin1"
        : execaUsesBufferEncoding
          ? "buffer"
          : null
      : (opts.encoding ?? "utf8"),
    ...(opts.buffer === undefined ? {} : { buffer: opts.buffer }),
    cleanup: opts.cleanup ?? false,
    reject: opts.reject ?? true,
    extendEnv: opts.extendEnv ?? false,
    stripFinalNewline: opts.stripFinalNewline ?? false,
    windowsHide: opts.windowsHide ?? true,
    ...(opts.input === undefined ? {} : { input: opts.input }),
    ...(opts.maxBuffer === undefined ? {} : { maxBuffer: opts.maxBuffer }),
    ...(opts.timeoutMs === undefined ? {} : { timeout: opts.timeoutMs }),
    ...(opts.stdin === undefined ? {} : { stdin: opts.stdin }),
    ...(opts.stdout === undefined ? {} : { stdout: opts.stdout }),
    ...(opts.stderr === undefined ? {} : { stderr: opts.stderr }),
    ...(opts.stdio === undefined ? {} : { stdio: opts.stdio }),
    shell: false,
    ...(opts.detached === undefined ? {} : { detached: opts.detached }),
  };
}

const runProcessImpl = async (
  opts: RunProcessOptions,
): Promise<RunProcessResult<string | Buffer>> => {
  const binaryOutput = opts.encoding === null;
  const result = await runExeca(
    normalizeSupportedExecutable(opts.command),
    opts.args ?? [],
    buildProcessOptions(opts) as never,
  );
  return normalizeProcessResult<string | Buffer>(result, binaryOutput);
};
export const runProcess = runProcessImpl as RunProcessFn;

const runProcessSyncImpl = (opts: RunProcessOptions): RunProcessResult<string | Buffer> => {
  const result = runExecaSync(
    normalizeSupportedExecutable(opts.command),
    opts.args ?? [],
    buildProcessOptions(opts) as never,
    opts.encoding === null,
  );
  return result;
};
export const runProcessSync = runProcessSyncImpl as RunProcessSyncFn;

const startProcessImpl = (opts: RunProcessOptions): ManagedProcess => {
  const child = execa(
    opts.command,
    opts.args ?? [],
    buildProcessOptions({
      ...opts,
      reject: opts.reject ?? false,
      buffer: opts.buffer ?? false,
    }) as never,
  ) as ManagedProcess;
  void child.catch(() => null);
  return child;
};
export const startProcess = startProcessImpl as StartProcessFn;

function resolveExecFileArgs(
  argsOrOptions?: readonly string[] | ExecFileCompatOptions | null,
  maybeOptions?: ExecFileCompatOptions | null,
): {
  args: readonly string[];
  options: ExecFileCompatOptions;
} {
  if (Array.isArray(argsOrOptions)) {
    return { args: argsOrOptions, options: maybeOptions ?? {} };
  }
  return { args: [], options: (argsOrOptions ?? {}) as ExecFileCompatOptions };
}

function resolveExecEncoding(
  encoding: BufferEncoding | "buffer" | null | undefined,
): BufferEncoding | null {
  if (encoding === "buffer" || encoding === null) return null;
  return encoding ?? "utf8";
}

const execFileAsyncImpl = async (
  file: string,
  args?: readonly string[] | ExecFileCompatOptions | null,
  options?: ExecFileCompatOptions | null,
): Promise<ExecFileAsyncResult<string | Buffer>> => {
  const resolved = resolveExecFileArgs(args, options);
  const encoding = resolveExecEncoding(
    (resolved.options as ExecFileOptionsWithBufferEncoding | undefined)?.encoding,
  );
  try {
    const result =
      encoding === null
        ? await runProcess({
            command: file,
            args: resolved.args,
            cwd: resolveCwd(resolved.options.cwd),
            env: resolved.options.env,
            encoding: null,
            maxBuffer: resolved.options.maxBuffer,
            timeoutMs: resolved.options.timeout,
            windowsHide: resolved.options.windowsHide,
          })
        : await runProcess({
            command: file,
            args: resolved.args,
            cwd: resolveCwd(resolved.options.cwd),
            env: resolved.options.env,
            encoding,
            maxBuffer: resolved.options.maxBuffer,
            timeoutMs: resolved.options.timeout,
            windowsHide: resolved.options.windowsHide,
          });
    return { stdout: result.stdout, stderr: result.stderr };
  } catch (err) {
    throw normalizeProcessError(err);
  }
};
export const execFileAsync = execFileAsyncImpl as ExecFileAsyncFn;
