---
id: "202609170039-R630"
title: "Fix v0.6.30 distribution recovery checkout"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "workflow"
  - "recovery"
verify:
  - "bun run workflows:lint"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T21:40:36.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-09-16T21:41:58.620Z"
  updated_by: "ORCHESTRATOR"
  note: "Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: git diff --check; Result: pass. Scope: publish-distribution-module checkout no longer recurses into optional marketing submodule."
  attempts: 0
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-09-16T21:41:58.620Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: git diff --check; Result: pass. Scope: publish-distribution-module checkout no longer recurses into optional marketing submodule."
doc_version: 3
doc_updated_at: "2026-09-16T21:41:58.695Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane."
sections:
  Summary: |-
    Fix v0.6.30 distribution recovery checkout

    Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
  Scope: |-
    - In scope: Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
    - Out of scope: unrelated refactors not required for "Fix v0.6.30 distribution recovery checkout".
  Plan: |-
    1. Change only .github/workflows/publish-distribution-module.yml so checkout does not recurse into optional submodules.
    2. Verify workflow contracts with bun run workflows:lint and git diff --check.
    3. Publish the narrow task PR to codex/release-v0.6.27-reclaim-fix, wait for hosted checks, merge it, then rerun v0.6.30 distribution recovery at exact SHA b44f555a14e1dad9a44368027f02d522e94c93fa.
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix v0.6.30 distribution recovery checkout". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix v0.6.30 distribution recovery checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-16T21:41:58.620Z — VERIFY — ok

    By: ORCHESTRATOR

    Note: Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: git diff --check; Result: pass. Scope: publish-distribution-module checkout no longer recurses into optional marketing submodule.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-16T21:40:36.505Z, excerpt_hash=sha256:d4d16362a698ddf0fb5cd2be72e4ce0e2572a7595409eb7be6b121145bb67c91

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609170039-R630-fix-v0-6-30-distribution-recovery-checkout/.agentplane/tasks/202609170039-R630/blueprint/resolved-snapshot.json
    - old_digest: efc492849641c35e80e36c18881cef6dc5f65e0080c1f613e972b91781978226
    - current_digest: efc492849641c35e80e36c18881cef6dc5f65e0080c1f613e972b91781978226
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609170039-R630

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202609170039-R630 --branch task/202609170039-R630/fix-v0-6-30-distribution-recovery-checkout
    - diagnostic_command: agentplane pr check 202609170039-R630
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "explicit"
---
## Summary

Fix v0.6.30 distribution recovery checkout

Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.

## Scope

- In scope: Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
- Out of scope: unrelated refactors not required for "Fix v0.6.30 distribution recovery checkout".

## Plan

1. Change only .github/workflows/publish-distribution-module.yml so checkout does not recurse into optional submodules.
2. Verify workflow contracts with bun run workflows:lint and git diff --check.
3. Publish the narrow task PR to codex/release-v0.6.27-reclaim-fix, wait for hosted checks, merge it, then rerun v0.6.30 distribution recovery at exact SHA b44f555a14e1dad9a44368027f02d522e94c93fa.

## Verify Steps

PLANNER fallback scaffold for "Fix v0.6.30 distribution recovery checkout". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix v0.6.30 distribution recovery checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-16T21:41:58.620Z — VERIFY — ok

By: ORCHESTRATOR

Note: Command: bun run workflows:lint; Result: pass; Evidence: workflow and command guidance contract OK, workflow lifecycle parity OK, critical Vitest route OK. Command: git diff --check; Result: pass. Scope: publish-distribution-module checkout no longer recurses into optional marketing submodule.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-16T21:40:36.505Z, excerpt_hash=sha256:d4d16362a698ddf0fb5cd2be72e4ce0e2572a7595409eb7be6b121145bb67c91

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609170039-R630-fix-v0-6-30-distribution-recovery-checkout/.agentplane/tasks/202609170039-R630/blueprint/resolved-snapshot.json
- old_digest: efc492849641c35e80e36c18881cef6dc5f65e0080c1f613e972b91781978226
- current_digest: efc492849641c35e80e36c18881cef6dc5f65e0080c1f613e972b91781978226
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609170039-R630

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202609170039-R630 --branch task/202609170039-R630/fix-v0-6-30-distribution-recovery-checkout
- diagnostic_command: agentplane pr check 202609170039-R630
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
