---
id: "202605280932-HJC244"
title: "Fix pre-push historical commit policy upgrade mismatch"
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
  updated_at: "2026-05-28T09:32:56.032Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T10:27:27.018Z"
  updated_by: "CODER"
  note: "Verification passed after review fix for issue #4183. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (24 pass); bun run format:check (pass); bun run lint:core (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector: format/schema/templates/routing/release parity/build/typecheck/bundles/docs freshness/hotspot/vitest projects/lint/unit/critical CLI)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing issue #4183 in the dedicated branch_pr worktree, focused on pre-push historical commit policy mismatch and targeted regression coverage."
events:
  -
    type: "status"
    at: "2026-05-28T09:33:53.000Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing issue #4183 in the dedicated branch_pr worktree, focused on pre-push historical commit policy mismatch and targeted regression coverage."
  -
    type: "verify"
    at: "2026-05-28T09:58:01.322Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed for issue #4183 fix. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (23 pass); bun run format:check (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector)."
  -
    type: "verify"
    at: "2026-05-28T10:27:27.018Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed after review fix for issue #4183. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (24 pass); bun run format:check (pass); bun run lint:core (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector: format/schema/templates/routing/release parity/build/typecheck/bundles/docs freshness/hotspot/vitest projects/lint/unit/critical CLI)."
