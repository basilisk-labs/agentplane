---
id: "202606171318-HMV399"
title: "Add platform sync for agent instruction surfaces"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "integration"
  - "platform"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-17T13:18:54.731Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-17T16:09:37.435Z"
  updated_by: "CODER"
  note: "Verified: platform sync lint fixes and branch_pr local open PR routing optimization pass targeted tests, lint, typecheck, policy routing, and dry-run platform smoke."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-17T16:18:46.442Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after PR metadata persisted open GitHub identity."
  evaluated_sha: "f5b406dd377b4f09d2a42b3dce60c1a0d25a4226"
  blueprint_digest: "b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f"
  evidence_refs:
    - ".agentplane/tasks/202606171318-HMV399/README.md"
    - ".agentplane/tasks/202606171318-HMV399/quality/20260617-161846442-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606171318-HMV399/quality/20260617-161846442-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606171318-HMV399/quality/20260617-161846442-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606171318-HMV399/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement platform sync for instruction surfaces only, keep runner integration out of scope, preserve ide sync compatibility, and verify generated platform projections."
events:
  -
    type: "status"
    at: "2026-06-17T13:19:36.666Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement platform sync for instruction surfaces only, keep runner integration out of scope, preserve ide sync compatibility, and verify generated platform projections."
  -
    type: "verify"
    at: "2026-06-17T13:28:44.282Z"
    author: "CODER"
    state: "ok"
    note: "Implemented platform sync instruction-surface projections and verified targeted CLI behavior."
  -
    type: "verify"
    at: "2026-06-17T16:09:37.435Z"
    author: "CODER"
    state: "ok"
    note: "Verified: platform sync lint fixes and branch_pr local open PR routing optimization pass targeted tests, lint, typecheck, policy routing, and dry-run platform smoke."
doc_version: 3
doc_updated_at: "2026-06-17T16:09:37.721Z"
doc_updated_by: "CODER"
description: "Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration."
sections:
  Summary: |-
    Add platform sync for agent instruction surfaces

    Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.
  Scope: |-
    - In scope: Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.
    - Out of scope: unrelated refactors not required for "Add platform sync for agent instruction surfaces".
  Plan: |-
    1. Inspect current init/ide sync command structure and command catalog patterns.
    2. Add a platform integration registry for instruction-surface projections only; exclude runner behavior.
    3. Implement platform sync/list/explain/doctor commands for major platforms: codex, claude, gemini, opencode, copilot, cursor, windsurf, cline, kiro, openclaw, hermes.
    4. Keep agentplane ide sync backward compatible by delegating to platform sync for Cursor/Windsurf.
    5. Add tests for generated paths, platform selection, and compatibility behavior.
    6. Run targeted CLI tests and routing validation.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.platform-sync.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: platform sync/init/help tests pass.
    2. Run `bun run typecheck`. Expected: TypeScript build/type checks pass for touched command and config surfaces.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing constraints pass.
    4. Run `ap platform list --output json` and `ap platform sync --platform cursor --platform cline --dry-run --output json` in a temp initialized repo. Expected: platform registry and generated target paths are reported without writing in dry-run.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-17T13:28:44.282Z — VERIFY — ok

    By: CODER

    Note: Implemented platform sync instruction-surface projections and verified targeted CLI behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-17T13:19:36.666Z, excerpt_hash=sha256:965e1c2363a04da781e5d56f59a03f483289bce0e7edfea23718ff8072a42acd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606171318-HMV399-platform-sync/.agentplane/tasks/202606171318-HMV399/blueprint/resolved-snapshot.json
    - old_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
    - current_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606171318-HMV399

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606171318-HMV399
    - diagnostic_command: agentplane pr check 202606171318-HMV399
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-17T16:09:37.435Z — VERIFY — ok

    By: CODER

    Note: Verified: platform sync lint fixes and branch_pr local open PR routing optimization pass targeted tests, lint, typecheck, policy routing, and dry-run platform smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-17T13:28:44.539Z, excerpt_hash=sha256:965e1c2363a04da781e5d56f59a03f483289bce0e7edfea23718ff8072a42acd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606171318-HMV399-platform-sync/.agentplane/tasks/202606171318-HMV399/blueprint/resolved-snapshot.json
    - old_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
    - current_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606171318-HMV399

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202606171318-HMV399 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202606171318-HMV399/README.md
    - diagnostic_command: agentplane evaluator run 202606171318-HMV399 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202606171318-HMV399/README.md
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
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.platform-sync.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
    Result: pass
    Evidence: 48 pass, 0 fail.
    Scope: platform sync command, legacy ide sync compatibility, init and help registry behavior.

    Command: bun run typecheck
    Result: pass
    Evidence: scripts/checks/run-typescript-build.mjs completed successfully.
    Scope: TypeScript surfaces touched by platform command and init sync path.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: AgentPlane policy routing constraints.

    Command: temp repo smoke for ap platform list --output json and ap platform sync --platform cursor --platform cline --dry-run --output json
    Result: pass
    Evidence: listed cursor/cline and planned .cursor/rules/agentplane.mdc plus .clinerules/00-agentplane.md without writes.
    Scope: runtime platform registry and dry-run projection reporting.
      Impact: Verification covers declared acceptance checks for the platform sync implementation.
      Resolution: Ready for PR artifact creation and review.
