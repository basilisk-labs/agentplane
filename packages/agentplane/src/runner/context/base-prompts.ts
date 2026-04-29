import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import {
  loadExecutionProfilePrompt,
  loadOwnerProfilePrompt,
  loadPolicyGatewayPrompt,
} from "./base-prompt-sources.js";
import { collectOverlayPromptBlocks } from "./overlay-prompt-blocks.js";
import { compileRunnerPromptBlocksThroughModules } from "./prompt-module-bridge.js";
import { collectProjectSkillPromptBlocks } from "./project-skill-prompt-blocks.js";
import { loadFrameworkRunnerPrompt, normalizeOwnerId } from "./prompt-block-shared.js";
import { collectRecipePromptBlocks } from "./recipe-prompt-blocks.js";
import type { RunnerPromptBlock, RunnerRecipeContext, RunnerTaskContext } from "../types.js";
import type { PolicyGatewayFlavor } from "../../shared/policy-gateway.js";

export {
  resolveOwnerProfilePromptSource,
  resolvePolicyGatewayPromptSource,
} from "./base-prompt-sources.js";
export {
  compileRunnerPromptBlocksThroughModules,
  compileRunnerPromptModuleGraph,
  runnerPromptBlocksToModuleGraph,
  runnerPromptBlockToModule,
} from "./prompt-module-bridge.js";

export async function collectRunnerBasePrompts(opts: {
  git_root: string;
  owner_id: string;
  agents_dir?: string;
  fallback_policy_gateway_flavor?: PolicyGatewayFlavor;
  task?: RunnerTaskContext;
  command?: string;
  recipe?: RunnerRecipeContext;
  harness?: ResolvedHarnessContract;
  execution_profile?: ResolvedExecutionProfileRuntime;
}): Promise<RunnerPromptBlock[]> {
  const owner_id = normalizeOwnerId(opts.owner_id);
  const trimmedAgentsDir = opts.agents_dir?.trim() ?? opts.harness?.workflow.paths.agents_dir;
  const agents_dir =
    trimmedAgentsDir && trimmedAgentsDir.length > 0 ? trimmedAgentsDir : ".agentplane/agents";
  const fallback_flavor = opts.fallback_policy_gateway_flavor ?? "codex";

  const resolvedBasePrompts = await Promise.all([
    loadFrameworkRunnerPrompt(),
    loadPolicyGatewayPrompt({
      git_root: opts.git_root,
      fallback_flavor,
      harness: opts.harness,
    }),
    Promise.resolve(loadExecutionProfilePrompt({ execution_profile: opts.execution_profile })),
    loadOwnerProfilePrompt({ git_root: opts.git_root, agents_dir, owner_id }),
  ]);
  const basePrompts = resolvedBasePrompts.filter(
    (prompt): prompt is RunnerPromptBlock => prompt !== null,
  );

  const prompts = [
    ...basePrompts,
    ...(await collectOverlayPromptBlocks({
      git_root: opts.git_root,
      task: opts.task,
      command: opts.command,
    })),
    ...(await collectProjectSkillPromptBlocks({
      git_root: opts.git_root,
    })),
    ...(await collectRecipePromptBlocks({
      git_root: opts.git_root,
      recipe: opts.recipe ?? { recipe_id: "", scenario_id: "" },
    })),
  ];

  return compileRunnerPromptBlocksThroughModules(prompts).toSorted(
    (left, right) => left.priority - right.priority || left.id.localeCompare(right.id),
  );
}
