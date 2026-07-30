---
id: "202607221852-WF8A0X"
title: "Create CURATOR-gated post-task knowledge proposals"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on:
  - "202607221848-1HWR0R"
  - "202607221850-8HBF4J"
  - "202607221852-9T0RT3"
tags:
  - "context"
  - "curator"
  - "knowledge"
  - "milestone-beta2"
  - "refactor"
  - "rf-20"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run task-state:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T16:06:55.177Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T18:43:05.515Z"
  updated_by: "TESTER"
  note: "Structured deterministic verification recorded for f80c562d0 marker-only CURATOR recovery."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T19:24:03.070Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "574f417af6a49d1e37150a4166d857a1423198bb"
  blueprint_digest: "0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01"
  evidence_refs:
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-WF8A0X/README.md"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-WF8A0X/quality/20260730-192402597-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The split keeps one semantic owner and durable selection receipt across normal, concurrent, stale-lock, pre-marker, and marker-only recovery paths; no automatic knowledge publication was introduced."
commit:
  hash: "365e2f5a784338f0d6e584f855b0010f4ed76a0d"
  message: "🧪 WF8A0X task: record current CURATOR recovery review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: replaced task-history fact/wiki promotion with source-backed knowledge proposals, exact CURATOR selection receipts, and CLI-built semantic work packs. Local checks: typecheck, focused harvest tests (9 passed), targeted lint, Knip, CLI docs freshness, diff check."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T16:07:19.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T16:45:44.406Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: replaced task-history fact/wiki promotion with source-backed knowledge proposals, exact CURATOR selection receipts, and CLI-built semantic work packs. Local checks: typecheck, focused harvest tests (9 passed), targeted lint, Knip, CLI docs freshness, diff check."
  -
    type: "verify"
    at: "2026-07-30T16:46:49.107Z"
    author: "TESTER"
    state: "ok"
    note: "Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check."
  -
    type: "verify"
    at: "2026-07-30T17:24:55.174Z"
    author: "TESTER"
    state: "ok"
    note: "Verified RF-20 rework: only explicit durable task signals produce proposals; every signal has exact captured evidence; PR/diff/evaluator provenance is attached when present; unchanged selections retain one CURATOR owner."
  -
    type: "verify"
    at: "2026-07-30T17:45:14.790Z"
    author: "TESTER"
    state: "ok"
    note: "Verified canonical pre-selection evidence and recoverable single-owner CURATOR handoff."
  -
    type: "verify"
    at: "2026-07-30T18:11:02.266Z"
    author: "TESTER"
    state: "ok"
    note: "Verified stale-lock fencing and CURATOR selection evidence."
  -
    type: "verify"
    at: "2026-07-30T18:40:33.923Z"
    author: "TESTER"
    state: "ok"
    note: "Fresh deterministic verification recorded for f80c562d0 marker-only CURATOR recovery."
  -
    type: "verify"
    at: "2026-07-30T18:43:05.515Z"
    author: "TESTER"
    state: "ok"
    note: "Structured deterministic verification recorded for f80c562d0 marker-only CURATOR recovery."
  -
    type: "status"
    at: "2026-07-30T18:45:24.967Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-30T18:58:39.873Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T18:58:39.874Z"
