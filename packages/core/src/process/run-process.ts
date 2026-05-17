import {
  type ExecFileOptions,
  type ExecFileOptionsWithBufferEncoding,
  type StdioOptions,
} from "node:child_process";
import type { Stream, Readable as ReadableStream } from "node:stream";
import { fileURLToPath } from "node:url";

import execa, { sync as execaSync, type ExecaChildProcess } from "execa";

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

function buildProcessOptions(opts: RunProcessOptions) {
  assertSafeExecutable(opts.command);
  return {
    cwd: resolveCwd(opts.cwd),
    env: opts.env ?? process.env,
    encoding: opts.encoding === undefined ? "utf8" : opts.encoding,
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
    ...(opts.buffer === undefined ? {} : { buffer: opts.buffer }),
  };
}

const runProcessImpl = async (
  opts: RunProcessOptions,
): Promise<RunProcessResult<string | Buffer>> => {
  const result = await execa(opts.command, opts.args ?? [], buildProcessOptions(opts) as never);
  return result as RunProcessResult<string | Buffer>;
};
export const runProcess = runProcessImpl as RunProcessFn;

const runProcessSyncImpl = (opts: RunProcessOptions): RunProcessResult<string | Buffer> => {
  const result = execaSync(opts.command, opts.args ?? [], buildProcessOptions(opts) as never);
  return result as RunProcessResult<string | Buffer>;
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
