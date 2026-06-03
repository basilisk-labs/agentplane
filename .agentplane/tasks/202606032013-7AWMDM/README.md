---
id: "202606032013-7AWMDM"
title: "Strengthen external agent execution packets"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hermes"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T20:13:56.379Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T20:45:58.732Z"
  updated_by: "CODER"
  note: "Focused route/Hermes/bootstrap tests passed: 36 pass, 0 fail; policy routing OK; git diff --check passed. ap doctor incomplete due stale-dist bootstrap hanging in tsc -b."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement compact external agent execution packet and wait/provider route boundaries in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-06-03T20:15:07.626Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement compact external agent execution packet and wait/provider route boundaries in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-06-03T20:45:58.732Z"
    author: "CODER"
    state: "ok"
    note: "Focused route/Hermes/bootstrap tests passed: 36 pass, 0 fail; policy routing OK; git diff --check passed. ap doctor incomplete due stale-dist bootstrap hanging in tsc -b."
doc_version: 3
doc_updated_at: "2026-06-03T20:45:58.778Z"
doc_updated_by: "CODER"
description: "Implement a compact execution packet and clearer wait/provider boundaries so Hermes, OpenClaw, and custom agents can follow AgentPlane route decisions without reconstructing state from docs."
sections:
  Summary: |-
    Strengthen external agent execution packets

    Implement a compact execution packet and clearer wait/provider boundaries so Hermes, OpenClaw, and custom agents can follow AgentPlane route decisions without reconstructing state from docs.
  Scope: |-
    - In scope: Implement a compact execution packet and clearer wait/provider boundaries so Hermes, OpenClaw, and custom agents can follow AgentPlane route decisions without reconstructing state from docs.
    - Out of scope: unrelated refactors not required for "Strengthen external agent execution packets".
  Plan: |-
    Summary
    Implement a compact external-agent execution packet on top of the existing route oracle, clarify wait/provider action kinds, and surface the packet in task next-action, task brief, runner bootstrap, and Hermes projections.

    Scope
    - Route oracle execution packet model and derivation.
    - task next-action / task brief text and JSON surfaces.
    - Runner bootstrap guidance for custom/Hermes/OpenClaw-style adapters.
    - Hermes route packet projection.
    - Focused tests for wait/provider classification and packet rendering.

    Plan
    1. Extend RouteExecutionPacket with explicit execution_packet fields: must_run_from, exact_argv, must_not, return_control_when, human_provider_action, stale_state_check.
    2. Fix actionKind classification so wait states are distinct from terminal stop/provider actions.
    3. Render the packet compactly in CLI text surfaces and runner bootstrap.
    4. Include the same packet in Hermes projections so external supervisors do not infer authority boundaries from prose.
    5. Add/update focused tests and run targeted verification.

    Verify Steps
    - bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts
    - node .agentplane/policy/check-routing.mjs
    - ap doctor

    Verification
    Pending.

    Rollback Plan
    Revert the task branch commit; route oracle and existing Hermes/custom surfaces return to the previous schema and rendering.

    Findings
    None yet.
  Verify Steps: |-
    1. Run focused route/Hermes/bootstrap tests:
       `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts`
       Expected: all tests pass.
    2. Run routing policy validation:
       `node .agentplane/policy/check-routing.mjs`
       Expected: policy routing OK.
    3. Run patch hygiene:
       `git diff --check`
       Expected: no whitespace errors.
    4. Attempt repo-local health check:
       `ap doctor`
       Expected: either succeeds, or any stale-dist/bootstrap blocker is recorded explicitly in Verification.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - 2026-06-03T20:42:32Z CODER: `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts` passed: 36 pass, 0 fail.
    - 2026-06-03T20:42:32Z CODER: `node .agentplane/policy/check-routing.mjs` passed: policy routing OK.
    - 2026-06-03T20:42:32Z CODER: `git diff --check` passed.
    - 2026-06-03T20:39:42Z CODER: `ap doctor` attempted; repo-local wrapper detected stale runtime and started framework bootstrap, then remained in `tsc -b` for 5+ minutes without output. The bootstrap process was terminated with SIGTERM. This is recorded as an incomplete health check, not as a focused route/Hermes test failure.

    ### 2026-06-03T20:45:58.732Z — VERIFY — ok

    By: CODER

    Note: Focused route/Hermes/bootstrap tests passed: 36 pass, 0 fail; policy routing OK; git diff --check passed. ap doctor incomplete due stale-dist bootstrap hanging in tsc -b.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T20:15:07.626Z, excerpt_hash=sha256:0d8de75e7da4da00ebeb207ca73a1dcbb3dbdae2e072049e5e0c065bc527283e

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606032013-7AWMDM-external-agent-packet/.agentplane/tasks/202606032013-7AWMDM/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: f83e7f0a560a285bed200bfe5a8b8dba89e62e47ad9237e291c06a7101a249a5
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202606032013-7AWMDM

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Strengthen external agent execution packets

