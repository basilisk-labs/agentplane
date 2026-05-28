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

type ExecaChildProcess<TOutput extends string | Buffer = string | Buffer> = ResultPromise & {
  stdout?: TOutput;
  stderr?: TOutput;
};

type ProcessStdioOption = "pipe" | "ignore" | "inherit" | "ipc" | Stream | number | undefined;
type ExecFileCompatOptions = ExecFileOptions | ExecFileOptionsWithBufferEncoding;
type ExecFileStringOptions = ExecFileOptions & { encoding?: BufferEncoding };
type ExecFileBufferOptions = ExecFileOptionsWithBufferEncoding & { encoding: "buffer" | null };

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
  (opts: RunProcessOptions & { encoding?: BufferEncoding | undefined }): ExecaChildProcess<string>;
  (opts: RunProcessOptions & { encoding: null }): ExecaChildProcess<Buffer>;
  (opts: RunProcessOptions): ExecaChildProcess<string>;
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
  const error = err as { code?: number | string; exitCode?: number };
  if (typeof error.code !== "number" && typeof error.exitCode === "number") {
    error.code = error.exitCode;
  }
  return error;
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

function runExeca(
  command: string,
  args: readonly string[],
  options: never,
): ExecaChildProcess<string | Buffer> {
  assertSupportedExecutable(command);
  switch (command) {
    case "bash": {
      return execa("bash", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "bun": {
      return execa("bun", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "cat": {
      return execa("cat", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "chmod": {
      return execa("chmod", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "gh": {
      return execa("gh", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "git": {
      return execa("git", sanitizeGitArgs(args), options) as ExecaChildProcess<string | Buffer>;
    }
    case "node": {
      return execa("node", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "npm": {
      return execa("npm", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "ps": {
      return execa("ps", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "sh": {
      return execa("sh", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "tar": {
      return execa("tar", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "unzip": {
      return execa("unzip", args, options) as ExecaChildProcess<string | Buffer>;
    }
    case "zip": {
      return execa("zip", args, options) as ExecaChildProcess<string | Buffer>;
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
): RunProcessResult<string | Buffer> {
  assertSupportedExecutable(command);
  switch (command) {
    case "bash": {
      return execaSync("bash", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "bun": {
      return execaSync("bun", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "cat": {
      return execaSync("cat", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "chmod": {
      return execaSync("chmod", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "gh": {
      return execaSync("gh", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "git": {
      return execaSync("git", sanitizeGitArgs(args), options) as unknown as RunProcessResult<
        string | Buffer
      >;
    }
    case "node": {
      return execaSync("node", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "npm": {
      return execaSync("npm", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "ps": {
      return execaSync("ps", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "sh": {
      return execaSync("sh", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "tar": {
      return execaSync("tar", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "unzip": {
      return execaSync("unzip", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    case "zip": {
      return execaSync("zip", args, options) as unknown as RunProcessResult<string | Buffer>;
    }
    default: {
      throw new Error(`process command is not in the allowed executable set: ${command}`);
    }
  }
}

function buildProcessOptions(opts: RunProcessOptions) {
  assertSafeExecutable(opts.command);
  return {
    cwd: resolveCwd(opts.cwd),
    env: opts.env ?? process.env,
    ...(opts.encoding === null
      ? {
          encoding: execaUsesBufferEncoding ? "buffer" : null,
          ...(opts.buffer === undefined ? {} : { buffer: opts.buffer }),
        }
      : {
          encoding: opts.encoding ?? "utf8",
          ...(opts.buffer === undefined ? {} : { buffer: opts.buffer }),
        }),
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

function ensureBufferOutput(value: string | Buffer): Buffer {
  return Buffer.isBuffer(value) ? value : Buffer.from(value);
}

function normalizeBufferedResult(
  result: RunProcessResult<string | Buffer>,
): RunProcessResult<string | Buffer> {
  return {
    ...result,
    stdout: ensureBufferOutput(result.stdout),
    stderr: ensureBufferOutput(result.stderr),
    ...(result.all === undefined ? {} : { all: ensureBufferOutput(result.all) }),
  };
}

const runProcessImpl = async (
  opts: RunProcessOptions,
): Promise<RunProcessResult<string | Buffer>> => {
  const result = await runExeca(
    normalizeSupportedExecutable(opts.command),
    opts.args ?? [],
    buildProcessOptions(opts) as never,
  );
  const normalized = result as unknown as RunProcessResult<string | Buffer>;
  return opts.encoding === null ? normalizeBufferedResult(normalized) : normalized;
};
export const runProcess = runProcessImpl as RunProcessFn;

const runProcessSyncImpl = (opts: RunProcessOptions): RunProcessResult<string | Buffer> => {
  const result = runExecaSync(
    normalizeSupportedExecutable(opts.command),
    opts.args ?? [],
    buildProcessOptions(opts) as never,
  );
  return opts.encoding === null ? normalizeBufferedResult(result) : result;
};
export const runProcessSync = runProcessSyncImpl as RunProcessSyncFn;

const startProcessImpl = (opts: RunProcessOptions): ExecaChildProcess<string | Buffer> => {
  const child = execa(
    opts.command,
    opts.args ?? [],
    buildProcessOptions({
      ...opts,
      reject: opts.reject ?? false,
      buffer: opts.buffer ?? false,
    }) as never,
  ) as ExecaChildProcess<string | Buffer>;
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
