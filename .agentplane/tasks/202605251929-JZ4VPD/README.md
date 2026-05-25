---
id: "202605251929-JZ4VPD"
title: "Optimize branch_pr pr check artifact fallback"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T19:30:03.274Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T19:55:06.438Z"
  updated_by: "CODER"
  note: "Verified: pr check now reads branch_pr PR artifacts from a remote-only task branch when the base checkout lacks the local PR packet, while existing stale-local and invalid-artifact checks remain strict. Checks: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; targeted eslint/prettier on changed files. Full lint:core was attempted but terminated after hanging on whole-repo ESLint processes."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-25T20:06:52.914Z"
  updated_by: "EVALUATOR"
  note: "pr check remote fallback now preserves freshness checks while reading PR artifacts from remote-tracking task branches."
  evaluated_sha: "6c617ff834308317ae91cf5f2e18ff6b7c3d3548"
  blueprint_digest: "cc092b3fc4676739bd639bb1db96130b1fb9bbda3d3e0d462299b937ef738d34"
  evidence_refs:
    - ".agentplane/tasks/202605251929-JZ4VPD/README.md"
    - ".agentplane/tasks/202605251929-JZ4VPD/quality/20260525-200652914-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605251929-JZ4VPD/quality/20260525-200652914-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605251929-JZ4VPD/quality/20260525-200652914-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605251929-JZ4VPD/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-check-remote-artifacts.test.ts"
    - "packages/agentplane/src/commands/pr/check.ts"
    - "packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.ts"
  findings:
    - "Addressed review concern: remote-only branch snapshots are no longer marked fresh unconditionally; the regression now builds a fresh remote packet and existing stale-local validation remains strict."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Inspect and optimize branch_pr pr check handling for base-checkout missing PR artifacts while preserving strict failures for genuinely absent task PR metadata."
events:
  -
    type: "status"
    at: "2026-05-25T19:30:35.916Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Inspect and optimize branch_pr pr check handling for base-checkout missing PR artifacts while preserving strict failures for genuinely absent task PR metadata."
  -
    type: "verify"
    at: "2026-05-25T19:55:06.438Z"
    author: "CODER"
    state: "ok"
    note: "Verified: pr check now reads branch_pr PR artifacts from a remote-only task branch when the base checkout lacks the local PR packet, while existing stale-local and invalid-artifact checks remain strict. Checks: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; targeted eslint/prettier on changed files. Full lint:core was attempted but terminated after hanging on whole-repo ESLint processes."
doc_version: 3
doc_updated_at: "2026-05-25T19:55:06.472Z"
doc_updated_by: "CODER"
description: "Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge."
sections:
  Summary: |-
    Optimize branch_pr pr check artifact fallback

    Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.
  Scope: |-
    - In scope: Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.
    - Out of scope: unrelated refactors not required for "Optimize branch_pr pr check artifact fallback".
  Plan: |-
    1. Reproduce and inspect current pr check handling for missing base-checkout PR artifacts in branch_pr mode.
    2. Locate the smallest command-layer change that distinguishes a real missing-artifact failure from a valid GitHub merge path where artifacts are branch-local until merge.
    3. Add focused regression coverage for the route-gap and preserve existing strict failures for genuinely missing PR metadata.
    4. Run targeted tests plus routing policy validation, then record verification evidence.
  Verify Steps: |-
    1. Inspect current `ap pr check` implementation and tests for missing `.agentplane/tasks/<task-id>/pr` artifacts from a base checkout. Expected: the artifact lookup and failure boundary are identified.
    2. Run a focused regression test that models branch_pr base checkout without local PR artifacts but with sufficient GitHub/branch metadata for the permitted merge path. Expected: the optimized behavior passes without weakening true missing-artifact failures.
    3. Run the existing focused PR command test slice covering `pr check`. Expected: no regression in strict artifact validation.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy stays valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T19:55:06.438Z — VERIFY — ok

    By: CODER

    Note: Verified: pr check now reads branch_pr PR artifacts from a remote-only task branch when the base checkout lacks the local PR packet, while existing stale-local and invalid-artifact checks remain strict. Checks: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; targeted eslint/prettier on changed files. Full lint:core was attempted but terminated after hanging on whole-repo ESLint processes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:30:35.916Z, excerpt_hash=sha256:c55c114e31f1b66211b105dad13f2ca7691eee45e0520290e8ac1aeb4b7b09ed

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251929-JZ4VPD-optimize-branch-pr-pr-check-artifact-fallback/.agentplane/tasks/202605251929-JZ4VPD/blueprint/resolved-snapshot.json
    - old_digest: cc092b3fc4676739bd639bb1db96130b1fb9bbda3d3e0d462299b937ef738d34
    - current_digest: cc092b3fc4676739bd639bb1db96130b1fb9bbda3d3e0d462299b937ef738d34
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251929-JZ4VPD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Base-checkout pr check could report missing .agentplane/tasks/<task-id>/pr artifacts even when the task PR artifacts existed on origin/task/<task-id>/... and were expected to land through the hosted GitHub merge path.
      Impact: Integrators could treat a valid hosted merge lane as a local artifact failure, forcing manual GitHub merge decisions outside the route surface.
      Resolution: Resolve task PR artifacts from remote-tracking task branches, read origin/<branch> artifact snapshots, compute branch diffstat from branch metadata when local meta is absent, and allow remote-hosted packets through without weakening local stale-artifact validation.
