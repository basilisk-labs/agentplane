---
id: "202607221908-7WV0A7"
title: "Migrate provider, integration, release, and ops command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-08-01T03:42:34.295Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
    - Preserve provider/release evidence and use recovery versions after publication.
    - Re-run release parity and provider state fixtures.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert this family to authority-aware compatibility adapters; never bypass protected-main or publication policy.
- Preserve provider/release evidence and use recovery versions after publication.
- Re-run release parity and provider state fixtures.

## Findings
