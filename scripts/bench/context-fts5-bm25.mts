import { mkdir, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";

import {
  readSqliteProjection,
  searchSqliteProjection,
  writeSqliteProjection,
} from "../../packages/agentplane/src/context/sqlite.ts";

const TOTAL_ROWS = 3000;
const RUNS_PER_STRATEGY = 31;
const WARMUP_RUNS = 5;
const QUERY = "needle latency";
const EXPECTED_RECALL = 24;
const FILLER = "x".repeat(1536);

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

async function measure(operation: () => Promise<number>): Promise<Measurement> {
  for (let index = 0; index < WARMUP_RUNS; index += 1) {
    await operation();
  }
  const values: number[] = [];
  for (let index = 0; index < RUNS_PER_STRATEGY; index += 1) {
    const started = performance.now();
    const recall = await operation();
    values.push(performance.now() - started);
    if (recall !== EXPECTED_RECALL) {
      throw new Error(`Unexpected recall: expected ${EXPECTED_RECALL}, received ${recall}`);
    }
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
const temporaryRoot = await mkdtemp(path.join(temporaryParent, "rf14-benchmark-"));
const dbPath = path.join(temporaryRoot, "projection.sqlite");

try {
  await writeSqliteProjection(dbPath, {
    metadata: {
      projection_version: 2,
      generated_at: "2026-07-30T00:00:00.000Z",
      workspace_hash: "sha256:rf14-benchmark",
      include_tasks: false,
      include_raw: false,
      source_bytes: TOTAL_ROWS * FILLER.length,
      search_text_bytes: TOTAL_ROWS * (FILLER.length + 64),
      preview_text_bytes: TOTAL_ROWS * 32,
      projection_elapsed_ms: 0,
    },
    rows: Array.from({ length: TOTAL_ROWS }, (_, index) => ({
      path: `context/wiki/doc-${String(index).padStart(4, "0")}.md#section=benchmark`,
      sha256: `sha256:${String(index).padStart(8, "0")}`,
      content_type: "text/markdown",
      projection_version: 2,
      indexed_at: "2026-07-30T00:00:00.000Z",
      size_bytes: FILLER.length,
      kind: "markdown-section",
      search_text:
        `document ${index} ` +
        (index % 125 === 0 ? "needle latency target " : "ordinary context ") +
        FILLER,
      preview_text: `document ${index} preview`,
      source_refs: [`context/wiki/doc-${String(index).padStart(4, "0")}.md`],
    })),
  });

  const candidate = await measure(async () => {
    const result = await searchSqliteProjection(dbPath, {
      query: QUERY,
      scopes: ["wiki"],
      limit: 100,
      offset: 0,
    });
    return result?.rows.length ?? 0;
  });
  const baseline = await measure(async () => {
    const projection = await readSqliteProjection(dbPath);
    return (
      projection?.rows.filter((row) =>
        QUERY.split(" ").every((token) => row.search_text.toLowerCase().includes(token)),
      ).length ?? 0
    );
  });

  process.stdout.write(
    `${JSON.stringify(
      {
        schema_version: 1,
        corpus: {
          rows: TOTAL_ROWS,
          search_text_bytes: TOTAL_ROWS * (FILLER.length + 64),
          expected_recall: EXPECTED_RECALL,
          query: QUERY,
        },
        runs_per_strategy: RUNS_PER_STRATEGY,
        baseline: {
          implementation: "v0.6.24 linear materialized-projection scan",
          commit: "30f62b82dff28909dcb3ccc2ace2bf3e356203bb",
          ...baseline,
        },
        candidate: { implementation: "SQLite FTS5/BM25", ...candidate },
        p95_improvement_percent: Number(
          (((baseline.p95_ms - candidate.p95_ms) / baseline.p95_ms) * 100).toFixed(1),
        ),
      },
      null,
      2,
    )}\n`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
