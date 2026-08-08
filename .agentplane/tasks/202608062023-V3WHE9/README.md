---
id: "202608062023-V3WHE9"
title: "Add safe local evidence retention, statistics, and garbage collection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on:
  - "202608061850-BZT3D9"
tags:
  - "code"
  - "evidence"
  - "maintenance"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run docs:cli:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:23:34.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-08T01:36:31.621Z"
  updated_by: "TESTER"
  note: "Result: pass; all declared verification steps and the full contract suite passed for implementation 40b758a4467e3186a89591dff2e79442575e383a."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T01:37:52.679Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "40b758a4467ed76c0fa59e92c1b3dd63535fb9de"
  blueprint_digest: "a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18"
  evidence_refs:
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/objects/sha256/d31596e9bfeb08ae779ad2eb627ca8544a667caf8991ebd4ec7fc40251b5b563.md"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/20260808-013700827-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062023-V3WHE9/README.md"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/objects/sha256/584f088bca262051b690931346a65ea1b305e34993e400707564c3e8559a63d0.patch"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/objects/sha256/0e9348b6fb004a474ba775a55d52cd8bc4455d30ac520b7e2d744c87d9da4fbb.json"
    - ".agentplane/tasks/202608062023-V3WHE9/verification/20260808013631621-9ad700089a22a080.json"
    - ".agentplane/tasks/202608062023-V3WHE9/quality/objects/sha256/c9d7a484a8e87808651fc468bba347dbb87badd5e309e74ccd7f58c4f13da183.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "GC всё ещё может удалить объект, который конкурентный процесс сделал достижимым после последней повторной инвентаризации: между финальной проверкой и unlink остаётся незащищённое окно TOCTOU."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "9ecb9fa40f42d2dc934c91da8d5cb814a7f122c8"
  message: "♻️ V3WHE9 evidence: harden retention maintenance"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: local evidence stats, dry-run-first hard-link compaction, and hash-verified retention GC now protect reachable, active, failing, and release-pinned evidence; apply requires a clean repository and explicit confirmation."
  -
    author: "CODER"
    body: "Implementation rework complete: reviewed compatibility candidate updated for evidence stats/compact/gc; evidence loaders split by responsibility; SHA-256 streaming shared without clone debt; no maintenance apply was run against repository evidence."
events:
  -
    type: "status"
    at: "2026-08-06T22:11:26.005Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T22:28:40.203Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: local evidence stats, dry-run-first hard-link compaction, and hash-verified retention GC now protect reachable, active, failing, and release-pinned evidence; apply requires a clean repository and explicit confirmation."
  -
    type: "verify"
    at: "2026-08-06T22:28:55.868Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9."
  -
    type: "status"
    at: "2026-08-08T01:24:01.310Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework complete: reviewed compatibility candidate updated for evidence stats/compact/gc; evidence loaders split by responsibility; SHA-256 streaming shared without clone debt; no maintenance apply was run against repository evidence."
  -
    type: "verify"
    at: "2026-08-08T01:24:03.878Z"
    author: "TESTER"
    state: "ok"
    note: "Result: pass; evidence suites passed 11/11, critical suite passed 84/84, typecheck and CLI docs checks passed, and the full ci:contract passed including compatibility 263commands/180args/843options, architecture, clone, Knip, and coverage. No retention apply was performed against repository evidence."
  -
    type: "verify"
    at: "2026-08-08T01:25:05.422Z"
    author: "TESTER"
    state: "ok"
    note: "Result: pass; all declared verification steps and the full contract suite passed for implementation 9ecb9fa40f42d2dc934c91da8d5cb814a7f122c8."
  -
    type: "verify"
    at: "2026-08-08T01:36:31.621Z"
    author: "TESTER"
    state: "ok"
    note: "Result: pass; all declared verification steps and the full contract suite passed for implementation 40b758a4467e3186a89591dff2e79442575e383a."
