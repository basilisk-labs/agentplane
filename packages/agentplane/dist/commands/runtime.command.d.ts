import type { CommandHandler } from "../cli/spec/spec.js";
import { type GroupCommandParsed } from "../cli/group-command.js";
import { type RepoCliVersionExpectation } from "../runtime/shared/repo-cli-version.js";
import { type RuntimeSourceInfo } from "../runtime/shared/runtime-source.js";
import { type PromptGraphInspection } from "./shared/prompt-graph-diagnostics.js";
import { type RuntimeExplainParsed } from "./runtime.spec.js";
export type FrameworkDevWorkflow = {
    available: boolean;
    bootstrapCommand: string;
    manualRepairCommands: string[];
    repoLocalVerifyCommand: string;
    reinstallScript: string;
    globalVerifyCommand: string;
    forceGlobalExample: string;
    recommendation: string | null;
};
export type RuntimeExplainPayload = RuntimeSourceInfo & {
    frameworkDev: FrameworkDevWorkflow;
    repoCliExpectation: RepoCliVersionExpectation;
    promptGraph: PromptGraphInspection;
};
export { runtimeExplainSpec, runtimeSpec } from "./runtime.spec.js";
export declare function buildFrameworkDevWorkflow(report: RuntimeSourceInfo): FrameworkDevWorkflow;
export declare function renderRuntimeExplainText(report: RuntimeSourceInfo, repoCliExpectation: RepoCliVersionExpectation, promptGraph?: PromptGraphInspection): string;
export declare const runRuntime: CommandHandler<GroupCommandParsed>;
export declare const runRuntimeExplain: CommandHandler<RuntimeExplainParsed>;
//# sourceMappingURL=runtime.command.d.ts.map