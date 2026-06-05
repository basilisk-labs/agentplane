---
id: "202606050513-XN7G9D"
title: "Hide runner guidance outside parallel-codex context"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "prompt"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T05:13:56.089Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T05:23:39.883Z"
  updated_by: "CODER"
  note: "Verified prompt and route context hide default runner-only guidance for ordinary tasks; explicit runner routes remain covered by tests."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T05:44:18.783Z"
  updated_by: "EVALUATOR"
  note: "Prompt and route surfaces now hide default runner guidance outside explicit runner contexts; hosted PR checks passed on PR #4452."
  evaluated_sha: "0c99d0953f4a2a4ca4f5ad203d1b2e4c7738a5ba"
  blueprint_digest: "a00f707b51bb3c661393c8cf056c882304ac8dbc5704344e0a33c4a102e6fe26"
  evidence_refs:
    - ".agentplane/tasks/202606050513-XN7G9D/README.md"
    - ".agentplane/tasks/202606050513-XN7G9D/quality/20260605-054418783-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050513-XN7G9D/quality/20260605-054418783-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050513-XN7G9D/quality/20260605-054418783-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050513-XN7G9D/blueprint/resolved-snapshot.json"
    - "gh pr checks 4452"
    - "bun run ci:local:fast"
    - "/tmp/agentplane-XN7G9D-brief.txt"
  findings:
    - "Default task brief/status/next-action output no longer emits runner-only context fields for ordinary tasks; Hermes projection no longer includes runner commands unless a runner route or task runner evidence exists."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: hide default runner guidance from ordinary agent prompt and route surfaces while preserving explicit runner routes and parallel-codex recipe behavior."
events:
  -
    type: "status"
    at: "2026-06-05T05:13:56.331Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hide default runner guidance from ordinary agent prompt and route surfaces while preserving explicit runner routes and parallel-codex recipe behavior."
  -
    type: "verify"
    at: "2026-06-05T05:23:39.883Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt and route context hide default runner-only guidance for ordinary tasks; explicit runner routes remain covered by tests."
doc_version: 3
doc_updated_at: "2026-06-05T05:23:39.982Z"
doc_updated_by: "CODER"
description: "Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle."
sections:
  Summary: |-
    Hide runner guidance outside parallel-codex context

    Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.
  Scope: |-
    - In scope: Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.
    - Out of scope: unrelated refactors not required for "Hide runner guidance outside parallel-codex context".
  Plan: "1. Audit prompt and route-context surfaces that mention runner execution outside recipe-owned parallel-codex assets. 2. Remove default runner_context output from task brief/status/next-action when the current route is not runner-required or runner-allowed. 3. Reword evaluator prompt so default quality review covers task attempts and treats runner artifacts as optional evidence only when present. 4. Verify targeted tests and command output show no runner context for ordinary tasks while preserving actual runner route handling."
  Verify Steps: |-
    1. Run `bun run --filter=agentplane typecheck`. Expected: exits 0.
    2. Run `bun run --filter=agentplane build`. Expected: exits 0 and refreshes the repo-local CLI bundle.
    3. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: all tests pass.
    4. Run `ap task brief 202606050513-XN7G9D`, `ap task status 202606050513-XN7G9D --route`, and `ap task next-action 202606050513-XN7G9D --explain`; inspect stdout for default runner-only context fields. Expected: ordinary task output contains none of those fields.
    5. Review `.agentplane/agents/EVALUATOR.json` and Hermes route projection behavior. Expected: runner evidence is optional and only appears when existing task runner evidence or an explicit runner route exists; ordinary agents are directed to continue owner task execution.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T05:23:39.883Z — VERIFY — ok

    By: CODER

    Note: Verified prompt and route context hide default runner-only guidance for ordinary tasks; explicit runner routes remain covered by tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T05:23:17.081Z, excerpt_hash=sha256:52d884883f58714c73f6f206b3252c203a809d982035fd433c3fdc497106a960

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050513-XN7G9D-hide-runner-guidance/.agentplane/tasks/202606050513-XN7G9D/blueprint/resolved-snapshot.json
    - old_digest: a00f707b51bb3c661393c8cf056c882304ac8dbc5704344e0a33c4a102e6fe26
    - current_digest: a00f707b51bb3c661393c8cf056c882304ac8dbc5704344e0a33c4a102e6fe26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050513-XN7G9D

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050513-XN7G9D --agent CODER --slug hide-runner-guidance-outside-parallel-codex-cont --worktree
    - diagnostic_command: none
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
    - Observation: typecheck, build, route CLI tests, Hermes projection tests, runner bootstrap guard tests, and live task brief/status/next-action grep all passed.
      Impact: Ordinary agents receive direct owner-task route context; runner evidence appears only when existing task runner evidence or an explicit runner route is present.
      Resolution: Added relevance gating for runner context, removed default runner references from evaluator wording, and made Hermes runner projection conditional.
