---
id: "202604021851-4M85MF"
title: "Enforce branch_pr freshness and verify invariants"
result_summary: "integrate: squash task/202604021851-4M85MF/pr-freshness"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604021851-DBYVXK"
tags:
  - "code"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T18:53:36.432Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user audit implementation request on 2026-04-03."
verification:
  state: "ok"
  updated_at: "2026-04-02T20:03:38.347Z"
  updated_by: "CODER"
  note: "Lint, types, and freshness regressions passed."
commit:
  hash: "21c3479ec58dfbcf72192cda1e738e0d7fd09985"
  message: "📝 4M85MF workflow: record freshness verification"
comments:
  -
    author: "CODER"
    body: "Start: enforce rendered-from-head freshness and verify-sha invariants for branch_pr PR artifacts and integrate."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021851-4M85MF/pr."
events:
  -
    type: "status"
    at: "2026-04-02T19:42:07.949Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce rendered-from-head freshness and verify-sha invariants for branch_pr PR artifacts and integrate."
  -
    type: "verify"
    at: "2026-04-02T20:03:38.347Z"
    author: "CODER"
    state: "ok"
    note: "Lint, types, and freshness regressions passed."
  -
    type: "status"
    at: "2026-04-02T20:04:44.417Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021851-4M85MF/pr."
doc_version: 3
doc_updated_at: "2026-04-02T20:04:44.422Z"
doc_updated_by: "INTEGRATOR"
description: "Make PR artifacts and verification state freshness explicit with rendered-from head linkage, stale detection, and integrate gates that reject outdated review or verify state while preserving SHA-based verify caching."
sections:
  Summary: |-
    Enforce branch_pr freshness and verify invariants
    
    Make PR artifacts and verification state freshness explicit with rendered-from head linkage, stale detection, and integrate gates that reject outdated review or verify state while preserving SHA-based verify caching.
  Scope: |-
    - In scope: Make PR artifacts and verification state freshness explicit with rendered-from head linkage, stale detection, and integrate gates that reject outdated review or verify state while preserving SHA-based verify caching.
    - Out of scope: unrelated refactors not required for "Enforce branch_pr freshness and verify invariants".
  Plan: |-
    1. Extend PR artifact state with explicit freshness linkage to rendered and verified HEAD state.
    2. Fail pr check and integrate when review or verify state is stale, without regressing verify SHA caching.
    3. Add focused stale-state and cache-hit regressions.
  Verify Steps: |-
    1. Simulate stale rendered or verified SHA state. Expected: pr check or integrate fails with a clear freshness error.
    2. Re-run integrate or verify when the current branch HEAD is already verified. Expected: SHA-based verify caching still skips redundant verification unless forced.
    3. Run targeted freshness and integrate regressions. Expected: touched tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T20:03:38.347Z — VERIFY — ok
    
    By: CODER
    
    Note: Lint, types, and freshness regressions passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:42:07.976Z, excerpt_hash=sha256:e7074d219196b239bc5a1e115ecd2806f588bcae99d50bf499ad5fd00907f488
    
    Details:
    
    bun run lint:core
    bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce branch_pr freshness and verify invariants

Make PR artifacts and verification state freshness explicit with rendered-from head linkage, stale detection, and integrate gates that reject outdated review or verify state while preserving SHA-based verify caching.

## Scope

- In scope: Make PR artifacts and verification state freshness explicit with rendered-from head linkage, stale detection, and integrate gates that reject outdated review or verify state while preserving SHA-based verify caching.
- Out of scope: unrelated refactors not required for "Enforce branch_pr freshness and verify invariants".

## Plan

1. Extend PR artifact state with explicit freshness linkage to rendered and verified HEAD state.
2. Fail pr check and integrate when review or verify state is stale, without regressing verify SHA caching.
3. Add focused stale-state and cache-hit regressions.

## Verify Steps

1. Simulate stale rendered or verified SHA state. Expected: pr check or integrate fails with a clear freshness error.
2. Re-run integrate or verify when the current branch HEAD is already verified. Expected: SHA-based verify caching still skips redundant verification unless forced.
3. Run targeted freshness and integrate regressions. Expected: touched tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T20:03:38.347Z — VERIFY — ok

By: CODER

Note: Lint, types, and freshness regressions passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:42:07.976Z, excerpt_hash=sha256:e7074d219196b239bc5a1e115ecd2806f588bcae99d50bf499ad5fd00907f488

Details:

bun run lint:core
bunx tsc -p packages/agentplane/tsconfig.json --noEmit
bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
