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
type RunProcessStringOptions = RunProcessOptions & { encoding?: BufferEncoding };
type RunProcessBufferOptions = RunProcessOptions & { encoding: null };

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
  shell?: boolean | string;
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

function buildProcessOptions(opts: RunProcessOptions) {
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
    ...(opts.shell === undefined ? {} : { shell: opts.shell }),
    ...(opts.detached === undefined ? {} : { detached: opts.detached }),
    ...(opts.buffer === undefined ? {} : { buffer: opts.buffer }),
  };
}

export async function runProcess(opts: RunProcessStringOptions): Promise<RunProcessResult<string>>;
export async function runProcess(opts: RunProcessBufferOptions): Promise<RunProcessResult<Buffer>>;
export async function runProcess(opts: RunProcessOptions): Promise<RunProcessResult> {
  const result = await execa(
    opts.command,
    opts.args ?? [],
    buildProcessOptions(opts) as never,
  );
  return result as RunProcessResult;
}

export function runProcessSync(opts: RunProcessStringOptions): RunProcessResult<string>;
export function runProcessSync(opts: RunProcessBufferOptions): RunProcessResult<Buffer>;
export function runProcessSync(opts: RunProcessOptions): RunProcessResult {
  const result = execaSync(
    opts.command,
    opts.args ?? [],
    buildProcessOptions(opts) as never,
  );
  return result as RunProcessResult;
}

export function startProcess(opts: RunProcessStringOptions): ExecaChildProcess<string>;
export function startProcess(opts: RunProcessBufferOptions): ExecaChildProcess<Buffer>;
export function startProcess(opts: RunProcessOptions): ExecaChildProcess<string | Buffer> {
  const child = execa(
    opts.command,
    opts.args ?? [],
    buildProcessOptions({
      ...opts,
      reject: opts.reject ?? false,
      buffer: opts.buffer ?? false,
    }) as never,
  ) as ExecaChildProcess<string | Buffer>;
  child.catch(() => undefined);
  return child;
}

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

export async function execFileAsync(
  file: string,
  args?: readonly string[] | ExecFileStringOptions | null,
  options?: ExecFileStringOptions | null,
): Promise<ExecFileAsyncResult<string>>;
export async function execFileAsync(
  file: string,
  args?: readonly string[] | ExecFileBufferOptions | null,
  options?: ExecFileBufferOptions | null,
): Promise<ExecFileAsyncResult<Buffer>>;
export async function execFileAsync(
  file: string,
  args?: readonly string[] | ExecFileCompatOptions | null,
  options?: ExecFileCompatOptions | null,
): Promise<ExecFileAsyncResult<string | Buffer>> {
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
            shell: resolved.options.shell,
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
            shell: resolved.options.shell,
            windowsHide: resolved.options.windowsHide,
          });
    return { stdout: result.stdout, stderr: result.stderr };
  } catch (err) {
    throw normalizeProcessError(err);
  }
}
