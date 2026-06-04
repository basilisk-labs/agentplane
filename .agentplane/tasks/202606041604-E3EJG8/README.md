---
id: "202606041604-E3EJG8"
title: "Clarify confusing agent route diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "routing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T16:04:16.940Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T17:27:19.593Z"
  updated_by: "CODER"
  note: "CI verify-static rework fixed; knip baseline, TypeScript, and focused regression tests pass locally."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Improve route and lifecycle diagnostics so agents can distinguish actionable next commands from stale artifacts, hook risk, and stop conditions."
events:
  -
    type: "status"
    at: "2026-06-04T16:04:22.443Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Improve route and lifecycle diagnostics so agents can distinguish actionable next commands from stale artifacts, hook risk, and stop conditions."
  -
    type: "verify"
    at: "2026-06-04T16:17:02.111Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for typecheck, formatting, policy routing, and CLI smoke; focused vitest/build wrappers timed out without assertion or compiler failure output."
  -
    type: "verify"
    at: "2026-06-04T17:09:41.773Z"
    author: "CODER"
    state: "ok"
    note: "Decision-context surfaces verified with focused tests, TypeScript, formatting, policy routing, and CLI smoke on route/brief/status/pr-check outputs."
  -
    type: "verify"
    at: "2026-06-04T17:27:19.593Z"
    author: "CODER"
    state: "ok"
    note: "CI verify-static rework fixed; knip baseline, TypeScript, and focused regression tests pass locally."
doc_version: 3
doc_updated_at: "2026-06-04T17:27:19.694Z"
doc_updated_by: "CODER"
description: "Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output."
sections:
  Summary: |-
    Clarify confusing agent route diagnostics

    Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
  Scope: |-
    - In scope: Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
    - Out of scope: unrelated refactors not required for "Clarify confusing agent route diagnostics".
  Plan: "Extend agent-facing decision context on the existing diagnostics branch without changing lifecycle semantics: keep operator_guidance, add source/freshness/repeat/fallback/runner fields, surface them in task brief/status/next-action/pr check/runner bootstrap/verification details/errors, and cover the behavior with focused tests and CLI smoke checks."
  Verify Steps: |-
    1. Run TypeScript compile for agentplane source. Expected: no type errors.
    2. Run focused regression tests for route guidance, runner bootstrap, and commit diagnostics. Expected: all selected tests pass.
    3. Run formatting, diff, and policy routing checks. Expected: no formatting, whitespace, or policy routing errors.
    4. Run CLI smoke for task next-action, task status --route, task brief, and pr check. Expected: decision context exposes source_of_truth, repeat_policy, runner_context, safe_command, and diagnostic_command without stale or contradictory fields.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - PASS: timeout 120s bun run knip:check
    - PASS: timeout 90s bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    - PASS: timeout 120s ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --reporter verbose
    - PASS: timeout 60s ./node_modules/.bin/prettier --check <touched files>
    - PASS: timeout 60s git diff --check
    - PASS: timeout 60s node .agentplane/policy/check-routing.mjs
    - PASS: timeout 60s bun packages/agentplane/src/cli.ts task next-action 202606041604-E3EJG8 --explain | rg source_of_truth/repeat_policy/runner_context/diagnostic_command
    - PASS: timeout 60s bun packages/agentplane/src/cli.ts task status 202606041604-E3EJG8 --route --json
    - PASS: timeout 60s bun packages/agentplane/src/cli.ts task brief 202606041604-E3EJG8 --json
    - PASS: timeout 90s bun packages/agentplane/src/cli.ts pr check 202606041604-E3EJG8
    - CI REWORK: GitHub verify-static initially failed on exported-but-unused type aliases in route-guidance.ts; fixed by making internal helper types non-exported.

    ### 2026-06-04T17:27:19.593Z — VERIFY — ok

    By: CODER

    Note: CI verify-static rework fixed; knip baseline, TypeScript, and focused regression tests pass locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T17:27:18.201Z, excerpt_hash=sha256:8587e0d575abbdb632203d919a815872f3a6bafa154268671c0be26bdb915502

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041604-E3EJG8-clarify-confusing-agent-route-diagnostics/.agentplane/tasks/202606041604-E3EJG8/blueprint/resolved-snapshot.json
    - old_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
    - current_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606041604-E3EJG8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606041604-E3EJG8
    - diagnostic_command: agentplane pr check 202606041604-E3EJG8
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Agent-facing route, brief, PR-check, runner-bootstrap, verification, and commit-error surfaces now expose typed decision context for source of truth, freshness, repeat policy, fallback, and runner rail state.
      Impact: Agents have explicit execute/diagnose/wait/stop context and should be less likely to repeat stale PR updates, confuse hook-wrapper failures with source failures, or introduce runner execution when the route does not require it.
      Resolution: Added shared route guidance derivation, surfaced it in CLI outputs, and covered the behavior with focused tests plus CLI smoke checks.

    - Observation: Route guidance now exposes source of truth, freshness, repeat policy, fallback, and runner rail context across task next-action, task status --route, task brief, pr check, runner bootstrap, verification records, and commit diagnostics.
      Impact: Agents have explicit execute/diagnose/wait/stop context and should be less likely to repeat stale PR updates, confuse hook wrapper failures with source failures, or introduce runner execution outside the active route.
      Resolution: Added shared derived decision context and regression tests; PR check remains the diagnostic command when route asks for PR artifact updates.

    - Observation: Removed unnecessary exports from internal route-guidance helper types that triggered the knip unused-code baseline guard.
      Impact: Static CI should no longer fail on exported-but-unused type aliases while preserving the decision context JSON shape.
      Resolution: Validated with bun run knip:check, tsc, and focused vitest before updating PR artifacts.
