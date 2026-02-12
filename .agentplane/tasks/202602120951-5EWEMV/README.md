---
id: "202602120951-5EWEMV"
title: "P0: centralized release version sync and strict parity gates"
result_summary: "Centralized release parity checks and release version sync; fixed agentplane->core dependency drift in release flow."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "meta"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T09:59:08.531Z"
  updated_by: "CODER"
  note: "Verified: bun build for core+agentplane succeeds; release parity check passes; targeted release tests pass (apply/plan/check-release-version/check-release-parity)."
commit:
  hash: "e258a6862549ed368f57d5302df2310f0f822d66"
  message: "✅ 5EWEMV release: centralize parity checks and version sync"
comments:
  -
    author: "CODER"
    body: "Start: implement centralized release parity checks and synchronize release version updates for package versions and cross-package dependency."
  -
    author: "CODER"
    body: "Verified: release parity now checks package versions plus @agentplaneorg/core dependency, release apply updates both version fields and dependency atomically, and CI/publish include parity gates before publish."
events:
  -
    type: "status"
    at: "2026-02-12T09:59:04.486Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement centralized release parity checks and synchronize release version updates for package versions and cross-package dependency."
  -
    type: "verify"
    at: "2026-02-12T09:59:08.531Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun build for core+agentplane succeeds; release parity check passes; targeted release tests pass (apply/plan/check-release-version/check-release-parity)."
  -
    type: "status"
    at: "2026-02-12T10:01:08.009Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release parity now checks package versions plus @agentplaneorg/core dependency, release apply updates both version fields and dependency atomically, and CI/publish include parity gates before publish."
doc_version: 2
doc_updated_at: "2026-02-12T10:01:08.009Z"
doc_updated_by: "CODER"
description: "Ensure package versions and cross-package dependencies are updated from one source during release, and fail fast in CI before publish when parity breaks."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Add a shared release parity utility for scripts.\n2. Enforce parity in release/CI workflows and root scripts.\n3. Update release plan/apply commands to validate and synchronize @agentplaneorg/core dependency with version bumps.\n4. Extend tests for release scripts and commands.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T09:59:08.531Z — VERIFY — ok

By: CODER

Note: Verified: bun build for core+agentplane succeeds; release parity check passes; targeted release tests pass (apply/plan/check-release-version/check-release-parity).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:59:04.486Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