doc_version: 3
doc_updated_at: "2026-08-08T01:36:32.841Z"
doc_updated_by: "CODER"
description: "Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects."
sections:
  Summary: |-
    Add safe local evidence retention, statistics, and garbage collection

    Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
  Scope: |-
    - In scope: Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
    - Out of scope: unrelated refactors not required for "Add safe local evidence retention, statistics, and garbage collection".
  Plan: "1. Define a local evidence inventory and reachability model separating immutable Git manifests from large content-addressed objects. 2. Add evidence stats with JSON and human output for tracked evidence, object counts and bytes, duplicates, reachable, pinned, expired, and collectible objects. 3. Add a dry-run-first compact path that only replaces supported duplicate large payloads with verified object references and refuses unsupported or dirty histories. 4. Add a dry-run-first gc path whose apply mode requires explicit authority and can delete only hash-verified unreferenced or retention-expired objects; never delete task summaries, ACRs, receipts, fingerprints, final findings, current failure evidence, or release-pinned evidence. 5. Add retention configuration with conservative defaults and fixtures for success/failure age, deduplication, pins, corrupted references, concurrent writers, interruption, and idempotency. 6. Document rollback/recovery and run critical compatibility checks."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts
    - bun run test:critical
    - bun run typecheck
    - bun run docs:cli:check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:28:55.868Z — VERIFY — needs_rework

    By: TESTER

    Note: Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:28:40.203Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
    - old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T01:24:03.878Z — VERIFY — ok

    By: TESTER

    Note: Result: pass; evidence suites passed 11/11, critical suite passed 84/84, typecheck and CLI docs checks passed, and the full ci:contract passed including compatibility 263commands/180args/843options, architecture, clone, Knip, and coverage. No retention apply was performed against repository evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:24:01.310Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
    - old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

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

    ### 2026-08-08T01:25:05.422Z — VERIFY — ok

    By: TESTER

    Note: Result: pass; all declared verification steps and the full contract suite passed for implementation 9ecb9fa40f42d2dc934c91da8d5cb814a7f122c8.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:24:04.769Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence && bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.evidence.test.ts
    Result: pass; 3 files and 11 tests passed.
    Evidence: Vitest reported 2 evidence files with 8 tests and 1 CLI file with 3 tests.
    Scope: evidence inventory, retention safety, compaction, garbage collection, and CLI rendering.

    Command: bun run test:critical
    Result: pass; 12 chunks and 84 tests passed.
    Evidence: The critical CLI runner reported all twelve chunks passed.
    Scope: compatibility, replay hardening, trust boundaries, protected paths, and git edge cases.

    Command: bun run typecheck && bun run docs:cli:check
    Result: pass
    Evidence: TypeScript build completed and generated CLI reference was current.
    Scope: type safety and public CLI documentation.

    Command: bun run ci:contract
    Result: pass
    Evidence: Compatibility 263commands/180args/843options, architecture, clone, Knip, and coverage gates passed.
    Scope: full repository contract for the committed evidence-maintenance implementation.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
    - old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T01:36:31.621Z — VERIFY — ok

    By: TESTER

    Note: Result: pass; all declared verification steps and the full contract suite passed for implementation 40b758a4467e3186a89591dff2e79442575e383a.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:25:06.340Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence && bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.evidence.test.ts
    Result: pass; 3 files and 15 tests passed.
    Evidence: Vitest reported 2 evidence files with 12 tests and 1 CLI file with 3 tests.
    Scope: evidence inventory, concurrent reachability and retention-pin revalidation, compaction, garbage collection, and CLI rendering.

    Command: bun run test:critical
    Result: pass; 12 chunks and 84 tests passed.
    Evidence: The critical CLI runner reported all twelve chunks passed.
    Scope: compatibility, replay hardening, trust boundaries, protected paths, and git edge cases.

    Command: bun run typecheck && bun run docs:cli:check
    Result: pass.
    Evidence: TypeScript build completed and generated CLI reference was current.
    Scope: type safety and public CLI documentation.

    Command: bun run ci:contract
    Result: pass.
    Evidence: Formatting, schemas, policy, compatibility 263commands/180args/843options, architecture, TypeScript 7 toolchain, clone, Knip, and coverage gates passed.
    Scope: full repository contract for the committed evidence-maintenance implementation.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
    - old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
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
    - Observation: The first critical chunk rejects the pre-0.7.5 reviewed compatibility candidate after the three new advanced evidence commands change CLI topology; no task-local critical behavior failed.
      Impact: Final pass and publication must wait for the centralized baseline update and rebase.
      Resolution: Merge BZT3D9, rebase V3WHE9, rerun evidence tests, CLI test, critical, typecheck, and docs check, then record pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Add safe local evidence retention, statistics, and garbage collection

Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.

## Scope

