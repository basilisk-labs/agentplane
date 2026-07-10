import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { captureStdIO, mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { collectGitDiffObservation, evaluateTddIteration } from "./loop.command.js";

const execFileAsync = promisify(execFile);

function parseJson<T>(value: string): T {
  return JSON.parse(value) as T;
}

type DryRunPayload = {
  taskId: string;
  loopId: string;
  dryRun: boolean;
  runId: string;
  artifacts: {
    loopRunPath: string;
    eventsPath: string;
    iterationsDir: string;
    stepArtifacts: {
      stepId: string;
      inputPath: string;
      outputPath: string;
      promptModule: { id: string };
    }[];
  };
};

async function mkProject(): Promise<string> {
  const root = await mkTempDir();
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "schema_version": 1,\n  "workflow_mode": "direct"\n}\n',
    "utf8",
  );
  return root;
}

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Fix checkout discount behavior",
      "--description",
      "Checkout fails when discount code is empty.",
      "--owner",
      "CODER",
      "--tag",
      "bug",
      "--tag",
      "test",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--verify",
      "bun test checkout",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    const taskId = io.stdout.trim();
    const approveCode = await runCli([
      "task",
      "plan",
      "approve",
      taskId,
      "--by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    expect(approveCode).toBe(0);
    const startCode = await runCli([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: prepare loop dry-run evidence for runner handoff integration.",
      "--force",
      "--yes",
      "--root",
      root,
    ]);
    expect(startCode).toBe(0);
    return taskId;
  } finally {
    io.restore();
  }
}

