import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
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
});
