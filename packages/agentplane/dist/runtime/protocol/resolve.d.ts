import type { FrameworkExplainPayload } from "../explain/index.js";
import { type AgentplaneProtocolCompatibility, type AgentplaneProtocolError, type AgentplaneProtocolErrorResult, type AgentplaneProtocolKind, type AgentplaneProtocolSuccessResult, type FrameworkExplainProtocolResult, type FrameworkProtocolSurface } from "./model.js";
export declare const AGENTPLANE_PROTOCOL_COMPATIBILITY: AgentplaneProtocolCompatibility;
export declare function buildProtocolSuccessResult<TKind extends AgentplaneProtocolKind, TData>(opts: {
    kind: TKind;
    data: TData;
}): AgentplaneProtocolSuccessResult<TKind, TData>;
export declare function buildProtocolErrorResult<TKind extends AgentplaneProtocolKind>(opts: {
    kind: TKind;
    error: AgentplaneProtocolError;
}): AgentplaneProtocolErrorResult<TKind>;
export declare function buildFrameworkExplainProtocolResult(explain: FrameworkExplainPayload): FrameworkExplainProtocolResult;
export declare function buildFrameworkProtocolSurface(opts: {
    explain: FrameworkExplainPayload;
}): FrameworkProtocolSurface;
//# sourceMappingURL=resolve.d.ts.map