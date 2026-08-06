---
id: "202608061925-KANFC0"
title: "Preserve exact Windows task README file identities"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T19:25:23.776Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-06T19:49:54.150Z"
  updated_by: "TESTER"
  note: "The exact NTFS scan-path regression, typecheck, and platform-critical suite pass. Verification remains rework because the mandatory full critical suite cannot pass until pending PR #4785 repairs the pre-existing compatibility baseline; after it merges, rebase and rerun the complete check before evaluation or integration."
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T19:39:48.313Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "d2e5d894b25e3e4ea5438b0867b3e489e304cf60"
  blueprint_digest: "addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2"
  evidence_refs:
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608061925-KANFC0/quality/objects/sha256/f4b5e97483e7d32849ed95b65e70554651ed56ef2c56ae0245f13be432ef4e53.md"
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608061925-KANFC0/quality/20260806-193910936-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608061925-KANFC0/README.md"
    - ".agentplane/tasks/202608061925-KANFC0/quality/objects/sha256/e218134b64056582669dde7fa6d3338f14482f8dfac424e526490d92683601e1.patch"
    - ".agentplane/tasks/202608061925-KANFC0/quality/objects/sha256/cb6bf28be763a1acbea7a33e00cc5a0449c0d585277c90af875bb336d3f46576.json"
    - ".agentplane/tasks/202608061925-KANFC0/verification/20260806193854648-823522e735c4b3a1.json"
    - ".agentplane/tasks/202608061925-KANFC0/quality/objects/sha256/bf5780f48a58ae1343c240359cca134d113d3d93bbd40c7beab88a82a18a5dad.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The regression test validates only the extracted stat-entry helper, not the required scan-to-stable-reader path where the precision bug occurred."
    - "Mandatory verification is incomplete: bun run test:critical was not executed and the recorded skip has no owner approval."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: preserve exact bigint dev/ino during local task README scans and retain cache-compatible fractional mtime; backend and platform-critical suites pass."
  -
    author: "CODER"
    body: "Implemented rework: the NTFS regression now exercises the complete task scan, containment checks, path lstat checks, stable file-handle reads, and exact bigint identity comparison. Focused backend 32/32, typecheck, lint, and diff checks pass; test:critical was executed and fails only on the known pre-existing compatibility baseline fixed by pending PR #4785."
events:
  -
    type: "status"
    at: "2026-08-06T19:28:55.044Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T19:36:37.865Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: preserve exact bigint dev/ino during local task README scans and retain cache-compatible fractional mtime; backend and platform-critical suites pass."
  -
    type: "verify"
    at: "2026-08-06T19:36:56.533Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact README identity handling: backend suite 32/32, typecheck, targeted lint, and platform-critical 94/94 pass. Full critical remains pending after PR #4785 updates the pre-existing compatibility baseline; Windows hosted proof is required before integration."
  -
    type: "verify"
    at: "2026-08-06T19:38:54.648Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact README identity handling: backend suite 32/32, typecheck, and platform-critical 94/94 pass. Full critical awaits PR #4785 compatibility-baseline repair; exact Windows hosted proof remains an integration gate."
  -
    type: "status"
    at: "2026-08-06T19:46:25.555Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented rework: the NTFS regression now exercises the complete task scan, containment checks, path lstat checks, stable file-handle reads, and exact bigint identity comparison. Focused backend 32/32, typecheck, lint, and diff checks pass; test:critical was executed and fails only on the known pre-existing compatibility baseline fixed by pending PR #4785."
  -
    type: "verify"
    at: "2026-08-06T19:49:54.150Z"
    author: "TESTER"
    state: "needs_rework"
    note: "The exact NTFS scan-path regression, typecheck, and platform-critical suite pass. Verification remains rework because the mandatory full critical suite cannot pass until pending PR #4785 repairs the pre-existing compatibility baseline; after it merges, rebase and rerun the complete check before evaluation or integration."
