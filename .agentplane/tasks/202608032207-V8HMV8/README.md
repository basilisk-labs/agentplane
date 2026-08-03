---
id: "202608032207-V8HMV8"
title: "Make qualification reruns ignore their active evidence directory"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T22:08:01.389Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-03T22:19:50.651Z"
  updated_by: "TESTER"
  note: "GitHub review found that an arbitrary nested --out-dir can hide source changes from the exact-subject gate."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T22:15:04.532Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "13f3d8101d2b31224497089325b4a1c2a0bbb239"
  blueprint_digest: "8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b"
  evidence_refs:
    - ".agentplane/tasks/202608032207-V8HMV8/quality/20260803-221504295-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/20260803-221504295-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/objects/sha256/8488a7cc33aae29a931039a1de7f8ab89189a7e0a85b2d0cfee2f935c8a5a011.md"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/20260803-221504295-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/20260803-221504295-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/20260803-221504295-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608032207-V8HMV8/README.md"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/objects/sha256/b74f294b807a0a286a16be75b4f2bcedd501995ac4b3c96eb18aac25839ef409.patch"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/objects/sha256/68d1c9d1c92e895228f42292fe1754081e6beda96ddcd2dfe816d49cdfd731b1.json"
    - ".agentplane/tasks/202608032207-V8HMV8/verification/20260803221445752-ba13a07622260bf4.json"
    - ".agentplane/tasks/202608032207-V8HMV8/quality/objects/sha256/36721cc7e9f0ca58821114f51ebf0f87fdac49b5557462688b63b3b59071c03c.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The runner resolves and validates the explicit nested output directory before source identity capture, passes only that directory to the existing Git pathspec exclusion, and exposes an import-safe boundary for isolated regression coverage."
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-03T22:15:30.934Z"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: qualification runner now excludes only its resolved nested evidence directory during the initial exact-subject check; focused regression, typecheck, lint, and formatting passed."
  -
    author: "CODER"
    body: "Implementation rework: regression coverage now imports an execution-boundary helper and uses an isolated temporary Git repository, avoiding dependency on developer checkout cleanliness."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-03T22:08:23.112Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T22:10:47.488Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: qualification runner now excludes only its resolved nested evidence directory during the initial exact-subject check; focused regression, typecheck, lint, and formatting passed."
  -
    type: "verify"
    at: "2026-08-03T22:11:18.277Z"
    author: "TESTER"
    state: "ok"
    note: |-
      Result: pass
      Evidence: node --test scripts/qualification/release-qualification.test.mjs passed 20/20 on the committed implementation; bun run typecheck passed; focused ESLint and Prettier checks passed; the regression proves active evidence is excluded while unrelated/root/outside paths remain guarded.
  -
    type: "verify"
    at: "2026-08-03T22:12:25.696Z"
    author: "TESTER"
    state: "ok"
    note: "Qualification evidence rerun regression and static checks pass."
  -
    type: "verify"
    at: "2026-08-03T22:13:17.566Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Regression test must not depend on the cleanliness of the developer checkout."
  -
    type: "status"
    at: "2026-08-03T22:14:24.406Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework: regression coverage now imports an execution-boundary helper and uses an isolated temporary Git repository, avoiding dependency on developer checkout cleanliness."
  -
    type: "verify"
    at: "2026-08-03T22:14:45.752Z"
    author: "TESTER"
    state: "ok"
    note: "Isolated qualification rerun regression and static checks pass."
  -
    type: "status"
    at: "2026-08-03T22:15:30.934Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-03T22:19:50.651Z"
    author: "TESTER"
    state: "needs_rework"
    note: "GitHub review found that an arbitrary nested --out-dir can hide source changes from the exact-subject gate."