- In scope: Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
- Out of scope: unrelated refactors not required for "Add safe local evidence retention, statistics, and garbage collection".

## Plan

1. Define a local evidence inventory and reachability model separating immutable Git manifests from large content-addressed objects. 2. Add evidence stats with JSON and human output for tracked evidence, object counts and bytes, duplicates, reachable, pinned, expired, and collectible objects. 3. Add a dry-run-first compact path that only replaces supported duplicate large payloads with verified object references and refuses unsupported or dirty histories. 4. Add a dry-run-first gc path whose apply mode requires explicit authority and can delete only hash-verified unreferenced or retention-expired objects; never delete task summaries, ACRs, receipts, fingerprints, final findings, current failure evidence, or release-pinned evidence. 5. Add retention configuration with conservative defaults and fixtures for success/failure age, deduplication, pins, corrupted references, concurrent writers, interruption, and idempotency. 6. Document rollback/recovery and run critical compatibility checks.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts
- bun run test:critical
- bun run typecheck
- bun run docs:cli:check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:28:55.868Z — VERIFY — needs_rework

By: TESTER

Note: Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:28:40.203Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
- old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T01:24:03.878Z — VERIFY — ok

By: TESTER

Note: Result: pass; evidence suites passed 11/11, critical suite passed 84/84, typecheck and CLI docs checks passed, and the full ci:contract passed including compatibility 263commands/180args/843options, architecture, clone, Knip, and coverage. No retention apply was performed against repository evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:24:01.310Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
- old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

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

### 2026-08-08T01:25:05.422Z — VERIFY — ok

By: TESTER

Note: Result: pass; all declared verification steps and the full contract suite passed for implementation 9ecb9fa40f42d2dc934c91da8d5cb814a7f122c8.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:24:04.769Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence && bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.evidence.test.ts
Result: pass; 3 files and 11 tests passed.
Evidence: Vitest reported 2 evidence files with 8 tests and 1 CLI file with 3 tests.
Scope: evidence inventory, retention safety, compaction, garbage collection, and CLI rendering.

Command: bun run test:critical
Result: pass; 12 chunks and 84 tests passed.
Evidence: The critical CLI runner reported all twelve chunks passed.
Scope: compatibility, replay hardening, trust boundaries, protected paths, and git edge cases.

Command: bun run typecheck && bun run docs:cli:check
Result: pass
Evidence: TypeScript build completed and generated CLI reference was current.
Scope: type safety and public CLI documentation.

Command: bun run ci:contract
Result: pass
Evidence: Compatibility 263commands/180args/843options, architecture, clone, Knip, and coverage gates passed.
Scope: full repository contract for the committed evidence-maintenance implementation.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
- old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T01:36:31.621Z — VERIFY — ok

By: TESTER

Note: Result: pass; all declared verification steps and the full contract suite passed for implementation 40b758a4467e3186a89591dff2e79442575e383a.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T01:25:06.340Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence && bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.evidence.test.ts
Result: pass; 3 files and 15 tests passed.
Evidence: Vitest reported 2 evidence files with 12 tests and 1 CLI file with 3 tests.
Scope: evidence inventory, concurrent reachability and retention-pin revalidation, compaction, garbage collection, and CLI rendering.

Command: bun run test:critical
Result: pass; 12 chunks and 84 tests passed.
Evidence: The critical CLI runner reported all twelve chunks passed.
Scope: compatibility, replay hardening, trust boundaries, protected paths, and git edge cases.

Command: bun run typecheck && bun run docs:cli:check
Result: pass.
Evidence: TypeScript build completed and generated CLI reference was current.
Scope: type safety and public CLI documentation.

Command: bun run ci:contract
Result: pass.
Evidence: Formatting, schemas, policy, compatibility 263commands/180args/843options, architecture, TypeScript 7 toolchain, clone, Knip, and coverage gates passed.
Scope: full repository contract for the committed evidence-maintenance implementation.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
- old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
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

- Observation: The first critical chunk rejects the pre-0.7.5 reviewed compatibility candidate after the three new advanced evidence commands change CLI topology; no task-local critical behavior failed.
  Impact: Final pass and publication must wait for the centralized baseline update and rebase.
  Resolution: Merge BZT3D9, rebase V3WHE9, rerun evidence tests, CLI test, critical, typecheck, and docs check, then record pass.
