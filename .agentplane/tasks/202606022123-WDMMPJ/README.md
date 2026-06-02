---
id: "202606022123-WDMMPJ"
title: "Tighten Hermes AgentPlane integration"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hermes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-02T21:23:54.184Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-02T21:39:09.091Z"
  updated_by: "CODER"
  note: "CI contract lint fix verified."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved Hermes AgentPlane integration changes in the dedicated branch_pr worktree, covering lifecycle recommendation, reconcile state input, Hermes runner adapter, and embedded plugin drift cleanup."
events:
  -
    type: "status"
    at: "2026-06-02T21:24:06.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved Hermes AgentPlane integration changes in the dedicated branch_pr worktree, covering lifecycle recommendation, reconcile state input, Hermes runner adapter, and embedded plugin drift cleanup."
  -
    type: "verify"
    at: "2026-06-02T21:28:48.126Z"
    author: "CODER"
    state: "ok"
    note: "Focused Hermes integration checks passed."
  -
    type: "verify"
    at: "2026-06-02T21:39:09.091Z"
    author: "CODER"
    state: "ok"
    note: "CI contract lint fix verified."
doc_version: 3
doc_updated_at: "2026-06-02T21:39:09.113Z"
doc_updated_by: "CODER"
description: "Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership."
sections:
  Summary: |-
    Tighten Hermes AgentPlane integration

    Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
  Scope: |-
    - In scope: Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
    - Out of scope: unrelated refactors not required for "Tighten Hermes AgentPlane integration".
  Plan: "Implement a tighter Hermes integration in AgentPlane: (1) add explicit Hermes terminal lifecycle recommendation to supervise JSON output; (2) add reconcile input for Hermes state files so AgentPlane can compare local lifecycle intent with Hermes card state; (3) introduce a dedicated Hermes runner adapter instead of aliasing it invisibly to custom; (4) replace stale embedded Hermes plugin implementation with documentation that points to the external agentplane-hermes-plugin as the source of truth; (5) verify with focused tests, typecheck/build checks, policy routing, and final full git status."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-02T21:28:48.126Z — VERIFY — ok

    By: CODER

    Note: Focused Hermes integration checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:24:06.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    ### 2026-06-02T21:39:09.091Z — VERIFY — ok

    By: CODER

    Note: CI contract lint fix verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:28:48.144Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed successfully. Scope: TypeScript project references.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: 2 files passed, 27 tests passed. Scope: Hermes CLI integration and runner adapter factory/custom path.\nCommand: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: AgentPlane policy routing.
      Impact: Hermes supervise now exposes lifecycle recommendations; reconcile can compare a read-only Hermes state snapshot; runner.default_adapter=hermes has an explicit adapter class; stale embedded plugin execution shim is removed in favor of the external plugin source of truth.
      Resolution: Implemented with focused tests and preserved AgentPlane as the engineering lifecycle authority.

    - Observation: Command: bun run format:changed && bun run lint:core. Result: pass. Evidence: changed files formatted; eslint completed with no findings. Scope: contract lint failure fix.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: tsc -b completed; 2 test files passed, 27 tests passed. Scope: Hermes reconcile/supervise and runner adapter behavior.
      Impact: Hosted verify-contract failure from no-base-to-string is resolved locally.
      Resolution: Normalized Hermes card status only when the snapshot value is a string.
id_source: "generated"
---
## Summary

Tighten Hermes AgentPlane integration

Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.

## Scope

- In scope: Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
- Out of scope: unrelated refactors not required for "Tighten Hermes AgentPlane integration".

## Plan

Implement a tighter Hermes integration in AgentPlane: (1) add explicit Hermes terminal lifecycle recommendation to supervise JSON output; (2) add reconcile input for Hermes state files so AgentPlane can compare local lifecycle intent with Hermes card state; (3) introduce a dedicated Hermes runner adapter instead of aliasing it invisibly to custom; (4) replace stale embedded Hermes plugin implementation with documentation that points to the external agentplane-hermes-plugin as the source of truth; (5) verify with focused tests, typecheck/build checks, policy routing, and final full git status.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-02T21:28:48.126Z — VERIFY — ok

By: CODER

Note: Focused Hermes integration checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:24:06.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

### 2026-06-02T21:39:09.091Z — VERIFY — ok

By: CODER

Note: CI contract lint fix verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:28:48.144Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed successfully. Scope: TypeScript project references.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: 2 files passed, 27 tests passed. Scope: Hermes CLI integration and runner adapter factory/custom path.\nCommand: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: AgentPlane policy routing.
  Impact: Hermes supervise now exposes lifecycle recommendations; reconcile can compare a read-only Hermes state snapshot; runner.default_adapter=hermes has an explicit adapter class; stale embedded plugin execution shim is removed in favor of the external plugin source of truth.
  Resolution: Implemented with focused tests and preserved AgentPlane as the engineering lifecycle authority.

- Observation: Command: bun run format:changed && bun run lint:core. Result: pass. Evidence: changed files formatted; eslint completed with no findings. Scope: contract lint failure fix.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: tsc -b completed; 2 test files passed, 27 tests passed. Scope: Hermes reconcile/supervise and runner adapter behavior.
  Impact: Hosted verify-contract failure from no-base-to-string is resolved locally.
  Resolution: Normalized Hermes card status only when the snapshot value is a string.
