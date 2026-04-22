import { appendFile } from "node:fs/promises";

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err));
}

export class BufferedFileWriter {
  readonly #filePath: string;
  readonly #onError: (err: unknown) => void;
  #buffer = "";
  #writing = false;
  #error: Error | null = null;
  #flushWaiters: {
    resolve: () => void;
    reject: (err: unknown) => void;
  }[] = [];

  constructor(opts: { file_path: string; on_error: (err: unknown) => void }) {
    this.#filePath = opts.file_path;
    this.#onError = opts.on_error;
  }

  append(text: string): void {
    if (!text) return;
    if (this.#error) {
      this.#onError(this.#error);
      return;
    }
    this.#buffer += text;
    if (!this.#writing) {
      this.#writing = true;
      void this.#drain();
    }
  }

  async flush(): Promise<void> {
    if (this.#error) throw this.#error;
    if (!this.#writing && !this.#buffer) return;
    await new Promise<void>((resolve, reject) => {
      this.#flushWaiters.push({ resolve, reject });
    });
  }

  async #drain(): Promise<void> {
    try {
      while (this.#buffer) {
        const chunk = this.#buffer;
        this.#buffer = "";
        await appendFile(this.#filePath, chunk, "utf8");
      }
      this.#writing = false;
      this.#resolveFlushWaiters();
    } catch (err) {
      this.#error = toError(err);
      this.#buffer = "";
      this.#writing = false;
      this.#rejectFlushWaiters(this.#error);
      this.#onError(this.#error);
    }
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