Implement a compact execution packet and clearer wait/provider boundaries so Hermes, OpenClaw, and custom agents can follow AgentPlane route decisions without reconstructing state from docs.

## Scope

- In scope: Implement a compact execution packet and clearer wait/provider boundaries so Hermes, OpenClaw, and custom agents can follow AgentPlane route decisions without reconstructing state from docs.
- Out of scope: unrelated refactors not required for "Strengthen external agent execution packets".

## Plan

Summary
Implement a compact external-agent execution packet on top of the existing route oracle, clarify wait/provider action kinds, and surface the packet in task next-action, task brief, runner bootstrap, and Hermes projections.

Scope
- Route oracle execution packet model and derivation.
- task next-action / task brief text and JSON surfaces.
- Runner bootstrap guidance for custom/Hermes/OpenClaw-style adapters.
- Hermes route packet projection.
- Focused tests for wait/provider classification and packet rendering.

Plan
1. Extend RouteExecutionPacket with explicit execution_packet fields: must_run_from, exact_argv, must_not, return_control_when, human_provider_action, stale_state_check.
2. Fix actionKind classification so wait states are distinct from terminal stop/provider actions.
3. Render the packet compactly in CLI text surfaces and runner bootstrap.
4. Include the same packet in Hermes projections so external supervisors do not infer authority boundaries from prose.
5. Add/update focused tests and run targeted verification.

Verify Steps
- bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts
- node .agentplane/policy/check-routing.mjs
- ap doctor

Verification
Pending.

Rollback Plan
Revert the task branch commit; route oracle and existing Hermes/custom surfaces return to the previous schema and rendering.

Findings
None yet.

## Verify Steps

1. Run focused route/Hermes/bootstrap tests:
   `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts`
   Expected: all tests pass.
2. Run routing policy validation:
   `node .agentplane/policy/check-routing.mjs`
   Expected: policy routing OK.
3. Run patch hygiene:
   `git diff --check`
   Expected: no whitespace errors.
4. Attempt repo-local health check:
   `ap doctor`
   Expected: either succeeds, or any stale-dist/bootstrap blocker is recorded explicitly in Verification.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- 2026-06-03T20:42:32Z CODER: `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/commands/hermes/hermes.command.test.ts` passed: 36 pass, 0 fail.
- 2026-06-03T20:42:32Z CODER: `node .agentplane/policy/check-routing.mjs` passed: policy routing OK.
- 2026-06-03T20:42:32Z CODER: `git diff --check` passed.
- 2026-06-03T20:39:42Z CODER: `ap doctor` attempted; repo-local wrapper detected stale runtime and started framework bootstrap, then remained in `tsc -b` for 5+ minutes without output. The bootstrap process was terminated with SIGTERM. This is recorded as an incomplete health check, not as a focused route/Hermes test failure.

### 2026-06-03T20:45:58.732Z — VERIFY — ok

By: CODER

Note: Focused route/Hermes/bootstrap tests passed: 36 pass, 0 fail; policy routing OK; git diff --check passed. ap doctor incomplete due stale-dist bootstrap hanging in tsc -b.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T20:15:07.626Z, excerpt_hash=sha256:0d8de75e7da4da00ebeb207ca73a1dcbb3dbdae2e072049e5e0c065bc527283e

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606032013-7AWMDM-external-agent-packet/.agentplane/tasks/202606032013-7AWMDM/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: f83e7f0a560a285bed200bfe5a8b8dba89e62e47ad9237e291c06a7101a249a5
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202606032013-7AWMDM

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
