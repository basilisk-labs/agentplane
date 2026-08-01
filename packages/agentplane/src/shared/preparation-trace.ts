import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";

import { emitTraceEvent, isTraceEnabled } from "./trace-events.js";

const PREPARATION_TRACE_SCHEMA_VERSION = 1 as const;

export type PreparationCacheability = "exact" | "ttl" | "none";

type PreparationTraceStatus =
  | "resolved"
  | "reused"
  | "reuse_candidate"
  | "invalidated"
  | "denied"
  | "failed";

type PreparationFingerprintInput = {
  name: string;
  digest: string;
  bytes: number;
};

export type PreparationTraceEvent = {
  schemaVersion: typeof PREPARATION_TRACE_SCHEMA_VERSION;
  command: string | null;
  capability: string | null;
  node: string;
  scope: string;
  status: PreparationTraceStatus;
  durationMs: number;
  inputBytes: number;
  outputBytes: number;
  dependencies: readonly string[];
  fingerprint: string;
  fingerprintInputs: readonly PreparationFingerprintInput[];
  outputDigest: string;
  invalidationReasons: readonly string[];
  cacheability: PreparationCacheability;
  cachePolicyReason: string;
};

type PreparationTraceRecordOptions = {
  command?: string | null;
  capability?: string | null;
  node: string;
  scope?: string;
  status?: "resolved" | "reused" | "denied" | "failed";
  durationMs: number;
  dependencies?: readonly string[];
  fingerprintInputs: Readonly<Record<string, unknown>>;
  output?: unknown;
  cacheability: PreparationCacheability;
  cachePolicyReason: string;
  reason?: string;
};

type PreparationTraceRecorderOptions = {
  emit?: (event: PreparationTraceEvent) => void;
};

type StableJsonValue =
  | null
  | boolean
  | number
  | string
  | readonly StableJsonValue[]
  | { readonly [key: string]: StableJsonValue };

function stableJsonValue(value: unknown, seen: WeakSet<object>): StableJsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : String(value);
  if (typeof value === "bigint") return `${value}n`;
  if (value === undefined || typeof value === "function" || typeof value === "symbol") {
    return `[${typeof value}]`;
  }
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) return Buffer.from(value).toString("base64");
  if (seen.has(value)) return "[circular]";
  seen.add(value);
  if (Array.isArray(value)) {
    const normalized = value.map((entry) => stableJsonValue(entry, seen));
    seen.delete(value);
    return normalized;
  }
  const normalized: Record<string, StableJsonValue> = {};
  for (const key of Object.keys(value).toSorted()) {
    normalized[key] = stableJsonValue(Reflect.get(value, key), seen);
  }
  seen.delete(value);
  return normalized;
}

function serialize(value: unknown): string {
  return JSON.stringify(stableJsonValue(value, new WeakSet<object>()));
}

function sha256(serialized: string): string {
  return `sha256:${createHash("sha256").update(serialized, "utf8").digest("hex")}`;
}

function measurement(value: unknown): { bytes: number; digest: string } {
  const serialized = serialize(value);
  return {
    bytes: Buffer.byteLength(serialized, "utf8"),
    digest: sha256(serialized),
  };
}

function orderedInputs(inputs: Readonly<Record<string, unknown>>): PreparationFingerprintInput[] {
  return Object.keys(inputs)
    .toSorted()
    .map((name) => ({ name, ...measurement(inputs[name]) }));
}

function changedInputReasons(
  previous: PreparationTraceEvent,
  current: readonly PreparationFingerprintInput[],
): string[] {
  const previousByName = new Map(previous.fingerprintInputs.map((input) => [input.name, input]));
  const currentNames = new Set(current.map((input) => input.name));
  const reasons = current.flatMap((input) => {
    const prior = previousByName.get(input.name);
    if (!prior) return [`fingerprint_input_added:${input.name}`];
    return prior.digest === input.digest ? [] : [`fingerprint_input_changed:${input.name}`];
  });
  for (const input of previous.fingerprintInputs) {
    if (!currentNames.has(input.name)) reasons.push(`fingerprint_input_removed:${input.name}`);
  }
  return reasons;
}

export class PreparationTraceRecorder {
  readonly #events: PreparationTraceEvent[] = [];
  readonly #latest = new Map<string, PreparationTraceEvent>();
  readonly #emit: ((event: PreparationTraceEvent) => void) | undefined;

  constructor(opts: PreparationTraceRecorderOptions = {}) {
    this.#emit = opts.emit;
  }

