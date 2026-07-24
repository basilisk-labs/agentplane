import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  capturePreparedRunnerStateFingerprint,
  RUNNER_STATE_FINGERPRINT_POLICY,
} from "./state-fingerprint.js";
import { observeRunnerPolicyComponent } from "./state-fingerprint-policy.js";
import {
  bundle,
  context,
  gitSnapshot,
  invocation,
  probes,
  setResolvedAuthority,
  task,
} from "./state-fingerprint.testkit.js";
import type { RunnerRecipeContext } from "./types.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerStateFingerprintCliError,
} from "./usecases/task-run-state-fingerprint.js";

async function expectRecipeTreeMutationRejected(
  mutate: (recipeRoot: string) => Promise<void>,
): Promise<void> {
  const recipeRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-fingerprint-"));
  try {
    await Promise.all([
      mkdir(path.join(recipeRoot, "tools"), { recursive: true }),
      mkdir(path.join(recipeRoot, "flags", "enabled"), { recursive: true }),
    ]);
    await Promise.all([
      writeFile(
        path.join(recipeRoot, "manifest.json"),
        '{"id":"linked-recipe","version":"1.0.0"}\n',
        "utf8",
      ),
      writeFile(
        path.join(recipeRoot, "tools", "run.mjs"),
        'import { value } from "./lib.mjs";\nconsole.log(value);\n',
        "utf8",
      ),
      writeFile(path.join(recipeRoot, "tools", "lib.mjs"), "export const value = 1;\n", "utf8"),
    ]);
    await chmod(path.join(recipeRoot, "tools", "run.mjs"), 0o755);
    const taskData = task();
    const runnerBundle = bundle(taskData);
    const recipe: RunnerRecipeContext = {
      recipe_id: "linked-recipe",
      scenario_id: "LINKED",
      recipe_dir: recipeRoot,
      manifest: {
        id: "linked-recipe",
        version: "1.0.0",
        tools: [{ id: "linked-tool", entrypoint: "tools/run.mjs" }],
      },
      tools: [{ id: "linked-tool", entrypoint: "tools/run.mjs" }],
    };
    runnerBundle.recipe = recipe;
    runnerBundle.repository.git_root = recipeRoot;
    setResolvedAuthority(runnerBundle);
    const ctx = context(taskData);
    ctx.resolvedProject = {
      gitRoot: recipeRoot,
      agentplaneDir: path.join(recipeRoot, ".agentplane"),
    };
    const observePolicy = async () =>
      await observeRunnerPolicyComponent({
        repository_root: recipeRoot,
        prompts: runnerBundle.base_prompts,
        policy_modules: [],
        evaluator_skepticism_level: "paranoid",
        harness_task: runnerBundle.framework_explain?.harness.task,
        recipe,
      });
    const stateProbes = probes({
      task: taskData,
      bundle: runnerBundle,
      components: { observe_policy: observePolicy },
    });
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      git: gitSnapshot({ repository_root: recipeRoot }),
      probes: stateProbes,
    });
    await mutate(recipeRoot);
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run with stale recipe assets.")),
    );

    await expect(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskData.id,
        bundle: runnerBundle,
        invocation: invocation(),
        precondition_fingerprint: prepared,
        precondition_policy: RUNNER_STATE_FINGERPRINT_POLICY,
        probes: stateProbes,
        apply,
      }),
    ).rejects.toBeInstanceOf(RunnerStateFingerprintCliError);
    expect(apply).not.toHaveBeenCalled();
  } finally {
    await rm(recipeRoot, { recursive: true, force: true });
  }
}

describe("runner linked recipe tree fingerprint", () => {
  it("rejects a sibling dependency mutation before the adapter effect", async () => {
    await expectRecipeTreeMutationRejected(async (recipeRoot) => {
      await writeFile(
        path.join(recipeRoot, "tools", "lib.mjs"),
        "export const value = 2;\n",
        "utf8",
      );
    });
  });

  it("rejects removal of an otherwise empty sentinel directory before the adapter effect", async () => {
    await expectRecipeTreeMutationRejected(async (recipeRoot) => {
      await rm(path.join(recipeRoot, "flags", "enabled"), { recursive: true });
    });
  });

  it("rejects executable mode drift before the adapter effect", async () => {
    await expectRecipeTreeMutationRejected(async (recipeRoot) => {
      await chmod(path.join(recipeRoot, "tools", "run.mjs"), 0o644);
    });
  });
});