id_source: "generated"
---
## Summary

Clarify confusing agent route diagnostics

Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.

## Scope

- In scope: Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
- Out of scope: unrelated refactors not required for "Clarify confusing agent route diagnostics".

## Plan

Extend agent-facing decision context on the existing diagnostics branch without changing lifecycle semantics: keep operator_guidance, add source/freshness/repeat/fallback/runner fields, surface them in task brief/status/next-action/pr check/runner bootstrap/verification details/errors, and cover the behavior with focused tests and CLI smoke checks.

## Verify Steps

1. Run TypeScript compile for agentplane source. Expected: no type errors.
2. Run focused regression tests for route guidance, runner bootstrap, and commit diagnostics. Expected: all selected tests pass.
3. Run formatting, diff, and policy routing checks. Expected: no formatting, whitespace, or policy routing errors.
4. Run CLI smoke for task next-action, task status --route, task brief, and pr check. Expected: decision context exposes source_of_truth, repeat_policy, runner_context, safe_command, and diagnostic_command without stale or contradictory fields.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- PASS: timeout 120s bun run knip:check
- PASS: timeout 90s bunx tsc -p packages/agentplane/tsconfig.json --noEmit
- PASS: timeout 120s ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --reporter verbose
- PASS: timeout 60s ./node_modules/.bin/prettier --check <touched files>
- PASS: timeout 60s git diff --check
- PASS: timeout 60s node .agentplane/policy/check-routing.mjs
- PASS: timeout 60s bun packages/agentplane/src/cli.ts task next-action 202606041604-E3EJG8 --explain | rg source_of_truth/repeat_policy/runner_context/diagnostic_command
- PASS: timeout 60s bun packages/agentplane/src/cli.ts task status 202606041604-E3EJG8 --route --json
- PASS: timeout 60s bun packages/agentplane/src/cli.ts task brief 202606041604-E3EJG8 --json
- PASS: timeout 90s bun packages/agentplane/src/cli.ts pr check 202606041604-E3EJG8
- CI REWORK: GitHub verify-static initially failed on exported-but-unused type aliases in route-guidance.ts; fixed by making internal helper types non-exported.

### 2026-06-04T17:27:19.593Z — VERIFY — ok

By: CODER

Note: CI verify-static rework fixed; knip baseline, TypeScript, and focused regression tests pass locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T17:27:18.201Z, excerpt_hash=sha256:8587e0d575abbdb632203d919a815872f3a6bafa154268671c0be26bdb915502

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041604-E3EJG8-clarify-confusing-agent-route-diagnostics/.agentplane/tasks/202606041604-E3EJG8/blueprint/resolved-snapshot.json
- old_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
- current_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606041604-E3EJG8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606041604-E3EJG8
- diagnostic_command: agentplane pr check 202606041604-E3EJG8
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Agent-facing route, brief, PR-check, runner-bootstrap, verification, and commit-error surfaces now expose typed decision context for source of truth, freshness, repeat policy, fallback, and runner rail state.
  Impact: Agents have explicit execute/diagnose/wait/stop context and should be less likely to repeat stale PR updates, confuse hook-wrapper failures with source failures, or introduce runner execution when the route does not require it.
  Resolution: Added shared route guidance derivation, surfaced it in CLI outputs, and covered the behavior with focused tests plus CLI smoke checks.

- Observation: Route guidance now exposes source of truth, freshness, repeat policy, fallback, and runner rail context across task next-action, task status --route, task brief, pr check, runner bootstrap, verification records, and commit diagnostics.
  Impact: Agents have explicit execute/diagnose/wait/stop context and should be less likely to repeat stale PR updates, confuse hook wrapper failures with source failures, or introduce runner execution outside the active route.
  Resolution: Added shared derived decision context and regression tests; PR check remains the diagnostic command when route asks for PR artifact updates.

- Observation: Removed unnecessary exports from internal route-guidance helper types that triggered the knip unused-code baseline guard.
  Impact: Static CI should no longer fail on exported-but-unused type aliases while preserving the decision context JSON shape.
  Resolution: Validated with bun run knip:check, tsc, and focused vitest before updating PR artifacts.
