import type { PromptModule } from "./model.js";
type Gpt55PromptContractDiagnosticCode = "gpt55_missing_outcome_contract" | "gpt55_absolute_rule_in_role_prompt" | "gpt55_missing_referenced_role";
type Gpt55PromptContractDiagnostic = {
    severity: "warning" | "error";
    code: Gpt55PromptContractDiagnosticCode;
    message: string;
    module_address?: string;
    role_id?: string;
    evidence?: string;
};
export declare function diagnoseGpt55PromptContract(modules: PromptModule[]): Gpt55PromptContractDiagnostic[];
export {};
//# sourceMappingURL=gpt55-contract.d.ts.map