---
id: "202608012034-W6F4DM"
title: "Prevent artifact gate buffer overflow on large repositories"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202608011958-EMTWRX"
tags:
  - "code"
  - "release"
  - "reliability"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run artifacts:check"
  - "bun run ci:contract"
  - "bun run format:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T20:34:50.161Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T20:40:21.289Z"
  updated_by: "TESTER"
  note: "PASS at implementation 390bfc5a8: reproduced ENOBUFS with 1,234,456-byte tracked inventory; after the bounded fix, the current 1,234,845-byte inventory passes artifacts:check. Targeted ESLint/Prettier, full ci:contract, diff check, and clean worktree pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-01T20:40:57.866Z"
  updated_by: "HUMAN"
  note: "The repair is minimal and closes the demonstrated buffer failure without weakening artifact policy or introducing unbounded process output."
  evaluated_sha: "390bfc5a8817d63450b606c9453246bec377731e"
  blueprint_digest: "2e4070ab8e0b48ecf48cc918264488cd6ecfd02beb05944644f5593465ed5dac"
  evidence_refs:
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608012034-W6F4DM/README.md"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608012034-W6F4DM/quality/20260801-204057655-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "scripts/checks/check-agentplane-artifacts.mjs"
    - ".agentplane/tasks/202608012034-W6F4DM/verification/20260801204021289-75039c2a37d923b8.json"
  findings:
    - "A single 64 MiB constant is applied to the tracked-file git query, git archive invocation, and tar inventory; all buffered child-process paths in this gate are covered."
    - "The volatile-path predicates, historical cutoff, offender reporting, and export-ignore validation are unchanged, so the fix changes capacity rather than acceptance semantics."
commit:
  hash: "390bfc5a8817d63450b606c9453246bec377731e"
  message: "🛡️ W6F4DM release: bound artifact gate buffers"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: artifact policy child processes use an explicit 64 MiB bound; the original 1,234,456-byte tracked inventory now passes without changing policy semantics."
events:
  -
    type: "status"
    at: "2026-08-01T20:35:26.284Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T20:39:45.454Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: artifact policy child processes use an explicit 64 MiB bound; the original 1,234,456-byte tracked inventory now passes without changing policy semantics."
  -
    type: "verify"
    at: "2026-08-01T20:40:21.289Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at implementation 390bfc5a8: reproduced ENOBUFS with 1,234,456-byte tracked inventory; after the bounded fix, the current 1,234,845-byte inventory passes artifacts:check. Targeted ESLint/Prettier, full ci:contract, diff check, and clean worktree pass."
doc_version: 3
doc_updated_at: "2026-08-01T20:40:22.093Z"
doc_updated_by: "CODER"
description: "Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions."
sections:
  Summary: |-
    Prevent artifact gate buffer overflow on large repositories

    Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
  Scope: |-
    - In scope: Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
    - Out of scope: unrelated refactors not required for "Prevent artifact gate buffer overflow on large repositories".
  Plan: "1. Preserve the failing evidence: tracked-path output is 1,234,923 bytes and artifacts:check exits with spawnSync git ENOBUFS under Node's default buffer. 2. Add one explicit bounded maxBuffer constant and apply it to every buffered git/tar child process in scripts/checks/check-agentplane-artifacts.mjs; do not relax volatile-artifact rules or cutoff semantics. 3. Re-run artifacts:check against the current repository, targeted lint/format, and the full ci:contract. 4. Publish and integrate the bounded repair before resuming RF-29 release:prepublish."
  Verify Steps: |-
    1. Run `git ls-files -z | wc -c`. Expected: output exceeds 1 MiB, preserving the original failure precondition.
    2. Run `bun run artifacts:check`. Expected: the complete tracked/archive inventories are evaluated and the artifact policy passes without ENOBUFS.
    3. Run targeted ESLint and Prettier checks for `scripts/checks/check-agentplane-artifacts.mjs`. Expected: no findings.
    4. Run `bun run ci:contract`. Expected: all repository contract checks pass.
    5. Run `git diff --check` and inspect the final worktree. Expected: only the bounded script change and task evidence are present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T20:40:21.289Z — VERIFY — ok

    By: TESTER

    Note: PASS at implementation 390bfc5a8: reproduced ENOBUFS with 1,234,456-byte tracked inventory; after the bounded fix, the current 1,234,845-byte inventory passes artifacts:check. Targeted ESLint/Prettier, full ci:contract, diff check, and clean worktree pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T20:39:45.454Z, excerpt_hash=sha256:e7a97de492472c83bec490bbc7748d59bd0b7eca7968d5aca446ec64ab21f549

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012034-W6F4DM-prevent-artifact-gate-buffer-overflow-on-large-r/.agentplane/tasks/202608012034-W6F4DM/blueprint/resolved-snapshot.json
    - old_digest: 2e4070ab8e0b48ecf48cc918264488cd6ecfd02beb05944644f5593465ed5dac
    - current_digest: 2e4070ab8e0b48ecf48cc918264488cd6ecfd02beb05944644f5593465ed5dac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608012034-W6F4DM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608012034-W6F4DM
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
    - Observation: `git ls-files -z` emits 1,234,456 bytes on current main, exceeding Node child_process default maxBuffer; `bun run artifacts:check` reproduced `spawnSync git ENOBUFS`.
      Impact: Release prepublish stopped before evaluating artifact policy even though the repository contents were valid.
      Resolution: Added a shared 64 MiB bound to the three buffered git/tar calls used by the artifact gate. Artifact predicates, volatile cutoffs, and archive exclusions are unchanged.

    - Command: `bun run artifacts:check`
      Result: pass
      Evidence: `agentplane artifact policy OK` on the same 1.23 MiB tracked inventory.
      Scope: tracked and archived artifact inventory.

    - Command: targeted Prettier and ESLint plus `bun run ci:contract`
      Result: pass
      Evidence: formatting, schemas, policy, compatibility, TypeScript 7 toolchain, lint, architecture, clone, Knip, and thresholds passed.
      Scope: bounded script change and repository contract.
