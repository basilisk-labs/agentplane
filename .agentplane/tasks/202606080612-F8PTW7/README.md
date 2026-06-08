---
id: "202606080612-F8PTW7"
title: "Reduce route ambiguity in AgentPlane guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T06:12:39.659Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T06:20:37.674Z"
  updated_by: "CODER"
  note: "Focused route guidance checks, route-decision integration check, policy routing, typecheck, and changed-format all passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reduce route/operator ambiguity guidance for branch_pr route states."
events:
  -
    type: "status"
    at: "2026-06-08T06:13:11.526Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reduce route/operator ambiguity guidance for branch_pr route states."
  -
    type: "verify"
    at: "2026-06-08T06:20:37.674Z"
    author: "CODER"
    state: "ok"
    note: "Focused route guidance checks, route-decision integration check, policy routing, typecheck, and changed-format all passed."
doc_version: 3
doc_updated_at: "2026-06-08T06:20:37.826Z"
doc_updated_by: "CODER"
description: "Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction."
sections:
  Summary: |-
    Reduce route ambiguity in AgentPlane guidance

    Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.
  Scope: |-
    - In scope: Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.
    - Out of scope: unrelated refactors not required for "Reduce route ambiguity in AgentPlane guidance".
  Plan: |-
    1. Extend route/operator guidance so ambiguous branch_pr states include concrete diagnostics before mutation.
    2. Surface argv-unsafe route commands, stale local projection/worktree recovery, and hosted-close sync hazards as explicit operator risks.
    3. Add focused tests for the new guidance and run the declared route/unit checks plus policy validation.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts`. Expected: route guidance and execution packet tests pass.
    2. Run `bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: branch_pr route decision integration tests pass, including hosted-close sync route.
    3. Run `node .agentplane/policy/check-routing.mjs` and `bun run typecheck`. Expected: policy routing and TypeScript validation pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T06:20:37.674Z — VERIFY — ok

    By: CODER

    Note: Focused route guidance checks, route-decision integration check, policy routing, typecheck, and changed-format all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T06:13:11.526Z, excerpt_hash=sha256:3db835f783846edfbb7aadc4fb123d4225bea3a4f69dc6ccd3c3a97a420246bb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080612-F8PTW7-reduce-route-ambiguity-in-agentplane-guidance/.agentplane/tasks/202606080612-F8PTW7/blueprint/resolved-snapshot.json
    - old_digest: 95a6ad32bface5bdfc884bfbd7d4e2876c3da3e94bc38268affd067c3e437ab0
    - current_digest: 95a6ad32bface5bdfc884bfbd7d4e2876c3da3e94bc38268affd067c3e437ab0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080612-F8PTW7

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080612-F8PTW7
    - diagnostic_command: agentplane pr check 202606080612-F8PTW7
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
    - Observation: Command: bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run typecheck; Result: pass; Evidence: run-typescript-build exited 0. Command: bun run format:changed; Result: pass; Evidence: all changed files use Prettier style.
      Impact: Route outputs now reduce manual reconstruction for repeated worktree recovery, hosted close sync, and unsafe compound commands.
      Resolution: sync_hosted_close uses AgentPlane cleanup finalize; operator guidance surfaces targeted risks and diagnostics.
id_source: "generated"
---
## Summary

Reduce route ambiguity in AgentPlane guidance

Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.

## Scope

- In scope: Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.
- Out of scope: unrelated refactors not required for "Reduce route ambiguity in AgentPlane guidance".

## Plan

1. Extend route/operator guidance so ambiguous branch_pr states include concrete diagnostics before mutation.
2. Surface argv-unsafe route commands, stale local projection/worktree recovery, and hosted-close sync hazards as explicit operator risks.
3. Add focused tests for the new guidance and run the declared route/unit checks plus policy validation.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts`. Expected: route guidance and execution packet tests pass.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: branch_pr route decision integration tests pass, including hosted-close sync route.
3. Run `node .agentplane/policy/check-routing.mjs` and `bun run typecheck`. Expected: policy routing and TypeScript validation pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T06:20:37.674Z — VERIFY — ok

By: CODER

Note: Focused route guidance checks, route-decision integration check, policy routing, typecheck, and changed-format all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T06:13:11.526Z, excerpt_hash=sha256:3db835f783846edfbb7aadc4fb123d4225bea3a4f69dc6ccd3c3a97a420246bb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080612-F8PTW7-reduce-route-ambiguity-in-agentplane-guidance/.agentplane/tasks/202606080612-F8PTW7/blueprint/resolved-snapshot.json
- old_digest: 95a6ad32bface5bdfc884bfbd7d4e2876c3da3e94bc38268affd067c3e437ab0
- current_digest: 95a6ad32bface5bdfc884bfbd7d4e2876c3da3e94bc38268affd067c3e437ab0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080612-F8PTW7

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080612-F8PTW7
- diagnostic_command: agentplane pr check 202606080612-F8PTW7
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

- Observation: Command: bun test packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/route-oracle.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run typecheck; Result: pass; Evidence: run-typescript-build exited 0. Command: bun run format:changed; Result: pass; Evidence: all changed files use Prettier style.
  Impact: Route outputs now reduce manual reconstruction for repeated worktree recovery, hosted close sync, and unsafe compound commands.
  Resolution: sync_hosted_close uses AgentPlane cleanup finalize; operator guidance surfaces targeted risks and diagnostics.
