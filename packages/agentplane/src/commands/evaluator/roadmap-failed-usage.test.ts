import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { cmdTaskAdd } from "../workflow.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import {
  EvaluatorEpisodeFailureError,
  executePreparedEvaluatorEpisode,
} from "./evaluator-episode.js";
import { prepareEvaluatorReview } from "./evaluator-review-usecase.js";
import { recoverPersistedEvaluatorFailureEpisode } from "./evaluator-execute-supervisor.js";

async function prepare(root: string, taskId: string) {
  await writeDefaultConfig(root);
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Evaluator failure usage fixture",
    description: "Retain provider charges when evaluator output cannot be applied.",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "src", "evaluated.ts"), "export const reviewed = true;\n");
  await execFileAsync("git", ["add", "--", "src/evaluated.ts"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: evaluator failure fixture"], {
    cwd: root,
  });
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx: command, taskId });
  const evaluatorCatalog = await loadEvaluatorCatalog({ projectRoot: root, includeBuiltin: true });
  const evaluator = evaluatorCatalog.find((entry) => entry.id === "recovery-context");
  if (!evaluator) throw new Error("Missing recovery-context evaluator.");
  const prepared = await prepareEvaluatorReview({
    ctx: command,
    task,
    evaluator,
    provenance: "evaluator_supplied",
  });
  return { command, prepared };
}

async function installProvider(
  root: string,
  mode: "nonzero" | "malformed" | "timeout" | "unavailable",
) {
  const bin = path.join(root, "fake-bin");
  await mkdir(bin, { recursive: true });
  const terminal =
    mode === "unavailable"
      ? "process.exit(43);"
      : mode === "nonzero"
        ? "process.exit(42);"
        : mode === "malformed"
          ? [
              "process.stdout.write(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: '{' } }) + '\\n');",
              "process.exit(0);",
            ].join("\n")
          : "setInterval(() => {}, 1000);";
  const source = [
    "#!/usr/bin/env node",
    "process.stdin.resume();",
    "process.stdin.on('end', () => {",
    ...(mode === "unavailable"
      ? []
      : [
          "  process.stdout.write(JSON.stringify({ type: 'thread.started', thread_id: 'failure-thread' }) + '\\n');",
          "  process.stdout.write(JSON.stringify({ type: 'turn.started', turn_id: 'failure-turn' }) + '\\n');",
          "  process.stdout.write(JSON.stringify({ type: 'turn.completed', turn_id: 'failure-turn', usage: { input_tokens: 11, cached_input_tokens: 5, output_tokens: 7, reasoning_output_tokens: 3 } }) + '\\n');",
        ]),
    terminal,
    "});",
  ].join("\n");
  const executable = path.join(bin, "codex");
  await writeFile(executable, source);
  await chmod(executable, 0o755);
  return bin;
}

