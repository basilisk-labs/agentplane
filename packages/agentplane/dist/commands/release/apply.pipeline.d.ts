import type { ResolvedProject } from "@agentplaneorg/core/project";
import type { CommandSpec } from "../../cli/spec/spec.js";
import type { ReleaseApplyParsed, ReleaseCommandRouteResolver } from "./apply.types.js";
/**
 * Retained internal pipeline boundary: apply.command owns CLI routing/specs,
 * while this module composes release state, preflight, mutation, and finalize phases.
 */
export declare function runReleaseCommandPipeline(opts: {
    ctx: {
        cwd: string;
        rootOverride?: string | null;
    };
    flags: ReleaseApplyParsed;
    spec: CommandSpec<ReleaseApplyParsed>;
    commandLabel: string;
    routeResolver: ReleaseCommandRouteResolver;
}): Promise<number>;
export type ReleaseApplyRouteResolverArgs = {
    cwd: string;
    rootOverride?: string | null;
    gitRoot: string;
    agentplaneDir: string;
};
export type ReleaseApplyResolvedProject = ResolvedProject;
export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.reporting.js";
//# sourceMappingURL=apply.pipeline.d.ts.map