extensions:
  workflow_route_baseline:
    start_head_sha: "929105a503c42dcf9fe7af49c2d84627f246130e"
    version: 1
id_source: "generated"
---
## Summary

Prevent artifact gate buffer overflow on large repositories

Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.

## Scope

- In scope: Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
- Out of scope: unrelated refactors not required for "Prevent artifact gate buffer overflow on large repositories".

## Plan

1. Preserve the failing evidence: tracked-path output is 1,234,923 bytes and artifacts:check exits with spawnSync git ENOBUFS under Node's default buffer. 2. Add one explicit bounded maxBuffer constant and apply it to every buffered git/tar child process in scripts/checks/check-agentplane-artifacts.mjs; do not relax volatile-artifact rules or cutoff semantics. 3. Re-run artifacts:check against the current repository, targeted lint/format, and the full ci:contract. 4. Publish and integrate the bounded repair before resuming RF-29 release:prepublish.

## Verify Steps

1. Run `git ls-files -z | wc -c`. Expected: output exceeds 1 MiB, preserving the original failure precondition.
2. Run `bun run artifacts:check`. Expected: the complete tracked/archive inventories are evaluated and the artifact policy passes without ENOBUFS.
3. Run targeted ESLint and Prettier checks for `scripts/checks/check-agentplane-artifacts.mjs`. Expected: no findings.
4. Run `bun run ci:contract`. Expected: all repository contract checks pass.
5. Run `git diff --check` and inspect the final worktree. Expected: only the bounded script change and task evidence are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T20:40:21.289Z — VERIFY — ok

By: TESTER

Note: PASS at implementation 390bfc5a8: reproduced ENOBUFS with 1,234,456-byte tracked inventory; after the bounded fix, the current 1,234,845-byte inventory passes artifacts:check. Targeted ESLint/Prettier, full ci:contract, diff check, and clean worktree pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T20:39:45.454Z, excerpt_hash=sha256:e7a97de492472c83bec490bbc7748d59bd0b7eca7968d5aca446ec64ab21f549

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012034-W6F4DM-prevent-artifact-gate-buffer-overflow-on-large-r/.agentplane/tasks/202608012034-W6F4DM/blueprint/resolved-snapshot.json
- old_digest: 2e4070ab8e0b48ecf48cc918264488cd6ecfd02beb05944644f5593465ed5dac
- current_digest: 2e4070ab8e0b48ecf48cc918264488cd6ecfd02beb05944644f5593465ed5dac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608012034-W6F4DM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608012034-W6F4DM
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

- Observation: `git ls-files -z` emits 1,234,456 bytes on current main, exceeding Node child_process default maxBuffer; `bun run artifacts:check` reproduced `spawnSync git ENOBUFS`.
  Impact: Release prepublish stopped before evaluating artifact policy even though the repository contents were valid.
  Resolution: Added a shared 64 MiB bound to the three buffered git/tar calls used by the artifact gate. Artifact predicates, volatile cutoffs, and archive exclusions are unchanged.

- Command: `bun run artifacts:check`
  Result: pass
  Evidence: `agentplane artifact policy OK` on the same 1.23 MiB tracked inventory.
  Scope: tracked and archived artifact inventory.

- Command: targeted Prettier and ESLint plus `bun run ci:contract`
  Result: pass
  Evidence: formatting, schemas, policy, compatibility, TypeScript 7 toolchain, lint, architecture, clone, Knip, and thresholds passed.
  Scope: bounded script change and repository contract.
