---
id: "202604210856-0J4XZH"
title: "Fix testkit workspace dependency drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "dependencies"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:01:24.971Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:03:20.343Z"
  updated_by: "CODER"
  note: "packages/testkit now depends on @agentplaneorg/core 0.3.16; bun.lock no longer contains nested @agentplane/testkit/@agentplaneorg/core@0.3.15; testkit typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Align testkit internal core dependency with the workspace release strategy and verify package metadata without touching audit input files."
events:
  -
    type: "status"
    at: "2026-04-21T09:01:28.141Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Align testkit internal core dependency with the workspace release strategy and verify package metadata without touching audit input files."
  -
    type: "verify"
    at: "2026-04-21T09:03:20.343Z"
    author: "CODER"
    state: "ok"
    note: "packages/testkit now depends on @agentplaneorg/core 0.3.16; bun.lock no longer contains nested @agentplane/testkit/@agentplaneorg/core@0.3.15; testkit typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-21T09:03:20.350Z"
doc_updated_by: "CODER"
description: "Align packages/testkit with the active workspace core dependency so the next patch release cannot publish or install with a stale @agentplaneorg/core range."
sections:
  Summary: "Fix the stale @agentplaneorg/core dependency in packages/testkit/package.json. This is the nearest blocker from the audit because local workspace linking can hide it while publish/install flows can fail or pull the wrong core version."
  Scope: "In scope: packages/testkit/package.json and lockfile changes caused by the dependency correction. Out of scope: publishing, unrelated package metadata cleanup, and broad dependency upgrades."
  Plan: |-
    1. Inspect workspace package dependency conventions.
    2. Replace the stale @agentplaneorg/core range with the repository-standard local workspace/current version strategy.
    3. Refresh lockfile only if the package manager requires it.
    4. Run targeted dependency/install validation and typecheck if affected.
  Verify Steps: |-
    - Confirm packages/testkit/package.json no longer references @agentplaneorg/core 0.3.15.
    - Run the package manager install/check needed to refresh or validate the lockfile.
    - Run typecheck or the closest targeted package validation available.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:03:20.343Z — VERIFY — ok
    
    By: CODER
    
    Note: packages/testkit now depends on @agentplaneorg/core 0.3.16; bun.lock no longer contains nested @agentplane/testkit/@agentplaneorg/core@0.3.15; testkit typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:28.153Z, excerpt_hash=sha256:6de3fd3601ba579fd097ed16b67714b85f967d25f53e7232613ab781158af4a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert package metadata and lockfile changes for this task only."
  Findings: |-
    Source inputs: AUDIT B-1 and SAFE_TO_REMOVE 0.2. Keep audit files untracked and out of commits.
    
    - Observation: bun install --offline saved bun.lock but postinstall lefthook install exited because pre-commit.old already exists.
      Impact: Dependency alignment is valid and typecheck passes, but the install command itself returned non-zero due to local hook state outside the dependency graph.
      Resolution: Treat as task-local environment finding; do not widen dependency scope. Rerun hook install only if a separate hook maintenance task is opened.
id_source: "generated"
---
## Summary

Fix the stale @agentplaneorg/core dependency in packages/testkit/package.json. This is the nearest blocker from the audit because local workspace linking can hide it while publish/install flows can fail or pull the wrong core version.

## Scope

In scope: packages/testkit/package.json and lockfile changes caused by the dependency correction. Out of scope: publishing, unrelated package metadata cleanup, and broad dependency upgrades.

## Plan

1. Inspect workspace package dependency conventions.
2. Replace the stale @agentplaneorg/core range with the repository-standard local workspace/current version strategy.
3. Refresh lockfile only if the package manager requires it.
4. Run targeted dependency/install validation and typecheck if affected.

## Verify Steps

- Confirm packages/testkit/package.json no longer references @agentplaneorg/core 0.3.15.
- Run the package manager install/check needed to refresh or validate the lockfile.
- Run typecheck or the closest targeted package validation available.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:03:20.343Z — VERIFY — ok

By: CODER

Note: packages/testkit now depends on @agentplaneorg/core 0.3.16; bun.lock no longer contains nested @agentplane/testkit/@agentplaneorg/core@0.3.15; testkit typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:28.153Z, excerpt_hash=sha256:6de3fd3601ba579fd097ed16b67714b85f967d25f53e7232613ab781158af4a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert package metadata and lockfile changes for this task only.

## Findings

Source inputs: AUDIT B-1 and SAFE_TO_REMOVE 0.2. Keep audit files untracked and out of commits.

- Observation: bun install --offline saved bun.lock but postinstall lefthook install exited because pre-commit.old already exists.
  Impact: Dependency alignment is valid and typecheck passes, but the install command itself returned non-zero due to local hook state outside the dependency graph.
  Resolution: Treat as task-local environment finding; do not widen dependency scope. Rerun hook install only if a separate hook maintenance task is opened.
