import { type AgentChangeRecord } from "@agentplaneorg/core/schemas";
import { type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type CommandContext } from "../shared/task-backend.js";
type AcrMode = "schema" | "local" | "ci";
type AcrCiSemanticOptions = Pick<AcrCheckParsed, "requirePlanApproved" | "requireVerification" | "requirePolicyPass" | "allowWaivedVerification" | "allowManualOverride">;
export type AcrGenerateParsed = {
    taskId: string;
    workCommit?: string;
    baseCommit?: string;
    agent?: string;
    agentName?: string;
    modelProvider?: "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";
    modelName?: string;
    out?: string;
    write: boolean;
    stdout: boolean;
    refresh: boolean;
    json: boolean;
};
export type AcrValidateParsed = {
    target: string;
    mode: AcrMode;
    strict: boolean;
    json: boolean;
};
export type AcrCheckParsed = {
    taskId: string;
    mode: AcrMode;
    requirePlanApproved: boolean;
    requireVerification: boolean;
    requirePolicyPass: boolean;
    allowWaivedVerification: boolean;
    allowManualOverride: boolean;
    json: boolean;
};
export type AcrExplainParsed = {
    target: string;
    json: boolean;
};
export type AcrSchemaParsed = {
    version: "0.1";
    out?: string;
};
export declare const acrSpec: CommandSpec<GroupCommandParsed>;
export declare const acrSchemaSpec: CommandSpec<AcrSchemaParsed>;
export declare const acrGenerateSpec: CommandSpec<AcrGenerateParsed>;
export declare const acrValidateSpec: CommandSpec<AcrValidateParsed>;
export declare const acrCheckSpec: CommandSpec<AcrCheckParsed>;
export declare const acrExplainSpec: CommandSpec<AcrExplainParsed>;
declare function runAcrRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number>;
export declare function makeRunAcrHandler(_getCtx: (cmd: string) => Promise<CommandContext>): typeof runAcrRootGroup;
export declare function makeRunAcrSchemaHandler(): typeof runAcrSchemaHandler;
declare function runAcrSchemaHandler(ctx: CommandCtx, p: AcrSchemaParsed): Promise<number>;
export declare function makeRunAcrGenerateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (cmdCtx: CommandCtx, p: AcrGenerateParsed) => Promise<number>;
export declare function makeRunAcrValidateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (_cmdCtx: CommandCtx, p: AcrValidateParsed) => Promise<number>;
export declare function makeRunAcrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>): (_cmdCtx: CommandCtx, p: AcrCheckParsed) => Promise<number>;
export declare function makeRunAcrExplainHandler(getCtx: (cmd: string) => Promise<CommandContext>): (_cmdCtx: CommandCtx, p: AcrExplainParsed) => Promise<number>;
export declare function generateAcr(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    workCommit?: string;
    baseCommit?: string;
    agent?: string;
    agentName?: string;
    modelProvider?: "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";
    modelName?: string;
    out?: string;
    write?: boolean;
    refresh?: boolean;
}): Promise<{
    record: AgentChangeRecord;
    acrPath: string | null;
    warnings: string[];
}>;
export declare function writeAcrFile(opts: {
    acrPath: string;
    record: AgentChangeRecord;
    refresh: boolean;
}): Promise<void>;
export declare function validateAcrTarget(opts: {
    ctx: CommandContext;
    target: string;
    mode: AcrMode;
    strict: boolean;
    requirePlanApproved: boolean;
    requireVerification: boolean;
    requirePolicyPass: boolean;
    allowWaivedVerification: boolean;
    allowManualOverride: boolean;
}): Promise<{
    ok: true;
    task_id: string;
    acr_path: string;
    record_id: string;
    warnings: string[];
}>;
export declare function assertAcrCiSemantics(record: AgentChangeRecord, opts: AcrCiSemanticOptions): void;
export {};
//# sourceMappingURL=acr.command.d.ts.map