id_source: "generated"
---
## Summary

Hide runner guidance outside parallel-codex context

Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.

## Scope

- In scope: Default agent prompt and route surfaces must not introduce runner execution guidance unless the route is already a real runner wait/run state or the active recipe is parallel-codex. Ordinary agents should execute tasks themselves via normal AgentPlane lifecycle.
- Out of scope: unrelated refactors not required for "Hide runner guidance outside parallel-codex context".

## Plan

1. Audit prompt and route-context surfaces that mention runner execution outside recipe-owned parallel-codex assets. 2. Remove default runner_context output from task brief/status/next-action when the current route is not runner-required or runner-allowed. 3. Reword evaluator prompt so default quality review covers task attempts and treats runner artifacts as optional evidence only when present. 4. Verify targeted tests and command output show no runner context for ordinary tasks while preserving actual runner route handling.

## Verify Steps

1. Run `bun run --filter=agentplane typecheck`. Expected: exits 0.
2. Run `bun run --filter=agentplane build`. Expected: exits 0 and refreshes the repo-local CLI bundle.
3. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: all tests pass.
4. Run `ap task brief 202606050513-XN7G9D`, `ap task status 202606050513-XN7G9D --route`, and `ap task next-action 202606050513-XN7G9D --explain`; inspect stdout for default runner-only context fields. Expected: ordinary task output contains none of those fields.
5. Review `.agentplane/agents/EVALUATOR.json` and Hermes route projection behavior. Expected: runner evidence is optional and only appears when existing task runner evidence or an explicit runner route exists; ordinary agents are directed to continue owner task execution.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T05:23:39.883Z — VERIFY — ok

By: CODER

Note: Verified prompt and route context hide default runner-only guidance for ordinary tasks; explicit runner routes remain covered by tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T05:23:17.081Z, excerpt_hash=sha256:52d884883f58714c73f6f206b3252c203a809d982035fd433c3fdc497106a960

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050513-XN7G9D-hide-runner-guidance/.agentplane/tasks/202606050513-XN7G9D/blueprint/resolved-snapshot.json
- old_digest: a00f707b51bb3c661393c8cf056c882304ac8dbc5704344e0a33c4a102e6fe26
- current_digest: a00f707b51bb3c661393c8cf056c882304ac8dbc5704344e0a33c4a102e6fe26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050513-XN7G9D

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050513-XN7G9D --agent CODER --slug hide-runner-guidance-outside-parallel-codex-cont --worktree
- diagnostic_command: none
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

- Observation: typecheck, build, route CLI tests, Hermes projection tests, runner bootstrap guard tests, and live task brief/status/next-action grep all passed.
  Impact: Ordinary agents receive direct owner-task route context; runner evidence appears only when existing task runner evidence or an explicit runner route is present.
  Resolution: Added relevance gating for runner context, removed default runner references from evaluator wording, and made Hermes runner projection conditional.
