import type { ExecutionProfile } from "@agentplaneorg/core/config";
import type { WorkflowMode } from "../../../../agents/agents-template.js";
import type { InitClackPrompts } from "./prompts.js";
import type { InitFlags, InitIde, InitParsed } from "./model.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
export type InitAnswers = {
    setupProfileDescription: string;
    policyGateway: PolicyGatewayFlavor;
    ide: InitIde;
    workflow: WorkflowMode;
    directCloseDirtyPolicy: NonNullable<InitFlags["directCloseDirtyPolicy"]>;
    backend: NonNullable<InitFlags["backend"]>;
    hooks: boolean;
    recipes: string[];
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
    requireVerifyApproval: boolean;
    executionProfile: ExecutionProfile;
    strictUnsafeConfirm: boolean;
};
export declare function assertConfirmed(clack: InitClackPrompts, value: boolean | symbol): boolean;
export declare function buildNonInteractiveAnswers(flags: InitParsed): InitAnswers;
export declare function promptInteractiveAnswers(opts: {
    flags: InitParsed;
    clack: InitClackPrompts;
}): Promise<InitAnswers>;
//# sourceMappingURL=answers.d.ts.map