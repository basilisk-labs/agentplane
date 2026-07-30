import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { cmdContextReindex } from "../../packages/agentplane/src/context/reindex.ts";

const TOTAL_FILES = 600;
const CONTENT_BYTES = 2048;
const WARMUP_RUNS = 3;
const RUNS_PER_STRATEGY = 15;
const MAX_P95_RATIO = 0.8;

type Measurement = {
  runs: number;
  p50_ms: number;
  p95_ms: number;
};

function percentile(values: number[], percentileValue: number): number {
  const ordered = [...values].sort((left, right) => left - right);
  const index = Math.min(ordered.length - 1, Math.ceil(ordered.length * percentileValue) - 1);
  return ordered[index] ?? 0;
}

async function writeCorpus(root: string): Promise<void> {
  const wikiRoot = path.join(root, "context", "wiki");
  await mkdir(wikiRoot, { recursive: true });
  const filler = "x".repeat(CONTENT_BYTES);
  await Promise.all(
    Array.from({ length: TOTAL_FILES }, async (_, index) => {
      await writeFile(
        path.join(wikiRoot, `source-${String(index).padStart(4, "0")}.md`),
        `# Source ${index}\n\n${filler}\n`,
        "utf8",
      );
    }),
  );
}

async function mutateOneSource(root: string, iteration: number): Promise<void> {
  await writeFile(
    path.join(root, "context", "wiki", "source-0000.md"),
    `# Source 0\n\nincremental benchmark iteration ${iteration}\n${"x".repeat(CONTENT_BYTES)}\n`,
    "utf8",
  );
}

async function reindex(root: string, reset: boolean): Promise<void> {
  await cmdContextReindex({
    cwd: root,
    parsed: { includeTasks: false, includeRaw: false, reset },
  });
}

async function withMutedStdout<T>(operation: () => Promise<T>): Promise<T> {
  const originalWrite = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  try {
    return await operation();
  } finally {
    process.stdout.write = originalWrite;
  }
}

async function measure(
  root: string,
  reset: boolean,
  iterationOffset: number,
): Promise<Measurement> {
  for (let index = 0; index < WARMUP_RUNS; index += 1) {
    await mutateOneSource(root, iterationOffset + index);
    await withMutedStdout(() => reindex(root, reset));
  }
  const values: number[] = [];
  for (let index = 0; index < RUNS_PER_STRATEGY; index += 1) {
    await mutateOneSource(root, iterationOffset + WARMUP_RUNS + index);
    const started = performance.now();
    await withMutedStdout(() => reindex(root, reset));
    values.push(performance.now() - started);
  }
  return {
    runs: values.length,
    p50_ms: Number(percentile(values, 0.5).toFixed(3)),
    p95_ms: Number(percentile(values, 0.95).toFixed(3)),
  };
}

const root = path.resolve(process.cwd());
const temporaryParent = path.join(root, ".agentplane", "tmp");
await mkdir(temporaryParent, { recursive: true });
const candidateRoot = await mkdtemp(path.join(temporaryParent, "rf15-incremental-"));
const baselineRoot = await mkdtemp(path.join(temporaryParent, "rf15-full-"));

try {
  await Promise.all([writeCorpus(candidateRoot), writeCorpus(baselineRoot)]);
  await withMutedStdout(async () => {
    await reindex(candidateRoot, false);
    await reindex(baselineRoot, false);
  });

  const candidate = await measure(candidateRoot, false, 0);
  const baseline = await measure(baselineRoot, true, 10_000);
  const p95Ratio = Number((candidate.p95_ms / baseline.p95_ms).toFixed(3));
  const result = {
    schema_version: 1,
    corpus: {
      files: TOTAL_FILES,
      markdown_bytes_per_file: CONTENT_BYTES,
      changed_sources_per_run: 1,
      scopes: ["context/wiki"],
    },
    method: {
      warmup_runs: WARMUP_RUNS,
      runs_per_strategy: RUNS_PER_STRATEGY,
      candidate: "RF-15 SQLite source delta after one source rewrite",
      baseline: "controlled full SQLite projection rebuild after the same rewrite",
    },
    baseline,
    candidate,
    threshold: {
      metric: "candidate_p95_ms / full_rebuild_p95_ms",
      maximum: MAX_P95_RATIO,
      observed: p95Ratio,
      passed: p95Ratio <= MAX_P95_RATIO,
    },
    residual_scope:
      "Both strategies still enumerate, stat, read, and hash all eligible sources; RF-15 avoids projection parsing and SQLite corpus rewrite for unchanged sources.",
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.threshold.passed) {
    process.exitCode = 1;
  }
} finally {
  await Promise.all(
    [candidateRoot, baselineRoot].map((temporaryRoot) =>
      rm(temporaryRoot, { recursive: true, force: true }),
    ),
  );
}