doc_version: 3
doc_updated_at: "2026-08-03T22:19:51.683Z"
doc_updated_by: "CODER"
description: "Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes."
sections:
  Summary: |-
    Make qualification reruns ignore their active evidence directory

    Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
  Scope: |-
    - In scope: Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
    - Out of scope: unrelated refactors not required for "Make qualification reruns ignore their active evidence directory".
  Plan: "1. Pass the resolved nested qualification output directory into the runner's initial exact-subject identity check. 2. Add regression coverage proving existing active evidence is excluded while unrelated dirty paths still fail. 3. Run focused qualification contract tests, typecheck, lint/format checks, semantic evaluator, and hosted PR checks. 4. Merge through the integration queue, then rebase the exact-evidence task and rerun the full deterministic audit before the one-shot provider gate."
  Verify Steps: |-
    - A rerun using an existing nested --out-dir reaches scenario execution/dry-run when HEAD and all non-evidence paths are clean.
    - An unrelated tracked or untracked change still fails the exact-subject cleanliness gate.
    - Root-level and outside-repository evidence directories remain rejected.
    - node --test scripts/qualification/release-qualification.test.mjs passes.
    - bun run typecheck, focused lint/format checks, semantic evaluator, and all hosted PR checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T22:11:18.277Z — VERIFY — ok

    By: TESTER

    Note: Result: pass
    Evidence: node --test scripts/qualification/release-qualification.test.mjs passed 20/20 on the committed implementation; bun run typecheck passed; focused ESLint and Prettier checks passed; the regression proves active evidence is excluded while unrelated/root/outside paths remain guarded.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:10:47.488Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
    - old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032207-V8HMV8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T22:12:25.696Z — VERIFY — ok

    By: TESTER

    Note: Qualification evidence rerun regression and static checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:11:19.192Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

    Details:

    Command: node --test scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: 20 tests passed, including existing evidence rerun and unrelated/root/outside path guards
    Scope: qualification runner and exact-subject evidence exclusion

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: repository type safety

    Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: focused lint completed with exit code 0
    Scope: touched qualification files

    Command: bunx prettier --check scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: all matched files use Prettier code style
    Scope: touched qualification files

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
    - old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032207-V8HMV8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T22:13:17.566Z — VERIFY — needs_rework

    By: TESTER

    Note: Regression test must not depend on the cleanliness of the developer checkout.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:12:26.595Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

    Details:

    Command: node --test scripts/qualification/release-qualification.test.mjs
    Result: fail
    Evidence: the new runner regression spawns against the real repository and can reject unrelated in-progress developer changes
    Scope: deterministic local verification ergonomics

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
    - old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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

    ### 2026-08-03T22:14:45.752Z — VERIFY — ok

    By: TESTER

    Note: Isolated qualification rerun regression and static checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:14:24.406Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

    Details:

    Command: node --test scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: 19 tests passed against an isolated temporary Git repository, including active evidence and unrelated/root/outside guards
    Scope: qualification runner and exact-subject evidence exclusion

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: repository type safety

    Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: focused lint completed with exit code 0
    Scope: touched qualification files

    Command: bunx prettier --check scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
    Result: pass
    Evidence: all matched files use Prettier code style
    Scope: touched qualification files

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
    - old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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

    ### 2026-08-03T22:19:50.651Z — VERIFY — needs_rework

    By: TESTER

    Note: GitHub review found that an arbitrary nested --out-dir can hide source changes from the exact-subject gate.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:15:30.943Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

    Details:

    Command: GitHub PR #4765 review thread PRRT_kwDORCLmJM6WIyeH
    Result: fail
    Evidence: --out-dir packages/agentplane/src is currently accepted and excluded from git status
    Scope: exact-candidate qualification trust boundary

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
    - old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The initial runner cleanliness check did not receive the selected output directory, so a second audit-to-gate invocation rejected its own existing evidence.
      Impact: The authorized provider gate could not be safely rerun against the exact candidate after deterministic evidence collection.
      Resolution: Resolve and validate the nested output directory before source identity capture and pass it as evidenceDirectory; retain the existing narrow Git pathspec exclusion.

    - Observation: The integration-style regression binds its source identity check to the current development checkout.
      Impact: The focused unit suite can produce a false failure before changes are committed, reducing trust in local verification.
      Resolution: Expose the runner source-identity boundary as an import-safe helper and exercise it against an isolated temporary Git repository.

    - Observation: The runner accepts any repository-nested output directory as an evidence exclusion.
      Impact: A caller can hide tracked source modifications by selecting a source directory as --out-dir while recording sourceIdentity.clean=true.
      Resolution: Allow rerun exclusions only under dedicated .agentplane reports or task evidence namespaces and add source-directory rejection coverage.
extensions:
  workflow_route_baseline:
    start_head_sha: "15c0d5808aa64bb6ad3f15666ccac58b1648cec1"
    version: 1
id_source: "generated"
---
## Summary

Make qualification reruns ignore their active evidence directory

Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.

## Scope

- In scope: Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
- Out of scope: unrelated refactors not required for "Make qualification reruns ignore their active evidence directory".

## Plan

1. Pass the resolved nested qualification output directory into the runner's initial exact-subject identity check. 2. Add regression coverage proving existing active evidence is excluded while unrelated dirty paths still fail. 3. Run focused qualification contract tests, typecheck, lint/format checks, semantic evaluator, and hosted PR checks. 4. Merge through the integration queue, then rebase the exact-evidence task and rerun the full deterministic audit before the one-shot provider gate.