doc_version: 3
doc_updated_at: "2026-08-06T19:49:55.489Z"
doc_updated_by: "CODER"
description: "Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish."
sections:
  Summary: |-
    Preserve exact Windows task README file identities

    Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
  Scope: |-
    - In scope: Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
    - Out of scope: unrelated refactors not required for "Preserve exact Windows task README file identities".
  Plan: "1. Reproduce the precision boundary with a synthetic NTFS-style file identity above 2^53 and trace the local task scan into the stable no-follow reader. 2. Make the pre-scan use bigint filesystem metadata end-to-end, converting only safe cache fields such as README size and mtime to numbers. 3. Add focused regression coverage for exact high file IDs plus normal local task scans. 4. Run local backend, critical CLI, type, formatting, and Windows hosted gates. 5. Integrate before the 0.7.5 release task and record the external bug report as provenance."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts`. Expected: a synthetic NTFS-style file identity above `Number.MAX_SAFE_INTEGER` remains byte-exact through the scan identity helper and ordinary local task scans still pass.
    2. Run `bun run typecheck` and `bun run test:critical`. Expected: no type, local backend, verify, finish, or lifecycle regression.
    3. Confirm the implementation obtains task README metadata with `lstat(..., { bigint: true })` before passing the identity to stable protected reads. Expected: no number-to-bigint conversion occurs for `dev` or `ino`.
    4. Confirm Windows hosted CI passes before integration. Expected: required `PR verification` is green on the exact PR head.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T19:36:56.533Z — VERIFY — ok

    By: TESTER

    Note: Verified exact README identity handling: backend suite 32/32, typecheck, targeted lint, and platform-critical 94/94 pass. Full critical remains pending after PR #4785 updates the pre-existing compatibility baseline; Windows hosted proof is required before integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:36:37.865Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
    - old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061925-KANFC0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608061925-KANFC0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T19:38:54.648Z — VERIFY — ok

    By: TESTER

    Note: Verified exact README identity handling: backend suite 32/32, typecheck, and platform-critical 94/94 pass. Full critical awaits PR #4785 compatibility-baseline repair; exact Windows hosted proof remains an integration gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:36:57.453Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts
    Result: pass
    Evidence: 1 file passed, 32 tests passed
    Scope: local task backend scan and NTFS-style exact file identity regression

    Command: bun run typecheck
    Result: pass
    Evidence: typecheck completed successfully with exit code 0
    Scope: repository TypeScript contracts affected by bigint stat handling

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.platform-critical.test.ts packages/agentplane/src/commands/task/task-operations.platform-critical.test.ts packages/agentplane/src/commands/task/task-qualification.platform-critical.test.ts packages/agentplane/src/commands/pr/pr-lifecycle.platform-critical.test.ts packages/agentplane/src/commands/pr/pr-integration.platform-critical.test.ts packages/agentplane/src/commands/evaluator/evaluator.platform-critical.test.ts
    Result: pass
    Evidence: 6 files passed, 94 tests passed
    Scope: verify finish evaluator and PR lifecycle platform-critical behavior

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
    - old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061925-KANFC0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608061925-KANFC0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T19:49:54.150Z — VERIFY — needs_rework

    By: TESTER

    Note: The exact NTFS scan-path regression, typecheck, and platform-critical suite pass. Verification remains rework because the mandatory full critical suite cannot pass until pending PR #4785 repairs the pre-existing compatibility baseline; after it merges, rebase and rerun the complete check before evaluation or integration.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:46:25.555Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts
    Result: pass
    Evidence: 1 file passed, 32 tests passed; the NTFS regression completed five path lstat identity checks and two stable file-handle stat checks
    Scope: complete local task scan through containment and stable no-follow README reader

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: source and test type contracts for bigint file identity handling

    Command: bun run test:platform-critical
    Result: pass
    Evidence: 6 files passed, 94 tests passed
    Scope: Windows-critical CLI, task, PR, evaluator, verify, and finish behavior

    Command: bun run test:critical
    Result: fail
    Evidence: stopped in chunk 1 with only two known compatibility baseline assertions; expected 79d9462b... versus current f1f7ba36..., plus the planned v0.7.4 surface digest mismatch already repaired by pending PR #4785
    Scope: full critical CLI suite on the pre-#4785 main base; later chunks did not execute

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
    - old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061925-KANFC0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608061925-KANFC0
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
    - Observation: External Windows report and source trace confirmed local task pre-scan converted Number-based lstat dev/ino into BigInt before exact protected-read comparison.
      Impact: NTFS file IDs above 2^53 could be rounded and falsely classified as unreadable_readme, blocking verify and finish while direct task reads still succeeded.
      Resolution: Use BigIntStats for pre-scan identity, preserve dev/ino exactly, reconstruct fractional mtimeMs from mtimeNs for cache compatibility, and cover an unsafe-in-Number Windows-style identity.

    - Observation: The scan now reads dev and ino as bigint without a lossy Number conversion and preserves fractional mtime for cache stability.
      Impact: Valid task READMEs with NTFS file IDs above 2^53 are no longer misclassified as unreadable.
      Resolution: Added exact bigint stat handling and a synthetic NTFS regression test.

    - Observation: bun run test:critical executed on the task head and stopped in chunk 1 only on the known compatibility-baseline failures inherited from main.
      Impact: The Windows fix is focused and platform-critical checks pass, but this task cannot claim full DoD until the branch is rebased after PR #4785 and every critical chunk passes.
      Resolution: Keep verification in rework; rebase on repaired main, rerun backend, typecheck, platform-critical, and full critical suites, then request fresh evaluation and Windows hosted proof.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Preserve exact Windows task README file identities

Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.

## Scope

- In scope: Fix local task scans so NTFS file IDs above Number.MAX_SAFE_INTEGER remain exact across pre-scan and stable-read identity checks, preventing false unreadable_readme failures in verify and finish.
- Out of scope: unrelated refactors not required for "Preserve exact Windows task README file identities".

## Plan

1. Reproduce the precision boundary with a synthetic NTFS-style file identity above 2^53 and trace the local task scan into the stable no-follow reader. 2. Make the pre-scan use bigint filesystem metadata end-to-end, converting only safe cache fields such as README size and mtime to numbers. 3. Add focused regression coverage for exact high file IDs plus normal local task scans. 4. Run local backend, critical CLI, type, formatting, and Windows hosted gates. 5. Integrate before the 0.7.5 release task and record the external bug report as provenance.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts`. Expected: a synthetic NTFS-style file identity above `Number.MAX_SAFE_INTEGER` remains byte-exact through the scan identity helper and ordinary local task scans still pass.
2. Run `bun run typecheck` and `bun run test:critical`. Expected: no type, local backend, verify, finish, or lifecycle regression.
3. Confirm the implementation obtains task README metadata with `lstat(..., { bigint: true })` before passing the identity to stable protected reads. Expected: no number-to-bigint conversion occurs for `dev` or `ino`.
4. Confirm Windows hosted CI passes before integration. Expected: required `PR verification` is green on the exact PR head.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T19:36:56.533Z — VERIFY — ok

