---
id: "202607251433-75Q4J6"
title: "Restore shared guard invariant after KnowledgeRef merge"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "reliability"
  - "v0.7"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T14:34:16.576Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-25T18:33:50.295Z"
  updated_by: "TESTER"
  note: "Rebased head 49e981cc passes guards:check, 48 focused KnowledgeRef tests, typecheck, full and changed format checks, lint:core, critical CLI 11/11, routing, doctor, knip baseline, and hotspot thresholds."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T18:36:26.086Z"
  updated_by: "EVALUATOR"
  note: "Rebased implementation head restores the canonical shared guard invariant without KnowledgeRef behavior or public API drift; policy registries are excluded from the final diff."
  evaluated_sha: "49e981cc1944cf9577b2e95f077f40044e2ac3f2"
  blueprint_digest: "1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542"
  evidence_refs:
    - ".agentplane/tasks/202607251433-75Q4J6/README.md"
    - ".agentplane/tasks/202607251433-75Q4J6/quality/20260725-183626086-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607251433-75Q4J6/quality/20260725-183626086-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607251433-75Q4J6/quality/20260725-183626086-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json"
    - "49e981cc; git diff --check origin/main...49e981cc; bun run guards:check; bun test packages/core/src/runner/knowledge-ref.test.ts packages/agentplane/src/context/knowledge-ref.test.ts (48 pass); bun run typecheck; bun run format:check; bun run lint:core; bun run test:critical (11/11); node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run knip:check; bun run hotspots:check"
  findings:
    - "packages/agentplane/src/context/knowledge-ref.ts imports the canonical isRecord guard and removes only the local duplicate; focused and full contract checks pass on 49e981cc."
commit:
  hash: "b42001106254cc4f203013e00d8affa0976cfa8a"
  message: "🧪 75Q4J6 task: pre-merge closure"
comments:
  -
    author: "CODER"
    body: "Start: restore the canonical shared guard invariant with a surgical KnowledgeRef change."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T14:34:50.766Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore the canonical shared guard invariant with a surgical KnowledgeRef change."
  -
    type: "verify"
    at: "2026-07-25T14:39:38.105Z"
    author: "TESTER"
    state: "ok"
    note: "Exact head 1a41d3bd7: guards:check passed; KnowledgeRef core 38/38 and agentplane 10/10 passed; typecheck, lint:core, critical 72/72, knip, hotspots, format, routing, and doctor passed."
  -
    type: "verify"
    at: "2026-07-25T16:50:28.218Z"
    author: "TESTER"
    state: "ok"
    note: "After code-route correction to code.branch_pr, independently reran guards:check (shared guards and trust ratchet OK), KnowledgeRef core 38/38, agentplane 10/10, and typecheck; all passed. The product diff only imports canonical shared isRecord and removes the local helper."
  -
    type: "status"
    at: "2026-07-25T16:56:25.069Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T17:01:24.439Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T18:33:50.295Z"
    author: "TESTER"
    state: "ok"
    note: "Rebased head 49e981cc passes guards:check, 48 focused KnowledgeRef tests, typecheck, full and changed format checks, lint:core, critical CLI 11/11, routing, doctor, knip baseline, and hotspot thresholds."
  -
    type: "status"
    at: "2026-07-25T18:39:25.567Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T18:39:25.568Z"
doc_updated_by: "CODER"
description: "Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration."
sections:
  Summary: |-
    Restore shared guard invariant after KnowledgeRef merge

    Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.
  Scope: |-
    - In scope: Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.
    - Out of scope: unrelated refactors not required for "Restore shared guard invariant after KnowledgeRef merge".
  Plan: "1. Reproduce guards:check on current main and confirm the violation is inherited from KnowledgeRef. 2. Replace the local isRecord definition with the canonical shared guard import without changing KnowledgeRef behavior. 3. Add or adjust focused coverage only if existing tests do not protect behavior. 4. Verify guards:check, focused KnowledgeRef tests, typecheck, format, lint, and critical tests. 5. Publish, review, integrate, and confirm main is green before rebasing RF06b."
  Verify Steps: "1. From current main, bun run guards:check passes and reports no local isRecord definitions outside the canonical allowlist. 2. KnowledgeRef resolution behavior remains unchanged: core and agentplane focused KnowledgeRef suites pass, including missing/stale/content withholding cases. 3. The product diff is limited to using the canonical shared guard plus task/PR artifacts; no schema or public API changes. 4. bun run typecheck, bun run format:changed, bun run lint:core, and bun run test:critical pass. 5. Hosted PR checks pass on the exact published head and merged main independently passes bun run guards:check."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T14:39:38.105Z — VERIFY — ok

    By: TESTER

    Note: Exact head 1a41d3bd7: guards:check passed; KnowledgeRef core 38/38 and agentplane 10/10 passed; typecheck, lint:core, critical 72/72, knip, hotspots, format, routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T14:37:25.360Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
    - old_digest: a21e9997108b80409fcab3629d9b97ff46ee6b8d238c79cbd4e133927187f8f1
    - current_digest: a21e9997108b80409fcab3629d9b97ff46ee6b8d238c79cbd4e133927187f8f1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607251433-75Q4J6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T16:50:28.218Z — VERIFY — ok

    By: TESTER

    Note: After code-route correction to code.branch_pr, independently reran guards:check (shared guards and trust ratchet OK), KnowledgeRef core 38/38, agentplane 10/10, and typecheck; all passed. The product diff only imports canonical shared isRecord and removes the local helper.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T14:39:38.510Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
    - old_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
    - current_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T18:33:50.295Z — VERIFY — ok

    By: TESTER

    Note: Rebased head 49e981cc passes guards:check, 48 focused KnowledgeRef tests, typecheck, full and changed format checks, lint:core, critical CLI 11/11, routing, doctor, knip baseline, and hotspot thresholds.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T17:01:24.439Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
    - old_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
    - current_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Main introduced a local isRecord helper in KnowledgeRef while guards:check forbids local guard definitions.
      Impact: The global guard gate fails on main and blocks RF06b verification even though RF06b did not cause the violation.
      Resolution: Import the canonical shared guard and remove the duplicate helper; retain existing KnowledgeRef behavior and tests.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The diff replaces only the duplicate local isRecord helper with the canonical shared import.
      Impact: Main guard invariants are restored without schema, API, or KnowledgeRef behavior changes.
      Resolution: Accept the implementation for hosted verification and integration.
