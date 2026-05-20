---
id: "202605200826-947S9Q"
title: "Unblock hosted close-tail PR verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T08:27:08.676Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T09:28:41.599Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR verification and Release-ready manifest; local workflow lint, protection contract, routing, diff check, typecheck, and targeted workflow tests passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T09:28:41.599Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR verification and Release-ready manifest; local workflow lint, protection contract, routing, diff check, typecheck, and targeted workflow tests passed."
  evaluated_sha: "2a316c63ec0ebfdbdc26c08b5d9604762244ddc9"
  blueprint_digest: "655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e"
  evidence_refs:
    - ".agentplane/tasks/202605200826-947S9Q/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add hosted-close generated PR verification check-run so task-close branches created by Actions can satisfy protected-main required checks."
events:
  -
    type: "status"
    at: "2026-05-20T08:27:18.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add hosted-close generated PR verification check-run so task-close branches created by Actions can satisfy protected-main required checks."
  -
    type: "verify"
    at: "2026-05-20T09:02:20.206Z"
    author: "CODER"
    state: "ok"
    note: "Workflow/release gate fix verified locally and on PR #3962. Evidence: targeted Vitest contract suite passed, docs-only fast route passed without recipes submodule inventory, broad ci:local:fast completed locally, typecheck passed, hosted PR checks passed."
  -
    type: "verify"
    at: "2026-05-20T09:02:22.817Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for implementation commit c2b1520b73037e905375aa84aab2a42d13eb9807. Hosted checks on PR #3962 are green, including PR verification and Release-ready manifest; local verification covers publish ordering, hosted-close check-run contract, docs-only fast route, build-before-cold-baseline, typecheck, and policy routing."
  -
    type: "verify"
    at: "2026-05-20T09:28:41.599Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR verification and Release-ready manifest; local workflow lint, protection contract, routing, diff check, typecheck, and targeted workflow tests passed."
doc_version: 3
doc_updated_at: "2026-05-20T09:28:41.616Z"
doc_updated_by: "CODER"
description: "Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI."
sections:
  Summary: |-
    Unblock hosted close-tail PR verification

    Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
  Scope: |-
    - In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
    - Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".
  Plan: |-
    Plan:
    1. Extend task-hosted-close workflow permissions with checks:write.
    2. After creating or recovering a hosted closure PR, validate the deterministic closure SHA and create a GitHub Actions check-run named PR verification for that exact head SHA.
    3. Update workflow contract tests to require the check-run route.
    4. Run focused tests and policy routing, then publish/merge via branch_pr.
    5. Backfill the same check-run for the already-open close-tail PR #3960 if needed after the fix is merged.
  Verify Steps: |-
    1. `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts` passes.
    2. `node .agentplane/policy/check-routing.mjs` passes.
    3. `git diff --check` passes.
    4. `bun run format:changed` passes.
    5. `bun run --filter=agentplane typecheck` passes.
    6. Hosted #3960 close-tail recovery is triggered by user reopen or future workflow-created check-run.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T09:02:20.206Z — VERIFY — ok

    By: CODER

    Note: Workflow/release gate fix verified locally and on PR #3962. Evidence: targeted Vitest contract suite passed, docs-only fast route passed without recipes submodule inventory, broad ci:local:fast completed locally, typecheck passed, hosted PR checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:30:30.967Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
    - old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200826-947S9Q

    ### 2026-05-20T09:02:22.817Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for implementation commit c2b1520b73037e905375aa84aab2a42d13eb9807. Hosted checks on PR #3962 are green, including PR verification and Release-ready manifest; local verification covers publish ordering, hosted-close check-run contract, docs-only fast route, build-before-cold-baseline, typecheck, and policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T09:02:20.223Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
    - old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200826-947S9Q

    ### 2026-05-20T09:28:41.599Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR verification and Release-ready manifest; local workflow lint, protection contract, routing, diff check, typecheck, and targeted workflow tests passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T09:02:22.832Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
    - old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200826-947S9Q

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Publish release failed on pre-close DOING because task-registry check ran before release-ready artifact resolution; hosted close-tail PRs from GITHUB_TOKEN also lacked required PR verification.
      Impact: Release workflow_run could fail noisily during the close-tail window and close-tail PRs could stay blocked under protected main.
      Resolution: Publish now resolves release-ready source first and gates registry/incidents checks on release_ready_ok=true; hosted close-tail workflow records a GitHub App PR verification check-run for deterministic close PR heads; local CI builds before cold baseline and skips recipes inventory in docs-only fast.
id_source: "generated"
---
## Summary

Unblock hosted close-tail PR verification

Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.

## Scope

- In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
- Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".

## Plan

Plan:
1. Extend task-hosted-close workflow permissions with checks:write.
2. After creating or recovering a hosted closure PR, validate the deterministic closure SHA and create a GitHub Actions check-run named PR verification for that exact head SHA.
3. Update workflow contract tests to require the check-run route.
4. Run focused tests and policy routing, then publish/merge via branch_pr.
5. Backfill the same check-run for the already-open close-tail PR #3960 if needed after the fix is merged.

## Verify Steps

1. `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts` passes.
2. `node .agentplane/policy/check-routing.mjs` passes.
3. `git diff --check` passes.
4. `bun run format:changed` passes.
5. `bun run --filter=agentplane typecheck` passes.
6. Hosted #3960 close-tail recovery is triggered by user reopen or future workflow-created check-run.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T09:02:20.206Z — VERIFY — ok

By: CODER

Note: Workflow/release gate fix verified locally and on PR #3962. Evidence: targeted Vitest contract suite passed, docs-only fast route passed without recipes submodule inventory, broad ci:local:fast completed locally, typecheck passed, hosted PR checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:30:30.967Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
- old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200826-947S9Q

### 2026-05-20T09:02:22.817Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for implementation commit c2b1520b73037e905375aa84aab2a42d13eb9807. Hosted checks on PR #3962 are green, including PR verification and Release-ready manifest; local verification covers publish ordering, hosted-close check-run contract, docs-only fast route, build-before-cold-baseline, typecheck, and policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T09:02:20.223Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
- old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200826-947S9Q

### 2026-05-20T09:28:41.599Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR verification and Release-ready manifest; local workflow lint, protection contract, routing, diff check, typecheck, and targeted workflow tests passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T09:02:22.832Z, excerpt_hash=sha256:bf08ab5192fc0c484da09373fe9137a5a7e11b47676b939495f3ec5b00045cd6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200826-947S9Q-hosted-close-pr-verification/.agentplane/tasks/202605200826-947S9Q/blueprint/resolved-snapshot.json
- old_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- current_digest: 655c724346ac3b26a4318dcfcbbfb050cef48b19bbdead30f51c9d53ae95617e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200826-947S9Q

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Publish release failed on pre-close DOING because task-registry check ran before release-ready artifact resolution; hosted close-tail PRs from GITHUB_TOKEN also lacked required PR verification.
  Impact: Release workflow_run could fail noisily during the close-tail window and close-tail PRs could stay blocked under protected main.
  Resolution: Publish now resolves release-ready source first and gates registry/incidents checks on release_ready_ok=true; hosted close-tail workflow records a GitHub App PR verification check-run for deterministic close PR heads; local CI builds before cold baseline and skips recipes inventory in docs-only fast.
