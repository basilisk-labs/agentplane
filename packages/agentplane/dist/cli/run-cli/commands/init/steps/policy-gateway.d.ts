import type { InitFlags, InitDefaults } from "../model.js";
import type { InitPromptClack, PolicyGatewayStepAnswers } from "./contracts.js";
export declare function promptPolicyGatewayStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "policyGateway">;
    defaults?: Pick<InitDefaults, "policyGateway">;
}): Promise<PolicyGatewayStepAnswers>;
//# sourceMappingURL=policy-gateway.d.ts.map