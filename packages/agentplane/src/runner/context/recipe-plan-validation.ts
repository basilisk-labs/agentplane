import { constants } from "node:fs";
import path from "node:path";
import {
  normalizeTaskPlanProposal,
  taskCentricDigest,
  type ParsedTaskPlanProposal,
  type RepositorySnapshot,
} from "@agentplaneorg/core/tasks";
import {
  resolveScenarioParameters,
  type ScenarioParameterBinding,
  type ScenarioV2Definition,
} from "@agentplaneorg/recipes";

import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
  type ContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";

export type ValidatedRecipePlan = {
  scenario: ScenarioV2Definition;
  proposal: ParsedTaskPlanProposal;
  /** Observe again at use time. This is not permission or a filesystem effect sandbox. */
  assertPathsUnchanged: () => Promise<void>;
  readContextSource: (source: string) => Promise<string>;
};

/** CLI filesystem boundary. The shared native normalizer owns all Plan/DAG semantics. */
export async function validateRecipeScenarioPlan(opts: {
  scenario: unknown;
  bindings: readonly ScenarioParameterBinding[];
  repository_root: string;
  task_id: string;
  planning_baseline: RepositorySnapshot;
}): Promise<ValidatedRecipePlan> {
  // Windows reparse-point and inode behavior is not qualified by the no-follow primitive.
  if (!["linux", "darwin"].includes(process.platform) || !constants.O_NOFOLLOW) {
    throw new Error("Recipe path containment is unsupported on this platform.");
  }
  const scenario = resolveScenarioParameters(opts.scenario, opts.bindings);
  const proposal = normalizeTaskPlanProposal(scenario.plan_template, {
    task_id: opts.task_id,
    planning_baseline: opts.planning_baseline,
  });
  const paths = new Map<string, ContainedPathChainIdentity>();
  const sources = new Map<string, number>();
  const root = path.resolve(opts.repository_root);

  async function capture(relative: string, contextSource: boolean): Promise<void> {
    const label = contextSource ? "Recipe context source" : "Recipe scope";
    const identity = await captureContainedPathChainIdentity({
      repository_root: root,
      file_path: path.join(root, relative),
      label,
      path_policy: {
        target_kind: contextSource ? "file" : "file_or_directory",
        allow_missing_ancestors: !contextSource,
        exact_case: true,
        allow_root: !contextSource,
      },
    });
    if (contextSource && !identity.target_exists) {
      throw new Error(`Dangling Recipe context source: ${relative}`);
    }
    paths.set(`${contextSource ? "context" : "scope"}:${relative}`, identity);
  }

  for (const item of proposal.work_items.work_items) {
    for (const scope of item.scope_roots) await capture(scope, false);
    for (const resource of item.resource_claims) {
      if (resource.kind === "path") await capture(resource.resource, false);
    }
    for (const source of [...item.context.required_sources, ...item.context.optional_sources]) {
      await capture(source, true);
      sources.set(source, Math.min(sources.get(source) ?? Infinity, item.context.max_bytes));
    }
  }
  const planDigest = taskCentricDigest({ scenario, proposal });
  const assertPathsUnchanged = async (): Promise<void> => {
    if (taskCentricDigest({ scenario, proposal }) !== planDigest) {
      throw new Error("Recipe Plan changed after path validation.");
    }
    for (const identity of paths.values()) {
      await assertContainedPathChainIdentityUnchanged(identity, "Recipe Plan");
    }
  };
  // Capture of a later path must not make earlier observations stale unnoticed.
  await assertPathsUnchanged();
  return Object.freeze({
    scenario,
    proposal,
    assertPathsUnchanged,
    readContextSource: async (source: string) => {
      const identity = paths.get(`context:${source}`);
      const maxBytes = sources.get(source);
      if (!identity || maxBytes === undefined)
        throw new Error(`Undeclared Recipe context source: ${source}`);
      await assertPathsUnchanged();
      const text = await readContainedStableTextNoFollow({
        repository_root: root,
        file_path: identity.file_path,
        label: "Recipe context source",
        max_bytes: maxBytes,
        expected_identity: identity.identities.at(-1),
      });
      await assertPathsUnchanged();
      return text;
    },
  });
}