## Verify Steps

- A rerun using an existing nested --out-dir reaches scenario execution/dry-run when HEAD and all non-evidence paths are clean.
- An unrelated tracked or untracked change still fails the exact-subject cleanliness gate.
- Root-level and outside-repository evidence directories remain rejected.
- node --test scripts/qualification/release-qualification.test.mjs passes.
- bun run typecheck, focused lint/format checks, semantic evaluator, and all hosted PR checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T22:11:18.277Z — VERIFY — ok

By: TESTER

Note: Result: pass
Evidence: node --test scripts/qualification/release-qualification.test.mjs passed 20/20 on the committed implementation; bun run typecheck passed; focused ESLint and Prettier checks passed; the regression proves active evidence is excluded while unrelated/root/outside paths remain guarded.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:10:47.488Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
- old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032207-V8HMV8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T22:12:25.696Z — VERIFY — ok

By: TESTER

Note: Qualification evidence rerun regression and static checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:11:19.192Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

Details:

Command: node --test scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: 20 tests passed, including existing evidence rerun and unrelated/root/outside path guards
Scope: qualification runner and exact-subject evidence exclusion

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: repository type safety

Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: focused lint completed with exit code 0
Scope: touched qualification files

Command: bunx prettier --check scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: all matched files use Prettier code style
Scope: touched qualification files

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
- old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032207-V8HMV8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T22:13:17.566Z — VERIFY — needs_rework

By: TESTER

Note: Regression test must not depend on the cleanliness of the developer checkout.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:12:26.595Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

Details:

Command: node --test scripts/qualification/release-qualification.test.mjs
Result: fail
Evidence: the new runner regression spawns against the real repository and can reject unrelated in-progress developer changes
Scope: deterministic local verification ergonomics

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
- old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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

### 2026-08-03T22:14:45.752Z — VERIFY — ok

By: TESTER

Note: Isolated qualification rerun regression and static checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:14:24.406Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

Details:

Command: node --test scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: 19 tests passed against an isolated temporary Git repository, including active evidence and unrelated/root/outside guards
Scope: qualification runner and exact-subject evidence exclusion

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: repository type safety

Command: bunx eslint scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: focused lint completed with exit code 0
Scope: touched qualification files

Command: bunx prettier --check scripts/qualification/run-v0.7.1-release-qualification.mjs scripts/qualification/release-qualification.test.mjs
Result: pass
Evidence: all matched files use Prettier code style
Scope: touched qualification files

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
- old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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

### 2026-08-03T22:19:50.651Z — VERIFY — needs_rework

By: TESTER

Note: GitHub review found that an arbitrary nested --out-dir can hide source changes from the exact-subject gate.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:15:30.943Z, excerpt_hash=sha256:23b5b9451e6fedfbe082e491d9c4ca243dc6e174e949b8e6724478176b772a00

Details:

Command: GitHub PR #4765 review thread PRRT_kwDORCLmJM6WIyeH
Result: fail
Evidence: --out-dir packages/agentplane/src is currently accepted and excluded from git status
Scope: exact-candidate qualification trust boundary

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032207-V8HMV8-qualification-evidence-rerun/.agentplane/tasks/202608032207-V8HMV8/blueprint/resolved-snapshot.json
- old_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- current_digest: 8966cc876517ec134af75fddcf98f9fdba7987db0976208be0491a86f3b3493b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032207-V8HMV8

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The initial runner cleanliness check did not receive the selected output directory, so a second audit-to-gate invocation rejected its own existing evidence.
  Impact: The authorized provider gate could not be safely rerun against the exact candidate after deterministic evidence collection.
  Resolution: Resolve and validate the nested output directory before source identity capture and pass it as evidenceDirectory; retain the existing narrow Git pathspec exclusion.

- Observation: The integration-style regression binds its source identity check to the current development checkout.
  Impact: The focused unit suite can produce a false failure before changes are committed, reducing trust in local verification.
  Resolution: Expose the runner source-identity boundary as an import-safe helper and exercise it against an isolated temporary Git repository.

- Observation: The runner accepts any repository-nested output directory as an evidence exclusion.
  Impact: A caller can hide tracked source modifications by selecting a source directory as --out-dir while recording sourceIdentity.clean=true.
  Resolution: Allow rerun exclusions only under dedicated .agentplane reports or task evidence namespaces and add source-directory rejection coverage.

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-03T22:15:30.934Z`
