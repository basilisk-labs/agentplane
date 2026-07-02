---
id: "202607021729-BC11BT"
title: "Enforce maximum-assimilation structural validators"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607021729-1F4FNM"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T19:16:57.371Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T19:25:18.567Z"
  updated_by: "CODER"
  note: "Verified maximum-assimilation structural validators."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T19:25:38.094Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "5a0884d3658a756e8536acd53cde6e08842281a7"
  blueprint_digest: "25e215a9317034cd61e9fe293212cae9681cb701e1ba5ede19c4027908c1a7b3"
  evidence_refs:
    - ".agentplane/tasks/202607021729-BC11BT/README.md"
    - ".agentplane/tasks/202607021729-BC11BT/quality/20260702-192538094-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021729-BC11BT/quality/20260702-192538094-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021729-BC11BT/quality/20260702-192538094-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021729-BC11BT/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing maximum-assimilation structural validators in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-02T19:17:35.071Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing maximum-assimilation structural validators in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-02T19:25:18.567Z"
    author: "CODER"
    state: "ok"
    note: "Verified maximum-assimilation structural validators."
doc_version: 3
doc_updated_at: "2026-07-02T19:25:18.683Z"
doc_updated_by: "CODER"
description: "Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage."
sections:
  Summary: |-
    Enforce maximum-assimilation structural validators

    Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
  Scope: |-
    - In scope: Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
    - Out of scope: unrelated refactors not required for "Enforce maximum-assimilation structural validators".
  Plan: |-
    1. Implement the change for "Enforce maximum-assimilation structural validators".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T19:25:18.567Z — VERIFY — ok

    By: CODER

    Note: Verified maximum-assimilation structural validators.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T19:17:35.071Z, excerpt_hash=sha256:29a2e116cf869f01ff5e471b1de922310a9c4272617a659ffec6ab633bb38068

    Details:

    Passed declared validator tests: bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts. Passed command-level maximum-assimilation verify-task tests, eslint for touched files, format:changed, policy routing, and ap doctor. Validators now enforce span coverage, structured topology, entity-resolution/page-creation ledgers, and wiki graph coherence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-BC11BT-enforce-maximum-assimilation-structural-validato/.agentplane/tasks/202607021729-BC11BT/blueprint/resolved-snapshot.json
    - old_digest: 25e215a9317034cd61e9fe293212cae9681cb701e1ba5ede19c4027908c1a7b3
    - current_digest: 25e215a9317034cd61e9fe293212cae9681cb701e1ba5ede19c4027908c1a7b3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-BC11BT

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-BC11BT
    - diagnostic_command: agentplane pr check 202607021729-BC11BT
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce maximum-assimilation structural validators

Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.

## Scope

- In scope: Phase 3 from the Context Maximum Assimilation PRD. Add validators for span-level coverage, entity-resolution ledger, page-creation ledger, structured topology.plan.json, wiki/graph coherence, and wiki archetypes. Wire them into context verify-task with failure fixtures for missing rows, regex-only topology, no graph refs, and incomplete span coverage.
- Out of scope: unrelated refactors not required for "Enforce maximum-assimilation structural validators".

## Plan

1. Implement the change for "Enforce maximum-assimilation structural validators".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T19:25:18.567Z — VERIFY — ok

By: CODER

Note: Verified maximum-assimilation structural validators.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T19:17:35.071Z, excerpt_hash=sha256:29a2e116cf869f01ff5e471b1de922310a9c4272617a659ffec6ab633bb38068

Details:

Passed declared validator tests: bun test packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation.test.ts packages/agentplane/src/context/verify-task.test.ts. Passed command-level maximum-assimilation verify-task tests, eslint for touched files, format:changed, policy routing, and ap doctor. Validators now enforce span coverage, structured topology, entity-resolution/page-creation ledgers, and wiki graph coherence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-BC11BT-enforce-maximum-assimilation-structural-validato/.agentplane/tasks/202607021729-BC11BT/blueprint/resolved-snapshot.json
- old_digest: 25e215a9317034cd61e9fe293212cae9681cb701e1ba5ede19c4027908c1a7b3
- current_digest: 25e215a9317034cd61e9fe293212cae9681cb701e1ba5ede19c4027908c1a7b3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-BC11BT

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-BC11BT
- diagnostic_command: agentplane pr check 202607021729-BC11BT
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