doc_updated_by: "CODER"
description: "RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks."
sections:
  Summary: |-
    Create CURATOR-gated post-task knowledge proposals

    RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.
  Scope: |-
    - In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
    - Out of scope: automatic wiki writes or publishing transient implementation details.
  Plan: |-
    1. Define proposal schema and source-backed deterministic candidate signals.
    2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
    3. Run duplicate and consolidation checks against current knowledge.
    4. Create a separate CURATOR work order/task only for selected proposals.
    5. Apply durable updates through the existing transactional context path and record provenance.
  Verify Steps: |-
    1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
    2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
    3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
    4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
    5. Run proposal/context/task-state tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T16:46:49.107Z — VERIFY — ok

    By: TESTER

    Note: Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:45:44.406Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-30T17:24:55.174Z — VERIFY — ok

    By: TESTER

    Note: Verified RF-20 rework: only explicit durable task signals produce proposals; every signal has exact captured evidence; PR/diff/evaluator provenance is attached when present; unchanged selections retain one CURATOR owner.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:46:52.338Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    Command: bun run task-state:check
    Result: pass
    Evidence: task state OK (tasks=3183); commit=40669840b6682ece5711276cb7e1e3c86feb625a
    Scope: declared task-state gate at the reviewed implementation head

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli completed all 12 isolated checks at the reviewed implementation head
    Scope: repository-wide CLI compatibility, lifecycle, replay, scope, and trust-boundary invariants

    Command: bun run typecheck
    Result: pass
    Evidence: scripts/checks/run-typescript-build.mjs completed at the reviewed implementation head
    Scope: TypeScript contract for the changed harvest, selection, and context-pack paths

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
    Result: pass
    Evidence: 12 focused harvest scenarios passed, including transient rejection, late-line provenance, and concurrent selection ownership
    Scope: RF-20 proposal and CURATOR-selection behavior

    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: approved v0.7 cumulative candidate remains exact; immutable v0.6.24 baseline unchanged
    Scope: compatibility contract ratchet

    Command: bun run knip:check
    Result: pass
    Evidence: Knip baseline check completed without new findings
    Scope: changed TypeScript source and export surface

    Command: bun run docs:cli:check
    Result: pass
    Evidence: docs/user/cli-reference.generated.mdx is up to date
    Scope: generated CLI reference freshness

    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors before the reviewed implementation commit
    Scope: task branch diff integrity

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

    ### 2026-07-30T17:45:14.790Z — VERIFY — ok

    By: TESTER

    Note: Verified canonical pre-selection evidence and recoverable single-owner CURATOR handoff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T17:24:58.624Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
    Result: pass
    Evidence: 15 focused harvest scenarios passed, including canonical consolidation before CURATOR creation, stale lease recovery, active-owner exclusion, and concurrent selection ownership.
    Scope: RF-20 proposal selection and current-canonical-knowledge gate

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts src/context/ingest-task-pack.test.ts --maxWorkers=1 --no-file-parallelism
    Result: pass
    Evidence: 29 focused context/harvest scenarios passed.
    Scope: proposal source pack and extraction-contract compatibility

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli isolated suite completed after all 12 chunks at implementation commit 28dd4ab93aa1.
    Scope: repository-wide CLI compatibility, lifecycle, replay, scope, and trust-boundary invariants

    Command: bun run typecheck; bun run docs:cli:check; bun run bench:compatibility:check; bun run knip:check; bun run task-state:check; git diff --check
    Result: pass
    Evidence: TypeScript, generated CLI docs, approved v0.7 compatibility candidate, unused-code baseline, task-state, and diff-integrity checks all passed.
    Scope: declared verification gates at implementation commit 28dd4ab93aa1

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

    ### 2026-07-30T18:11:02.266Z — VERIFY — ok

    By: TESTER

    Note: Verified stale-lock fencing and CURATOR selection evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T17:45:15.541Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts src/commands/context/extraction-apply.unit.test.ts src/commands/context/assimilation-supervisor.unit.test.ts src/context/ingest-task-pack.test.ts --maxWorkers=1 --no-file-parallelism
    Result: pass
    Evidence: 4 test files and 60 tests passed, including stale-lock replacement, canonical snapshot, transactional apply, and supervisor receipt coverage.
    Scope: CURATOR proposal selection, source lock consistency, context apply, and supervision trace.

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build completed for implementation SHA 3a368a1d7d2cc496b9a6abdfb548d8c4c435ec72.
    Scope: typed CLI and context-harvest implementation.

    Command: bun run task-state:check
    Result: pass
    Evidence: task state OK for 3183 tasks.
    Scope: durable task lifecycle artifacts.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 critical CLI chunks and 76 tests passed with exit code 0.
    Scope: protected CLI and trust-boundary invariants.

    Command: bun run docs:cli:check && bun run bench:compatibility:check && bun run knip:check && git diff --check
    Result: pass
    Evidence: CLI reference current, compatibility baseline accepted, Knip baseline accepted, and no whitespace errors.
    Scope: public CLI contract and static hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

    ### 2026-07-30T18:40:33.923Z — VERIFY — ok

    By: TESTER

    Note: Fresh deterministic verification recorded for f80c562d0 marker-only CURATOR recovery.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T18:11:05.876Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    Evaluated implementation SHA: f80c562d0abc3d3f2932dd8350a3a504c0ec034f

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
    Result: PASS, 1 test file and 20 tests.
    Evidence: includes interrupted source-marker recovery, CURATOR adoption without a second task, receipt completion, completed-selection rejection, stale-lock recovery, and concurrent selection coverage.
    Scope: Verify Steps 2, 3, 4, and 5.

    Command: bun run typecheck
    Result: PASS, exit 0.
    Evidence: TypeScript build completed on the evaluated SHA.
    Scope: Verify Step 5.

    Command: bun run task-state:check
    Result: PASS, task state OK for 3183 tasks.
    Evidence: task lifecycle state remains valid on the evaluated SHA.
    Scope: Verify Step 5.

    Command: bun run test:critical
    Result: PASS, 12 critical CLI chunks and 76 tests.
    Evidence: agent efficiency, exit codes, git edges, protected paths, scope leaks, symlink roots, and trust boundaries all passed.
    Scope: regression guard for Verify Step 5.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-30T18:43:05.515Z — VERIFY — ok

    By: TESTER

    Note: Structured deterministic verification recorded for f80c562d0 marker-only CURATOR recovery.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T18:40:35.665Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
    Result: pass
    Evidence: 1 test file and 20 tests at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f, including marker-only recovery, CURATOR adoption, receipt completion, completed-selection rejection, stale-lock recovery, and concurrent selection.
    Scope: Verify Steps 2, 3, 4, and 5.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exit 0 at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
    Scope: Verify Step 5.

    Command: bun run task-state:check
    Result: pass
    Evidence: task state OK for 3183 tasks at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
    Scope: Verify Step 5.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 critical CLI chunks and 76 tests passed at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
    Scope: regression guard for Verify Step 5.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: ""
