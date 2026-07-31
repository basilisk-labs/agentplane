import type { ConflictRouteEvidence } from "./conflict-rework-route-eligibility.js";
import { isBaseAdvancedProtectedConflictRoute, localAncestry } from "./conflict-rework-legacy.js";

export type ConflictReworkBaseContext = {
  provider_conflict_base_sha: string;
  current_base_sha: string;
  relation: "equal" | "provider_base_ancestor_of_current_base";
  legacy_queue_base_sha: string | null;
  legacy_queue_relation:
    | "not_applicable"
    | "provider_base_ancestor_of_queue_base_and_queue_base_ancestor_of_current_base";
};

type BaseContextFailureCode =
  | "provider_base_unavailable"
  | "provider_base_mismatch"
  | "provider_base_not_ancestor"
  | "legacy_queue_base_unavailable"
  | "legacy_queue_base_not_ancestor"
  | "conflict_rework_route_ineligible";

type BaseContextResolution =
  | { ok: true; context: ConflictReworkBaseContext }
  | { ok: false; reasonCode: BaseContextFailureCode; reason: string };

function failure(reasonCode: BaseContextFailureCode, reason: string): BaseContextResolution {
  return { ok: false, reasonCode, reason };
}

function equalBaseContext(baseSha: string): ConflictReworkBaseContext {
  return {
    provider_conflict_base_sha: baseSha,
    current_base_sha: baseSha,
    relation: "equal",
    legacy_queue_base_sha: null,
    legacy_queue_relation: "not_applicable",
  };
}

export async function resolveConflictReworkBaseContext(opts: {
  gitRoot: string;
  gitOps: {
    mergeBase: (gitRoot: string, left: string, right: string) => Promise<string>;
  };
  routeEvidence: ConflictRouteEvidence;
  base: string;
  providerBase: string;
  localBase: string;
}): Promise<BaseContextResolution> {
  if (opts.routeEvidence.kind === "current_verified_open_pr_rework") {
    if (opts.localBase === opts.providerBase) {
      return { ok: true, context: equalBaseContext(opts.providerBase) };
    }
    const providerToCurrent = await localAncestry({
      gitRoot: opts.gitRoot,
      gitOps: opts.gitOps,
      ancestor: opts.providerBase,
      descendant: opts.localBase,
    });
    if (!providerToCurrent.ok) {
      return failure(
        "provider_base_unavailable",
        `current local base ancestry cannot be resolved from the provider conflict base: ${providerToCurrent.reason}`,
      );
    }
    if (!providerToCurrent.isAncestor) {
      return failure(
        "provider_base_not_ancestor",
        `provider conflict base is not an ancestor of current local ${opts.base}: provider=${opts.providerBase} local=${opts.localBase}`,
      );
    }
    return {
      ok: true,
      context: {
        provider_conflict_base_sha: opts.providerBase,
        current_base_sha: opts.localBase,
        relation: "provider_base_ancestor_of_current_base",
        legacy_queue_base_sha: null,
        legacy_queue_relation: "not_applicable",
      },
    };
  }

  if (
    !isBaseAdvancedProtectedConflictRoute(opts.routeEvidence, opts.localBase, opts.providerBase)
  ) {
    return opts.localBase === opts.providerBase
      ? { ok: true, context: equalBaseContext(opts.providerBase) }
      : failure(
          "provider_base_mismatch",
          `provider base differs from local ${opts.base}: provider=${opts.providerBase} local=${opts.localBase}`,
        );
  }

  const legacyQueueBase = opts.routeEvidence.queue.base_sha;
  if (opts.localBase === opts.providerBase) {
    return failure(
      "conflict_rework_route_ineligible",
      "legacy released conflict rework requires the provider conflict base to be a strict ancestor of the current local base",
    );
  }
  const providerToQueue = await localAncestry({
    gitRoot: opts.gitRoot,
    gitOps: opts.gitOps,
    ancestor: opts.providerBase,
    descendant: legacyQueueBase,
  });
  if (!providerToQueue.ok) {
    return failure(
      "legacy_queue_base_unavailable",
      `legacy queue base ancestry cannot be resolved locally: ${providerToQueue.reason}`,
    );
  }
  if (!providerToQueue.isAncestor) {
    return failure(
      "provider_base_not_ancestor",
      `provider conflict base is not an ancestor of the released queue base: provider=${opts.providerBase} queue=${legacyQueueBase}`,
    );
  }
  const queueToCurrent = await localAncestry({
    gitRoot: opts.gitRoot,
    gitOps: opts.gitOps,
    ancestor: legacyQueueBase,
    descendant: opts.localBase,
  });
  if (!queueToCurrent.ok) {
    return failure(
      "legacy_queue_base_unavailable",
      `current local base ancestry cannot be resolved from the released queue base: ${queueToCurrent.reason}`,
    );
  }
  if (!queueToCurrent.isAncestor) {
    return failure(
      "legacy_queue_base_not_ancestor",
      `released queue base is not an ancestor of the current local ${opts.base}: queue=${legacyQueueBase} local=${opts.localBase}`,
    );
  }
  return {
    ok: true,
    context: {
      provider_conflict_base_sha: opts.providerBase,
      current_base_sha: opts.localBase,
      relation: "provider_base_ancestor_of_current_base",
      legacy_queue_base_sha: legacyQueueBase,
      legacy_queue_relation:
        "provider_base_ancestor_of_queue_base_and_queue_base_ancestor_of_current_base",
    },
  };
}
