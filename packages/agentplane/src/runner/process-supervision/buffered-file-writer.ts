import { appendStableRegularFileNoFollow } from "../stable-file.js";

const DEFAULT_MAX_PENDING_BYTES = 8 * 1024 * 1024;

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err));
}

export class BufferedFileWriter {
  readonly #filePath: string;
  readonly #onError: (err: unknown) => void;
  readonly #beforeWrite?: () => Promise<void>;
  readonly #maxPendingBytes: number;
  #pendingChunks: string[] = [];
  #pendingBytes = 0;
  #writing = false;
  #error: Error | null = null;
  #flushWaiters: {
    resolve: () => void;
    reject: (err: unknown) => void;
  }[] = [];

  constructor(opts: {
    file_path: string;
    on_error: (err: unknown) => void;
    before_write?: () => Promise<void>;
    max_pending_bytes?: number;
  }) {
    this.#filePath = opts.file_path;
    this.#onError = opts.on_error;
    this.#beforeWrite = opts.before_write;
    this.#maxPendingBytes = opts.max_pending_bytes ?? DEFAULT_MAX_PENDING_BYTES;
    if (!Number.isSafeInteger(this.#maxPendingBytes) || this.#maxPendingBytes < 1) {
      throw new Error("Runner buffered writer max_pending_bytes must be a positive integer.");
    }
  }

  append(text: string): void {
    if (!text) return;
    if (this.#error) {
      this.#onError(this.#error);
      return;
    }
    const incomingBytes = Buffer.byteLength(text, "utf8");
    if (incomingBytes > this.#maxPendingBytes - this.#pendingBytes) {
      this.#fail(
        new Error(
          `Runner buffered trace queue exceeded max_pending_bytes=${this.#maxPendingBytes}.`,
        ),
      );
      return;
    }
    this.#pendingChunks.push(text);
    this.#pendingBytes += incomingBytes;
    if (!this.#writing) {
      this.#writing = true;
      void this.#drain();
    }
  }

  async flush(): Promise<void> {
    if (this.#error) throw this.#error;
    if (!this.#writing && this.#pendingChunks.length === 0) return;
    await new Promise<void>((resolve, reject) => {
      this.#flushWaiters.push({ resolve, reject });
    });
  }

  async #drain(): Promise<void> {
    try {
      while (!this.#error && this.#pendingChunks.length > 0) {
        const chunks = this.#pendingChunks;
        this.#pendingChunks = [];
        this.#pendingBytes = 0;
        await this.#beforeWrite?.();
        await appendStableRegularFileNoFollow(
          this.#filePath,
          chunks.join(""),
          "runner buffered trace file",
        );
      }
      if (this.#error) {
        this.#writing = false;
        this.#rejectFlushWaiters(this.#error);
        return;
      }
      this.#writing = false;
      this.#resolveFlushWaiters();
    } catch (err) {
      this.#fail(toError(err));
    }
  }

  #fail(err: Error): void {
    if (this.#error) return;
    this.#error = err;
    this.#pendingChunks = [];
    this.#pendingBytes = 0;
    this.#writing = false;
    this.#rejectFlushWaiters(err);
    this.#onError(err);
  }

  #resolveFlushWaiters(): void {
    const waiters = this.#flushWaiters;
    this.#flushWaiters = [];
    for (const waiter of waiters) {
      waiter.resolve();
    }
  }

  #rejectFlushWaiters(err: unknown): void {
    const waiters = this.#flushWaiters;
    this.#flushWaiters = [];
    for (const waiter of waiters) {
      waiter.reject(err);
    }
  }
}
