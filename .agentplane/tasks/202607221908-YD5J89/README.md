---
id: "202607221908-YD5J89"
title: "Migrate context and evaluator command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221849-8YYZ9X"
  - "202607221850-8HBF4J"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T00:37:39.217Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T01:34:41.204Z"
  updated_by: "TESTER"
  note: "Focused 97/97, doctor/wiki 20/20, critical 12/12 chunks (77 tests), format, schemas, guards, TS7 typecheck, full lint, architecture, knip, and diff checks passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T01:36:23.883Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "1d315e9e1a465b9e87ad476759e0e41ea1d4a69b"
  blueprint_digest: "185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f"
  evidence_refs:
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221908-YD5J89/README.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "context verify-task and context finalize-task are catalogued as project-only while their implementations load CommandContext internally, so the declared capability profile understates backend/task access and permits duplicate broad context preparation."
commit:
  hash: "1d315e9e1a465b9e87ad476759e0e41ea1d4a69b"
  message: "♻️ YD5J89 task: migrate context evaluator command boundaries"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: granular context/evaluator sessions, typed in-process results, renderer boundaries, and single-context supervision."
events:
  -
    type: "status"
    at: "2026-08-01T00:38:26.014Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T01:34:08.660Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: granular context/evaluator sessions, typed in-process results, renderer boundaries, and single-context supervision."
  -
    type: "verify"
    at: "2026-08-01T01:34:41.204Z"
    author: "TESTER"
    state: "ok"
    note: "Focused 97/97, doctor/wiki 20/20, critical 12/12 chunks (77 tests), format, schemas, guards, TS7 typecheck, full lint, architecture, knip, and diff checks passed."
doc_version: 3
doc_updated_at: "2026-08-01T01:34:42.683Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers."
sections:
  Summary: |-
    Migrate context and evaluator command boundaries

    RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers.
  Scope: |-
    - In scope: context search/show/ingest/reindex/wiki/graph/doctor and evaluator prepare/apply/run compatibility commands, typed use cases, granular capabilities, output renderers, and elimination of subprocess/stdout orchestration in this family.
    - Out of scope: runner/Hermes, general task lifecycle, or provider/release commands.
  Plan: |-
    1. Declare exact context/evaluator capability sets and ports.
    2. Reuse typed supervisor, journal, retrieval, and evaluator use cases.
    3. Separate CLI parsing/rendering from result application.
    4. Remove direct OS/Git/network access and internal command subprocesses.
    5. Run context/evaluator schema, fixture, rendering, and capability tests.
  Verify Steps: |-
    1. Invoke migrated context/evaluator use cases in-process. Expected: typed results and no stdout capture/subprocess.
    2. Run human/JSON snapshots and schema fixtures. Expected: approved compatibility plus explicit v0.7 versions.
    3. Attempt mutation from read-only evaluator or undeclared context capability. Expected: typed denial.
    4. Run context/evaluator tests, schemas, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T01:34:41.204Z — VERIFY — ok

    By: TESTER

    Note: Focused 97/97, doctor/wiki 20/20, critical 12/12 chunks (77 tests), format, schemas, guards, TS7 typecheck, full lint, architecture, knip, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T01:34:08.660Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-YD5J89-migrate-context-and-evaluator-command-boundaries/.agentplane/tasks/202607221908-YD5J89/blueprint/resolved-snapshot.json
    - old_digest: 185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f
    - current_digest: 185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-YD5J89

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-YD5J89
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert this family through explicit typed compatibility adapters without deleting context data or evaluation evidence.
    - Preserve journals and schema versions.
    - Re-run context integrity and evaluator staleness tests.
  Findings: |-
    - Observation: Typed context/evaluator use cases return structured results without stdout capture; read-only sessions reject mutation/provider access; context supervision reuses one prepared CommandContext.
      Impact: RF-24/RF-25 command boundaries are enforced without changing existing CLI output or durable schema contracts.
      Resolution: Implementation commit 1d315e9e1a465b9e87ad476759e0e41ea1d4a69b satisfies the task scope and verification steps.
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Migrate context and evaluator command boundaries

RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers.

## Scope

- In scope: context search/show/ingest/reindex/wiki/graph/doctor and evaluator prepare/apply/run compatibility commands, typed use cases, granular capabilities, output renderers, and elimination of subprocess/stdout orchestration in this family.
- Out of scope: runner/Hermes, general task lifecycle, or provider/release commands.

## Plan

1. Declare exact context/evaluator capability sets and ports.
2. Reuse typed supervisor, journal, retrieval, and evaluator use cases.
3. Separate CLI parsing/rendering from result application.
4. Remove direct OS/Git/network access and internal command subprocesses.
5. Run context/evaluator schema, fixture, rendering, and capability tests.

## Verify Steps

1. Invoke migrated context/evaluator use cases in-process. Expected: typed results and no stdout capture/subprocess.
2. Run human/JSON snapshots and schema fixtures. Expected: approved compatibility plus explicit v0.7 versions.
3. Attempt mutation from read-only evaluator or undeclared context capability. Expected: typed denial.
4. Run context/evaluator tests, schemas, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T01:34:41.204Z — VERIFY — ok

By: TESTER

Note: Focused 97/97, doctor/wiki 20/20, critical 12/12 chunks (77 tests), format, schemas, guards, TS7 typecheck, full lint, architecture, knip, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T01:34:08.660Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-YD5J89-migrate-context-and-evaluator-command-boundaries/.agentplane/tasks/202607221908-YD5J89/blueprint/resolved-snapshot.json
- old_digest: 185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f
- current_digest: 185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-YD5J89

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-YD5J89
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert this family through explicit typed compatibility adapters without deleting context data or evaluation evidence.
- Preserve journals and schema versions.
- Re-run context integrity and evaluator staleness tests.

## Findings

- Observation: Typed context/evaluator use cases return structured results without stdout capture; read-only sessions reject mutation/provider access; context supervision reuses one prepared CommandContext.
  Impact: RF-24/RF-25 command boundaries are enforced without changing existing CLI output or durable schema contracts.
  Resolution: Implementation commit 1d315e9e1a465b9e87ad476759e0e41ea1d4a69b satisfies the task scope and verification steps.
