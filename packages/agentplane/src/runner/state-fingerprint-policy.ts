import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";
import { observeRunnerRecipeAssets } from "./state-fingerprint-recipe-assets.js";
import type { RunnerContextBundle, RunnerPromptBlock, RunnerRecipeContext } from "./types.js";

const POLICY_MODULE_MAX_BYTES = 1024 * 1024;

type HarnessTaskPolicy = NonNullable<RunnerContextBundle["framework_explain"]>["harness"]["task"];

type PolicyModuleObservation =
  | { path: string; state: "present"; resolution: "repository"; sha256: string }
  | { path: string; state: "missing"; reason_code: "policy_module_missing" }
  | { path: string; state: "unavailable"; reason_code: "policy_module_unreadable" };

function unavailableComponent(source: string, reason_code: string): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
  };
}

function digestText(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

async function observePolicyModules(
  repositoryRoot: string,
  modulePaths: readonly string[],
): Promise<PolicyModuleObservation[]> {
  return await Promise.all(
    [...new Set(modulePaths)].toSorted().map(async (modulePath) => {
      const absolutePath = path.resolve(repositoryRoot, modulePath);
      const relativePath = path.relative(repositoryRoot, absolutePath);
      if (
        relativePath === "" ||
        relativePath === ".." ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
      ) {
        return {
          path: modulePath,
          state: "unavailable" as const,
          reason_code: "policy_module_unreadable" as const,
        };
      }
      try {
        return {
          path: modulePath,
          state: "present" as const,
          resolution: "repository" as const,
          sha256: digestText(
            await readContainedStableTextNoFollow({
              repository_root: repositoryRoot,
              file_path: absolutePath,
              label: "runner policy module",
              max_bytes: POLICY_MODULE_MAX_BYTES,
            }),
          ),
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
          return {
            path: modulePath,
            state: "missing" as const,
            reason_code: "policy_module_missing" as const,
          };
        }
        return {
          path: modulePath,
          state: "unavailable" as const,
          reason_code: "policy_module_unreadable" as const,
        };
      }
    }),
  );
}

function policyPrompts(prompts: readonly RunnerPromptBlock[]): RunnerPromptBlock[] {
  return prompts.map((prompt) => {
    const projection = structuredClone(prompt);
    if (projection.id !== "base.execution_profile") return projection;
    try {
      const runtime: unknown = JSON.parse(projection.content);
      if (typeof runtime === "object" && runtime !== null && !Array.isArray(runtime)) {
        Reflect.deleteProperty(runtime, "approvals");
        projection.content = `${JSON.stringify(runtime, null, 2)}\n`;
      }
    } catch {
      // The internally generated prompt is validated upstream; retain raw bytes if it is not JSON.
    }
    return projection;
  });
}

export async function observeRunnerPolicyComponent(opts: {
  repository_root: string;
  prompts: readonly RunnerPromptBlock[];
  policy_modules: readonly string[];
  evaluator_skepticism_level: string;
  harness_task: HarnessTaskPolicy | null | undefined;
  recipe: RunnerRecipeContext | null | undefined;
}): Promise<StateFingerprintComponentInput> {
  const [modules, recipeAssets] = await Promise.all([
    observePolicyModules(opts.repository_root, opts.policy_modules),
    observeRunnerRecipeAssets(opts.recipe),
  ]);
  if (modules.some((entry) => entry.state === "missing")) {
    return unavailableComponent("runner_policy_resolution", "policy_module_missing");
  }
  if (modules.some((entry) => entry.state === "unavailable")) {
    return unavailableComponent(
      "runner_policy_resolution",
      "policy_module_observation_unavailable",
    );
  }
  if (!opts.harness_task) {
    return unavailableComponent("runner_policy_resolution", "harness_task_policy_unavailable");
  }
  if (recipeAssets.state === "unavailable") {
    return unavailableComponent("runner_policy_resolution", recipeAssets.reason_code);
  }
  const harnessTaskPolicy = structuredClone(opts.harness_task);
  Reflect.deleteProperty(harnessTaskPolicy, "doc_sections");
  Reflect.deleteProperty(harnessTaskPolicy, "required_doc_sections");
  return {
    state: "present",
    source: "runner_policy_resolution",
    value: {
      prompts: policyPrompts(opts.prompts),
      policy_modules: modules,
      execution_policy: {
        evaluator_skepticism_level: opts.evaluator_skepticism_level,
        harness_task: harnessTaskPolicy,
        recipe_context: structuredClone(opts.recipe ?? null),
        recipe_assets: recipeAssets,
      },
    },
  };
}
