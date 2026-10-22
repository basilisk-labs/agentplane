import { createHash, randomUUID } from "node:crypto";
import {
  appendFileSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { StringDecoder } from "node:string_decoder";
import { stripVTControlCharacters } from "node:util";

const OUTPUT_BYTES = 256 * 1024;
const FAILURE_BYTES = 256 * 1024;
const LINE_BYTES = 16 * 1024;
const MAX_RECORDS = 1024;
const MAX_RUNS = 128;
export const observationDigest = (value: string | Buffer): string =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

export function verificationRedactor(env: NodeJS.ProcessEnv = process.env, cwd = process.cwd()) {
  const secrets = Object.entries(env)
    .filter(
      ([key, value]) =>
        /secret|token|password|credential|authorization|private.?key/i.test(key) &&
        value &&
        value.length >= 4,
    )
    .flatMap(([, value]) => [value!, ...value!.split(/\r?\n/u).filter((line) => line.length >= 4)])
    .toSorted((a, b) => b.length - a.length);
  return (input: string): string => {
    let value = stripVTControlCharacters(input);
    for (const secret of secrets) value = value.split(secret).join("[REDACTED]");
    return value
      .split(cwd)
      .join("<repo>")
      .replaceAll(
        /-----BEGIN [\s\S]*?PRIVATE KEY-----[\s\S]*?(?:-----END [\s\S]*?PRIVATE KEY-----|$)/g,
        "[REDACTED PRIVATE KEY]",
      )
      .replaceAll(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/gi, "$1[REDACTED]@")
      .replaceAll(/\b(Bearer|Basic)\s+[\w+/=._~-]+/gi, "$1 [REDACTED]")
      .replaceAll(
        /((?:api[_-]?key|token|password|secret|authorization)\s*[=:]\s*)[^\s,;]+/gi,
        "$1[REDACTED]",
      );
  };
}

export type ObservationReference = {
  status: "retained" | "unavailable";
  manifest_path?: string;
  digest?: string;
  reason?: string;
};
type Binding = {
  kind: string;
  command: string;
  deadline_ms: number;
  implementation?: unknown;
  runtime?: unknown;
  parent_run_id?: string;
};

function privateDirectory(directory: string): void {
  // Do not follow an existing symlink anywhere in an artifact path.
  const absolute = path.resolve(directory);
  let current = path.parse(absolute).root;
  for (const component of absolute.slice(current.length).split(path.sep)) {
    current = path.join(current, component);
    try {
      mkdirSync(current, { mode: 0o700 });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
    if (!lstatSync(current).isDirectory() || lstatSync(current).isSymbolicLink())
      throw new Error("unsafe observation directory");
  }
}

export function createVerificationObservation(options: {
  directory: string;
  binding: Binding;
  env?: NodeJS.ProcessEnv;
  cwd?: string;
  heartbeatMs?: number;
  maxRuns?: number;
  budgetDirectory?: string;
}) {
  const budgetDirectory = options.budgetDirectory ?? options.directory;
  const admissions = path.join(budgetDirectory, ".admissions");
  privateDirectory(admissions);
  let admitted = false;
  for (let i = 0; i < 256; i++) {
    try {
      mkdirSync(path.join(admissions, String(i)), { mode: 0o700 });
      admitted = true;
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  if (!admitted) throw new Error("task observation storage budget exhausted");
  privateDirectory(options.directory);
  let directory = "";
  // Atomic slots enforce a lifetime storage bound without deleting evidence from previous runs.
  for (let i = 0; i < Math.min(MAX_RUNS, options.maxRuns ?? MAX_RUNS); i++) {
    const candidate = path.join(options.directory, `run-${String(i).padStart(3, "0")}`);
    try {
      mkdirSync(candidate, { mode: 0o700 });
      directory = candidate;
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  if (!directory) throw new Error("observation storage admission limit reached");
  const redact = verificationRedactor(options.env, options.cwd);
  const runId = randomUUID();
  const started = Date.now();
  let lastActivity = started;
  let finished = false;
  let ioError = false;
  let failureBytes = 0;
  let failureCount = 0;
  let omittedFailures = 0;
  let structured = "unsupported";
  const binding = {
    ...options.binding,
    command: redact(options.binding.command).slice(0, 16 * 1024),
    command_text_truncated: options.binding.command.length > 16 * 1024,
    command_digest: observationDigest(options.binding.command),
  };
  // Redact every field, including paths and serialized runner errors, before persistence.
  const sanitize = (value: unknown): unknown => {
    if (typeof value === "string") return redact(value);
    if (Array.isArray(value)) return value.map((item) => sanitize(item));
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [redact(key), sanitize(item)]),
      );
    return value;
  };
  const json = (value: unknown) => JSON.stringify(sanitize(value));
  const safeWrite = (name: string, value: string) => {
    try {
      writeFileSync(path.join(directory, name), value, { mode: 0o600, flag: "wx" });
    } catch {
      ioError = true;
    }
  };
  const snapshot = (state = "running") => {
    try {
      const content = json({
        schema_version: 1,
        run_id: runId,
        binding,
        state,
        started_at_ms: started,
        updated_at_ms: Date.now(),
        elapsed_ms: Date.now() - started,
        last_activity_at_ms: lastActivity,
        deadline_ms: binding.deadline_ms,
        pid: process.pid,
        success: state === "passed",
      });
      const temporary = path.join(directory, ".status.tmp");
      writeFileSync(temporary, content, { mode: 0o600 });
      renameSync(temporary, path.join(directory, "status.json"));
    } catch {
      ioError = true;
    }
  };
  const streams = Object.fromEntries(
    ["stdout", "stderr"].map((name) => [
      name,
      {
        decoder: new StringDecoder("utf8"),
        pending: "",
        dropping: false,
        privateKey: false,
        linePrivate: false,
        markerTail: "",
        observed_bytes: 0,
        retained_bytes: 0,
        omitted_bytes: 0,
        oversized_lines: 0,
        tail: "",
      },
    ]),
  ) as Record<
    "stdout" | "stderr",
    {
      decoder: StringDecoder;
      pending: string;
      dropping: boolean;
      privateKey: boolean;
      linePrivate: boolean;
      markerTail: string;
      observed_bytes: number;
      retained_bytes: number;
      omitted_bytes: number;
      oversized_lines: number;
      tail: string;
    }
  >;
  for (const name of ["stdout", "stderr", "failures"]) safeWrite(`${name}.jsonl`, "");
  const append = (name: string, value: string) => {
    try {
      appendFileSync(path.join(directory, `${name}.jsonl`), value);
    } catch {
      ioError = true;
    }
  };
  const pendingWrites = { stdout: "", stderr: "" };
  const line = (name: "stdout" | "stderr", raw: string, newline = true) => {
    const stream = streams[name];
    const value = stream.privateKey || stream.linePrivate ? "[REDACTED PRIVATE KEY]" : redact(raw);
    stream.tail = `${stream.tail}${value}${newline ? "\n" : ""}`.slice(-4000);
    const record = `${JSON.stringify(value)}\n`;
    const size = Buffer.byteLength(record);
    if (stream.retained_bytes + size <= OUTPUT_BYTES) {
      pendingWrites[name] += record;
      stream.retained_bytes += size;
    } else stream.omitted_bytes += size;
  };
  const feed = (name: "stdout" | "stderr", text: string) => {
    const stream = streams[name];
    // A single hostile unterminated line cannot grow memory or expose a partial secret.
    for (const part of text.split(/(?<=\n)/u)) {
      const complete = part.endsWith("\n");
      stream.linePrivate ||= stream.privateKey;
      const markerText = stream.markerTail + part;
      for (const marker of markerText.matchAll(
        /-----((?:BEGIN)|(?:END)) [A-Z0-9 ]*PRIVATE KEY-----/gu,
      )) {
        stream.linePrivate = true;
        stream.privateKey = marker[1] === "BEGIN";
      }
      stream.markerTail = markerText.slice(-128);
      if (!stream.dropping) {
        stream.pending += part;
        if (Buffer.byteLength(stream.pending) > LINE_BYTES) {
          stream.pending = "";
          stream.dropping = true;
          stream.oversized_lines++;
        }
      }
      if (complete) {
        if (stream.dropping) line(name, "[OVERSIZED LINE OMITTED]");
        else line(name, stream.pending.replace(/\r?\n$/, ""));
        stream.pending = "";
        stream.dropping = false;
        stream.linePrivate = false;
        stream.markerTail = "";
      }
    }
  };
  snapshot();
  const timer = setInterval(() => snapshot(), Math.max(25, options.heartbeatMs ?? 1000));
  timer.unref();
  return {
    directory,
    runId,
    redact,
    budgetDirectory,
    write(name: "stdout" | "stderr", chunk: string | Buffer) {
      if (finished) return;
      lastActivity = Date.now();
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      streams[name].observed_bytes += buffer.length;
      feed(name, streams[name].decoder.write(buffer));
      if (pendingWrites[name]) append(name, pendingWrites[name]);
      pendingWrites[name] = "";
    },
    failure(value: unknown) {
      if (finished) return;
      const record = `${json(value)}\n`;
      const bytes = Buffer.byteLength(record);
      if (failureCount >= MAX_RECORDS || failureBytes + bytes > FAILURE_BYTES) {
        omittedFailures++;
        return;
      }
      append("failures", record);
      failureCount++;
      failureBytes += bytes;
    },
    structured(status: "complete" | "incomplete" | "unsupported") {
      structured = status;
    },
    tail(name: "stdout" | "stderr") {
      return streams[name].tail;
    },
    finish(
      state: "passed" | "failed" | "timed_out" | "cancelled" | "interrupted",
      extra: unknown = {},
    ): ObservationReference {
      if (finished) return { status: "unavailable", reason: "observation already finalized" };
      finished = true;
      clearInterval(timer);
      for (const name of ["stdout", "stderr"] as const) {
        const stream = streams[name];
        feed(name, stream.decoder.end());
        if (stream.dropping) line(name, "[OVERSIZED LINE OMITTED]");
        else if (stream.pending) line(name, stream.pending, false);
        if (pendingWrites[name]) append(name, pendingWrites[name]);
        pendingWrites[name] = "";
      }
      snapshot(state);
      const files = ["stdout.jsonl", "stderr.jsonl", "failures.jsonl"].map((name) => {
        try {
          const data = readFileSync(path.join(directory, name));
          return { path: name, bytes: data.length, digest: observationDigest(data) };
        } catch {
          ioError = true;
          return { path: name, unavailable: true };
        }
      });
      const children: { path: string; digest?: string; incomplete?: true }[] = [];
      try {
        for (const entry of readdirSync(path.join(directory, "children")).slice(0, MAX_RUNS)) {
          if (!/^run-\d{3}$/.test(entry)) continue;
          const relative = path.join("children", entry, "manifest.json");
          try {
            children.push({
              path: relative,
              digest: observationDigest(readFileSync(path.join(directory, relative))),
            });
          } catch {
            children.push({ path: relative, incomplete: true });
          }
        }
      } catch {
        /* A leaf observation has no children. */
      }
      const truncation = Object.fromEntries(
        Object.entries(streams).map(([name, stream]) => [
          name,
          {
            observed_bytes: stream.observed_bytes,
            retained_bytes: stream.retained_bytes,
            omitted_bytes: stream.omitted_bytes,
            oversized_lines: stream.oversized_lines,
            truncated: stream.omitted_bytes > 0 || stream.oversized_lines > 0,
          },
        ]),
      );
      const manifest = json({
        schema_version: 1,
        run_id: runId,
        binding,
        state,
        started_at_ms: started,
        finished_at_ms: Date.now(),
        files,
        children,
        child_evidence_complete: children.every((child) => !child.incomplete),
        truncation,
        structured_failures: {
          status:
            omittedFailures || ioError || children.some((child) => child.incomplete)
              ? "incomplete"
              : structured,
          retained: failureCount,
          omitted: omittedFailures,
        },
        io_error: ioError,
        result: extra,
      });
      safeWrite("manifest.json", manifest);
      return ioError
        ? { status: "unavailable", reason: "observation persistence failed" }
        : {
            status: "retained",
            manifest_path: path.join(directory, "manifest.json"),
            digest: observationDigest(manifest),
          };
    },
  };
}