id_source: "generated"
---
## Summary

Optimize branch_pr pr check artifact fallback

Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.

## Scope

- In scope: Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.
- Out of scope: unrelated refactors not required for "Optimize branch_pr pr check artifact fallback".

## Plan

1. Reproduce and inspect current pr check handling for missing base-checkout PR artifacts in branch_pr mode.
2. Locate the smallest command-layer change that distinguishes a real missing-artifact failure from a valid GitHub merge path where artifacts are branch-local until merge.
3. Add focused regression coverage for the route-gap and preserve existing strict failures for genuinely missing PR metadata.
4. Run targeted tests plus routing policy validation, then record verification evidence.

## Verify Steps

1. Inspect current `ap pr check` implementation and tests for missing `.agentplane/tasks/<task-id>/pr` artifacts from a base checkout. Expected: the artifact lookup and failure boundary are identified.
2. Run a focused regression test that models branch_pr base checkout without local PR artifacts but with sufficient GitHub/branch metadata for the permitted merge path. Expected: the optimized behavior passes without weakening true missing-artifact failures.
3. Run the existing focused PR command test slice covering `pr check`. Expected: no regression in strict artifact validation.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy stays valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T19:55:06.438Z — VERIFY — ok

By: CODER

Note: Verified: pr check now reads branch_pr PR artifacts from a remote-only task branch when the base checkout lacks the local PR packet, while existing stale-local and invalid-artifact checks remain strict. Checks: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; targeted eslint/prettier on changed files. Full lint:core was attempted but terminated after hanging on whole-repo ESLint processes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:30:35.916Z, excerpt_hash=sha256:c55c114e31f1b66211b105dad13f2ca7691eee45e0520290e8ac1aeb4b7b09ed

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251929-JZ4VPD-optimize-branch-pr-pr-check-artifact-fallback/.agentplane/tasks/202605251929-JZ4VPD/blueprint/resolved-snapshot.json
- old_digest: cc092b3fc4676739bd639bb1db96130b1fb9bbda3d3e0d462299b937ef738d34
- current_digest: cc092b3fc4676739bd639bb1db96130b1fb9bbda3d3e0d462299b937ef738d34
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251929-JZ4VPD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Base-checkout pr check could report missing .agentplane/tasks/<task-id>/pr artifacts even when the task PR artifacts existed on origin/task/<task-id>/... and were expected to land through the hosted GitHub merge path.
  Impact: Integrators could treat a valid hosted merge lane as a local artifact failure, forcing manual GitHub merge decisions outside the route surface.
  Resolution: Resolve task PR artifacts from remote-tracking task branches, read origin/<branch> artifact snapshots, compute branch diffstat from branch metadata when local meta is absent, and allow remote-hosted packets through without weakening local stale-artifact validation.
