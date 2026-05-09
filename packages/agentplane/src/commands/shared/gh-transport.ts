import { sleep } from "../../backends/task-backend/shared/concurrency.js";

export const GH_LOOKUP_MAX_ATTEMPTS = 3;
export const GH_LOOKUP_BASE_DELAY_MS = 250;

const GH_TRANSIENT_ERROR_PATTERNS = [
  /eof\b/i,
  /tls handshake timeout/i,
  /ssl_error_syscall/i,
  /connection reset by peer/i,
  /\beconnreset\b/i,
  /\betimedout\b/i,
  /socket hang up/i,
  /temporary failure in name resolution/i,
  /network is unreachable/i,
  /server closed the connection/i,
];

const GH_PERMANENT_ERROR_PATTERNS = [
  /authentication required/i,
  /not logged into github/i,
  /could not resolve to a pull request/i,
  /graphql: field/i,
  /bad credentials/i,
  /permission denied/i,
  /\b404\b/i,
  /\b422\b/i,
  /\b403\b/i,
  /\b401\b/i,
  /unknown command/i,
  /usage:/i,
];

export function normalizeGhTransportError(err: unknown): string {
  if (err instanceof Error) {
    const parts = [err.name, err.message];
    const stderr = (err as { stderr?: unknown }).stderr;
    const stdout = (err as { stdout?: unknown }).stdout;
    if (typeof stderr === "string" && stderr.trim()) parts.push(stderr);
    if (typeof stdout === "string" && stdout.trim()) parts.push(stdout);
    return parts.filter((part) => part.trim().length > 0).join("\n");
  }
  return String(err);
}

export function isTransientGhTransportError(err: unknown): boolean {
  const text = normalizeGhTransportError(err);
  if (GH_PERMANENT_ERROR_PATTERNS.some((pattern) => pattern.test(text))) return false;
  return GH_TRANSIENT_ERROR_PATTERNS.some((pattern) => pattern.test(text));
}

export async function withGhTransportRetry<T>(
  operation: () => Promise<T>,
  opts: {
    label: string;
    maxAttempts?: number;
    baseDelayMs?: number;
    onRetry?: (ctx: {
      attempt: number;
      maxAttempts: number;
      error: unknown;
      label: string;
    }) => void;
  },
): Promise<T> {
  const maxAttempts = opts.maxAttempts ?? GH_LOOKUP_MAX_ATTEMPTS;
  const baseDelayMs = opts.baseDelayMs ?? GH_LOOKUP_BASE_DELAY_MS;
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isTransientGhTransportError(error) || attempt === maxAttempts) {
        throw error;
      }
      opts.onRetry?.({ attempt, maxAttempts, error, label: opts.label });
      const delayMs = baseDelayMs * attempt;
      if (delayMs > 0) await sleep(delayMs);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
