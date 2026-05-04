import type { CommandHandler } from "../../cli/spec/spec.js";
import type { ReleaseApplyParsed } from "./apply.types.js";
export { releaseApplySpec, releaseCandidateSpec } from "./apply.spec.js";
export declare const runReleaseApply: CommandHandler<ReleaseApplyParsed>;
export declare const runReleaseCandidate: CommandHandler<ReleaseApplyParsed>;
export { pushReleaseCandidateBranch, pushReleaseRefs } from "./apply.pipeline.js";
//# sourceMappingURL=apply.command.d.ts.map