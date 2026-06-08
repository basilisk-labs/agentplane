import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { LoopDecisionRecord, LoopEvent, LoopRunRecord, LoopSpec } from "./model.js";

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function jsonLine(value: unknown): string {
  return `${JSON.stringify(value)}\n`;
}

export async function createDryRunLoopRun(opts: {
  projectRoot: string;
  workflowDir: string;
  taskId: string;
  loop: LoopSpec;
  now?: Date;
}): Promise<LoopRunRecord> {
  const startedAt = (opts.now ?? new Date()).toISOString();
  const runId = `loop-${startedAt.replaceAll(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
  const relativeRunDir = path.join(opts.workflowDir, opts.taskId, "runs", runId);
  const runDir = path.join(opts.projectRoot, relativeRunDir);
  const iterationsDir = path.join(runDir, "iterations");
  const firstIterationDir = path.join(iterationsDir, "001");
  const eventsPath = path.join(runDir, "events.jsonl");
  const statePath = path.join(runDir, "state.json");
  const loopRunPath = path.join(runDir, "loop-run.json");
  await mkdir(firstIterationDir, { recursive: true });

  const loopSha = sha256(JSON.stringify(opts.loop));
  const decision: LoopDecisionRecord = {
    schemaVersion: 1,
    kind: "loop.decision",
    decision: "request_human_review",
    reason: "dry_run_prepared_without_external_agent_execution",
    confidence: "high",
    nextStep: "render_prompt",
    feedbackRefs: [],
    humanReviewRequired: true,
  };
  await writeFile(
    path.join(firstIterationDir, "decision.json"),
    `${JSON.stringify(decision, null, 2)}\n`,
  );

  const record: LoopRunRecord = {
    schemaVersion: 1,
    taskId: opts.taskId,
    runId,
    loopId: opts.loop.id,
    loopVersion: opts.loop.version,
    loopSha,
    dryRun: true,
    status: "human_review",
    startedAt,
    stoppedAt: startedAt,
    stopReason: "dry_run_prepared",
    artifacts: {
      runDir: relativeRunDir,
      eventsPath: path.join(relativeRunDir, "events.jsonl"),
      statePath: path.join(relativeRunDir, "state.json"),
      loopRunPath: path.join(relativeRunDir, "loop-run.json"),
      iterationsDir: path.join(relativeRunDir, "iterations"),
    },
  };
  const eventBase = {
    schemaVersion: 1,
    taskId: opts.taskId,
    runId,
    loopId: opts.loop.id,
    loopVersion: opts.loop.version,
    timestamp: startedAt,
  } satisfies Omit<LoopEvent, "type" | "details">;
  const events: LoopEvent[] = [
    { ...eventBase, type: "loop.started", details: { dry_run: true } },
    { ...eventBase, type: "iteration.started", details: { iteration: 1 } },
    { ...eventBase, type: "decision.made", details: decision },
    { ...eventBase, type: "loop.stopped", details: { stop_reason: record.stopReason } },
  ];
  await writeFile(eventsPath, events.map(jsonLine).join(""));
  await writeFile(
    statePath,
    `${JSON.stringify({ status: record.status, dry_run: true }, null, 2)}\n`,
  );
  await writeFile(loopRunPath, `${JSON.stringify(record, null, 2)}\n`);
  return record;
}
