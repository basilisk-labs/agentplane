---
id: "202603141719-97VCK9"
title: "Stabilize remaining stale-dist readonly timeout regression for v0.3.7"
result_summary: "Aligned the remaining stale-dist readonly task-list test with the existing 60s timeout budget used by the neighboring readonly runtime-explain path so full-gate load no longer leaves it on the default budget."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T17:21:04.229Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T17:32:08.651Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining stale-dist readonly full-gate failure was timeout-only and now binds the existing STALE_DIST_READONLY_TIMEOUT_MS budget."
commit:
  hash: "2590308d17c681930bdcd788ae0e0f4c69b420bf"
  message: "⏱️ 97VCK9 test: align stale-dist readonly timeout"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the remaining stale-dist readonly timeout failure, inspect the runtime explain/task-list dirty-path fixture and timeout wiring, and make the smallest stale-dist-scoped fix before rerunning the suite."
  -
    author: "CODER"
    body: "Verified: the stale-dist-readonly suite and touched packages typecheck pass after binding the existing readonly timeout budget onto the remaining task-list case."
events:
  -
    type: "status"
    at: "2026-03-14T17:30:50.049Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the remaining stale-dist readonly timeout failure, inspect the runtime explain/task-list dirty-path fixture and timeout wiring, and make the smallest stale-dist-scoped fix before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T17:32:08.651Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining stale-dist readonly full-gate failure was timeout-only and now binds the existing STALE_DIST_READONLY_TIMEOUT_MS budget."
  -
    type: "status"
    at: "2026-03-14T17:32:33.992Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the stale-dist-readonly suite and touched packages typecheck pass after binding the existing readonly timeout budget onto the remaining task-list case."
doc_version: 3
doc_updated_at: "2026-03-14T17:32:33.994Z"
doc_updated_by: "CODER"
description: "Isolate and fix the remaining full-gate timeout failure in stale-dist-readonly.test.ts covering task list execution under dirty watched runtime paths, then confirm the stale-dist readonly diagnostics suite stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize remaining stale-dist readonly timeout regression for v0.3.7
    
    Isolate and fix the remaining full-gate timeout failure in stale-dist-readonly.test.ts covering task list execution under dirty watched runtime paths, then confirm the stale-dist readonly diagnostics suite stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the remaining full-gate timeout failure in stale-dist-readonly.test.ts covering task list execution under dirty watched runtime paths, then confirm the stale-dist readonly diagnostics suite stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize remaining stale-dist readonly timeout regression for v0.3.7".
  Plan: "Reproduce the remaining stale-dist readonly full-gate timeout, determine whether the issue is timeout budgeting, runtime-watch fixture cost, or a real stale-dist regression, fix only the stale-dist readonly surface needed to explain the task-list case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts`. Expected: the stale-dist readonly suite passes, including the remaining task-list case under dirty watched runtime paths.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed stale-dist readonly behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T17:32:08.651Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining stale-dist readonly full-gate failure was timeout-only and now binds the existing STALE_DIST_READONLY_TIMEOUT_MS budget.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T17:32:03.594Z, excerpt_hash=sha256:4006bfc70c06ddd7afc3079b733e5e412b8c1ed5384b2ccf0ac82fdc78a51714
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Facts:
    - The remaining stale-dist readonly failure passes both in isolation and in the full stale-dist-readonly suite.
    - The neighboring runtime explain case already used STALE_DIST_READONLY_TIMEOUT_MS; the task list case used the default timeout despite exercising the same stale-check bootstrap path.
    - The fix is limited to wiring the existing readonly timeout budget onto the task list case.
    
    Inference:
    - The failure mode was another missing timeout binding under aggregate release-prepublish load, not incorrect stale-dist readonly behavior.
    
    Residual risk:
    - Full release-prepublish still needs rerun after task close artifacts are cleaned and the release task is resumed.
id_source: "generated"
---
## Summary

Stabilize remaining stale-dist readonly timeout regression for v0.3.7

Isolate and fix the remaining full-gate timeout failure in stale-dist-readonly.test.ts covering task list execution under dirty watched runtime paths, then confirm the stale-dist readonly diagnostics suite stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the remaining full-gate timeout failure in stale-dist-readonly.test.ts covering task list execution under dirty watched runtime paths, then confirm the stale-dist readonly diagnostics suite stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize remaining stale-dist readonly timeout regression for v0.3.7".

## Plan

Reproduce the remaining stale-dist readonly full-gate timeout, determine whether the issue is timeout budgeting, runtime-watch fixture cost, or a real stale-dist regression, fix only the stale-dist readonly surface needed to explain the task-list case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts`. Expected: the stale-dist readonly suite passes, including the remaining task-list case under dirty watched runtime paths.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed stale-dist readonly behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T17:32:08.651Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/cli/stale-dist-readonly.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining stale-dist readonly full-gate failure was timeout-only and now binds the existing STALE_DIST_READONLY_TIMEOUT_MS budget.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T17:32:03.594Z, excerpt_hash=sha256:4006bfc70c06ddd7afc3079b733e5e412b8c1ed5384b2ccf0ac82fdc78a51714

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Facts:
- The remaining stale-dist readonly failure passes both in isolation and in the full stale-dist-readonly suite.
- The neighboring runtime explain case already used STALE_DIST_READONLY_TIMEOUT_MS; the task list case used the default timeout despite exercising the same stale-check bootstrap path.
- The fix is limited to wiring the existing readonly timeout budget onto the task list case.

Inference:
- The failure mode was another missing timeout binding under aggregate release-prepublish load, not incorrect stale-dist readonly behavior.

Residual risk:
- Full release-prepublish still needs rerun after task close artifacts are cleaned and the release task is resumed.
