---
id: "202603141719-GTMBYE"
title: "Stabilize remaining cleanup-merged timeout regressions for v0.3.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T17:20:55.232Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T17:29:37.333Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining cleanup-merged full-gate failures were timeout-only on mutation-heavy fixtures and now use a shared 120s mutation budget."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the two remaining cleanup-merged full-gate timeout failures, inspect the cleanup-merged test budget and fixture behavior around archive deletion and outside-repo worktree refusal, and make the smallest cleanup-scoped fix before rerunning the suite."
events:
  -
    type: "status"
    at: "2026-03-14T17:26:03.449Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the two remaining cleanup-merged full-gate timeout failures, inspect the cleanup-merged test budget and fixture behavior around archive deletion and outside-repo worktree refusal, and make the smallest cleanup-scoped fix before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T17:29:37.333Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining cleanup-merged full-gate failures were timeout-only on mutation-heavy fixtures and now use a shared 120s mutation budget."
doc_version: 3
doc_updated_at: "2026-03-14T17:29:37.340Z"
doc_updated_by: "CODER"
description: "Isolate and fix the two remaining full-gate timeout failures in run-cli.core.pr-flow.cleanup-merged.test.ts covering archive deletion and outside-repo worktree refusal, then confirm the cleanup-merged suite stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize remaining cleanup-merged timeout regressions for v0.3.7
    
    Isolate and fix the two remaining full-gate timeout failures in run-cli.core.pr-flow.cleanup-merged.test.ts covering archive deletion and outside-repo worktree refusal, then confirm the cleanup-merged suite stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the two remaining full-gate timeout failures in run-cli.core.pr-flow.cleanup-merged.test.ts covering archive deletion and outside-repo worktree refusal, then confirm the cleanup-merged suite stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize remaining cleanup-merged timeout regressions for v0.3.7".
  Plan: "Reproduce the two remaining cleanup-merged full-gate timeout failures, determine whether the issue is timeout budgeting, heavy archive/worktree fixture setup, or a real cleanup regression, fix only the cleanup-merged surface needed to explain those cases, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: the cleanup-merged suite passes, including the remaining archive-deletion and outside-repo worktree refusal cases.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed cleanup-merged behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T17:29:37.333Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining cleanup-merged full-gate failures were timeout-only on mutation-heavy fixtures and now use a shared 120s mutation budget.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T17:29:32.032Z, excerpt_hash=sha256:2e1aa790ae26ef7c0d09709b26d589f9da2f9c8e13f1d3599c35120feb85bbf1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Facts:
    - The two remaining cleanup-merged failures pass in isolation and in the full cleanup-merged suite.
    - Both affected cases already had behaviorally correct assertions; the only change is assigning a larger shared timeout budget to the mutation-heavy delete/archive and outside-repo worktree refusal paths.
    - The heavy fixtures create and tear down worktrees, branches, and archived PR artifacts, which makes them slower under aggregate release-prepublish load.
    
    Inference:
    - The failure mode was budget exhaustion on mutation-heavy cleanup fixtures, not incorrect cleanup-merged behavior.
    
    Residual risk:
    - Full release-prepublish still needs rerun after the remaining stale-dist task closes.
id_source: "generated"
---
## Summary

Stabilize remaining cleanup-merged timeout regressions for v0.3.7

Isolate and fix the two remaining full-gate timeout failures in run-cli.core.pr-flow.cleanup-merged.test.ts covering archive deletion and outside-repo worktree refusal, then confirm the cleanup-merged suite stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the two remaining full-gate timeout failures in run-cli.core.pr-flow.cleanup-merged.test.ts covering archive deletion and outside-repo worktree refusal, then confirm the cleanup-merged suite stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize remaining cleanup-merged timeout regressions for v0.3.7".

## Plan

Reproduce the two remaining cleanup-merged full-gate timeout failures, determine whether the issue is timeout budgeting, heavy archive/worktree fixture setup, or a real cleanup regression, fix only the cleanup-merged surface needed to explain those cases, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts`. Expected: the cleanup-merged suite passes, including the remaining archive-deletion and outside-repo worktree refusal cases.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed cleanup-merged behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T17:29:37.333Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bun x tsc -b packages/core packages/agentplane. The remaining cleanup-merged full-gate failures were timeout-only on mutation-heavy fixtures and now use a shared 120s mutation budget.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T17:29:32.032Z, excerpt_hash=sha256:2e1aa790ae26ef7c0d09709b26d589f9da2f9c8e13f1d3599c35120feb85bbf1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Facts:
- The two remaining cleanup-merged failures pass in isolation and in the full cleanup-merged suite.
- Both affected cases already had behaviorally correct assertions; the only change is assigning a larger shared timeout budget to the mutation-heavy delete/archive and outside-repo worktree refusal paths.
- The heavy fixtures create and tear down worktrees, branches, and archived PR artifacts, which makes them slower under aggregate release-prepublish load.

Inference:
- The failure mode was budget exhaustion on mutation-heavy cleanup fixtures, not incorrect cleanup-merged behavior.

Residual risk:
- Full release-prepublish still needs rerun after the remaining stale-dist task closes.
