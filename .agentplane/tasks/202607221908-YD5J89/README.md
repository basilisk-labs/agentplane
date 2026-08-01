---
id: "202607221908-YD5J89"
title: "Migrate context and evaluator command boundaries"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
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
  updated_at: "2026-08-01T02:14:11.126Z"
  updated_by: "TESTER"
  note: "Authority rework verified on 9ef73324a: catalog/registry/evaluator 40/40, command-session 5/5, critical CLI 12/12 (77 tests), TS7 typecheck, guards, architecture, lint, hotspot, docs freshness."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T02:15:37.083Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "9ef73324a40ab1a66bd831eb2c31d2402c4fdb11"
  blueprint_digest: "185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f"
  evidence_refs:
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221908-YD5J89/README.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "`evaluator run --no-record` is assigned a read-only session but still writes a new evaluator evidence packet directly to the task quality directory."
commit:
  hash: "9ef73324a40ab1a66bd831eb2c31d2402c4fdb11"
  message: "🔒 YD5J89 task: enforce evaluator run session authority"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: granular context/evaluator sessions, typed in-process results, renderer boundaries, and single-context supervision."
  -
    author: "CODER"
    body: "Implementation rework committed: verify-task now resolves task.read once; finalize-task resolves task.write once and passes the session-owned context through final verification."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Implementation rework complete: repaired hosted CI gates, restored generated script inventory parity, and extracted evaluator catalog rendering below the runtime module size limit."
  -
    author: "CODER"
    body: "Implementation rework committed: evaluator run now selects read/write authority before CommandSession construction, with normal registry-dispatch denial coverage."
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
  -
    type: "status"
    at: "2026-08-01T01:42:14.637Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: verify-task now resolves task.read once; finalize-task resolves task.write once and passes the session-owned context through final verification."
  -
    type: "status"
    at: "2026-08-01T01:43:17.379Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-01T02:00:46.131Z"
    author: "TESTER"
    state: "ok"
    note: "Post-rework verification passed: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39."
  -
    type: "status"
    at: "2026-08-01T02:02:16.675Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Implementation rework complete: repaired hosted CI gates, restored generated script inventory parity, and extracted evaluator catalog rendering below the runtime module size limit."
  -
    type: "verify"
    at: "2026-08-01T02:02:31.821Z"
    author: "TESTER"
    state: "ok"
    note: "Post-rework verification passed on f404121e0: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39."
  -
    type: "status"
    at: "2026-08-01T02:13:55.928Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: evaluator run now selects read/write authority before CommandSession construction, with normal registry-dispatch denial coverage."
  -
    type: "verify"
    at: "2026-08-01T02:14:11.126Z"
    author: "TESTER"
    state: "ok"
    note: "Authority rework verified on 9ef73324a: catalog/registry/evaluator 40/40, command-session 5/5, critical CLI 12/12 (77 tests), TS7 typecheck, guards, architecture, lint, hotspot, docs freshness."
doc_version: 3
doc_updated_at: "2026-08-01T02:14:12.145Z"
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

    ### 2026-08-01T02:00:46.131Z — VERIFY — ok

    By: TESTER

    Note: Post-rework verification passed: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T01:43:17.379Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T02:02:31.821Z — VERIFY — ok

    By: TESTER

    Note: Post-rework verification passed on f404121e0: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:02:16.675Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T02:14:11.126Z — VERIFY — ok

    By: TESTER

    Note: Authority rework verified on 9ef73324a: catalog/registry/evaluator 40/40, command-session 5/5, critical CLI 12/12 (77 tests), TS7 typecheck, guards, architecture, lint, hotspot, docs freshness.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:13:55.928Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
    - diagnostic_command: none
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

    - Observation: Hosted CI exposed a stale generated script inventory and an oversized evaluator command module after implementation rework.
      Impact: The PR could not satisfy verify-routed despite the behavioral checks passing.
      Resolution: Regenerated scripts/README.md, extracted evaluator catalog/list/show boundaries, and reran the complete declared verification contract against the repaired implementation.

    - Observation: Hosted CI exposed a stale generated script inventory and an oversized evaluator command module.
      Impact: The PR could not satisfy verify-routed until both deterministic gates were repaired.
      Resolution: Regenerated scripts/README.md, extracted evaluator catalog/list/show boundaries, recorded f404121e0 as the implementation rework commit, and verified the complete declared contract.

    - Observation: evaluator run --no-record previously entered a write-capable catalog session before choosing its read dependency.
      Impact: A non-recording review held backend/task/Git mutation authority that its semantic operation did not require.
      Resolution: Select EVALUATOR_READ_REQUIREMENTS or EVALUATOR_WRITE_REQUIREMENTS from parsed record mode before CommandSession construction and verify denials through normal registry dispatch.
extensions:
  implementation_commit:
    hash: "8e4f2872a896a86a61319bef7047fdc9da0abe19"
    message: "♻️ YD5J89 task: route task-aware context sessions"
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

### 2026-08-01T02:00:46.131Z — VERIFY — ok

By: TESTER

Note: Post-rework verification passed: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T01:43:17.379Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T02:02:31.821Z — VERIFY — ok

By: TESTER

Note: Post-rework verification passed on f404121e0: full ci:local:fast (512 files/3589 tests), critical CLI 12/12, TS7 typecheck, hotspot and generated-doc freshness; focused evaluator/catalog 39/39.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:02:16.675Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T02:14:11.126Z — VERIFY — ok

By: TESTER

Note: Authority rework verified on 9ef73324a: catalog/registry/evaluator 40/40, command-session 5/5, critical CLI 12/12 (77 tests), TS7 typecheck, guards, architecture, lint, hotspot, docs freshness.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:13:55.928Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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
- diagnostic_command: none
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

- Observation: Hosted CI exposed a stale generated script inventory and an oversized evaluator command module after implementation rework.
  Impact: The PR could not satisfy verify-routed despite the behavioral checks passing.
  Resolution: Regenerated scripts/README.md, extracted evaluator catalog/list/show boundaries, and reran the complete declared verification contract against the repaired implementation.

- Observation: Hosted CI exposed a stale generated script inventory and an oversized evaluator command module.
  Impact: The PR could not satisfy verify-routed until both deterministic gates were repaired.
  Resolution: Regenerated scripts/README.md, extracted evaluator catalog/list/show boundaries, recorded f404121e0 as the implementation rework commit, and verified the complete declared contract.

- Observation: evaluator run --no-record previously entered a write-capable catalog session before choosing its read dependency.
  Impact: A non-recording review held backend/task/Git mutation authority that its semantic operation did not require.
  Resolution: Select EVALUATOR_READ_REQUIREMENTS or EVALUATOR_WRITE_REQUIREMENTS from parsed record mode before CommandSession construction and verify denials through normal registry dispatch.
