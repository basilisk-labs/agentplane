---
id: "202605190941-P1Q6BB"
title: "Wait for release-ready source before manual publish"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T09:43:55.392Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T10:29:16.541Z"
  updated_by: "EVALUATOR"
  note: "Hosted checks are green on PR #3928 for head 55a20724c: Core CI test/test-windows/release-ready manifest, Docs CI, Workflows Lint, Dependency Review, and CodeQL passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T10:29:16.541Z"
  updated_by: "EVALUATOR"
  note: "Hosted checks are green on PR #3928 for head 55a20724c: Core CI test/test-windows/release-ready manifest, Docs CI, Workflows Lint, Dependency Review, and CodeQL passed."
  evaluated_sha: "55a20724ccb6b144a1bee480c863dd945f49ced9"
  blueprint_digest: "c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25"
  evidence_refs:
    - ".agentplane/tasks/202605190941-P1Q6BB/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-P1Q6BB/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement batch release pipeline hardening for P1Q6BB, Y873RA, and 5FPGCV in one primary worktree because publish readiness, release version surfaces, and registry gates share release scripts."
events:
  -
    type: "status"
    at: "2026-05-19T09:44:06.195Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement batch release pipeline hardening for P1Q6BB, Y873RA, and 5FPGCV in one primary worktree because publish readiness, release version surfaces, and registry gates share release scripts."
  -
    type: "verify"
    at: "2026-05-19T09:52:02.954Z"
    author: "CODER"
    state: "ok"
    note: "Verified wait-aware release-ready source path: focused Vitest resolver/workflow contracts passed; publish.yml workflow_dispatch now waits for Core CI before resolving release-ready artifacts."
  -
    type: "verify"
    at: "2026-05-19T10:29:16.541Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Hosted checks are green on PR #3928 for head 55a20724c: Core CI test/test-windows/release-ready manifest, Docs CI, Workflows Lint, Dependency Review, and CodeQL passed."
doc_version: 3
doc_updated_at: "2026-05-19T10:29:16.614Z"
doc_updated_by: "CODER"
description: "Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress."
sections:
  Summary: |-
    Wait for release-ready source before manual publish

    Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.
  Scope: |-
    - In scope: Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.
    - Out of scope: unrelated refactors not required for "Wait for release-ready source before manual publish".
  Plan: "Batch primary task. Implement wait-aware manual publish readiness for exact SHA dispatch. Scope: publish workflow and resolver scripts/tests only. Acceptance: manual dispatch no longer fails immediately while Core CI is in_progress; it waits until release-ready is available or exits with deterministic timeout/failure."
  Verify Steps: |-
    1. Run focused tests for release-ready source waiting. Expected: in-progress Core CI waits, failed Core CI fails with actionable reason, successful Core CI resolves artifact.
    2. Run publish workflow contract tests. Expected: publish.yml contains the wait-aware workflow_dispatch path and preserves workflow_run behavior.
    3. Run release parity/checks touched by publish workflow scripts. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T09:52:02.954Z — VERIFY — ok

    By: CODER

    Note: Verified wait-aware release-ready source path: focused Vitest resolver/workflow contracts passed; publish.yml workflow_dispatch now waits for Core CI before resolving release-ready artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:06.195Z, excerpt_hash=sha256:344757ada18a8a996d1eca55bbad64e92defdb4e4ec95d13d3a451f9817b1d29

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-P1Q6BB/blueprint/resolved-snapshot.json
    - old_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
    - current_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-P1Q6BB

    ### 2026-05-19T10:29:16.541Z — VERIFY — ok

    By: EVALUATOR

    Note: Hosted checks are green on PR #3928 for head 55a20724c: Core CI test/test-windows/release-ready manifest, Docs CI, Workflows Lint, Dependency Review, and CodeQL passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:52:02.975Z, excerpt_hash=sha256:344757ada18a8a996d1eca55bbad64e92defdb4e4ec95d13d3a451f9817b1d29

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-P1Q6BB/blueprint/resolved-snapshot.json
    - old_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
    - current_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-P1Q6BB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bunx vitest --config vitest.workspace.ts run --project agentplane resolve-release-ready-source-script.test.ts publish-workflow-contract.test.ts passed.
      Impact: Manual exact-SHA publish no longer fails just because Core CI is still in progress.
      Resolution: Added --wait/timeout/poll support to resolve-release-ready-source and wired workflow_dispatch publish branches to it.
id_source: "generated"
---
## Summary

Wait for release-ready source before manual publish

Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.

## Scope

- In scope: Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.
- Out of scope: unrelated refactors not required for "Wait for release-ready source before manual publish".

## Plan

Batch primary task. Implement wait-aware manual publish readiness for exact SHA dispatch. Scope: publish workflow and resolver scripts/tests only. Acceptance: manual dispatch no longer fails immediately while Core CI is in_progress; it waits until release-ready is available or exits with deterministic timeout/failure.

## Verify Steps

1. Run focused tests for release-ready source waiting. Expected: in-progress Core CI waits, failed Core CI fails with actionable reason, successful Core CI resolves artifact.
2. Run publish workflow contract tests. Expected: publish.yml contains the wait-aware workflow_dispatch path and preserves workflow_run behavior.
3. Run release parity/checks touched by publish workflow scripts. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T09:52:02.954Z — VERIFY — ok

By: CODER

Note: Verified wait-aware release-ready source path: focused Vitest resolver/workflow contracts passed; publish.yml workflow_dispatch now waits for Core CI before resolving release-ready artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:06.195Z, excerpt_hash=sha256:344757ada18a8a996d1eca55bbad64e92defdb4e4ec95d13d3a451f9817b1d29

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-P1Q6BB/blueprint/resolved-snapshot.json
- old_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
- current_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-P1Q6BB

### 2026-05-19T10:29:16.541Z — VERIFY — ok

By: EVALUATOR

Note: Hosted checks are green on PR #3928 for head 55a20724c: Core CI test/test-windows/release-ready manifest, Docs CI, Workflows Lint, Dependency Review, and CodeQL passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:52:02.975Z, excerpt_hash=sha256:344757ada18a8a996d1eca55bbad64e92defdb4e4ec95d13d3a451f9817b1d29

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-P1Q6BB/blueprint/resolved-snapshot.json
- old_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
- current_digest: c40250d9f7a0b7fcfe51403e9ff7d56913553939bc737e8ff9c981eb2f3f2c25
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-P1Q6BB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bunx vitest --config vitest.workspace.ts run --project agentplane resolve-release-ready-source-script.test.ts publish-workflow-contract.test.ts passed.
  Impact: Manual exact-SHA publish no longer fails just because Core CI is still in progress.
  Resolution: Added --wait/timeout/poll support to resolve-release-ready-source and wired workflow_dispatch publish branches to it.