By: TESTER

Note: Verified exact README identity handling: backend suite 32/32, typecheck, targeted lint, and platform-critical 94/94 pass. Full critical remains pending after PR #4785 updates the pre-existing compatibility baseline; Windows hosted proof is required before integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:36:37.865Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
- old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061925-KANFC0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608061925-KANFC0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T19:38:54.648Z — VERIFY — ok

By: TESTER

Note: Verified exact README identity handling: backend suite 32/32, typecheck, and platform-critical 94/94 pass. Full critical awaits PR #4785 compatibility-baseline repair; exact Windows hosted proof remains an integration gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:36:57.453Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts
Result: pass
Evidence: 1 file passed, 32 tests passed
Scope: local task backend scan and NTFS-style exact file identity regression

Command: bun run typecheck
Result: pass
Evidence: typecheck completed successfully with exit code 0
Scope: repository TypeScript contracts affected by bigint stat handling

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.platform-critical.test.ts packages/agentplane/src/commands/task/task-operations.platform-critical.test.ts packages/agentplane/src/commands/task/task-qualification.platform-critical.test.ts packages/agentplane/src/commands/pr/pr-lifecycle.platform-critical.test.ts packages/agentplane/src/commands/pr/pr-integration.platform-critical.test.ts packages/agentplane/src/commands/evaluator/evaluator.platform-critical.test.ts
Result: pass
Evidence: 6 files passed, 94 tests passed
Scope: verify finish evaluator and PR lifecycle platform-critical behavior

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
- old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061925-KANFC0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608061925-KANFC0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T19:49:54.150Z — VERIFY — needs_rework