describe("runCli loop commands", () => {
  it("counts untracked file contents against diff budgets", async () => {
    const root = await mkTempDir();
    await execFileAsync("git", ["init", "-q"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "loop-test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Loop Test"], { cwd: root });
    await writeFile(path.join(root, "tracked.txt"), "baseline\n", "utf8");
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-qm", "baseline"], { cwd: root });
    await writeFile(path.join(root, "new-file.txt"), "one\ntwo\nthree\n", "utf8");

    const observation = await collectGitDiffObservation(root);

    expect(observation.changedFiles).toBe(1);
    expect(observation.diffLines).toBe(3);
    expect(observation.summary).toContain("3\t0\tnew-file.txt (untracked)");
  });

  it("requires a successful agent patch before evaluator pass", () => {
    const result = evaluateTddIteration(
      new Map([
        ["agent_patch", { status: "failed" as const }],
        ["focused_check", { status: "success" as const }],
      ]),
    );

    expect(result.data?.verdict).toBe("rework");
    expect(result.data?.agentStatus).toBe("failed");
  });

  it("lists and shows built-in loops", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["loop", "list", "--json"]);
      expect(code).toBe(0);
      const payload = parseJson<{ loops: { id: string }[] }>(io.stdout);
      expect(payload.loops.map((loop: { id: string }) => loop.id)).toContain("tdd.fix");
    } finally {
      io.restore();
    }

    const io2 = captureStdIO();
    try {
      const code = await runCli(["loop", "show", "tdd.fix"]);
      expect(code).toBe(0);
      expect(io2.stdout).toContain("tdd.fix@0.1.0");
      expect(io2.stdout).toContain("steps:");
    } finally {
      io2.restore();
    }
  });

  it("plans a loop for synthetic task input", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "loop",
        "plan",
        "--kind",
        "code",
        "--tag",
        "bug",
        "--tag",
        "test",
        "--verify-steps-present",
        "--approved-plan",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = parseJson<{ selected: { loopId: string; total: number } }>(io.stdout);
      expect(payload.selected.loopId).toBe("tdd.fix");
      expect(payload.selected.total).toBeGreaterThan(0.45);
    } finally {
      io.restore();
    }
  });

  it("rejects executable loop modes that are combined", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "loop",
        "run",
        "TASK-1",
        "--loop",
        "tdd.fix",
        "--dry-run",
        "--execute",
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Choose exactly one");
    } finally {
      io.restore();
    }
  });

  it("validates project-local loop JSON", async () => {
    const root = await mkProject();
    const loopDir = path.join(root, ".agentplane", "loops");
    await mkdir(loopDir, { recursive: true });
    await writeFile(
      path.join(loopDir, "custom-docs.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          id: "docs.custom",
          version: "0.1.0",
          title: "Custom docs loop",
          description: "Custom docs loop.",
          kind: "implementation",
          status: "experimental",
          applies_to: { task_tags: ["docs"] },
          permissions: { canEditFiles: true },
          budgets: { maxIterations: 2 },
          steps: [{ id: "load", type: "context.load" }],
          transitions: [
            { from: "load", if: "evaluator.verdict == 'pass'", to: "finish", decision: "finish" },
          ],
          outputs: { required: ["loop-run.json"] },
          stop_conditions: [{ id: "done", reason: "Done.", decision: "finish" }],
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["loop", "validate", "--project", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("project loops valid: 1 file");
    } finally {
      io.restore();
    }
  });

  it("creates dry-run LoopRun evidence for a task", async () => {
    const root = await mkProject();
    const taskId = await createTask(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "loop",
        "run",
        taskId,
        "--loop",
        "tdd.fix",
        "--dry-run",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = parseJson<DryRunPayload>(io.stdout);
      expect(payload.taskId).toBe(taskId);
      expect(payload.loopId).toBe("tdd.fix");
      expect(payload.dryRun).toBe(true);
      const loopRunPath = path.join(root, payload.artifacts.loopRunPath);
      const eventsPath = path.join(root, payload.artifacts.eventsPath);
      const decisionPath = path.join(root, payload.artifacts.iterationsDir, "001", "decision.json");
      const renderPromptStep = payload.artifacts.stepArtifacts.find(
        (step: { stepId: string }) => step.stepId === "render_prompt",
      );
      const agentPatchStep = payload.artifacts.stepArtifacts.find(
        (step: { stepId: string }) => step.stepId === "agent_patch",
      );
      if (!renderPromptStep || !agentPatchStep) throw new Error("expected loop step artifacts");
      expect(renderPromptStep.promptModule.id).toBe("tdd.fix.implement");
      const stepInputPath = path.join(root, renderPromptStep.inputPath);
      const stepOutputPath = path.join(root, renderPromptStep.outputPath);
      const agentPatchOutputPath = path.join(root, agentPatchStep.outputPath);
      expect(parseJson<{ runId: string }>(await readFile(loopRunPath, "utf8")).runId).toBe(
        payload.runId,
      );
      const events = await readFile(eventsPath, "utf8");
      expect(events).toContain("loop.started");
      expect(events).toContain("step.prepared");
      expect(
        parseJson<{ contract: unknown }>(await readFile(stepInputPath, "utf8")).contract,
      ).toBeTruthy();
      expect(
        parseJson<{ promptModule: { id: string } }>(await readFile(stepOutputPath, "utf8"))
          .promptModule.id,
      ).toBe("tdd.fix.implement");
      const agentPatchOutput = parseJson<{
        runnerHandoff: {
          adapterId: string;
          mode: string;
          runId: string;
          bundlePath: string;
          bootstrapPath: string;
          resultPath: string;
        };
      }>(await readFile(agentPatchOutputPath, "utf8"));
      expect(agentPatchOutput.runnerHandoff.adapterId).toBe("codex");
      expect(agentPatchOutput.runnerHandoff.mode).toBe("dry_run");
      expect(agentPatchOutput.runnerHandoff.runId).toBeTruthy();
      expect(agentPatchOutput.runnerHandoff.bundlePath).toContain("bundle.json");
      expect(agentPatchOutput.runnerHandoff.bootstrapPath).toContain("bootstrap.md");
      expect(agentPatchOutput.runnerHandoff.resultPath).toContain("result.json");
      const decision = parseJson<{
        scores: { missingRequired: string[] };
        failedContracts: string[];
        nextStepReason: string;
      }>(await readFile(decisionPath, "utf8"));
      expect(decision.scores.missingRequired).toContain("verification_score");
      expect(decision.failedContracts).toContain("verification_score");
      expect(decision.nextStepReason).toBe(
        "dry_run_requires_human_review_before_external_agent_execution",
      );
    } finally {
      io.restore();
    }
  });
});
