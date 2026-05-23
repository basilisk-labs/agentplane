---
id: "202605230004-H3V7RB"
title: "Remove unused pr flow status exported types"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T00:04:17.674Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T00:07:04.967Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence covers the knip failure plus focused behavior and style checks."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T00:07:04.967Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence covers the knip failure plus focused behavior and style checks."
  evaluated_sha: "9524d8b72be120d36e9b8e7b80afb6ee1c9ec289"
  blueprint_digest: "3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee"
  evidence_refs:
    - ".agentplane/tasks/202605230004-H3V7RB/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230004-H3V7RB-pr-flow-status-knip-cleanup/.agentplane/tasks/202605230004-H3V7RB/blueprint/resolved-snapshot.json"
  findings:
    - "Reviewed diff: only four helper status aliases in packages/agentplane/src/commands/pr/flow-status.ts changed from exported to module-local. PrFlowStatusReport remains exported and report shape is unchanged. Recorded CODER evidence includes knip baseline pass, focused pr-flow status test pass, lint pass, and format pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: removing the unused pr flow status exported helper type surface that verify-static/knip reports after the lifecycle status work."
events:
  -
    type: "status"
    at: "2026-05-23T00:04:30.009Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: removing the unused pr flow status exported helper type surface that verify-static/knip reports after the lifecycle status work."
  -
    type: "verify"
    at: "2026-05-23T00:06:36.588Z"
    author: "CODER"
    state: "ok"
    note: "Removed unused pr flow status helper type exports without runtime changes."
  -
    type: "verify"
    at: "2026-05-23T00:07:04.967Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence covers the knip failure plus focused behavior and style checks."
doc_version: 3
doc_updated_at: "2026-05-23T00:07:04.995Z"
doc_updated_by: "CODER"
description: "Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface."
sections:
  Summary: |-
    Remove unused pr flow status exported types

    Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.
  Scope: |-
    - In scope: Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.
    - Out of scope: unrelated refactors not required for "Remove unused pr flow status exported types".
  Plan: |-
    1. Inspect pr flow status helper type exports flagged by knip.
    2. Make the unused status-report helper types module-internal without changing runtime behavior.
    3. Verify with knip baseline guard, focused pr flow status test, lint, and format check.
    4. Publish as a one-commit branch_pr task, merge it, then rebase QRQFM9 onto the fixed main.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T00:06:36.588Z — VERIFY — ok

    By: CODER

    Note: Removed unused pr flow status helper type exports without runtime changes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:04:30.009Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230004-H3V7RB-pr-flow-status-knip-cleanup/.agentplane/tasks/202605230004-H3V7RB/blueprint/resolved-snapshot.json
    - old_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
    - current_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230004-H3V7RB

    ### 2026-05-23T00:07:04.967Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence covers the knip failure plus focused behavior and style checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:06:36.616Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Reviewed diff: only four helper status aliases in packages/agentplane/src/commands/pr/flow-status.ts changed from exported to module-local. PrFlowStatusReport remains exported and report shape is unchanged. Recorded CODER evidence includes knip baseline pass, focused pr-flow status test pass, lint pass, and format pass.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230004-H3V7RB-pr-flow-status-knip-cleanup/.agentplane/tasks/202605230004-H3V7RB/blueprint/resolved-snapshot.json
    - old_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
    - current_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230004-H3V7RB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bun run knip:check => pass (baseline OK, total=564/564); bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts => pass (1 file, 2 tests); bun run lint:core -- packages/agentplane/src/commands/pr/flow-status.ts => pass (eslint exit 0); bun run format:check -- packages/agentplane/src/commands/pr/flow-status.ts => pass (Prettier OK).
      Impact: verify-static knip baseline no longer reports the pr flow status helper types as new unused exported types.
      Resolution: Changed the four helper status aliases from exported types to module-local types; runtime report shape is unchanged.
id_source: "generated"
---
## Summary

Remove unused pr flow status exported types

Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.

## Scope

- In scope: Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.
- Out of scope: unrelated refactors not required for "Remove unused pr flow status exported types".

## Plan

1. Inspect pr flow status helper type exports flagged by knip.
2. Make the unused status-report helper types module-internal without changing runtime behavior.
3. Verify with knip baseline guard, focused pr flow status test, lint, and format check.
4. Publish as a one-commit branch_pr task, merge it, then rebase QRQFM9 onto the fixed main.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T00:06:36.588Z — VERIFY — ok

By: CODER

Note: Removed unused pr flow status helper type exports without runtime changes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:04:30.009Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230004-H3V7RB-pr-flow-status-knip-cleanup/.agentplane/tasks/202605230004-H3V7RB/blueprint/resolved-snapshot.json
- old_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
- current_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230004-H3V7RB

### 2026-05-23T00:07:04.967Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence covers the knip failure plus focused behavior and style checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:06:36.616Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Reviewed diff: only four helper status aliases in packages/agentplane/src/commands/pr/flow-status.ts changed from exported to module-local. PrFlowStatusReport remains exported and report shape is unchanged. Recorded CODER evidence includes knip baseline pass, focused pr-flow status test pass, lint pass, and format pass.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230004-H3V7RB-pr-flow-status-knip-cleanup/.agentplane/tasks/202605230004-H3V7RB/blueprint/resolved-snapshot.json
- old_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
- current_digest: 3c187eedd26b33779268267f19be5811d83e10f9b0f4d62cd223190130c950ee
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230004-H3V7RB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: bun run knip:check => pass (baseline OK, total=564/564); bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts => pass (1 file, 2 tests); bun run lint:core -- packages/agentplane/src/commands/pr/flow-status.ts => pass (eslint exit 0); bun run format:check -- packages/agentplane/src/commands/pr/flow-status.ts => pass (Prettier OK).
  Impact: verify-static knip baseline no longer reports the pr flow status helper types as new unused exported types.
  Resolution: Changed the four helper status aliases from exported types to module-local types; runtime report shape is unchanged.
