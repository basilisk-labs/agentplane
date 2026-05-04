import type { CommandSpec } from "../../cli/spec/spec.js";
export type BumpKind = "patch" | "minor" | "major";
export type ReleasePlanFlags = {
    bump: BumpKind;
    since?: string;
    yes: boolean;
};
export type ReleasePlanParsed = ReleasePlanFlags;
export declare const releasePlanSpec: CommandSpec<ReleasePlanParsed>;
//# sourceMappingURL=plan.spec.d.ts.map