  record(opts: PreparationTraceRecordOptions): PreparationTraceEvent {
    const requestedScope = opts.scope?.trim();
    const scope =
      requestedScope === undefined || requestedScope === "" ? "process" : requestedScope;
    const key = `${scope}\u0000${opts.node}`;
    const previous = this.#latest.get(key);
    const fingerprintInputs = orderedInputs(opts.fingerprintInputs);
    const fingerprint = sha256(
      serialize(fingerprintInputs.map(({ name, digest }) => ({ name, digest }))),
    );
    const output = measurement(opts.output ?? null);
    const requestedStatus = opts.status ?? "resolved";
    let status: PreparationTraceStatus = requestedStatus;
    let invalidationReasons: string[] = opts.reason ? [opts.reason] : [];

    if (requestedStatus === "resolved") {
      if (!previous) {
        invalidationReasons = ["no_prior_observation"];
      } else if (previous.fingerprint !== fingerprint) {
        status = "invalidated";
        invalidationReasons = changedInputReasons(previous, fingerprintInputs);
      } else if (previous.outputDigest !== output.digest) {
        status = "invalidated";
        invalidationReasons = ["output_changed_without_fingerprint_change"];
      } else if (opts.cacheability === "none") {
        invalidationReasons = ["non_cacheable_policy"];
      } else {
        status = "reuse_candidate";
        invalidationReasons = ["fingerprint_unchanged"];
      }
    } else if (requestedStatus === "reused" && invalidationReasons.length === 0) {
      invalidationReasons = ["session_value_reused"];
    }

    const event: PreparationTraceEvent = {
      schemaVersion: PREPARATION_TRACE_SCHEMA_VERSION,
      command: opts.command ?? null,
      capability: opts.capability ?? null,
      node: opts.node,
      scope,
      status,
      durationMs: Math.max(0, opts.durationMs),
      inputBytes: fingerprintInputs.reduce((total, input) => total + input.bytes, 0),
      outputBytes: output.bytes,
      dependencies: [...(opts.dependencies ?? [])],
      fingerprint,
      fingerprintInputs,
      outputDigest: output.digest,
      invalidationReasons,
      cacheability: opts.cacheability,
      cachePolicyReason: opts.cachePolicyReason,
    };
    this.#events.push(event);
    if (requestedStatus === "resolved" || requestedStatus === "reused") {
      this.#latest.set(key, event);
    }
    this.#emit?.(event);
    return event;
  }

  events(): readonly PreparationTraceEvent[] {
    return [...this.#events];
  }
}

const preparationTraceStorage = new AsyncLocalStorage<PreparationTraceRecorder>();

export function preparationTraceDetails(event: PreparationTraceEvent): Record<string, unknown> {
  return {
    schema_version: event.schemaVersion,
    command: event.command,
    capability: event.capability,
    node: event.node,
    scope: event.scope,
    status: event.status,
    duration_ms: event.durationMs,
    input_bytes: event.inputBytes,
    output_bytes: event.outputBytes,
    dependencies: event.dependencies,
    fingerprint: event.fingerprint,
    fingerprint_inputs: event.fingerprintInputs.map((input) => ({
      name: input.name,
      digest: input.digest,
      bytes: input.bytes,
    })),
    output_digest: event.outputDigest,
    invalidation_reasons: event.invalidationReasons,
    cacheability: event.cacheability,
    cache_policy_reason: event.cachePolicyReason,
  };
}

function emitPreparationTrace(event: PreparationTraceEvent): void {
  emitTraceEvent({
    component: "preparation-graph",
    event: "node",
    details: preparationTraceDetails(event),
  });
}

export function createPreparationTraceRecorder(): PreparationTraceRecorder | null {
  return isTraceEnabled() ? new PreparationTraceRecorder({ emit: emitPreparationTrace }) : null;
}

export async function runWithPreparationTrace<T>(operation: () => Promise<T>): Promise<T> {
  if (!isTraceEnabled()) return await operation();
  return await preparationTraceStorage.run(createPreparationTraceRecorder()!, operation);
}

export async function measurePreparationNode<T>(opts: {
  recorder?: PreparationTraceRecorder | null | undefined;
  command?: string | null;
  capability?: string | null;
  node: string;
  scope?: string;
  dependencies?: readonly string[];
  fingerprintInputs: (value: T) => Readonly<Record<string, unknown>>;
  output?: (value: T) => unknown;
  cacheability: PreparationCacheability;
  cachePolicyReason: string;
  operation: () => Promise<T>;
}): Promise<T> {
  const recorder = opts.recorder ?? preparationTraceStorage.getStore();
  if (!recorder) return await opts.operation();
  const startedAt = performance.now();
  try {
    const value = await opts.operation();
    recorder.record({
      ...opts,
      durationMs: performance.now() - startedAt,
      fingerprintInputs: opts.fingerprintInputs(value),
      output: opts.output?.(value) ?? value,
    });
    return value;
  } catch (error) {
    recorder.record({
      ...opts,
      status: "failed",
      durationMs: performance.now() - startedAt,
      fingerprintInputs: {},
      output: error instanceof Error ? { name: error.name } : null,
      reason: "operation_failed",
    });
    throw error;
  }
}
