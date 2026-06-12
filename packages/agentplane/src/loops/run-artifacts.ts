import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { aggregateLoopMetricScores } from "./metrics.js";
import type {
  LoopDecisionRecord,
  LoopEvent,
  LoopPromptModuleIdentity,
  LoopRunRecord,
  LoopSpec,
  LoopStep,
  LoopStepArtifactRecord,
} from "./model.js";

export type LoopRunnerHandoffRecord = {
  adapterId: string;
  mode: "dry_run" | "execute";
  runId: string;
  runDir: string;
  bundlePath: string;
  bootstrapPath: string;
  resultPath: string;
};

export type PrepareLoopStepRunnerHandoff = (
  step: LoopStep,
) => Promise<LoopRunnerHandoffRecord | null | undefined>;

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function jsonLine(value: unknown): string {
  return `${JSON.stringify(value)}\n`;
}

function safeStepDirectoryName(stepId: string): string {
  return stepId.replaceAll(/[^A-Za-z0-9._-]/g, "_");
}

function promptModuleIdentity(step: LoopStep): LoopPromptModuleIdentity | undefined {
  if (!step.promptModule) return undefined;
  return {
    id: step.promptModule,
    moduleSha: sha256(step.promptModule),
    renderedPromptSha: null,
  };
}

async function writePreparedStepArtifacts(opts: {
  relativeRunDir: string;
  firstIterationDir: string;
  loop: LoopSpec;
  prepareRunnerHandoff?: PrepareLoopStepRunnerHandoff;
}): Promise<LoopStepArtifactRecord[]> {
  const records: LoopStepArtifactRecord[] = [];
  for (const step of opts.loop.steps) {
    const stepDirName = safeStepDirectoryName(step.id);
    const stepDir = path.join(opts.firstIterationDir, "steps", stepDirName);
    await mkdir(stepDir, { recursive: true });
    const relativeStepDir = path.join(
      opts.relativeRunDir,
      "iterations",
      "001",
      "steps",
      stepDirName,
    );
    const inputPath = path.join(relativeStepDir, "input.json");
    const outputPath = path.join(relativeStepDir, "output.json");
    const promptModule = promptModuleIdentity(step);
    const runnerHandoff = await opts.prepareRunnerHandoff?.(step);
    await writeFile(
      path.join(stepDir, "input.json"),
      `${JSON.stringify(
        {
          schemaVersion: 1,
          kind: "loop.step.input",
          stepId: step.id,
          stepType: step.type,
          dryRun: true,
          contract: step.contract ?? null,
          sources: step.contract?.inputs ?? [],
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(
      path.join(stepDir, "output.json"),
      `${JSON.stringify(
        {
          schemaVersion: 1,
          kind: "loop.step.output",
          stepId: step.id,
          stepType: step.type,
          dryRun: true,
          status: "prepared",
          skippedExecution: true,
          reason: "dry_run_prepared_without_external_agent_execution",
          promptModule: promptModule ?? null,
          runnerHandoff: runnerHandoff ?? null,
          declaredOutputs: step.contract?.outputs ?? [],
          declaredArtifacts: step.contract?.artifacts ?? [],
        },
        null,
        2,
      )}\n`,
    );
    records.push({
      stepId: step.id,
      stepType: step.type,
      inputPath,
      outputPath,
      ...(promptModule ? { promptModule } : {}),
    });
  }
  return records;
}

export async function createDryRunLoopRun(opts: {
  projectRoot: string;
  workflowDir: string;
  taskId: string;
  loop: LoopSpec;
  now?: Date;
  prepareRunnerHandoff?: PrepareLoopStepRunnerHandoff;
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
  const stepArtifacts = await writePreparedStepArtifacts({
    relativeRunDir,
    firstIterationDir,
    loop: opts.loop,
    prepareRunnerHandoff: opts.prepareRunnerHandoff,
  });
  const scores = aggregateLoopMetricScores(opts.loop.metrics);
  const decision: LoopDecisionRecord = {
    schemaVersion: 1,
    kind: "loop.decision",
    decision: "request_human_review",
    reason: "dry_run_prepared_without_external_agent_execution",
    confidence: "high",
    scores,
    scoreDelta: null,
    failedContracts: scores.missingRequired,
    progressEvidence: ["dry_run_step_artifacts_prepared"],
    nextStep: "render_prompt",
    nextStepReason: "dry_run_requires_human_review_before_external_agent_execution",
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
      stepArtifacts,
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
    ...stepArtifacts.map((step) => ({
      ...eventBase,
      type: "step.prepared",
      details: {
        step_id: step.stepId,
        step_type: step.stepType,
        input_ref: step.inputPath,
        output_ref: step.outputPath,
        ...(step.promptModule ? { prompt_module: step.promptModule } : {}),
      },
    })),
    { ...eventBase, type: "decision.made", details: decision },
    { ...eventBase, type: "loop.stopped", details: { stop_reason: record.stopReason } },
  ];
  await writeFile(eventsPath, events.map(jsonLine).join(""));
  await writeFile(
    statePath,
    `${JSON.stringify({ status: record.status, dry_run: true, stepArtifacts }, null, 2)}\n`,
  );
  await writeFile(loopRunPath, `${JSON.stringify(record, null, 2)}\n`);
  return record;
}
