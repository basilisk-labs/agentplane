---
id: "202607021729-C07EE3"
title: "Force context ingest to maximum-assimilation"
result_summary: "Merged via PR #4535."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T17:30:35.852Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T17:50:28.326Z"
  updated_by: "CODER"
  note: "Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and ci:local:fast passed on the task branch."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T17:50:59.377Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "73036dac341d75944fa9ced50f7e92840890c474"
  blueprint_digest: "6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870"
  evidence_refs:
    - ".agentplane/tasks/202607021729-C07EE3/README.md"
    - ".agentplane/tasks/202607021729-C07EE3/quality/20260702-175059377-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021729-C07EE3/quality/20260702-175059377-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021729-C07EE3/quality/20260702-175059377-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit:
  hash: "72e48115165fdbf4663e94f9b2e9166f68617c2c"
  message: "Merge pull request #4535 from basilisk-labs/task/202607021729-C07EE3/force-context-ingest-to-maximum-assimilation"
comments:
  -
    author: "CODER"
    body: "Start: Implementing Phase 0 single-mode context assimilation from the dedicated main task worktree; scope is limited to ingest mode routing, SGR coverage status cleanup, focused tests, and matching docs/prompt wording."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4535 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-07-02T17:31:41.643Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing Phase 0 single-mode context assimilation from the dedicated main task worktree; scope is limited to ingest mode routing, SGR coverage status cleanup, focused tests, and matching docs/prompt wording."
  -
    type: "verify"
    at: "2026-07-02T17:39:24.026Z"
    author: "CODER"
    state: "ok"
    note: "Implemented Phase 0 single-mode context assimilation and ran required checks. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope."
  -
    type: "verify"
    at: "2026-07-02T17:42:17.721Z"
    author: "CODER"
    state: "ok"
    note: "Implemented Phase 0 single-mode context assimilation and re-verified after PR artifact update. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope."
  -
    type: "verify"
    at: "2026-07-02T17:50:28.326Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and ci:local:fast passed on the task branch."
  -
    type: "status"
    at: "2026-07-02T18:10:31.359Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4535 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-07-02T18:10:31.365Z"
