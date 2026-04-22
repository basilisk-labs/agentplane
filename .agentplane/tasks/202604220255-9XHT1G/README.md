---
id: "202604220255-9XHT1G"
title: "Remove obsolete mixed root and subpath test mocks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-E4C2R4"
tags:
  - "cleanup"
  - "core"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:06.746Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T07:33:25.596Z"
  updated_by: "CODER"
  note: "Verified obsolete mixed root/subpath core mocks removal. Checks passed: mixed mock detection script; focused finish/prepare tests; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove obsolete mixed root and subpath core mocks while keeping tests aligned to production imports."
events:
  -
    type: "status"
    at: "2026-04-22T07:23:20.389Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove obsolete mixed root and subpath core mocks while keeping tests aligned to production imports."
  -
    type: "verify"
    at: "2026-04-22T07:33:25.596Z"
    author: "CODER"
    state: "ok"
    note: "Verified obsolete mixed root/subpath core mocks removal. Checks passed: mixed mock detection script; focused finish/prepare tests; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T07:33:25.607Z"
doc_updated_by: "CODER"
description: "Clean up tests that mock both @agentplaneorg/core root and subpath modules after the subpath migration."
sections:
  Summary: "Make test mocks match the production import graph and reduce fragile duplicate mock setup."
  Scope: "Tests and mocks only. Production imports should already be covered by prior core subpath task."
  Plan: |-
    1. Find tests that mock both root and subpath core modules.
    2. Keep only mocks matching actual production imports.
    3. Extract shared mock setup where repeated.
    4. Verify affected tests and knip baseline.
  Verify Steps: "Run affected tests, fast CI, knip check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T07:33:25.596Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified obsolete mixed root/subpath core mocks removal. Checks passed: mixed mock detection script; focused finish/prepare tests; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:23:20.405Z, excerpt_hash=sha256:1d456773d40b70418dd8ce2c710da378fc9cd7148b22ae94307fa63c5de4cb63
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous mock declarations."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make test mocks match the production import graph and reduce fragile duplicate mock setup.

## Scope

Tests and mocks only. Production imports should already be covered by prior core subpath task.

## Plan

1. Find tests that mock both root and subpath core modules.
2. Keep only mocks matching actual production imports.
3. Extract shared mock setup where repeated.
4. Verify affected tests and knip baseline.

## Verify Steps

Run affected tests, fast CI, knip check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T07:33:25.596Z — VERIFY — ok

By: CODER

Note: Verified obsolete mixed root/subpath core mocks removal. Checks passed: mixed mock detection script; focused finish/prepare tests; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:23:20.405Z, excerpt_hash=sha256:1d456773d40b70418dd8ce2c710da378fc9cd7148b22ae94307fa63c5de4cb63

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous mock declarations.

## Findings

None yet.
