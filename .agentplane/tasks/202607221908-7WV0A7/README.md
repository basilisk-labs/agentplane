---
id: "202607221908-7WV0A7"
title: "Migrate provider, integration, release, and ops command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221849-NWVCAG"
  - "202607221852-71SCSW"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run release:parity"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T03:23:18.269Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T03:43:10.720Z"
  updated_by: "TESTER"
  note: "Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed."
  attempts: 0
commit:
  hash: "d53ad1acb3f9473a2f5e493035b8bb8ba7b049fa"
  message: "♻️ 7WV0A7 task: migrate provider and release command sessions"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: provider, integration, release, hosted-close, cleanup, and local work commands now declare authority-aware CommandSession profiles; group commands no longer prepare broad context; focused and critical verification passed."
events:
  -
    type: "status"
    at: "2026-08-01T03:23:48.372Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T03:42:34.295Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: provider, integration, release, hosted-close, cleanup, and local work commands now declare authority-aware CommandSession profiles; group commands no longer prepare broad context; focused and critical verification passed."
  -
    type: "verify"
    at: "2026-08-01T03:43:10.720Z"
    author: "TESTER"
    state: "ok"
    note: "Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed."
doc_version: 3
doc_updated_at: "2026-08-01T03:43:11.530Z"
doc_updated_by: "CODER"
description: "RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers."
sections:
  Summary: |-
    Migrate provider, integration, release, and ops command boundaries

    RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.
  Scope: |-
    - In scope: PR sync/open/check, integration queue/merge/hosted close/cleanup, release/publish/recovery, network/provider and ops commands, granular authority/provider/Git capabilities, typed results/errors, audit, and human/JSON renderers.
    - Out of scope: granting publication authority or changing protected-main policy.
  Plan: |-
    1. Classify exact provider/Git/network/authority capabilities for each operation.
    2. Extract typed provider/integration/release results from CLI IO.
    3. Centralize rendering, exit mapping, wait/retry, and audit surfaces.
    4. Remove direct provider/network access from use cases and broad sessions.
    5. Run authority, provider state, release parity, recovery, and snapshot tests.
  Verify Steps: |-
    1. Exercise provider/integration/release state matrices with and without authority. Expected: only exact authorized capabilities execute and all outcomes are typed/audited.
    2. Simulate late checks, network failure, merge conflict, partial publication, and recovery. Expected: bounded typed results without duplicated effects.
    3. Compare human/JSON/release artifacts. Expected: compatibility and exact-SHA provenance.
    4. Run provider/release tests, release parity, lifecycle invariants, and guards.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T03:43:10.720Z — VERIFY — ok

    By: TESTER

    Note: Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:42:34.295Z, excerpt_hash=sha256:19b4d28bd7718ce4e5b6f221ffd2e63f660ef21c39a8d7304ee579f5a5b72463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
    - old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-7WV0A7
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
    - Preserve provider/release evidence and use recovery versions after publication.
    - Re-run release parity and provider state fixtures.
  Findings: |-
    - Observation: Read-only provider sessions deny git.mutate before context preparation; local work sessions deny provider and route.remote; provider-write and release-publish commands declare exact catalog capabilities while group commands prepare no context.
      Impact: Provider/network/Git mutation authority is explicit at the command boundary without changing public output or release version parity.
      Resolution: Keep shared CommandContext as a compatibility value until RF-24 fan-in removes the coarse resolver; no flake or regression observed in this verification.
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Migrate provider, integration, release, and ops command boundaries

RF-24/RF-25 vertical slice: constrain provider/integration/release/ops commands to explicit authority-aware capabilities and typed results/renderers.

## Scope

- In scope: PR sync/open/check, integration queue/merge/hosted close/cleanup, release/publish/recovery, network/provider and ops commands, granular authority/provider/Git capabilities, typed results/errors, audit, and human/JSON renderers.
- Out of scope: granting publication authority or changing protected-main policy.

## Plan

1. Classify exact provider/Git/network/authority capabilities for each operation.
2. Extract typed provider/integration/release results from CLI IO.
3. Centralize rendering, exit mapping, wait/retry, and audit surfaces.
4. Remove direct provider/network access from use cases and broad sessions.
5. Run authority, provider state, release parity, recovery, and snapshot tests.

## Verify Steps

1. Exercise provider/integration/release state matrices with and without authority. Expected: only exact authorized capabilities execute and all outcomes are typed/audited.
2. Simulate late checks, network failure, merge conflict, partial publication, and recovery. Expected: bounded typed results without duplicated effects.
3. Compare human/JSON/release artifacts. Expected: compatibility and exact-SHA provenance.
4. Run provider/release tests, release parity, lifecycle invariants, and guards.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T03:43:10.720Z — VERIFY — ok

By: TESTER

Note: Provider/integration/release boundary verification passed: focused family matrix 65 files/414 tests; critical CLI 12/12 chunks and 77 tests; typecheck, format, lint, Knip 545/545, guards, trust ratchet, lifecycle 8/8, release parity, and architecture dependency checks all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T03:42:34.295Z, excerpt_hash=sha256:19b4d28bd7718ce4e5b6f221ffd2e63f660ef21c39a8d7304ee579f5a5b72463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-7WV0A7-migrate-provider-integration-release-and-ops-com/.agentplane/tasks/202607221908-7WV0A7/blueprint/resolved-snapshot.json
- old_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- current_digest: f9952f89b4a423843b77a4ab1c48bbd06fb22b85e09d9a444355591cbd17d42c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-7WV0A7

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-7WV0A7
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
- Preserve provider/release evidence and use recovery versions after publication.
- Re-run release parity and provider state fixtures.

## Findings

- Observation: Read-only provider sessions deny git.mutate before context preparation; local work sessions deny provider and route.remote; provider-write and release-publish commands declare exact catalog capabilities while group commands prepare no context.
  Impact: Provider/network/Git mutation authority is explicit at the command boundary without changing public output or release version parity.
  Resolution: Keep shared CommandContext as a compatibility value until RF-24 fan-in removes the coarse resolver; no flake or regression observed in this verification.
