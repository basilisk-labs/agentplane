---
id: "202605240804-G1QZPR"
title: "Fix branch_pr publication edge cases"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "bug"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-24T08:04:43.265Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-24T09:30:18.180Z"
  updated_by: "EVALUATOR"
  note: "Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T09:30:19.833Z"
  updated_by: "EVALUATOR"
  note: "Branch_pr publication edge cases are fixed and verified after rebase."
  evaluated_sha: "acd0cf53b4fa1932c1b15f520d2fa01fac64128b"
  blueprint_digest: "b2da0249c3c7f332ac369e5c145b4342f350a250ea9c3156f32f924ec2841da5"
  evidence_refs:
    - ".agentplane/tasks/202605240804-G1QZPR/README.md"
    - ".agentplane/tasks/202605240804-G1QZPR/quality/20260524-093019833-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605240804-G1QZPR/quality/20260524-093019833-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605240804-G1QZPR/quality/20260524-093019833-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
    - "packages/agentplane/src/commands/pr/internal/auto-commit.ts"
    - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
    - "packages/testkit/src/cli-harness.ts"
  findings:
    - "Local routed verification passes on the same mixed backend/pr/pr-integrate test set that failed in hosted CI."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing approved branch_pr publication edge-case fixes for GitHub issues #4123, #4124, and #4125 in the dedicated worktree."
events:
  -
    type: "status"
    at: "2026-05-24T08:06:48.056Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing approved branch_pr publication edge-case fixes for GitHub issues #4123, #4124, and #4125 in the dedicated worktree."
  -
    type: "verify"
    at: "2026-05-24T08:46:09.043Z"
    author: "CODER"
    state: "ok"
    note: "Command: ap task verify-show 202605240804-G1QZPR; Result: pass; Evidence: Verify Steps and blueprint snapshot current. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold passed and oversized baseline OK. Command: bunx prettier --check changed files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass; Evidence: doctor OK with repo-local-handoff info only."
  -
    type: "verify"
    at: "2026-05-24T08:49:06.285Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: independent review of diff for GitHub issues #4123/#4124/#4125; Result: pass; Evidence: API auto-merge fallback skips GraphQL MERGE when pullRequestId is unresolved, handoff-only task dirs are ignored without suppressing malformed README warnings, and PR artifact amend now requires same-task implementation paths. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK after moving handoff regression into a new focused file. Command: prettier check and policy routing; Result: pass. Command: ap doctor; Result: pass with repo-local-handoff info only."
  -
    type: "verify"
    at: "2026-05-24T09:30:18.180Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks."
doc_version: 3
doc_updated_at: "2026-05-24T09:30:18.199Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting."
sections:
  Summary: |-
    Fix branch_pr publication edge cases

    Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.
  Scope: |-
    - In scope: Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.
    - Out of scope: unrelated refactors not required for "Fix branch_pr publication edge cases".
  Plan: "Fix the three open GitHub issues as one branch_pr code task. Scope: (1) guard GitHub API auto-merge fallback so it never calls enablePullRequestAutoMerge with an unresolved/empty pullRequestId and preserves prior failure diagnostics, (2) make local task scans ignore or reconcile handoff-only task directories without README.md so normal task list/active output stays quiet, and (3) restrict pr-open artifact auto-amend so it only amends an implementation commit for the same task, otherwise creates/uses a safer artifact commit path. Add focused regression tests for all three issues, update Verify Steps, run task verify-show, targeted tests, build/type checks as needed, hotspot/routing checks, and hosted PR checks. Close GitHub issues #4123, #4124, and #4125 only after merge evidence."
  Verify Steps: |-
    1. Inspect changed branch_pr publication paths. Expected: GitHub API merge fallback never calls auto-merge with an unresolved pullRequestId; local task scans ignore handoff-only task dirs without hiding malformed README dirs; PR artifact auto-commit amends only same-task implementation commits.
    2. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: focused regression suite passes.
    3. Run `bun run --filter=agentplane build`. Expected: agentplane package builds cleanly.
    4. Run `bun run hotspots:check`. Expected: hotspot and oversized-test gates pass.
    5. Run `bunx prettier --check packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts`. Expected: changed files are formatted.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
    7. Run `ap doctor`. Expected: doctor reports OK or only unrelated pre-existing warnings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-24T08:46:09.043Z — VERIFY — ok

    By: CODER

    Note: Command: ap task verify-show 202605240804-G1QZPR; Result: pass; Evidence: Verify Steps and blueprint snapshot current. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold passed and oversized baseline OK. Command: bunx prettier --check changed files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass; Evidence: doctor OK with repo-local-handoff info only.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:37:25.925Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
    - old_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
    - current_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

    ### 2026-05-24T08:49:06.285Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: independent review of diff for GitHub issues #4123/#4124/#4125; Result: pass; Evidence: API auto-merge fallback skips GraphQL MERGE when pullRequestId is unresolved, handoff-only task dirs are ignored without suppressing malformed README warnings, and PR artifact amend now requires same-task implementation paths. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK after moving handoff regression into a new focused file. Command: prettier check and policy routing; Result: pass. Command: ap doctor; Result: pass with repo-local-handoff info only.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:46:09.360Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
    - old_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
    - current_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

    ### 2026-05-24T09:30:18.180Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:49:07.514Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
    - old_digest: b2da0249c3c7f332ac369e5c145b4342f350a250ea9c3156f32f924ec2841da5
    - current_digest: b2da0249c3c7f332ac369e5c145b4342f350a250ea9c3156f32f924ec2841da5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Focused regressions, hosted-routed vitest list, build, lint, prettier, hotspots, policy routing, and doctor passed locally after rebase onto origin/main.
      Impact: Covers GitHub API auto-merge fallback, handoff-only task directory scans, PR artifact auto-commit ownership, and current evaluator quality-review test fixtures.
      Resolution: Ready for hosted PR verification.