By: TESTER

Note: The exact NTFS scan-path regression, typecheck, and platform-critical suite pass. Verification remains rework because the mandatory full critical suite cannot pass until pending PR #4785 repairs the pre-existing compatibility baseline; after it merges, rebase and rerun the complete check before evaluation or integration.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:46:25.555Z, excerpt_hash=sha256:b8abbf24a61094c880d52f9eb99afc0ebf2e6cd65c626b226a80549fa6184d0d

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts
Result: pass
Evidence: 1 file passed, 32 tests passed; the NTFS regression completed five path lstat identity checks and two stable file-handle stat checks
Scope: complete local task scan through containment and stable no-follow README reader

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: source and test type contracts for bigint file identity handling

Command: bun run test:platform-critical
Result: pass
Evidence: 6 files passed, 94 tests passed
Scope: Windows-critical CLI, task, PR, evaluator, verify, and finish behavior

Command: bun run test:critical
Result: fail
Evidence: stopped in chunk 1 with only two known compatibility baseline assertions; expected 79d9462b... versus current f1f7ba36..., plus the planned v0.7.4 surface digest mismatch already repaired by pending PR #4785
Scope: full critical CLI suite on the pre-#4785 main base; later chunks did not execute

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061925-KANFC0-preserve-exact-windows-task-readme-file-identiti/.agentplane/tasks/202608061925-KANFC0/blueprint/resolved-snapshot.json
- old_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- current_digest: addd84cbd305a906371cd8cbf627e52cc1a6a49f14daa3cf478383c3d09bd0e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061925-KANFC0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608061925-KANFC0
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

- Observation: External Windows report and source trace confirmed local task pre-scan converted Number-based lstat dev/ino into BigInt before exact protected-read comparison.
  Impact: NTFS file IDs above 2^53 could be rounded and falsely classified as unreadable_readme, blocking verify and finish while direct task reads still succeeded.
  Resolution: Use BigIntStats for pre-scan identity, preserve dev/ino exactly, reconstruct fractional mtimeMs from mtimeNs for cache compatibility, and cover an unsafe-in-Number Windows-style identity.

- Observation: The scan now reads dev and ino as bigint without a lossy Number conversion and preserves fractional mtime for cache stability.
  Impact: Valid task READMEs with NTFS file IDs above 2^53 are no longer misclassified as unreadable.
  Resolution: Added exact bigint stat handling and a synthetic NTFS regression test.

- Observation: bun run test:critical executed on the task head and stopped in chunk 1 only on the known compatibility-baseline failures inherited from main.
  Impact: The Windows fix is focused and platform-critical checks pass, but this task cannot claim full DoD until the branch is rebased after PR #4785 and every critical chunk passes.
  Resolution: Keep verification in rework; rebase on repaired main, rerun backend, typecheck, platform-critical, and full critical suites, then request fresh evaluation and Windows hosted proof.
