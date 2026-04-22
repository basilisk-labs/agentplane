import type { ResolvedProject } from "@agentplaneorg/core/project";

import type { CommandSpec } from "../../cli/spec/spec.js";
import { runOperatorPipeline } from "../shared/operator-pipeline.js";
import type { ReleaseApplyParsed, ReleaseCommandRouteResolver } from "./apply.types.js";
import { runReleaseCommandFinalize } from "./apply.pipeline/finalize.js";
import { runReleaseCommandExecute } from "./apply.pipeline/mutation.js";
import { runReleaseCommandPreflight } from "./apply.pipeline/preflight.js";
import { buildReleaseCommandState } from "./apply.pipeline/state.js";

/**
 * Retained internal pipeline boundary: apply.command owns CLI routing/specs,
 * while this module composes release state, preflight, mutation, and finalize phases.
 */
export async function runReleaseCommandPipeline(opts: {
  ctx: { cwd: string; rootOverride?: string | null };
  flags: ReleaseApplyParsed;
  spec: CommandSpec<ReleaseApplyParsed>;
  commandLabel: string;
  routeResolver: ReleaseCommandRouteResolver;
}): Promise<number> {
  return await runOperatorPipeline({
    init: async () =>
      await buildReleaseCommandState({
        cwd: opts.ctx.cwd,
        rootOverride: opts.ctx.rootOverride ?? null,
        planOverride: opts.flags.plan,
        routeResolver: opts.routeResolver,
      }),
    preflight: async (state) =>
      await runReleaseCommandPreflight({
        state,
        flags: opts.flags,
        spec: opts.spec,
        commandLabel: opts.commandLabel,
      }),
    execute: async (state) => await runReleaseCommandExecute(state),
    finalize: async (state, mutation) =>
      await runReleaseCommandFinalize({
        state,
        mutation,
        flags: opts.flags,
      }),
  });
}

export type ReleaseApplyRouteResolverArgs = {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
};

export type ReleaseApplyResolvedProject = ResolvedProject;

export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.reporting.js";
