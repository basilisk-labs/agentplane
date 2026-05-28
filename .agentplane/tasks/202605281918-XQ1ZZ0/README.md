---
id: "202605281918-XQ1ZZ0"
title: "Hotspot baseline and refactor guardrails"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "maintainability"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T19:19:08.857Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T19:22:19.085Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --config vitest.workspace.ts. Result: pass. Evidence: 1 test file, 11 tests passed. Scope: hotspot report schema and agent-critical classification behavior. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: threshold check passed; current baseline reports 50 runtime warnings and 11 oversized test warnings under existing thresholds. Scope: hotspot guardrail compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript validity. Command: bun run format:changed. Result: pass. Evidence: changed files use Prettier style. Scope: formatting for changed files."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T19:22:43.404Z"
  updated_by: "EVALUATOR"
  note: "Hotspot report now exposes an agent-critical machine-readable baseline while preserving existing threshold behavior."
  evaluated_sha: "63b38cca6b304b70abdf71a9a5f898c5f7626b3c"
  blueprint_digest: "9bf319c8c9f96c2b3b09ec974e0c5b8485bba850f0a29a66ecff720c4f4a5540"
  evidence_refs:
    - ".agentplane/tasks/202605281918-XQ1ZZ0/README.md"
    - ".agentplane/tasks/202605281918-XQ1ZZ0/quality/20260528-192243404-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281918-XQ1ZZ0/quality/20260528-192243404-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281918-XQ1ZZ0/quality/20260528-192243404-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281918-XQ1ZZ0/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --config vitest.workspace.ts"
    - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
    - "bun run typecheck"
    - "8db032be4a99"
  findings:
    - "Added agent_critical_runtime_warnings with category counts and per-file modules for route-oracle, runner, evaluator, guard, task-lifecycle, and provider-lane surfaces."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement hotspot baseline and refactor guardrails from the dedicated branch_pr worktree, preserving current threshold behavior while exposing machine-readable data for follow-up decomposition tasks."
events:
  -
    type: "status"
    at: "2026-05-28T19:19:31.090Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement hotspot baseline and refactor guardrails from the dedicated branch_pr worktree, preserving current threshold behavior while exposing machine-readable data for follow-up decomposition tasks."
  -
    type: "verify"
    at: "2026-05-28T19:22:19.085Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --config vitest.workspace.ts. Result: pass. Evidence: 1 test file, 11 tests passed. Scope: hotspot report schema and agent-critical classification behavior. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: threshold check passed; current baseline reports 50 runtime warnings and 11 oversized test warnings under existing thresholds. Scope: hotspot guardrail compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript validity. Command: bun run format:changed. Result: pass. Evidence: changed files use Prettier style. Scope: formatting for changed files."
doc_version: 3
doc_updated_at: "2026-05-28T19:22:19.111Z"
doc_updated_by: "CODER"
description: "Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules."
sections:
  Summary: |-
    Hotspot baseline and refactor guardrails

    Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.
  Scope: |-
    - In scope: Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.
    - Out of scope: unrelated refactors not required for "Hotspot baseline and refactor guardrails".
  Plan: "Implement a hotspot/refactor guardrail baseline for agent-critical decomposition. Scope: add a machine-readable hotspot reporting surface or equivalent stable artifact, classify agent-critical hotspot files, and make the refactor checks usable by subsequent decomposition tasks. Acceptance: hotspot-report still passes with current thresholds, typecheck passes, and the task documents the baseline numbers and next decomposition targets."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T19:22:19.085Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --config vitest.workspace.ts. Result: pass. Evidence: 1 test file, 11 tests passed. Scope: hotspot report schema and agent-critical classification behavior. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: threshold check passed; current baseline reports 50 runtime warnings and 11 oversized test warnings under existing thresholds. Scope: hotspot guardrail compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript validity. Command: bun run format:changed. Result: pass. Evidence: changed files use Prettier style. Scope: formatting for changed files.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T19:19:31.090Z, excerpt_hash=sha256:9b9e0637f9942ecb2ef849da2bc7ca5a34d1d27e19d7a410bc6a211a5ce41b63

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605281918-XQ1ZZ0-hotspot-baseline-refactor-guardrails/.agentplane/tasks/202605281918-XQ1ZZ0/blueprint/resolved-snapshot.json
    - old_digest: 9bf319c8c9f96c2b3b09ec974e0c5b8485bba850f0a29a66ecff720c4f4a5540
    - current_digest: 9bf319c8c9f96c2b3b09ec974e0c5b8485bba850f0a29a66ecff720c4f4a5540
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281918-XQ1ZZ0

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Hotspot baseline and refactor guardrails

Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.

## Scope

- In scope: Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.
- Out of scope: unrelated refactors not required for "Hotspot baseline and refactor guardrails".

## Plan

Implement a hotspot/refactor guardrail baseline for agent-critical decomposition. Scope: add a machine-readable hotspot reporting surface or equivalent stable artifact, classify agent-critical hotspot files, and make the refactor checks usable by subsequent decomposition tasks. Acceptance: hotspot-report still passes with current thresholds, typecheck passes, and the task documents the baseline numbers and next decomposition targets.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T19:22:19.085Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --config vitest.workspace.ts. Result: pass. Evidence: 1 test file, 11 tests passed. Scope: hotspot report schema and agent-critical classification behavior. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Result: pass. Evidence: threshold check passed; current baseline reports 50 runtime warnings and 11 oversized test warnings under existing thresholds. Scope: hotspot guardrail compatibility. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript validity. Command: bun run format:changed. Result: pass. Evidence: changed files use Prettier style. Scope: formatting for changed files.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T19:19:31.090Z, excerpt_hash=sha256:9b9e0637f9942ecb2ef849da2bc7ca5a34d1d27e19d7a410bc6a211a5ce41b63

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605281918-XQ1ZZ0-hotspot-baseline-refactor-guardrails/.agentplane/tasks/202605281918-XQ1ZZ0/blueprint/resolved-snapshot.json
- old_digest: 9bf319c8c9f96c2b3b09ec974e0c5b8485bba850f0a29a66ecff720c4f4a5540
- current_digest: 9bf319c8c9f96c2b3b09ec974e0c5b8485bba850f0a29a66ecff720c4f4a5540
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281918-XQ1ZZ0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
