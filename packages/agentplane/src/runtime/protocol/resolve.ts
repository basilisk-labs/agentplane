import type { FrameworkExplainPayload } from "../explain/index.js";

import {
  AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
  type AgentplaneProtocolCompatibility,
  type AgentplaneProtocolError,
  type AgentplaneProtocolErrorResult,
  type AgentplaneProtocolKind,
  type AgentplaneProtocolSuccessResult,
  type FrameworkExplainProtocolResult,
  type FrameworkProtocolSurface,
} from "./types.js";

export const AGENTPLANE_PROTOCOL_COMPATIBILITY: AgentplaneProtocolCompatibility = {
  strategy: "additive",
  breaking_changes_require_schema_version: true,
  additive_fields_allowed: true,
  new_result_kinds_allowed: true,
};

export function buildProtocolSuccessResult<TKind extends AgentplaneProtocolKind, TData>(opts: {
  kind: TKind;
  data: TData;
}): AgentplaneProtocolSuccessResult<TKind, TData> {
  return {
    schema_version: AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
    kind: opts.kind,
    status: "ok",
    compatibility: structuredClone(AGENTPLANE_PROTOCOL_COMPATIBILITY),
    data: structuredClone(opts.data),
  };
}

export function buildProtocolErrorResult<TKind extends AgentplaneProtocolKind>(opts: {
  kind: TKind;
  error: AgentplaneProtocolError;
}): AgentplaneProtocolErrorResult<TKind> {
  return {
    schema_version: AGENTPLANE_PROTOCOL_SCHEMA_VERSION,
    kind: opts.kind,
    status: "error",
    compatibility: structuredClone(AGENTPLANE_PROTOCOL_COMPATIBILITY),
    error: structuredClone(opts.error),
  };
}

export function buildFrameworkExplainProtocolResult(
  explain: FrameworkExplainPayload,
): FrameworkExplainProtocolResult {
  return buildProtocolSuccessResult({
    kind: "framework.explain",
    data: explain,
  });
}

export function buildFrameworkProtocolSurface(opts: {
  explain: FrameworkExplainPayload;
}): FrameworkProtocolSurface {
  return {
    explain: buildFrameworkExplainProtocolResult(opts.explain),
  };
}
