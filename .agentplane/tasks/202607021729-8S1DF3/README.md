---
id: "202607021729-8S1DF3"
title: "Add maximum-assimilation wiki reports and evaluator scenarios"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607021729-BC11BT"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/commands/context packages/agentplane/src/context"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T19:45:04.941Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T19:55:18.833Z"
  updated_by: "CODER"
  note: "Verified maximum-assimilation wiki reports and evaluator scenarios."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T20:15:35.435Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "93fa1f00f617d244656f954e7b601e03de991f0d"
  blueprint_digest: "cb07d80b7a2193ebc6538ff57d95fe3e69563e4134b8c0fa6f1313d2bd58fb3a"
  evidence_refs:
    - ".agentplane/tasks/202607021729-8S1DF3/README.md"
    - ".agentplane/tasks/202607021729-8S1DF3/quality/20260702-201535435-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021729-8S1DF3/quality/20260702-201535435-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021729-8S1DF3/quality/20260702-201535435-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021729-8S1DF3/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit:
  hash: "8c1122745732254f9fea221ccbf9d9144d72cff7"
  message: "🚧 8S1DF3 task: record quality review"
comments:
  -
    author: "CODER"
    body: "Start: implement maximum-assimilation wiki reports and evaluator scenarios."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-02T19:45:58.911Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement maximum-assimilation wiki reports and evaluator scenarios."
  -
    type: "verify"
    at: "2026-07-02T19:55:18.833Z"
    author: "CODER"
    state: "ok"
    note: "Verified maximum-assimilation wiki reports and evaluator scenarios."
  -
    type: "status"
    at: "2026-07-02T20:16:13.475Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-02T20:16:13.476Z"
doc_updated_by: "CODER"
description: "Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints."
sections:
  Summary: |-
    Add maximum-assimilation wiki reports and evaluator scenarios

    Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.
  Scope: |-
    - In scope: Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.
    - Out of scope: unrelated refactors not required for "Add maximum-assimilation wiki reports and evaluator scenarios".
  Plan: |-
    1. Implement the change for "Add maximum-assimilation wiki reports and evaluator scenarios".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/commands/context packages/agentplane/src/context`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T19:55:18.833Z — VERIFY — ok

    By: CODER

    Note: Verified maximum-assimilation wiki reports and evaluator scenarios.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T19:45:58.911Z, excerpt_hash=sha256:3a860a159e86d7bba2c14176fd7e690545eb782e74aad2094671f1a61a3844aa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-8S1DF3-add-maximum-assimilation-wiki-reports-and-evalua/.agentplane/tasks/202607021729-8S1DF3/blueprint/resolved-snapshot.json
    - old_digest: cb07d80b7a2193ebc6538ff57d95fe3e69563e4134b8c0fa6f1313d2bd58fb3a
    - current_digest: cb07d80b7a2193ebc6538ff57d95fe3e69563e4134b8c0fa6f1313d2bd58fb3a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-8S1DF3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-8S1DF3
    - diagnostic_command: agentplane pr check 202607021729-8S1DF3
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added context wiki report generation, required report validation, link/orphan derived reports, and evaluator scenario gates.
      Impact: Maximum-assimilation tasks now fail if the final wiki lacks practical report surfaces or evaluator scenarios that work from wiki/derived entrypoints.
      Resolution: Implemented context wiki report, updated ingest expectations and prompt guidance, and covered good/bad scenarios with context tests.
extensions:
  implementation_commit:
    hash: "93fa1f00f617d244656f954e7b601e03de991f0d"
    message: "🚧 8S1DF3 task: refresh CLI reference"
id_source: "generated"
---
## Summary

Add maximum-assimilation wiki reports and evaluator scenarios

Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.

## Scope

- In scope: Phase 4 from the Context Maximum Assimilation PRD. Add wiki archetype templates/reports, context wiki command support where needed, link/orphan reports, and scenario-based evaluator artifacts for usefulness review without relying on raw-only entrypoints.
- Out of scope: unrelated refactors not required for "Add maximum-assimilation wiki reports and evaluator scenarios".

## Plan

1. Implement the change for "Add maximum-assimilation wiki reports and evaluator scenarios".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/commands/context packages/agentplane/src/context`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T19:55:18.833Z — VERIFY — ok

By: CODER

Note: Verified maximum-assimilation wiki reports and evaluator scenarios.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T19:45:58.911Z, excerpt_hash=sha256:3a860a159e86d7bba2c14176fd7e690545eb782e74aad2094671f1a61a3844aa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-8S1DF3-add-maximum-assimilation-wiki-reports-and-evalua/.agentplane/tasks/202607021729-8S1DF3/blueprint/resolved-snapshot.json
- old_digest: cb07d80b7a2193ebc6538ff57d95fe3e69563e4134b8c0fa6f1313d2bd58fb3a
- current_digest: cb07d80b7a2193ebc6538ff57d95fe3e69563e4134b8c0fa6f1313d2bd58fb3a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-8S1DF3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-8S1DF3
- diagnostic_command: agentplane pr check 202607021729-8S1DF3
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

- Observation: Added context wiki report generation, required report validation, link/orphan derived reports, and evaluator scenario gates.
  Impact: Maximum-assimilation tasks now fail if the final wiki lacks practical report surfaces or evaluator scenarios that work from wiki/derived entrypoints.
  Resolution: Implemented context wiki report, updated ingest expectations and prompt guidance, and covered good/bad scenarios with context tests.
