import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readTask } from "@agentplaneorg/core/tasks";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { getHumanInputState } from "../task/human-input.js";
import { cmdTaskAdd } from "../workflow.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";

import { applyEvaluatorSgrReview } from "./evaluator-review-apply.js";
import {
  executePreparedEvaluatorEpisode,
  type EvaluatorEpisodeProvider,
} from "./evaluator-episode.js";
import {
  prepareEvaluatorReview,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";

const execFileAsync = promisify(execFile);

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Evaluator calibration target",
    description: "Exercise a bounded evaluator episode.",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

async function commitTarget(root: string): Promise<void> {
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(
    path.join(root, "src", "evaluated.ts"),
    "export const reviewed = true;\n",
    "utf8",
  );
  await execFileAsync("git", ["add", "--", "src/evaluated.ts"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: evaluator calibration target"], { cwd: root });
}

async function prepare(
  root: string,
  taskId: string,
): Promise<{
  command: Awaited<ReturnType<typeof loadCommandContext>>;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  prepared: PreparedEvaluatorReview;
}> {
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx: command, taskId });
  const catalog = await loadEvaluatorCatalog({ projectRoot: root, includeBuiltin: true });
  const evaluator = catalog.find((entry) => entry.id === "recovery-context");
  if (!evaluator) throw new Error("Missing recovery-context evaluator fixture.");
  return {
    command,
    task,
    prepared: await prepareEvaluatorReview({
      ctx: command,
      task,
      evaluator,
      provenance: "evaluator_supplied",
    }),
  };
}

function result(
  prepared: PreparedEvaluatorReview,
  verdict: "pass" | "rework" | "blocked" | "human_review",
) {
  const diff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
  if (!diff) throw new Error("Missing frozen diff evidence.");
  const nonPassing = verdict !== "pass";
  return {
    schema_version: 1,
    kind: "evaluator_result",
    evaluator_id: prepared.work_order.evaluator.id,
    verdict,
    findings: [
      {
        id: `${verdict}-finding`,
        severity: nonPassing ? "high" : "low",
        summary: `${verdict} calibration finding from the frozen evaluator evidence.`,
        broken_invariant: nonPassing ? "calibration invariant" : "none",
        evidence_refs: [{ path: diff.path }],
      },
    ],
    missing_tests: [],
    hidden_assumptions: [],
    ...(nonPassing
      ? {
          recovery_context:
            verdict === "human_review"
              ? "Which of the two mutually incompatible acceptance interpretations should govern this task?"
              : `Bounded ${verdict} follow-up required before another evaluator episode.`,
        }
      : {}),
  };
}

function provider(
  rawResult: unknown,
  inspect?: (invocation: Parameters<EvaluatorEpisodeProvider>[0]) => void,
): EvaluatorEpisodeProvider {
  return (invocation) => {
    inspect?.(invocation);
    return Promise.resolve({
      raw_result: rawResult,
      started_at: "2026-07-27T00:00:00.000Z",
      ended_at: "2026-07-27T00:00:01.000Z",
      stdout_bytes: 12,
      stderr_bytes: 0,
      provider_usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
    });
  };
}

async function applyFixture(opts: {
  root: string;
  taskId: string;
  verdict: "pass" | "rework" | "blocked" | "human_review";
}): Promise<{
  prepared: PreparedEvaluatorReview;
  stored: Awaited<ReturnType<typeof readTask>>;
}> {
  const { command, task, prepared } = await prepare(opts.root, opts.taskId);
  const episode = await executePreparedEvaluatorEpisode({
    ctx: command,
    prepared,
    executor: provider(result(prepared, opts.verdict)),
  });
  await applyEvaluatorSgrReview({
    ctx: command,
    task,
    workOrderPath: prepared.work_order_path,
    result: episode.result,
  });
  return {
    prepared,
    stored: await readTask({ cwd: opts.root, rootOverride: opts.root, taskId: opts.taskId }),
  };
}

describe("evaluator episode calibration", () => {
  it("invokes one provider episode with an exact read-only Codex boundary and a caller-owned schema", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC01";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, prepared } = await prepare(root, taskId);
    let captured: Parameters<EvaluatorEpisodeProvider>[0] | null = null;

    const episode = await executePreparedEvaluatorEpisode({
      ctx: command,
      prepared,
      executor: provider(result(prepared, "pass"), (invocation) => {
        captured = invocation;
      }),
    });

    expect(episode.receipt.provider_usage).toEqual({
      input_tokens: 100,
      output_tokens: 50,
      total_tokens: 150,
    });
    expect(JSON.parse(await readFile(prepared.result_path, "utf8"))).toEqual(episode.result);
    expect(
      JSON.parse(
        await readFile(
          path.join(path.dirname(prepared.work_order_path), "evaluator-episode.json"),
          "utf8",
        ),
      ),
    ).toEqual(episode.receipt);

    expect(captured?.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--ignore-user-config",
      "--strict-config",
      "--disable",
      "hooks",
      "--ephemeral",
      "--json",
      "-C",
      root,
      "-s",
      "read-only",
      "--output-schema",
      captured?.output_schema_path,
      "-",
    ]);
    expect(captured?.prompt).toContain(
      "AgentPlane prepared and froze the authoritative review input",
    );
    expect(await readFile(captured!.output_schema_path, "utf8")).toContain("human_review");
  });

  it.each([
    ["false-pass", "rework"],
    ["false-rework", "pass"],
    ["context-reconciliation", "blocked"],
  ] as const)("keeps the %s calibration verdict semantic (%s)", async (_fixture, verdict) => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskIdByVerdict = { pass: "P001", rework: "R001", blocked: "B001" } as const;
    const taskId = `202607270000-${taskIdByVerdict[verdict]}`;
    await addTask(root, taskId);
    await commitTarget(root);

    const { prepared, stored } = await applyFixture({ root, taskId, verdict });

    expect(stored.frontmatter.quality_review).toMatchObject({
      state: verdict,
      provenance: "evaluator_supplied",
      updated_by: "EVALUATOR",
    });
    if (verdict !== "pass") {
      const followUp = JSON.parse(
        await readFile(
          path.join(path.dirname(prepared.work_order_path), "evaluator-follow-up.json"),
          "utf8",
        ),
      ) as Record<string, unknown>;
      expect(followUp).toMatchObject({
        verdict,
        source_work_order_id: prepared.work_order.work_order_id,
      });
    }
  });

  it("escalates repeated ambiguous acceptance scenarios to a human without a router-selected verdict", async () => {
    for (const run of [1, 2]) {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const taskId = `202607270000-H00${run}`;
      await addTask(root, taskId);
      await commitTarget(root);

      const { stored } = await applyFixture({ root, taskId, verdict: "human_review" });
      expect(stored.frontmatter.quality_review?.state).toBe("human_review");
      const humanInput = getHumanInputState({
        extensions: (stored.frontmatter.extensions ?? {}) as Record<string, unknown>,
      });
      expect(humanInput.openQuestion).toMatchObject({
        askedBy: "EVALUATOR",
        question:
          "Which of the two mutually incompatible acceptance interpretations should govern this task?",
      });
    }
  });

  it("rejects missing frozen evidence before any task quality state is applied", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC02";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, prepared } = await prepare(root, taskId);
    const invalid = result(prepared, "rework");
    invalid.findings[0]!.evidence_refs = [{ path: "src/not-frozen.ts" }];

    await expect(
      executePreparedEvaluatorEpisode({ ctx: command, prepared, executor: provider(invalid) }),
    ).rejects.toThrow("outside the frozen work order");
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toBeUndefined();
  });

  it("rejects a typed episode result after the task revision changes", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC04";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, task, prepared } = await prepare(root, taskId);
    const episode = await executePreparedEvaluatorEpisode({
      ctx: command,
      prepared,
      executor: provider(result(prepared, "pass")),
    });
    await applyTaskMutation({
      ctx: command,
      taskId,
      build: (current) => ({
        intents: setTaskFieldsIntent({ tags: [...current.tags, "revision-drift"] }),
      }),
    });
    const staleTask = await loadTaskFromContext({ ctx: command, taskId });

    await expect(
      applyEvaluatorSgrReview({
        ctx: command,
        task: staleTask,
        workOrderPath: prepared.work_order_path,
        result: episode.result,
      }),
    ).rejects.toThrow("task revision changed");
    expect(task.revision).toBe(prepared.work_order.task.revision);
  });

  it("rejects a provider filesystem mutation even when its typed result is otherwise valid", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC03";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, prepared } = await prepare(root, taskId);

    await expect(
      executePreparedEvaluatorEpisode({
        ctx: command,
        prepared,
        executor: async (invocation) => {
          await writeFile(
            path.join(invocation.repository_root, "src", "rogue.ts"),
            "export {};\n",
            "utf8",
          );
          return provider(result(prepared, "pass"))(invocation);
        },
      }),
    ).rejects.toThrow("read-only provider changed repository state");
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toBeUndefined();
  });

  it("checks workspace state before classifying a provider failure", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC05";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, prepared } = await prepare(root, taskId);

    await expect(
      executePreparedEvaluatorEpisode({
        ctx: command,
        prepared,
        executor: async (invocation) => {
          await writeFile(
            path.join(invocation.repository_root, "src", "rogue-before-failure.ts"),
            "export {};\n",
            "utf8",
          );
          throw new Error("provider startup failed");
        },
      }),
    ).rejects.toThrow("read-only provider changed repository state");
  });

  it("maps provider startup failures to safe runtime errors without applying a result", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607270000-EC06";
    await addTask(root, taskId);
    await commitTarget(root);
    const { command, prepared } = await prepare(root, taskId);
    let failure: unknown = null;
    try {
      await executePreparedEvaluatorEpisode({
        ctx: command,
        prepared,
        executor: () => {
          throw new Error("provider cache failed at /private/provider-diagnostics");
        },
      });
    } catch (error: unknown) {
      failure = error;
    }

    expect(failure).toMatchObject({ code: "E_RUNTIME" });
    expect(failure).toHaveProperty(
      "message",
      "Codex evaluator provider failed before returning a typed result. The typed result was not applied.",
    );
    expect(String(failure)).not.toContain("/private/provider-diagnostics");
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toBeUndefined();
  });
});
