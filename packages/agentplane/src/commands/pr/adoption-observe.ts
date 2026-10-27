import {
  assertObservedExistingPrTarget,
  type ExistingPrAdoptionTarget,
} from "./adoption-identity.js";
import {
  observeExistingChangeRequestByNumber,
  resolveChangeRequestIdentity,
} from "./internal/change-request-provider.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";

/** Resolve the configured remote before accepting a numbered provider read. */
export async function observeExistingPrClaim(opts: {
  gitRoot: string;
  claim: ExistingPrAdoptionTarget;
}): Promise<ObservedChangeRequest> {
  const identity = await resolveChangeRequestIdentity({
    gitRoot: opts.gitRoot,
    branch: opts.claim.headRef,
  });
  const lookup = await observeExistingChangeRequestByNumber({
    gitRoot: opts.gitRoot,
    branch: opts.claim.headRef,
    baseBranch: opts.claim.baseRef,
    prNumber: opts.claim.prNumber,
    identity,
  });
  if (lookup.state !== "found") {
    throw new Error(
      `Existing PR #${opts.claim.prNumber} is ${lookup.state}; adoption requires an exact provider readback`,
    );
  }
  assertObservedExistingPrTarget({ ...opts.claim, identity }, lookup.pr);
  assertObservedExistingPrTarget(opts.claim, lookup.pr);
  return lookup.pr;
}
