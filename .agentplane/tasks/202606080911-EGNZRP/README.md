---
id: "202606080911-EGNZRP"
title: "Harden agent route terminal contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T09:12:21.238Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T09:28:44.780Z"
  updated_by: "CODER"
  note: "Reverified route terminal contract after hotspot fix."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-08T09:46:40.941Z"
  updated_by: "EVALUATOR"
  note: "Route terminal contract is implemented and verified."
  evaluated_sha: "e82debe4f33d70ca13da66cd187659ab20eb8a02"
  blueprint_digest: "938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4"
  evidence_refs:
    - ".agentplane/tasks/202606080911-EGNZRP/README.md"
    - ".agentplane/tasks/202606080911-EGNZRP/quality/20260608-094640941-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606080911-EGNZRP/quality/20260608-094640941-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606080911-EGNZRP/quality/20260608-094640941-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606080911-EGNZRP/blueprint/resolved-snapshot.json"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/27129028636"
  findings:
    - "DONE branch_pr without cleanup candidates now emits terminal done/stop/no-command route; next-action JSON exposes snake_case execution/operator/approval fields while preserving aliases; local and hosted checks passed on c65a877fa."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing terminal route and JSON contract fixes from the approved critical-path plan in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-06-08T09:12:54.812Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing terminal route and JSON contract fixes from the approved critical-path plan in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-06-08T09:20:38.421Z"
    author: "CODER"
    state: "ok"
    note: "Route contract checks passed: focused route suite 24/24, docs:cli:check, format:check, typecheck, policy check, and ap doctor all passed. Live DONE branch_pr route now emits stop/no command/no mutation when cleanup candidates are absent."
  -
    type: "verify"
    at: "2026-06-08T09:28:44.780Z"
    author: "CODER"
    state: "ok"
    note: "Reverified route terminal contract after hotspot fix."
doc_version: 3
doc_updated_at: "2026-06-08T09:28:44.893Z"
doc_updated_by: "CODER"
description: "Fix the agent critical path so DONE branch_pr tasks stop instead of looping on empty cleanup, normalize next-action JSON execution packet shape, and clarify route approval fields."
sections:
  Summary: |-
    Harden agent route terminal contract

    Fix the agent critical path so DONE branch_pr tasks stop instead of looping on empty cleanup, normalize next-action JSON execution packet shape, and clarify route approval fields.
  Scope: |-
    - In scope: Fix the agent critical path so DONE branch_pr tasks stop instead of looping on empty cleanup, normalize next-action JSON execution packet shape, and clarify route approval fields.
    - Out of scope: unrelated refactors not required for "Harden agent route terminal contract".
  Plan: |-
    Plan:
    1. Make DONE branch_pr route terminal when no concrete cleanup candidates remain, while preserving cleanup/finalize routes when candidates or hosted-close sync exist.
    2. Expose stable snake_case execution_packet/operator_guidance fields in task next-action JSON, with backward-compatible camelCase aliases for one release.
    3. Clarify route approval naming so agents can distinguish gateway policy from current-route approval requirement.
    4. Add/adjust regression tests for terminal DONE route, JSON contract aliases, and approval clarity; run focused route tests plus formatting/type/policy checks.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts`. Expected: route oracle, route guidance, terminal DONE, and hosted-close route coverage pass.
    2. Run `bun run docs:cli:check`. Expected: generated CLI reference is current if user-facing command output changed.
    3. Run `bun run format:check`. Expected: formatting is clean.
    4. Run `bun run typecheck`. Expected: TypeScript contracts compile.
    5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing contract still passes.
    6. Run `ap doctor`. Expected: workflow/runtime health is OK; unrelated historical warnings may be recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T09:20:38.421Z — VERIFY — ok

    By: CODER

    Note: Route contract checks passed: focused route suite 24/24, docs:cli:check, format:check, typecheck, policy check, and ap doctor all passed. Live DONE branch_pr route now emits stop/no command/no mutation when cleanup candidates are absent.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T09:12:54.812Z, excerpt_hash=sha256:3ebe8716dc42d3c375b7da3c05e9865093883803ca7b309d06dc903e2e00dbcc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080911-EGNZRP-harden-agent-route-terminal-contract/.agentplane/tasks/202606080911-EGNZRP/blueprint/resolved-snapshot.json
    - old_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
    - current_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080911-EGNZRP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080911-EGNZRP
    - diagnostic_command: agentplane pr check 202606080911-EGNZRP
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T09:28:44.780Z — VERIFY — ok

    By: CODER

    Note: Reverified route terminal contract after hotspot fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T09:20:38.580Z, excerpt_hash=sha256:3ebe8716dc42d3c375b7da3c05e9865093883803ca7b309d06dc903e2e00dbcc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080911-EGNZRP-harden-agent-route-terminal-contract/.agentplane/tasks/202606080911-EGNZRP/blueprint/resolved-snapshot.json
    - old_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
    - current_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080911-EGNZRP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080911-EGNZRP
    - diagnostic_command: agentplane pr check 202606080911-EGNZRP
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: DONE branch_pr tasks with no cleanup candidates previously emitted executable cleanup guidance.
      Impact: Agents could keep running idempotent cleanup instead of recognizing terminal state.
      Resolution: Route decision now resolves cleanup candidates before DONE fallback and emits code=done/action_kind=stop when none remain; next-action JSON also exposes snake_case fields and explicit route approval flags.

    - Observation: DONE branch_pr task 202606080758-NWA0GF now returns route_oracle.phase=done, nextCommand=null, execution_packet.action_kind=stop, and effective_mutation_approval=false via repo-local built CLI.
      Impact: Agent critical path no longer loops into cleanup when there are no cleanup candidates, and JSON route packets expose explicit snake_case execution/operator/approval fields.
      Resolution: Local checks passed: framework:dev:bootstrap, focused route tests, hotspots:check, format:check, docs:cli:check, typecheck, policy routing, ap doctor.
id_source: "generated"
---
## Summary

Harden agent route terminal contract

Fix the agent critical path so DONE branch_pr tasks stop instead of looping on empty cleanup, normalize next-action JSON execution packet shape, and clarify route approval fields.

## Scope

- In scope: Fix the agent critical path so DONE branch_pr tasks stop instead of looping on empty cleanup, normalize next-action JSON execution packet shape, and clarify route approval fields.
- Out of scope: unrelated refactors not required for "Harden agent route terminal contract".

## Plan

Plan:
1. Make DONE branch_pr route terminal when no concrete cleanup candidates remain, while preserving cleanup/finalize routes when candidates or hosted-close sync exist.
2. Expose stable snake_case execution_packet/operator_guidance fields in task next-action JSON, with backward-compatible camelCase aliases for one release.
3. Clarify route approval naming so agents can distinguish gateway policy from current-route approval requirement.
4. Add/adjust regression tests for terminal DONE route, JSON contract aliases, and approval clarity; run focused route tests plus formatting/type/policy checks.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts`. Expected: route oracle, route guidance, terminal DONE, and hosted-close route coverage pass.
2. Run `bun run docs:cli:check`. Expected: generated CLI reference is current if user-facing command output changed.
3. Run `bun run format:check`. Expected: formatting is clean.
4. Run `bun run typecheck`. Expected: TypeScript contracts compile.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing contract still passes.
6. Run `ap doctor`. Expected: workflow/runtime health is OK; unrelated historical warnings may be recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T09:20:38.421Z — VERIFY — ok