describe("evaluator failure usage receipts", () => {
  it.each(["nonzero", "malformed", "timeout"] as const)(
    "retains an observed charge after a %s provider outcome",
    async (mode) => {
      const root = await mkGitRepoRoot();
      const taskId = `202609130000-${mode === "nonzero" ? "FA01" : mode === "malformed" ? "FA02" : "FA03"}`;
      const { command, prepared } = await prepare(root, taskId);
      const fakeBin = await installProvider(root, mode);
      const previousPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${previousPath ?? ""}`;
      if (mode === "timeout") command.config.runner.timeouts.wall_clock_ms = 500;
      let caught: unknown;
      try {
        await executePreparedEvaluatorEpisode({ ctx: command, prepared });
      } catch (error) {
        caught = error;
      } finally {
        if (previousPath === undefined) delete process.env.PATH;
        else process.env.PATH = previousPath;
      }

      expect(caught).toBeInstanceOf(EvaluatorEpisodeFailureError);
      const receipt = JSON.parse(
        await readFile(
          path.join(path.dirname(prepared.work_order_path), "evaluator-episode.json"),
          "utf8",
        ),
      ) as Record<string, unknown>;
      expect(receipt).toMatchObject({
        schema_version: 1,
        kind: "evaluator_provider_failure_receipt",
        work_order_id: prepared.work_order.work_order_id,
        provider_usage_status: "observed",
        provider_thread_id: "failure-thread",
        provider_turn_id: "failure-turn",
        provider_usage: {
          input_tokens: 11,
          cached_input_tokens: 5,
          output_tokens: 7,
          total_tokens: 18,
          visible_output_tokens: 4,
          reasoning_tokens: 3,
        },
        failure: {
          classification:
            mode === "nonzero"
              ? "nonzero_exit"
              : mode === "malformed"
                ? "malformed_structured_result"
                : "timeout",
        },
      });
      expect(receipt).not.toHaveProperty("raw_result");
    },
  );

  it("records unavailable usage explicitly when the provider emits no observation", async () => {
    const root = await mkGitRepoRoot();
    const { command, prepared } = await prepare(root, "202609130000-FA04");
    const fakeBin = await installProvider(root, "unavailable");
    const previousPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${previousPath ?? ""}`;
    try {
      await expect(
        executePreparedEvaluatorEpisode({ ctx: command, prepared }),
      ).rejects.toBeInstanceOf(EvaluatorEpisodeFailureError);
    } finally {
      if (previousPath === undefined) delete process.env.PATH;
      else process.env.PATH = previousPath;
    }
    const receipt = JSON.parse(
      await readFile(
        path.join(path.dirname(prepared.work_order_path), "evaluator-episode.json"),
        "utf8",
      ),
    ) as Record<string, unknown>;
    expect(receipt).toMatchObject({
      kind: "evaluator_provider_failure_receipt",
      provider_usage_status: "unavailable",
      provider_usage: null,
      provider_thread_id: null,
      provider_turn_id: null,
      failure: { classification: "nonzero_exit", exit_code: 43 },
    });
  });

  it("reconciles a persisted failure receipt after restart without another provider dispatch", async () => {
    const root = await mkGitRepoRoot();
    const { command, prepared } = await prepare(root, "202609130000-FA05");
    const fakeBin = await installProvider(root, "nonzero");
    const previousPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${previousPath ?? ""}`;
    try {
      await expect(
        executePreparedEvaluatorEpisode({ ctx: command, prepared }),
      ).rejects.toBeInstanceOf(EvaluatorEpisodeFailureError);
    } finally {
      if (previousPath === undefined) delete process.env.PATH;
      else process.env.PATH = previousPath;
    }

    const fingerprint = `sha256:${"a".repeat(64)}`;
    const initial = createSupervisorExecutionEpisodeJournal({
      task_id: "202609130000-FA05",
      task_revision: 1,
      state_fingerprint_digest: fingerprint,
      budget: {
        max_episodes: 3,
        max_agent_runs: 3,
        max_input_tokens: 10_000,
        max_output_tokens: 10_000,
        max_total_tokens: 20_000,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: initial,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: {
        evaluator_id: prepared.work_order.evaluator.id,
        work_order_id: prepared.work_order.work_order_id,
      },
      precondition_fingerprint_digest: fingerprint,
      work_order_ref: path.relative(root, prepared.work_order_path),
      effect_ref: prepared.work_order.work_order_id,
    });
    if (started.status !== "started") throw new Error("Evaluator fixture did not start.");

    const recovered = await recoverPersistedEvaluatorFailureEpisode({
      git_root: root,
      journal: structuredClone(started.journal),
    });

    expect(recovered.receipt.failure.classification).toBe("nonzero_exit");
    expect(recovered.journal).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      usage: { input_tokens: 11, output_tokens: 7, total_tokens: 18 },
    });
    expect(recovered.journal.operations.at(-1)).toMatchObject({
      status: "failed",
      usage_attribution: { state: "observed", reason: null },
      provider_usage: {
        provider: "codex",
        work_order_id: prepared.work_order.work_order_id,
        thread_id: "failure-thread",
        turn_id: "failure-turn",
      },
    });
  });
});
