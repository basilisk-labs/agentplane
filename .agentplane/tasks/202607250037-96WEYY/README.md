---
id: "202607250037-96WEYY"
title: "Make RF-04 replay cleanup retry-safe on macOS"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "milestone-alpha2"
  - "reliability"
  - "rf-04"
  - "v0.7"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T00:38:13.292Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved under the existing AgentPlane 0.7 authorization as a narrow release-reliability fix for a reproduced cleanup-only failure."
verification:
  state: "needs_rework"
  updated_at: "2026-07-25T00:44:48.440Z"
  updated_by: "TESTER"
  note: "No implementation diff exists yet; the branch contains only lifecycle artifacts."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make RF-04 replay cleanup retry-safe without changing frozen evidence."
events:
  -
    type: "status"
    at: "2026-07-25T00:43:04.222Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make RF-04 replay cleanup retry-safe without changing frozen evidence."
  -
    type: "verify"
    at: "2026-07-25T00:44:48.440Z"
    author: "TESTER"
    state: "needs_rework"
    note: "No implementation diff exists yet; the branch contains only lifecycle artifacts."
doc_version: 3
doc_updated_at: "2026-07-25T00:44:48.777Z"
doc_updated_by: "CODER"
description: "Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage."
sections:
  Summary: |-
    Make RF-04 replay cleanup retry-safe on macOS

    Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
  Scope: |-
    - In scope: Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
    - Out of scope: unrelated refactors not required for "Make RF-04 replay cleanup retry-safe on macOS".
  Plan: "1. Reproduce the cleanup-only ENOTEMPTY path without changing RF-04 replay assertions or frozen provider evidence. 2. Replace one-shot recursive cleanup with the smallest bounded retry-safe helper at the test boundary. 3. Add deterministic regression coverage that injects a late .DS_Store-style entry and proves bounded cleanup succeeds while real cleanup errors still surface. 4. Run the focused RF-04 hardening test repeatedly, test:critical, typecheck, scoped lint, format, and task gates."
  Verify Steps: |-
    1. Inject a late `.DS_Store`-style entry during temporary-root cleanup. Expected: bounded retry cleanup removes the tree without hiding the successful replay assertions.
    2. Inject a persistent cleanup failure. Expected: cleanup stops after the configured bound and surfaces the original error.
    3. Run the RF-04 replay-hardening test repeatedly. Expected: every run preserves the frozen 50 runs, 70 outcomes, 27 provider token cells, and 170 scalar cells.
    4. Run `bun run test:critical`, `bun run typecheck`, scoped ESLint, Prettier, routing, hotspot, and task-lint gates. Expected: all product assertions pass; no provider/model calls are made.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T00:44:48.440Z — VERIFY — needs_rework

    By: TESTER

    Note: No implementation diff exists yet; the branch contains only lifecycle artifacts.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T00:43:04.222Z, excerpt_hash=sha256:ce52142cae84398119276adf38634f5a5ab92fdbf2f92e6d361d2053deb7f271

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250037-96WEYY-make-rf-04-replay-cleanup-retry-safe-on-macos/.agentplane/tasks/202607250037-96WEYY/blueprint/resolved-snapshot.json
    - old_digest: 877eb9a360741e407588402f2d2ef75b4a50f1a2059aad710594c155f5e99e21
    - current_digest: 877eb9a360741e407588402f2d2ef75b4a50f1a2059aad710594c155f5e99e21
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250037-96WEYY

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607250037-96WEYY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The published branch changes only task and PR metadata, so none of the four Verify Steps can be exercised.
      Impact: Accepting this state would allow an empty PR to advance as if RF-04 cleanup reliability were implemented.
      Resolution: Return the task to CODER, implement bounded retry cleanup plus deterministic late-entry and persistent-failure coverage, then rerun the declared gates.
id_source: "generated"
---
## Summary

Make RF-04 replay cleanup retry-safe on macOS

Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.

## Scope

- In scope: Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
- Out of scope: unrelated refactors not required for "Make RF-04 replay cleanup retry-safe on macOS".

## Plan

1. Reproduce the cleanup-only ENOTEMPTY path without changing RF-04 replay assertions or frozen provider evidence. 2. Replace one-shot recursive cleanup with the smallest bounded retry-safe helper at the test boundary. 3. Add deterministic regression coverage that injects a late .DS_Store-style entry and proves bounded cleanup succeeds while real cleanup errors still surface. 4. Run the focused RF-04 hardening test repeatedly, test:critical, typecheck, scoped lint, format, and task gates.

## Verify Steps

1. Inject a late `.DS_Store`-style entry during temporary-root cleanup. Expected: bounded retry cleanup removes the tree without hiding the successful replay assertions.
2. Inject a persistent cleanup failure. Expected: cleanup stops after the configured bound and surfaces the original error.
3. Run the RF-04 replay-hardening test repeatedly. Expected: every run preserves the frozen 50 runs, 70 outcomes, 27 provider token cells, and 170 scalar cells.
4. Run `bun run test:critical`, `bun run typecheck`, scoped ESLint, Prettier, routing, hotspot, and task-lint gates. Expected: all product assertions pass; no provider/model calls are made.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T00:44:48.440Z — VERIFY — needs_rework

By: TESTER

Note: No implementation diff exists yet; the branch contains only lifecycle artifacts.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T00:43:04.222Z, excerpt_hash=sha256:ce52142cae84398119276adf38634f5a5ab92fdbf2f92e6d361d2053deb7f271

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250037-96WEYY-make-rf-04-replay-cleanup-retry-safe-on-macos/.agentplane/tasks/202607250037-96WEYY/blueprint/resolved-snapshot.json
- old_digest: 877eb9a360741e407588402f2d2ef75b4a50f1a2059aad710594c155f5e99e21
- current_digest: 877eb9a360741e407588402f2d2ef75b4a50f1a2059aad710594c155f5e99e21
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250037-96WEYY

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607250037-96WEYY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The published branch changes only task and PR metadata, so none of the four Verify Steps can be exercised.
  Impact: Accepting this state would allow an empty PR to advance as if RF-04 cleanup reliability were implemented.
  Resolution: Return the task to CODER, implement bounded retry cleanup plus deterministic late-entry and persistent-failure coverage, then rerun the declared gates.
