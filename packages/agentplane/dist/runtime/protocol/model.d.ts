import type { FrameworkExplainPayload } from "../explain/index.js";
export declare const AGENTPLANE_PROTOCOL_SCHEMA_VERSION: 1;
export type AgentplaneProtocolSchemaVersion = typeof AGENTPLANE_PROTOCOL_SCHEMA_VERSION;
export type AgentplaneProtocolStatus = "ok" | "error";
export type AgentplaneProtocolKind = string;
export type AgentplaneProtocolCompatibility = {
    strategy: "additive";
    breaking_changes_require_schema_version: true;
    additive_fields_allowed: true;
    new_result_kinds_allowed: true;
};
export type AgentplaneProtocolBase<TKind extends AgentplaneProtocolKind> = {
    schema_version: AgentplaneProtocolSchemaVersion;
    kind: TKind;
    compatibility: AgentplaneProtocolCompatibility;
};
export type AgentplaneProtocolSuccessResult<TKind extends AgentplaneProtocolKind, TData> = AgentplaneProtocolBase<TKind> & {
    status: "ok";
    data: TData;
};
export type AgentplaneProtocolError = {
    code: string;
    message: string;
    retryable?: boolean;
    details?: Record<string, unknown>;
};
export type AgentplaneProtocolErrorResult<TKind extends AgentplaneProtocolKind> = AgentplaneProtocolBase<TKind> & {
    status: "error";
    error: AgentplaneProtocolError;
};
export type AgentplaneProtocolResult<TKind extends AgentplaneProtocolKind, TData> = AgentplaneProtocolSuccessResult<TKind, TData> | AgentplaneProtocolErrorResult<TKind>;
export type FrameworkExplainProtocolResult = AgentplaneProtocolSuccessResult<"framework.explain", FrameworkExplainPayload>;
export type FrameworkProtocolSurface = {
    explain: FrameworkExplainProtocolResult;
};
//# sourceMappingURL=model.d.ts.map