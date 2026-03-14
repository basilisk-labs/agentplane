---
id: "202603141638-3M76NC"
title: "Stabilize commit wrapper close check-only regression for v0.3.7"
result_summary: "Raised the timeout budget only for the commit-wrapper close check-only test that fails under full release gate load."
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
  updated_at: "2026-03-14T16:39:57.460Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:47:23.716Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a close-wrapper check-only timeout budget increase for the single remaining full-gate case."
commit:
  hash: "d37c2a8e42cd25f3a6329f281ba20a263fb1bf5f"
  message: "⏱️ 3M76NC test: widen close check-only timeout"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the remaining commit wrapper --close --check-only full-gate timeout, inspect timeout binding and close-wrapper fixture behavior in run-cli.core.guard.commit-wrapper.test.ts, and make the smallest guard-scoped fix that explains the failure before rerunning the suite."
  -
    author: "CODER"
    body: "Verified: the commit-wrapper suite and task verify contract both passed after restricting the fix to the single close check-only timeout case; no broader guard or close-wrapper semantic regression was observed in isolated or whole-file runs."
events:
  -
    type: "status"
    at: "2026-03-14T16:45:30.066Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the remaining commit wrapper --close --check-only full-gate timeout, inspect timeout binding and close-wrapper fixture behavior in run-cli.core.guard.commit-wrapper.test.ts, and make the smallest guard-scoped fix that explains the failure before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T16:47:23.716Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a close-wrapper check-only timeout budget increase for the single remaining full-gate case."
  -
    type: "status"
    at: "2026-03-14T16:48:00.744Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the commit-wrapper suite and task verify contract both passed after restricting the fix to the single close check-only timeout case; no broader guard or close-wrapper semantic regression was observed in isolated or whole-file runs."
doc_version: 3
doc_updated_at: "2026-03-14T16:48:00.746Z"
doc_updated_by: "CODER"
description: "Isolate and fix the remaining full-gate timeout in commit wrapper --close --check-only, then confirm the close wrapper flow stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize commit wrapper close check-only regression for v0.3.7
    
    Isolate and fix the remaining full-gate timeout in commit wrapper --close --check-only, then confirm the close wrapper flow stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the remaining full-gate timeout in commit wrapper --close --check-only, then confirm the close wrapper flow stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize commit wrapper close check-only regression for v0.3.7".
  Plan: "Reproduce the remaining commit wrapper --close --check-only full-gate timeout, determine whether the issue is timeout budgeting, close-wrapper setup leakage, or a real guard-path regression, fix only the close-wrapper surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: the commit-wrapper suite passes, including `commit wrapper --close --check-only`.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed close-wrapper behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:47:23.716Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a close-wrapper check-only timeout budget increase for the single remaining full-gate case.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:47:23.550Z, excerpt_hash=sha256:1ce874ec01e252b518fdc7112c06750d8559cc0450b800f95603e8322744d074
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: the isolated `commit wrapper --close supports --check-only` case passed in 7.06s total wall time, with the target test at 4.73s.
    - Fact: the full `packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts` suite passed in 27.99s after the change, with the target close check-only case at 1.86s.
    - Inference: the remaining close-wrapper failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a semantic regression in `--close --check-only`.
    - Change: added `COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS = 60_000` and applied it only to the `commit wrapper --close supports --check-only` test in `packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`.
    - Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
id_source: "generated"
---
## Summary

Stabilize commit wrapper close check-only regression for v0.3.7

Isolate and fix the remaining full-gate timeout in commit wrapper --close --check-only, then confirm the close wrapper flow stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the remaining full-gate timeout in commit wrapper --close --check-only, then confirm the close wrapper flow stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize commit wrapper close check-only regression for v0.3.7".

## Plan

Reproduce the remaining commit wrapper --close --check-only full-gate timeout, determine whether the issue is timeout budgeting, close-wrapper setup leakage, or a real guard-path regression, fix only the close-wrapper surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: the commit-wrapper suite passes, including `commit wrapper --close --check-only`.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed close-wrapper behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:47:23.716Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a close-wrapper check-only timeout budget increase for the single remaining full-gate case.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:47:23.550Z, excerpt_hash=sha256:1ce874ec01e252b518fdc7112c06750d8559cc0450b800f95603e8322744d074

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: the isolated `commit wrapper --close supports --check-only` case passed in 7.06s total wall time, with the target test at 4.73s.
- Fact: the full `packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts` suite passed in 27.99s after the change, with the target close check-only case at 1.86s.
- Inference: the remaining close-wrapper failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a semantic regression in `--close --check-only`.
- Change: added `COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS = 60_000` and applied it only to the `commit wrapper --close supports --check-only` test in `packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`.
- Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
