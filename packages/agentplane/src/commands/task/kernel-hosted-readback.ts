import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  observeExistingChangeRequestByNumber,
  resolveChangeRequestIdentity,
} from "../pr/internal/change-request-provider.js";
import type { ObservedChangeRequest } from "../pr/internal/change-request-model.js";
import type { FreshHostedReadback } from "./kernel-hosted-head-evidence.js";

const objectId = /^[0-9a-f]{40,64}$/u;

/** Resolve the configured provider again; a stored PR number never authorizes a current head. */
export function freshHostedPrReadback(opts: {
  gitRoot: string;
  identity: k.HostedPrIdentity;
}): FreshHostedReadback {
  return async () => {
    const expected = opts.identity;
    const resolved = await resolveChangeRequestIdentity({
      gitRoot: opts.gitRoot,
      branch: expected.head_ref,
    });
    if (
      resolved.provider !== expected.provider ||
      resolved.hostname !== expected.hostname ||
      resolved.remote !== expected.remote ||
      resolved.sourceProject !== expected.source_project ||
      resolved.targetProject !== expected.target_project
    ) {
      throw new Error("Adopted hosted PR configured provider identity changed");
    }
    const lookup = await observeExistingChangeRequestByNumber({
      gitRoot: opts.gitRoot,
      branch: expected.head_ref,
      baseBranch: expected.base_ref,
      prNumber: expected.pr_number,
      identity: resolved,
    });
    if (lookup.state !== "found") {
      throw new Error("Adopted hosted PR provider readback is unavailable");
    }
    const observed: ObservedChangeRequest = lookup.pr;
    const headSha = observed.headSha;
    const baseSha = observed.baseSha;
    if (
      observed.status !== "OPEN" ||
      observed.provider !== expected.provider ||
      observed.identity.provider !== expected.provider ||
      observed.identity.hostname !== expected.hostname ||
      observed.identity.remote !== expected.remote ||
      observed.identity.sourceProject !== expected.source_project ||
      observed.identity.targetProject !== expected.target_project ||
      observed.identity.sourceProject !== observed.identity.targetProject ||
      observed.prNumber !== expected.pr_number ||
      observed.headRef !== expected.head_ref ||
      observed.base !== expected.base_ref ||
      !headSha ||
      !objectId.test(headSha) ||
      !baseSha ||
      !objectId.test(baseSha) ||
      observed.mergeability?.state === "conflicting"
    ) {
      throw new Error("Adopted hosted PR provider readback identity changed");
    }
    return {
      identity: expected,
      current_head: headSha,
      current_base: baseSha,
      current_readback_digest: k.kernelDigest({
        provider: observed.provider,
        identity: observed.identity,
        prNumber: observed.prNumber,
        status: observed.status,
        headRef: observed.headRef,
        base: observed.base,
        headSha: observed.headSha,
        baseSha: observed.baseSha,
      }),
    };
  };
}
