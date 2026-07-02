import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { validateMaximumAssimilationCoverage } from "./coverage-validation.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-coverage-validation-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

const context = {
  mode: "maximum_assimilation",
  task_type: "context_assimilation",
  source_set: {
    files: [{ path: "context/raw/specs/payment-api.md" }],
  },
};

describe("maximum-assimilation coverage validation", () => {
  it("rejects source-level-only coverage when source span skeleton has uncovered spans", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/tasks/202605191451-CTXMAX/source-spans.skeleton.jsonl",
      [
        { span_id: "span.payment-api.0001", source_path: "context/raw/specs/payment-api.md" },
        { span_id: "span.payment-api.0002", source_path: "context/raw/specs/payment-api.md" },
      ]
        .map((row) => JSON.stringify(row))
        .join("\n") + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/reports/coverage.jsonl",
      JSON.stringify({
        id: "coverage.payment-api",
        source_path: "context/raw/specs/payment-api.md",
        span_id: "span.payment-api.0001",
        coverage_status: "covered",
        reason: "First span was covered.",
        covered_item_ids: ["fact.payment-api"],
        target_paths: ["context/wiki/entities/payment-api.md"],
        source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
      }) + "\n",
    );

    const errors: string[] = [];
    await validateMaximumAssimilationCoverage(root, context, errors, "202605191451-CTXMAX");

    expect(errors).toContain(
      ".agentplane/context/derived/reports/coverage.jsonl: missing coverage row for source span span.payment-api.0002",
    );
  });

  it("requires target paths for covered spans and contradiction rows for conflict spans", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/tasks/202605191451-CTXMAX/source-spans.skeleton.jsonl",
      [
        { span_id: "span.payment-api.0001", source_path: "context/raw/specs/payment-api.md" },
        { span_id: "span.payment-api.0002", source_path: "context/raw/specs/payment-api.md" },
      ]
        .map((row) => JSON.stringify(row))
        .join("\n") + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/reports/coverage.jsonl",
      [
        {
          id: "coverage.covered",
          source_path: "context/raw/specs/payment-api.md",
          span_id: "span.payment-api.0001",
          coverage_status: "covered",
          reason: "Covered but missing target path.",
          covered_item_ids: ["fact.payment-api"],
          source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
        },
        {
          id: "coverage.conflict",
          source_path: "context/raw/specs/payment-api.md",
          span_id: "span.payment-api.0002",
          coverage_status: "conflict",
          reason: "Conflict requires contradiction row.",
          covered_item_ids: ["contradiction.payment-api"],
          source_refs: ["context/raw/specs/payment-api.md#lines=4-6"],
        },
      ]
        .map((row) => JSON.stringify(row))
        .join("\n") + "\n",
    );

    const errors: string[] = [];
    await validateMaximumAssimilationCoverage(root, context, errors, "202605191451-CTXMAX");

    expect(errors).toContain(
      ".agentplane/context/derived/reports/coverage.jsonl#coverage.covered: covered coverage rows must include target_paths",
    );
    expect(errors).toContain(
      ".agentplane/context/derived/reports/coverage.jsonl#coverage.conflict: conflict coverage rows must reference a contradiction record",
    );
  });
});
