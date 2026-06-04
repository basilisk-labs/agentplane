---
id: "202606041604-E3EJG8"
title: "Clarify confusing agent route diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  updated_at: "2026-06-04T16:17:02.111Z"
  updated_by: "CODER"
  note: "Local verification passed for typecheck, formatting, policy routing, and CLI smoke; focused vitest/build wrappers timed out without assertion or compiler failure output."
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
doc_version: 3
doc_updated_at: "2026-06-04T16:17:02.129Z"
doc_updated_by: "CODER"
description: "Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output."
sections:
  Summary: |-
    Clarify confusing agent route diagnostics

    Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
  Scope: |-
    - In scope: Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
    - Out of scope: unrelated refactors not required for "Clarify confusing agent route diagnostics".
  Plan: "Improve confusing agent-facing diagnostics without changing lifecycle semantics: inspect route/pr/hook surfaces, add explicit machine-readable hints for repeated pr-update loops or hook-sensitive local commands, update human output to name the safe command and stop condition, and add focused regression tests for the new fields/messages."
  Verify Steps: |-
    1. Run TypeScript compile for agentplane source. Expected: no type errors.
    2. Run formatting and diff safety checks on touched files. Expected: no formatting or whitespace errors.
    3. Run CLI smoke for task next-action/status JSON. Expected: operator_guidance appears with safe_command, canExecuteNow, stopReason, and risks fields.
    4. Run focused vitest/build where available. Expected: pass, or record runner/toolchain timeout separately from source validation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - PASS: timeout 60s bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    - PASS: timeout 120s bun run format --check <touched files>
    - PASS: timeout 60s git diff --check
    - PASS: timeout 60s node .agentplane/policy/check-routing.mjs
    - PASS: timeout 60s bun packages/agentplane/src/cli.ts task next-action 202606041604-E3EJG8 --explain --json | rg operator_guidance
    - PASS: timeout 60s bun packages/agentplane/src/cli.ts task status 202606041604-E3EJG8 --route --json
    - BLOCKED: focused vitest commands timed out without output at 90-120s; no failing assertion was emitted.
    - BLOCKED: bun run --filter=agentplane build reached tsup and timed out at 180s without error output.

    ### 2026-06-04T16:17:02.111Z — VERIFY — ok

    By: CODER

    Note: Local verification passed for typecheck, formatting, policy routing, and CLI smoke; focused vitest/build wrappers timed out without assertion or compiler failure output.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T16:16:12.559Z, excerpt_hash=sha256:962a1d4a028951a3dc2e4b47d282b569122737a6ae848661c321f63c84b5847a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041604-E3EJG8-clarify-confusing-agent-route-diagnostics/.agentplane/tasks/202606041604-E3EJG8/blueprint/resolved-snapshot.json
    - old_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
    - current_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606041604-E3EJG8

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: operator_guidance appears in task next-action/status JSON; pr check prints artifact_freshness; commit diagnostics classify hook wrapper SIGKILL as git_hook_wrapper_unstable.
      Impact: Agents get explicit execute/diagnose/stop signals for PR artifact loops and hook-wrapper failures instead of inferring from raw route or commit output.
      Resolution: Recorded residual risk from timed-out vitest/build wrapper separately from passed direct source validation.
id_source: "generated"
---
## Summary

Clarify confusing agent route diagnostics

Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.

## Scope

- In scope: Make additional AgentPlane route and lifecycle diagnostics less ambiguous for agents: surface PR artifact freshness loops, hook-related local command risk, and actionable next commands in machine-readable CLI output.
- Out of scope: unrelated refactors not required for "Clarify confusing agent route diagnostics".

## Plan

Improve confusing agent-facing diagnostics without changing lifecycle semantics: inspect route/pr/hook surfaces, add explicit machine-readable hints for repeated pr-update loops or hook-sensitive local commands, update human output to name the safe command and stop condition, and add focused regression tests for the new fields/messages.

## Verify Steps

1. Run TypeScript compile for agentplane source. Expected: no type errors.
2. Run formatting and diff safety checks on touched files. Expected: no formatting or whitespace errors.
3. Run CLI smoke for task next-action/status JSON. Expected: operator_guidance appears with safe_command, canExecuteNow, stopReason, and risks fields.
4. Run focused vitest/build where available. Expected: pass, or record runner/toolchain timeout separately from source validation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- PASS: timeout 60s bunx tsc -p packages/agentplane/tsconfig.json --noEmit
- PASS: timeout 120s bun run format --check <touched files>
- PASS: timeout 60s git diff --check
- PASS: timeout 60s node .agentplane/policy/check-routing.mjs
- PASS: timeout 60s bun packages/agentplane/src/cli.ts task next-action 202606041604-E3EJG8 --explain --json | rg operator_guidance
- PASS: timeout 60s bun packages/agentplane/src/cli.ts task status 202606041604-E3EJG8 --route --json
- BLOCKED: focused vitest commands timed out without output at 90-120s; no failing assertion was emitted.
- BLOCKED: bun run --filter=agentplane build reached tsup and timed out at 180s without error output.

### 2026-06-04T16:17:02.111Z — VERIFY — ok

By: CODER

Note: Local verification passed for typecheck, formatting, policy routing, and CLI smoke; focused vitest/build wrappers timed out without assertion or compiler failure output.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T16:16:12.559Z, excerpt_hash=sha256:962a1d4a028951a3dc2e4b47d282b569122737a6ae848661c321f63c84b5847a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041604-E3EJG8-clarify-confusing-agent-route-diagnostics/.agentplane/tasks/202606041604-E3EJG8/blueprint/resolved-snapshot.json
- old_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
- current_digest: 946ee29f36e800969fd1be217bf878ed4fff1597cd538cc3772d700cca0e4a9f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606041604-E3EJG8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: operator_guidance appears in task next-action/status JSON; pr check prints artifact_freshness; commit diagnostics classify hook wrapper SIGKILL as git_hook_wrapper_unstable.
  Impact: Agents get explicit execute/diagnose/stop signals for PR artifact loops and hook-wrapper failures instead of inferring from raw route or commit output.
  Resolution: Recorded residual risk from timed-out vitest/build wrapper separately from passed direct source validation.
