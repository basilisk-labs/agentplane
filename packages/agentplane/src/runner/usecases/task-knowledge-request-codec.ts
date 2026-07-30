import { createHash } from "node:crypto";

import type { AgentSemanticResultKnowledgeRequest } from "@agentplaneorg/core/schemas";

export function digestJson(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

export function requestDigest(request: AgentSemanticResultKnowledgeRequest): string {
  return digestJson({
    schema_version: request.schema_version,
    kind: request.kind,
    query: request.query,
    reason: request.reason,
    desired_kind: request.desired_kind,
    scope: request.scope,
    blocking: request.blocking,
  });
}

export function approximateTokens(value: string): number {
  return Math.ceil(Buffer.byteLength(value, "utf8") / 4);
}

export function compactQuery(value: string, maxQueryTerms: number): string | null {
  const normalized = value
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .match(/[\p{L}\p{N}_]+/gu)
    ?.join(" ")
    .trim();
  if (!normalized || normalized.length > 160 || normalized.split(" ").length > maxQueryTerms) {
    return null;
  }
  return normalized;
}

/**
 * The estimated token field is part of the serialized response, so calculate
 * it to a fixed point instead of relying on excerpt bytes alone.
 */
export function serializedResponseTokens<
  T extends { usage: { estimated_response_tokens: number } },
>(opts: { response: T; seal: (response: T) => unknown }): number {
  let estimate = 0;
  for (let attempts = 0; attempts < 4; attempts += 1) {
    const response = {
      ...opts.response,
      usage: { ...opts.response.usage, estimated_response_tokens: estimate },
    } as T;
    const measured = approximateTokens(JSON.stringify(opts.seal(response)));
    if (measured === estimate) return measured;
    estimate = measured;
  }
  return estimate;
}