By: CODER

Note: Route contract checks passed: focused route suite 24/24, docs:cli:check, format:check, typecheck, policy check, and ap doctor all passed. Live DONE branch_pr route now emits stop/no command/no mutation when cleanup candidates are absent.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T09:12:54.812Z, excerpt_hash=sha256:3ebe8716dc42d3c375b7da3c05e9865093883803ca7b309d06dc903e2e00dbcc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080911-EGNZRP-harden-agent-route-terminal-contract/.agentplane/tasks/202606080911-EGNZRP/blueprint/resolved-snapshot.json
- old_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
- current_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080911-EGNZRP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080911-EGNZRP
- diagnostic_command: agentplane pr check 202606080911-EGNZRP
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T09:28:44.780Z — VERIFY — ok

By: CODER

Note: Reverified route terminal contract after hotspot fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T09:20:38.580Z, excerpt_hash=sha256:3ebe8716dc42d3c375b7da3c05e9865093883803ca7b309d06dc903e2e00dbcc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080911-EGNZRP-harden-agent-route-terminal-contract/.agentplane/tasks/202606080911-EGNZRP/blueprint/resolved-snapshot.json
- old_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
- current_digest: 938d43bc43c72c6bfff1e0782fec93d701cdafa16966c4cded39b40072bf36b4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080911-EGNZRP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080911-EGNZRP
- diagnostic_command: agentplane pr check 202606080911-EGNZRP
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: DONE branch_pr tasks with no cleanup candidates previously emitted executable cleanup guidance.
  Impact: Agents could keep running idempotent cleanup instead of recognizing terminal state.
  Resolution: Route decision now resolves cleanup candidates before DONE fallback and emits code=done/action_kind=stop when none remain; next-action JSON also exposes snake_case fields and explicit route approval flags.

- Observation: DONE branch_pr task 202606080758-NWA0GF now returns route_oracle.phase=done, nextCommand=null, execution_packet.action_kind=stop, and effective_mutation_approval=false via repo-local built CLI.
  Impact: Agent critical path no longer loops into cleanup when there are no cleanup candidates, and JSON route packets expose explicit snake_case execution/operator/approval fields.
  Resolution: Local checks passed: framework:dev:bootstrap, focused route tests, hotspots:check, format:check, docs:cli:check, typecheck, policy routing, ap doctor.