extensions:
  implementation_commit:
    hash: "49e981cc1944cf9577b2e95f077f40044e2ac3f2"
    message: "🧩 75Q4J6 reliability: retain D9 incident registry format"
id_source: "generated"
---
## Summary

Restore shared guard invariant after KnowledgeRef merge

Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.

## Scope

- In scope: Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.
- Out of scope: unrelated refactors not required for "Restore shared guard invariant after KnowledgeRef merge".

## Plan

1. Reproduce guards:check on current main and confirm the violation is inherited from KnowledgeRef. 2. Replace the local isRecord definition with the canonical shared guard import without changing KnowledgeRef behavior. 3. Add or adjust focused coverage only if existing tests do not protect behavior. 4. Verify guards:check, focused KnowledgeRef tests, typecheck, format, lint, and critical tests. 5. Publish, review, integrate, and confirm main is green before rebasing RF06b.

## Verify Steps

1. From current main, bun run guards:check passes and reports no local isRecord definitions outside the canonical allowlist. 2. KnowledgeRef resolution behavior remains unchanged: core and agentplane focused KnowledgeRef suites pass, including missing/stale/content withholding cases. 3. The product diff is limited to using the canonical shared guard plus task/PR artifacts; no schema or public API changes. 4. bun run typecheck, bun run format:changed, bun run lint:core, and bun run test:critical pass. 5. Hosted PR checks pass on the exact published head and merged main independently passes bun run guards:check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T14:39:38.105Z — VERIFY — ok

By: TESTER

Note: Exact head 1a41d3bd7: guards:check passed; KnowledgeRef core 38/38 and agentplane 10/10 passed; typecheck, lint:core, critical 72/72, knip, hotspots, format, routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T14:37:25.360Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
- old_digest: a21e9997108b80409fcab3629d9b97ff46ee6b8d238c79cbd4e133927187f8f1
- current_digest: a21e9997108b80409fcab3629d9b97ff46ee6b8d238c79cbd4e133927187f8f1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607251433-75Q4J6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T16:50:28.218Z — VERIFY — ok

By: TESTER

Note: After code-route correction to code.branch_pr, independently reran guards:check (shared guards and trust ratchet OK), KnowledgeRef core 38/38, agentplane 10/10, and typecheck; all passed. The product diff only imports canonical shared isRecord and removes the local helper.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T14:39:38.510Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
- old_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
- current_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T18:33:50.295Z — VERIFY — ok

By: TESTER

Note: Rebased head 49e981cc passes guards:check, 48 focused KnowledgeRef tests, typecheck, full and changed format checks, lint:core, critical CLI 11/11, routing, doctor, knip baseline, and hotspot thresholds.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T17:01:24.439Z, excerpt_hash=sha256:4532a1505cf6b26d06fd9189ef23786be89208db1bc3333737c3d572e2cd2949

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607251433-75Q4J6-restore-shared-guard-invariant-after-knowledgere/.agentplane/tasks/202607251433-75Q4J6/blueprint/resolved-snapshot.json
- old_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
- current_digest: 1e2e2632ef39a09f572be489bc3d4db81392456ecbcbdfedcae52c8cb4742542
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607251433-75Q4J6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Main introduced a local isRecord helper in KnowledgeRef while guards:check forbids local guard definitions.
  Impact: The global guard gate fails on main and blocks RF06b verification even though RF06b did not cause the violation.
  Resolution: Import the canonical shared guard and remove the duplicate helper; retain existing KnowledgeRef behavior and tests.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The diff replaces only the duplicate local isRecord helper with the canonical shared import.
  Impact: Main guard invariants are restored without schema, API, or KnowledgeRef behavior changes.
  Resolution: Accept the implementation for hosted verification and integration.
