import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { projectEvaluatorQualityReportToContext } from "./evaluator-projection.js";

let tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-evaluator-projection-"));
  tempRoots.push(root);
  await mkdir(path.join(root, "context/wiki"), { recursive: true });
  await writeFile(path.join(root, "context/wiki/index.md"), "# Context\n", "utf8");
  return root;
}

describe("maximum-assimilation evaluator projection", () => {
  it("projects and replaces a task quality review as a context evaluator scenario", async () => {
    const root = await tempRoot();
    const task = {
      id: "202607211617-XMV6XV",
      task_kind: "context",
      blueprint_request: "context.maximum_assimilation",
      extensions: {
        "agentplane.context": {
          task_type: "context_assimilation",
          mode: "maximum_assimilation",
        },
      },
    };
    const report = {
      task_id: task.id,
      evaluator_id: "recovery-context",
      generated_at: "2026-07-21T16:20:00.000Z",
      verdict: "pass",
      summary: "Context quality review passed.",
      findings: ["Curated context remains usable without raw inputs."],
      evidence_refs: [
        "context/wiki/reports/coverage.md",
        "raw-deletion-resilience: curated-only reindex and smoke search passed",
      ],
    };

    await projectEvaluatorQualityReportToContext({
      root,
      task,
      report,
      reportPath: `.agentplane/tasks/${task.id}/quality/run/quality-report.json`,
    });
    await projectEvaluatorQualityReportToContext({
      root,
      task,
      report: { ...report, summary: "Updated review." },
      reportPath: `.agentplane/tasks/${task.id}/quality/run-2/quality-report.json`,
    });

    const evaluatorReportText = await readFile(
      path.join(root, ".agentplane/context/derived/reports/evaluator.jsonl"),
      "utf8",
    );
    const rows = evaluatorReportText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as Record<string, unknown>);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      scenario_id: "scenario.evaluator.202607211617-xmv6xv",
      task_id: task.id,
      verdict: "pass",
      summary: "Updated review.",
      entrypoints: ["context/wiki/reports/coverage.md"],
      raw_deletion_resilience: "pass",
    });
  });
});
