---
id: "202607221908-YD5J89"
title: "Migrate context and evaluator command boundaries"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 28
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
  updated_at: "2026-08-01T02:42:00.472Z"
  updated_by: "TESTER"
  note: "Verified confined evaluator preparation at implementation 1eb11321fa08: five focused files passed 52 tests; real registry no-record execution created the canonical evidence packet with task README unchanged while the full CommandContext resolver was unavailable; the frozen port exposes only prepare and rejects traversal-shaped task IDs; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T02:43:24.797Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "1eb11321fa08ffd660c64ca1e79f4a71c97100a7"
  blueprint_digest: "185b28bf3c4e43c7937292c7611019b39d962da5dde83f80d6da62973482cd2f"
  evidence_refs:
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-YD5J89/README.md"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-YD5J89/quality/20260801-024222077-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The confined evaluator artifact port closes the prior authority leak: callers receive only a frozen prepare operation, while recording and provider capabilities remain separately declared."
commit:
  hash: "83961c5ebfbaac7489f08cf055535d5c386d4b8d"
  message: "✅ YD5J89 task: record confined port quality pass"
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
  -
    author: "CODER"
    body: "Implementation rework committed: evaluator preparation and no-record execution now use explicit artifact-write authority without task or Git mutation rights."
  -
    author: "CODER"
    body: "Implementation rework committed: evaluator preparation now resolves a path-confined frozen port and no-record handlers cannot obtain CommandContext, task, Git, backend, approval, or generic file-write services."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-08-01T02:22:46.707Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: evaluator preparation and no-record execution now use explicit artifact-write authority without task or Git mutation rights."
  -
    type: "verify"
    at: "2026-08-01T02:23:07.500Z"
    author: "TESTER"
    state: "ok"
    note: "Verified explicit evaluator artifact-write authority at implementation e21e0b573595: focused catalog/kernel/evaluator/registry suite passed 41 tests; real no-record dispatch created an evidence packet without changing task README or resolving task.write; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed."
  -
    type: "status"
    at: "2026-08-01T02:41:38.563Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: evaluator preparation now resolves a path-confined frozen port and no-record handlers cannot obtain CommandContext, task, Git, backend, approval, or generic file-write services."
  -
    type: "verify"
    at: "2026-08-01T02:42:00.472Z"
    author: "TESTER"
    state: "ok"
    note: "Verified confined evaluator preparation at implementation 1eb11321fa08: five focused files passed 52 tests; real registry no-record execution created the canonical evidence packet with task README unchanged while the full CommandContext resolver was unavailable; the frozen port exposes only prepare and rejects traversal-shaped task IDs; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed."
  -
    type: "status"
    at: "2026-08-01T02:44:23.288Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T02:44:23.289Z"
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

    ### 2026-08-01T02:23:07.500Z — VERIFY — ok

    By: TESTER

    Note: Verified explicit evaluator artifact-write authority at implementation e21e0b573595: focused catalog/kernel/evaluator/registry suite passed 41 tests; real no-record dispatch created an evidence packet without changing task README or resolving task.write; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:22:46.707Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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

    ### 2026-08-01T02:42:00.472Z — VERIFY — ok

    By: TESTER

    Note: Verified confined evaluator preparation at implementation 1eb11321fa08: five focused files passed 52 tests; real registry no-record execution created the canonical evidence packet with task README unchanged while the full CommandContext resolver was unavailable; the frozen port exposes only prepare and rejects traversal-shaped task IDs; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:41:38.563Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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

    - Observation: Evaluator preparation and no-record execution now resolve evaluator.artifacts.write as a distinct capability; task.write, git.mutate, and approvals remain absent from the preparation profile.
      Impact: The CLI can prepare durable evaluator context while preserving a machine-enforced boundary between evidence generation and lifecycle or Git mutation.
      Resolution: Accepted after focused filesystem regression coverage and the repository critical/architecture gates completed successfully.

    - Observation: Evaluator preparation resolves a distinct evaluator_artifacts node and returns a frozen path-confined port rather than CommandContext; no-record sessions declare no task-context capability.
      Impact: Evidence-packet generation is mechanically separated from task, Git, backend, approval, provider, and generic filesystem mutation authority at the handler dependency boundary.
      Resolution: Accepted after compile-time surface checks, real registry/filesystem regression coverage, traversal rejection, and repository critical/architecture gates.
extensions:
  implementation_commit:
    hash: "1eb11321fa08ffd660c64ca1e79f4a71c97100a7"
    message: "🔐 YD5J89 task: confine evaluator artifact preparation"
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

### 2026-08-01T02:23:07.500Z — VERIFY — ok

By: TESTER

Note: Verified explicit evaluator artifact-write authority at implementation e21e0b573595: focused catalog/kernel/evaluator/registry suite passed 41 tests; real no-record dispatch created an evidence packet without changing task README or resolving task.write; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:22:46.707Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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

### 2026-08-01T02:42:00.472Z — VERIFY — ok

By: TESTER

Note: Verified confined evaluator preparation at implementation 1eb11321fa08: five focused files passed 52 tests; real registry no-record execution created the canonical evidence packet with task README unchanged while the full CommandContext resolver was unavailable; the frozen port exposes only prepare and rejects traversal-shaped task IDs; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T02:41:38.563Z, excerpt_hash=sha256:0730ba5f18a54b76746d35785581627ddbe3a57fe263e57424859cdee158ee17

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

- Observation: Evaluator preparation and no-record execution now resolve evaluator.artifacts.write as a distinct capability; task.write, git.mutate, and approvals remain absent from the preparation profile.
  Impact: The CLI can prepare durable evaluator context while preserving a machine-enforced boundary between evidence generation and lifecycle or Git mutation.
  Resolution: Accepted after focused filesystem regression coverage and the repository critical/architecture gates completed successfully.

- Observation: Evaluator preparation resolves a distinct evaluator_artifacts node and returns a frozen path-confined port rather than CommandContext; no-record sessions declare no task-context capability.
  Impact: Evidence-packet generation is mechanically separated from task, Git, backend, approval, provider, and generic filesystem mutation authority at the handler dependency boundary.
  Resolution: Accepted after compile-time surface checks, real registry/filesystem regression coverage, traversal rejection, and repository critical/architecture gates.
