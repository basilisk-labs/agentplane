---
id: "202607021729-QWQRZY"
title: "Create context task pack and source span skeleton"
result_summary: "Merged via PR #4537."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607021729-C07EE3"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T18:12:15.333Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T18:17:57.690Z"
  updated_by: "CODER"
  note: "Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite, policy routing, and doctor passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T18:17:59.397Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "05ee70cd03e0778827d936f215d7eb5be613a6fe"
  blueprint_digest: "187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e"
  evidence_refs:
    - ".agentplane/tasks/202607021729-QWQRZY/README.md"
    - ".agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit:
  hash: "838282055006bf5824c7e859fd05e0e7c59b8c51"
  message: "Merge pull request #4537 from basilisk-labs/task/202607021729-QWQRZY/context-task-pack-source-spans"
comments:
  -
    author: "CODER"
    body: "Start: implementing deterministic source span skeleton and context task pack artifacts for maximum-assimilation ingest."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4537 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-07-02T18:12:34.309Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing deterministic source span skeleton and context task pack artifacts for maximum-assimilation ingest."
  -
    type: "verify"
    at: "2026-07-02T18:17:03.147Z"
    author: "CODER"
    state: "ok"
    note: "Verified: source span skeleton and task pack tests passed; context release-readiness suite passed; policy routing passed; ap doctor passed with only pre-existing DONE-task commit-hash warnings."
  -
    type: "verify"
    at: "2026-07-02T18:17:57.690Z"
    author: "CODER"
    state: "ok"
    note: "Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite, policy routing, and doctor passed."
  -
    type: "status"
    at: "2026-07-02T18:33:43.214Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4537 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-07-02T18:33:43.219Z"
doc_updated_by: "INTEGRATOR"
description: "Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation."
sections:
  Summary: |-
    Create context task pack and source span skeleton

    Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
  Scope: |-
    - In scope: Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
    - Out of scope: unrelated refactors not required for "Create context task pack and source span skeleton".
  Plan: "Implement Phase 1 of the Context Maximum Assimilation PRD. Scope: add deterministic source span skeleton generation, create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json during context ingest, add those files to context task allowed outputs, and cover stable span IDs plus task pack creation with focused tests. Acceptance: source span IDs are stable for identical span text despite line movement; unsupported/non-text sources are represented in source lock but do not produce semantic spans; created maximum-assimilation tasks include pack artifact paths in allowed outputs and references; checks: bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts, node .agentplane/policy/check-routing.mjs, ap doctor."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts`. Expected: stable source span IDs and task pack artifact creation pass.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
    3. Run `ap doctor`. Expected: doctor OK, with only pre-existing unrelated warnings if present.
    4. Inspect generated task extension/allowed outputs in tests. Expected: source lock, canonical snapshot, source span skeleton, context pack, and expected artifacts are task-bound and allowed for maximum-assimilation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T18:17:03.147Z — VERIFY — ok

    By: CODER

    Note: Verified: source span skeleton and task pack tests passed; context release-readiness suite passed; policy routing passed; ap doctor passed with only pre-existing DONE-task commit-hash warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:12:34.309Z, excerpt_hash=sha256:57f235648e50a9925c0f249a6e4037d717eca9f413fc89223e27a8141e058478

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-QWQRZY-context-task-pack-source-spans/.agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
    - old_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
    - current_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-QWQRZY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-QWQRZY
    - diagnostic_command: agentplane pr check 202607021729-QWQRZY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-02T18:17:57.690Z — VERIFY — ok

    By: CODER

    Note: Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite, policy routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:17:03.451Z, excerpt_hash=sha256:57f235648e50a9925c0f249a6e4037d717eca9f413fc89223e27a8141e058478

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-QWQRZY-context-task-pack-source-spans/.agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
    - old_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
    - current_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-QWQRZY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-QWQRZY
    - diagnostic_command: agentplane pr check 202607021729-QWQRZY
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
    - Observation: context ingest now creates task-bound source lock, canonical snapshot, source span skeleton, context pack, and expected artifact contract after CURATOR task creation.
      Impact: CURATOR receives deterministic structured input before semantic maximum-assimilation work begins.
      Resolution: Added source-spans builder, task pack writer, allowed outputs, and focused tests.

    - Observation: PR artifact refresh changed the branch head after initial verification.
      Impact: Verification is now recorded against the current implementation head.
      Resolution: Re-recorded verification before PR check.
id_source: "generated"
---
## Summary

Create context task pack and source span skeleton

Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.

## Scope

- In scope: Phase 1 from the Context Maximum Assimilation PRD. Add deterministic source span skeleton generation and make context ingest create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json. Extend context task allowed outputs for these files and add tests for stable span IDs and task pack creation.
- Out of scope: unrelated refactors not required for "Create context task pack and source span skeleton".

## Plan

Implement Phase 1 of the Context Maximum Assimilation PRD. Scope: add deterministic source span skeleton generation, create task-bound context-pack.md, canonical-snapshot.json, source-set.lock.json, source-spans.skeleton.jsonl, and expected-artifacts.json during context ingest, add those files to context task allowed outputs, and cover stable span IDs plus task pack creation with focused tests. Acceptance: source span IDs are stable for identical span text despite line movement; unsupported/non-text sources are represented in source lock but do not produce semantic spans; created maximum-assimilation tasks include pack artifact paths in allowed outputs and references; checks: bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts, node .agentplane/policy/check-routing.mjs, ap doctor.

## Verify Steps

1. Run `bun test packages/agentplane/src/context/source-spans.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts`. Expected: stable source span IDs and task pack artifact creation pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
3. Run `ap doctor`. Expected: doctor OK, with only pre-existing unrelated warnings if present.
4. Inspect generated task extension/allowed outputs in tests. Expected: source lock, canonical snapshot, source span skeleton, context pack, and expected artifacts are task-bound and allowed for maximum-assimilation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T18:17:03.147Z — VERIFY — ok

By: CODER

Note: Verified: source span skeleton and task pack tests passed; context release-readiness suite passed; policy routing passed; ap doctor passed with only pre-existing DONE-task commit-hash warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:12:34.309Z, excerpt_hash=sha256:57f235648e50a9925c0f249a6e4037d717eca9f413fc89223e27a8141e058478

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-QWQRZY-context-task-pack-source-spans/.agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
- old_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
- current_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-QWQRZY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-QWQRZY
- diagnostic_command: agentplane pr check 202607021729-QWQRZY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-02T18:17:57.690Z — VERIFY — ok

By: CODER

Note: Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite, policy routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:17:03.451Z, excerpt_hash=sha256:57f235648e50a9925c0f249a6e4037d717eca9f413fc89223e27a8141e058478

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-QWQRZY-context-task-pack-source-spans/.agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
- old_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
- current_digest: 187367b3f6a11d09e7d9e6ccde1ec2eec93f325cf70dcfd0aec8f60da0623c9e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-QWQRZY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-QWQRZY
- diagnostic_command: agentplane pr check 202607021729-QWQRZY
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

- Observation: context ingest now creates task-bound source lock, canonical snapshot, source span skeleton, context pack, and expected artifact contract after CURATOR task creation.
  Impact: CURATOR receives deterministic structured input before semantic maximum-assimilation work begins.
  Resolution: Added source-spans builder, task pack writer, allowed outputs, and focused tests.

- Observation: PR artifact refresh changed the branch head after initial verification.
  Impact: Verification is now recorded against the current implementation head.
  Resolution: Re-recorded verification before PR check.