extensions:
  implementation_commit:
    hash: "f73a9d4713af26770eb5fd88852800058dca5d29"
    message: "🧹 WF8A0X task: format CURATOR recovery"
  workflow_route_baseline:
    start_head_sha: "12115a42325bb38de85f15df89b96b2675b595cb"
    version: 1
id_source: "generated"
---
## Summary

Create CURATOR-gated post-task knowledge proposals

RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.

## Scope

- In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
- Out of scope: automatic wiki writes or publishing transient implementation details.

## Plan

1. Define proposal schema and source-backed deterministic candidate signals.
2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
3. Run duplicate and consolidation checks against current knowledge.
4. Create a separate CURATOR work order/task only for selected proposals.
5. Apply durable updates through the existing transactional context path and record provenance.

## Verify Steps

1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
5. Run proposal/context/task-state tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T16:46:49.107Z — VERIFY — ok

By: TESTER

Note: Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:45:44.406Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-30T17:24:55.174Z — VERIFY — ok

By: TESTER

Note: Verified RF-20 rework: only explicit durable task signals produce proposals; every signal has exact captured evidence; PR/diff/evaluator provenance is attached when present; unchanged selections retain one CURATOR owner.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:46:52.338Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

Command: bun run task-state:check
Result: pass
Evidence: task state OK (tasks=3183); commit=40669840b6682ece5711276cb7e1e3c86feb625a
Scope: declared task-state gate at the reviewed implementation head

Command: bun run test:critical
Result: pass
Evidence: critical-cli completed all 12 isolated checks at the reviewed implementation head
Scope: repository-wide CLI compatibility, lifecycle, replay, scope, and trust-boundary invariants

Command: bun run typecheck
Result: pass
Evidence: scripts/checks/run-typescript-build.mjs completed at the reviewed implementation head
Scope: TypeScript contract for the changed harvest, selection, and context-pack paths

Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
Result: pass
Evidence: 12 focused harvest scenarios passed, including transient rejection, late-line provenance, and concurrent selection ownership
Scope: RF-20 proposal and CURATOR-selection behavior

Command: bun run bench:compatibility:check
Result: pass
Evidence: approved v0.7 cumulative candidate remains exact; immutable v0.6.24 baseline unchanged
Scope: compatibility contract ratchet

Command: bun run knip:check
Result: pass
Evidence: Knip baseline check completed without new findings
Scope: changed TypeScript source and export surface

Command: bun run docs:cli:check
Result: pass
Evidence: docs/user/cli-reference.generated.mdx is up to date
Scope: generated CLI reference freshness

Command: git diff --check
Result: pass
Evidence: no whitespace errors before the reviewed implementation commit
Scope: task branch diff integrity

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

### 2026-07-30T17:45:14.790Z — VERIFY — ok

By: TESTER

Note: Verified canonical pre-selection evidence and recoverable single-owner CURATOR handoff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T17:24:58.624Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
Result: pass
Evidence: 15 focused harvest scenarios passed, including canonical consolidation before CURATOR creation, stale lease recovery, active-owner exclusion, and concurrent selection ownership.
Scope: RF-20 proposal selection and current-canonical-knowledge gate