doc_updated_by: "INTEGRATOR"
description: "Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation."
sections:
  Summary: |-
    Force context ingest to maximum-assimilation

    Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.
  Scope: |-
    - In scope: Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.
    - Out of scope: unrelated refactors not required for "Force context ingest to maximum-assimilation".
  Plan: "Implement Phase 0 of the Context Maximum Assimilation PRD on main only. Scope: packages/agentplane/src/context/ingest-task.ts, packages/agentplane/src/context/ingest.ts if needed, packages/agentplane/src/context/ingest-task-prompt.ts if needed, packages/agentplane/src/runtime/sgr/contract-types.ts, packages/agentplane/src/runtime/sgr/contracts.ts, focused tests, and docs references that still present adaptive/minimal/wiki/codebase/research as public context ingest modes. Acceptance: createTaskNewParsed always emits blueprintRequest=context.maximum_assimilation and agentplane.context.mode=maximum_assimilation for undefined, adaptive, wiki, research, codebase, minimal, and maximum-assimilation inputs; context ingest cannot create context.assimilation; deprecated mode names are internal aliases with warning/documentation instead of weaker behavior; coverage statuses include duplicate, conflict, and out_of_scope in type and validator; prompt/docs no longer require schema-impossible coverage statuses. Verification: run the task verify commands and record pass/fail evidence with ap verify."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts`. Expected: all tests pass; every legacy workspace mode maps to `context.maximum_assimilation`; SGR accepts `duplicate`, `conflict`, and `out_of_scope` coverage statuses.
    2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: all tests pass; context ingest no longer creates fixed starter wiki folders for legacy/non-max profiles and created CURATOR tasks use the maximum-assimilation blueprint.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
    4. Run `ap doctor`. Expected: command exits 0; existing warnings may be recorded if unrelated to this task.
    5. Review final diff. Expected: changes stay inside Phase 0 scope: context ingest task mode routing, prompt/docs wording, coverage enum/validation, and focused tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T17:39:24.026Z — VERIFY — ok

    By: CODER

    Note: Implemented Phase 0 single-mode context assimilation and ran required checks. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:39:12.002Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
    - old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-C07EE3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-C07EE3
    - diagnostic_command: agentplane pr check 202607021729-C07EE3
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-02T17:42:17.721Z — VERIFY — ok

    By: CODER

    Note: Implemented Phase 0 single-mode context assimilation and re-verified after PR artifact update. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:39:24.175Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
    - old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-C07EE3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607021729-C07EE3/README.md
    - diagnostic_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607021729-C07EE3/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-02T17:50:28.326Z — VERIFY — ok

    By: CODER

    Note: Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and ci:local:fast passed on the task branch.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:42:17.885Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
    - old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-C07EE3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607021729-C07EE3/README.md
    - diagnostic_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607021729-C07EE3/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Maximum-assimilation Phase 0 is implemented and covered by targeted tests plus fast CI.
      Impact: Deprecated context ingest modes now route to context.maximum_assimilation without weakening task scope.
      Resolution: Recorded fresh verification after PR artifact refresh.
id_source: "generated"
---
## Summary

Force context ingest to maximum-assimilation

Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.

## Scope

- In scope: Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.
- Out of scope: unrelated refactors not required for "Force context ingest to maximum-assimilation".

## Plan

Implement Phase 0 of the Context Maximum Assimilation PRD on main only. Scope: packages/agentplane/src/context/ingest-task.ts, packages/agentplane/src/context/ingest.ts if needed, packages/agentplane/src/context/ingest-task-prompt.ts if needed, packages/agentplane/src/runtime/sgr/contract-types.ts, packages/agentplane/src/runtime/sgr/contracts.ts, focused tests, and docs references that still present adaptive/minimal/wiki/codebase/research as public context ingest modes. Acceptance: createTaskNewParsed always emits blueprintRequest=context.maximum_assimilation and agentplane.context.mode=maximum_assimilation for undefined, adaptive, wiki, research, codebase, minimal, and maximum-assimilation inputs; context ingest cannot create context.assimilation; deprecated mode names are internal aliases with warning/documentation instead of weaker behavior; coverage statuses include duplicate, conflict, and out_of_scope in type and validator; prompt/docs no longer require schema-impossible coverage statuses. Verification: run the task verify commands and record pass/fail evidence with ap verify.

## Verify Steps

1. Run `bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts`. Expected: all tests pass; every legacy workspace mode maps to `context.maximum_assimilation`; SGR accepts `duplicate`, `conflict`, and `out_of_scope` coverage statuses.
2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: all tests pass; context ingest no longer creates fixed starter wiki folders for legacy/non-max profiles and created CURATOR tasks use the maximum-assimilation blueprint.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
4. Run `ap doctor`. Expected: command exits 0; existing warnings may be recorded if unrelated to this task.
5. Review final diff. Expected: changes stay inside Phase 0 scope: context ingest task mode routing, prompt/docs wording, coverage enum/validation, and focused tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T17:39:24.026Z — VERIFY — ok

By: CODER

Note: Implemented Phase 0 single-mode context assimilation and ran required checks. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:39:12.002Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
- old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-C07EE3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-C07EE3
- diagnostic_command: agentplane pr check 202607021729-C07EE3
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-02T17:42:17.721Z — VERIFY — ok

By: CODER

Note: Implemented Phase 0 single-mode context assimilation and re-verified after PR artifact update. Command: bun test packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts. Result: pass, 19 tests. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts. Result: pass, 21 tests. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with two pre-existing DONE-task commit-hash warnings unrelated to this scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:39:24.175Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
- old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-C07EE3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607021729-C07EE3/README.md
- diagnostic_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607021729-C07EE3/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-02T17:50:28.326Z — VERIFY — ok

By: CODER

Note: Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and ci:local:fast passed on the task branch.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T17:42:17.885Z, excerpt_hash=sha256:a63a66fe2967be4d3b2ec5227937937faa162c02a24737d79824f9706706e9e7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-C07EE3-force-context-ingest-to-maximum-assimilation/.agentplane/tasks/202607021729-C07EE3/blueprint/resolved-snapshot.json
- old_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- current_digest: 6e4ba92fde38947ce34cec6ae7535389cdbac762a91c9598660bd4d55e1b5870
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-C07EE3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607021729-C07EE3/README.md
- diagnostic_command: agentplane evaluator run 202607021729-C07EE3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607021729-C07EE3/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Maximum-assimilation Phase 0 is implemented and covered by targeted tests plus fast CI.
  Impact: Deprecated context ingest modes now route to context.maximum_assimilation without weakening task scope.
  Resolution: Recorded fresh verification after PR artifact refresh.