id_source: "generated"
---
## Summary

Fix branch_pr publication edge cases

Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.

## Scope

- In scope: Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.
- Out of scope: unrelated refactors not required for "Fix branch_pr publication edge cases".

## Plan

Fix the three open GitHub issues as one branch_pr code task. Scope: (1) guard GitHub API auto-merge fallback so it never calls enablePullRequestAutoMerge with an unresolved/empty pullRequestId and preserves prior failure diagnostics, (2) make local task scans ignore or reconcile handoff-only task directories without README.md so normal task list/active output stays quiet, and (3) restrict pr-open artifact auto-amend so it only amends an implementation commit for the same task, otherwise creates/uses a safer artifact commit path. Add focused regression tests for all three issues, update Verify Steps, run task verify-show, targeted tests, build/type checks as needed, hotspot/routing checks, and hosted PR checks. Close GitHub issues #4123, #4124, and #4125 only after merge evidence.

## Verify Steps

1. Inspect changed branch_pr publication paths. Expected: GitHub API merge fallback never calls auto-merge with an unresolved pullRequestId; local task scans ignore handoff-only task dirs without hiding malformed README dirs; PR artifact auto-commit amends only same-task implementation commits.
2. Run `bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: focused regression suite passes.
3. Run `bun run --filter=agentplane build`. Expected: agentplane package builds cleanly.
4. Run `bun run hotspots:check`. Expected: hotspot and oversized-test gates pass.
5. Run `bunx prettier --check packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts`. Expected: changed files are formatted.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
7. Run `ap doctor`. Expected: doctor reports OK or only unrelated pre-existing warnings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-24T08:46:09.043Z — VERIFY — ok

By: CODER

Note: Command: ap task verify-show 202605240804-G1QZPR; Result: pass; Evidence: Verify Steps and blueprint snapshot current. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold passed and oversized baseline OK. Command: bunx prettier --check changed files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: pass; Evidence: doctor OK with repo-local-handoff info only.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:37:25.925Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
- old_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
- current_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

### 2026-05-24T08:49:06.285Z — VERIFY — ok

By: EVALUATOR

Note: Command: independent review of diff for GitHub issues #4123/#4124/#4125; Result: pass; Evidence: API auto-merge fallback skips GraphQL MERGE when pullRequestId is unresolved, handoff-only task dirs are ignored without suppressing malformed README warnings, and PR artifact amend now requires same-task implementation paths. Command: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 16 tests passed. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK after moving handoff regression into a new focused file. Command: prettier check and policy routing; Result: pass. Command: ap doctor; Result: pass with repo-local-handoff info only.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:46:09.360Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
- old_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
- current_digest: cf8ad8e2a7708897f0e2310323b155af95d39e2e66c2bbefac4d10d16327f744
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

### 2026-05-24T09:30:18.180Z — VERIFY — ok

By: EVALUATOR

Note: Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T08:49:07.514Z, excerpt_hash=sha256:b2c466b9bc670a608e06439448689186b3cce587d0d8c6f4efa552c81b854c57

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240804-G1QZPR-fix-publication-edge-cases/.agentplane/tasks/202605240804-G1QZPR/blueprint/resolved-snapshot.json
- old_digest: b2da0249c3c7f332ac369e5c145b4342f350a250ea9c3156f32f924ec2841da5
- current_digest: b2da0249c3c7f332ac369e5c145b4342f350a250ea9c3156f32f924ec2841da5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240804-G1QZPR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Focused regressions, hosted-routed vitest list, build, lint, prettier, hotspots, policy routing, and doctor passed locally after rebase onto origin/main.
  Impact: Covers GitHub API auto-merge fallback, handoff-only task directory scans, PR artifact auto-commit ownership, and current evaluator quality-review test fixtures.
  Resolution: Ready for hosted PR verification.