Command: bun run test -- src/commands/context/harvest-tasks.test.ts src/context/ingest-task-pack.test.ts --maxWorkers=1 --no-file-parallelism
Result: pass
Evidence: 29 focused context/harvest scenarios passed.
Scope: proposal source pack and extraction-contract compatibility

Command: bun run test:critical
Result: pass
Evidence: critical-cli isolated suite completed after all 12 chunks at implementation commit 28dd4ab93aa1.
Scope: repository-wide CLI compatibility, lifecycle, replay, scope, and trust-boundary invariants

Command: bun run typecheck; bun run docs:cli:check; bun run bench:compatibility:check; bun run knip:check; bun run task-state:check; git diff --check
Result: pass
Evidence: TypeScript, generated CLI docs, approved v0.7 compatibility candidate, unused-code baseline, task-state, and diff-integrity checks all passed.
Scope: declared verification gates at implementation commit 28dd4ab93aa1

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

### 2026-07-30T18:11:02.266Z — VERIFY — ok

By: TESTER

Note: Verified stale-lock fencing and CURATOR selection evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T17:45:15.541Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

Command: bun run test -- src/commands/context/harvest-tasks.test.ts src/commands/context/extraction-apply.unit.test.ts src/commands/context/assimilation-supervisor.unit.test.ts src/context/ingest-task-pack.test.ts --maxWorkers=1 --no-file-parallelism
Result: pass
Evidence: 4 test files and 60 tests passed, including stale-lock replacement, canonical snapshot, transactional apply, and supervisor receipt coverage.
Scope: CURATOR proposal selection, source lock consistency, context apply, and supervision trace.

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build completed for implementation SHA 3a368a1d7d2cc496b9a6abdfb548d8c4c435ec72.
Scope: typed CLI and context-harvest implementation.

Command: bun run task-state:check
Result: pass
Evidence: task state OK for 3183 tasks.
Scope: durable task lifecycle artifacts.

Command: bun run test:critical
Result: pass
Evidence: 12 critical CLI chunks and 76 tests passed with exit code 0.
Scope: protected CLI and trust-boundary invariants.

Command: bun run docs:cli:check && bun run bench:compatibility:check && bun run knip:check && git diff --check
Result: pass
Evidence: CLI reference current, compatibility baseline accepted, Knip baseline accepted, and no whitespace errors.
Scope: public CLI contract and static hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

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

### 2026-07-30T18:40:33.923Z — VERIFY — ok

By: TESTER

Note: Fresh deterministic verification recorded for f80c562d0 marker-only CURATOR recovery.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T18:11:05.876Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

Evaluated implementation SHA: f80c562d0abc3d3f2932dd8350a3a504c0ec034f

Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
Result: PASS, 1 test file and 20 tests.
Evidence: includes interrupted source-marker recovery, CURATOR adoption without a second task, receipt completion, completed-selection rejection, stale-lock recovery, and concurrent selection coverage.
Scope: Verify Steps 2, 3, 4, and 5.

Command: bun run typecheck
Result: PASS, exit 0.
Evidence: TypeScript build completed on the evaluated SHA.
Scope: Verify Step 5.

Command: bun run task-state:check
Result: PASS, task state OK for 3183 tasks.
Evidence: task lifecycle state remains valid on the evaluated SHA.
Scope: Verify Step 5.

Command: bun run test:critical
Result: PASS, 12 critical CLI chunks and 76 tests.
Evidence: agent efficiency, exit codes, git edges, protected paths, scope leaks, symlink roots, and trust boundaries all passed.
Scope: regression guard for Verify Step 5.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-30T18:43:05.515Z — VERIFY — ok

By: TESTER

Note: Structured deterministic verification recorded for f80c562d0 marker-only CURATOR recovery.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T18:40:35.665Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

Command: bun run test -- src/commands/context/harvest-tasks.test.ts --maxWorkers=1 --no-file-parallelism
Result: pass
Evidence: 1 test file and 20 tests at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f, including marker-only recovery, CURATOR adoption, receipt completion, completed-selection rejection, stale-lock recovery, and concurrent selection.
Scope: Verify Steps 2, 3, 4, and 5.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exit 0 at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
Scope: Verify Step 5.

Command: bun run task-state:check
Result: pass
Evidence: task state OK for 3183 tasks at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
Scope: Verify Step 5.

Command: bun run test:critical
Result: pass
Evidence: 12 critical CLI chunks and 76 tests passed at implementation SHA f80c562d0abc3d3f2932dd8350a3a504c0ec034f.
Scope: regression guard for Verify Step 5.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