id_source: "generated"
---
## Summary

Add platform sync for agent instruction surfaces

Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.

## Scope

- In scope: Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.
- Out of scope: unrelated refactors not required for "Add platform sync for agent instruction surfaces".

## Plan

1. Inspect current init/ide sync command structure and command catalog patterns.
2. Add a platform integration registry for instruction-surface projections only; exclude runner behavior.
3. Implement platform sync/list/explain/doctor commands for major platforms: codex, claude, gemini, opencode, copilot, cursor, windsurf, cline, kiro, openclaw, hermes.
4. Keep agentplane ide sync backward compatible by delegating to platform sync for Cursor/Windsurf.
5. Add tests for generated paths, platform selection, and compatibility behavior.
6. Run targeted CLI tests and routing validation.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.platform-sync.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: platform sync/init/help tests pass.
2. Run `bun run typecheck`. Expected: TypeScript build/type checks pass for touched command and config surfaces.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing constraints pass.
4. Run `ap platform list --output json` and `ap platform sync --platform cursor --platform cline --dry-run --output json` in a temp initialized repo. Expected: platform registry and generated target paths are reported without writing in dry-run.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-17T13:28:44.282Z — VERIFY — ok

By: CODER

Note: Implemented platform sync instruction-surface projections and verified targeted CLI behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-17T13:19:36.666Z, excerpt_hash=sha256:965e1c2363a04da781e5d56f59a03f483289bce0e7edfea23718ff8072a42acd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606171318-HMV399-platform-sync/.agentplane/tasks/202606171318-HMV399/blueprint/resolved-snapshot.json
- old_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
- current_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606171318-HMV399

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606171318-HMV399
- diagnostic_command: agentplane pr check 202606171318-HMV399
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-17T16:09:37.435Z — VERIFY — ok

By: CODER

Note: Verified: platform sync lint fixes and branch_pr local open PR routing optimization pass targeted tests, lint, typecheck, policy routing, and dry-run platform smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-17T13:28:44.539Z, excerpt_hash=sha256:965e1c2363a04da781e5d56f59a03f483289bce0e7edfea23718ff8072a42acd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606171318-HMV399-platform-sync/.agentplane/tasks/202606171318-HMV399/blueprint/resolved-snapshot.json
- old_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
- current_digest: b7415c132ee2feaef281151b317ac903e49ddafffbb697e72638d84217d7862f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606171318-HMV399

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202606171318-HMV399 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202606171318-HMV399/README.md
- diagnostic_command: agentplane evaluator run 202606171318-HMV399 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202606171318-HMV399/README.md
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

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.platform-sync.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
Result: pass
Evidence: 48 pass, 0 fail.
Scope: platform sync command, legacy ide sync compatibility, init and help registry behavior.

Command: bun run typecheck
Result: pass
Evidence: scripts/checks/run-typescript-build.mjs completed successfully.
Scope: TypeScript surfaces touched by platform command and init sync path.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: AgentPlane policy routing constraints.

Command: temp repo smoke for ap platform list --output json and ap platform sync --platform cursor --platform cline --dry-run --output json
Result: pass
Evidence: listed cursor/cline and planned .cursor/rules/agentplane.mdc plus .clinerules/00-agentplane.md without writes.
Scope: runtime platform registry and dry-run projection reporting.
  Impact: Verification covers declared acceptance checks for the platform sync implementation.
  Resolution: Ready for PR artifact creation and review.