doc_version: 3
doc_updated_at: "2026-05-28T10:27:27.052Z"
doc_updated_by: "CODER"
description: "Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence."
sections:
  Summary: |-
    Fix pre-push historical commit policy upgrade mismatch

    Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.
  Scope: |-
    - In scope: Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.
    - Out of scope: unrelated refactors not required for "Fix pre-push historical commit policy upgrade mismatch".
  Plan: "Plan: 1) Reproduce/locate pre-push outgoing commit selection and mutating commit binding logic for issue #4183. 2) Add a focused regression test for upgrade-merge historical commits where current policy should not block already-existing commits that entered main through a valid merge. 3) Implement the smallest change in pre-push commit audit/range handling or diagnostics needed to preserve current enforcement for new mutating commits while avoiding the historical-policy mismatch. 4) Run targeted hook/commit-policy tests plus routing validation; record evidence and residual risks."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts`. Expected: pre-push task-binding audit passes, including historical upgrade-lineage regression and merge conflict-resolution enforcement.
    2. Run `bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts`. Expected: insights issue dry-run renders agent context with real newlines and no literal escaped newline sequence.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing stays valid after code and task artifact changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T09:58:01.322Z — VERIFY — ok

    By: CODER

    Note: Verification passed for issue #4183 fix. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (23 pass); bun run format:check (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T09:39:32.334Z, excerpt_hash=sha256:036f76206b7dd38b31d84c05720c50ee9b7b7fa0f3fc7a0db1b4f796a48de014

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280932-HJC244-fix-pre-push-historical-commit-policy-upgrade-mi/.agentplane/tasks/202605280932-HJC244/blueprint/resolved-snapshot.json
    - old_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
    - current_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280932-HJC244

    ### 2026-05-28T10:27:27.018Z — VERIFY — ok

    By: CODER

    Note: Verification passed after review fix for issue #4183. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (24 pass); bun run format:check (pass); bun run lint:core (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector: format/schema/templates/routing/release parity/build/typecheck/bundles/docs freshness/hotspot/vitest projects/lint/unit/critical CLI).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T09:58:01.360Z, excerpt_hash=sha256:036f76206b7dd38b31d84c05720c50ee9b7b7fa0f3fc7a0db1b4f796a48de014

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280932-HJC244-fix-pre-push-historical-commit-policy-upgrade-mi/.agentplane/tasks/202605280932-HJC244/blueprint/resolved-snapshot.json
    - old_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
    - current_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280932-HJC244

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Pre-push no longer retroactively applies newly introduced task-binding policy to commits that are ancestors of a managed upgrade commit in the same outgoing range; normal merge commits are audited via combined diff so conflict-resolution changes still require binding. Insights issue agent context now normalizes literal escaped newlines before rendering.
      Impact: Fixes GitHub issue #4183 failure mode and prevents future public issue bodies from showing RCA text with literal escaped newline sequences.
      Resolution: Added pre-push task-binding helper module, updated repository pre-push script parity, and covered both regressions with focused tests.

    - Observation: Review feedback addressed by restricting the pre-upgrade bypass to commits on a merged non-first-parent upgrade lineage; a linear unbound commit followed by an upgrade-like commit remains blocked.
      Impact: Closes the bypass risk noted on PR #4187 while preserving the issue #4183 upgrade-merge recovery behavior and newline normalization for insights issue text.
      Resolution: Added negative regression coverage for the linear fake-upgrade bypass and kept script/runtime pre-push parity.
id_source: "generated"
---
## Summary

Fix pre-push historical commit policy upgrade mismatch

Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.

## Scope

- In scope: Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.
- Out of scope: unrelated refactors not required for "Fix pre-push historical commit policy upgrade mismatch".

## Plan

Plan: 1) Reproduce/locate pre-push outgoing commit selection and mutating commit binding logic for issue #4183. 2) Add a focused regression test for upgrade-merge historical commits where current policy should not block already-existing commits that entered main through a valid merge. 3) Implement the smallest change in pre-push commit audit/range handling or diagnostics needed to preserve current enforcement for new mutating commits while avoiding the historical-policy mismatch. 4) Run targeted hook/commit-policy tests plus routing validation; record evidence and residual risks.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts`. Expected: pre-push task-binding audit passes, including historical upgrade-lineage regression and merge conflict-resolution enforcement.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts`. Expected: insights issue dry-run renders agent context with real newlines and no literal escaped newline sequence.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing stays valid after code and task artifact changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T09:58:01.322Z — VERIFY — ok

By: CODER

Note: Verification passed for issue #4183 fix. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (23 pass); bun run format:check (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T09:39:32.334Z, excerpt_hash=sha256:036f76206b7dd38b31d84c05720c50ee9b7b7fa0f3fc7a0db1b4f796a48de014

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280932-HJC244-fix-pre-push-historical-commit-policy-upgrade-mi/.agentplane/tasks/202605280932-HJC244/blueprint/resolved-snapshot.json
- old_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
- current_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280932-HJC244

### 2026-05-28T10:27:27.018Z — VERIFY — ok

By: CODER

Note: Verification passed after review fix for issue #4183. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (24 pass); bun run format:check (pass); bun run lint:core (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector: format/schema/templates/routing/release parity/build/typecheck/bundles/docs freshness/hotspot/vitest projects/lint/unit/critical CLI).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T09:58:01.360Z, excerpt_hash=sha256:036f76206b7dd38b31d84c05720c50ee9b7b7fa0f3fc7a0db1b4f796a48de014

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605280932-HJC244-fix-pre-push-historical-commit-policy-upgrade-mi/.agentplane/tasks/202605280932-HJC244/blueprint/resolved-snapshot.json
- old_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
- current_digest: e1248d0e20264125bcdc30bbf145ca99c978b171555046c3529dd855e45eca28
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280932-HJC244

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Pre-push no longer retroactively applies newly introduced task-binding policy to commits that are ancestors of a managed upgrade commit in the same outgoing range; normal merge commits are audited via combined diff so conflict-resolution changes still require binding. Insights issue agent context now normalizes literal escaped newlines before rendering.
  Impact: Fixes GitHub issue #4183 failure mode and prevents future public issue bodies from showing RCA text with literal escaped newline sequences.
  Resolution: Added pre-push task-binding helper module, updated repository pre-push script parity, and covered both regressions with focused tests.

- Observation: Review feedback addressed by restricting the pre-upgrade bypass to commits on a merged non-first-parent upgrade lineage; a linear unbound commit followed by an upgrade-like commit remains blocked.
  Impact: Closes the bypass risk noted on PR #4187 while preserving the issue #4183 upgrade-merge recovery behavior and newline normalization for insights issue text.
  Resolution: Added negative regression coverage for the linear fake-upgrade bypass and kept script/runtime pre-push parity.
