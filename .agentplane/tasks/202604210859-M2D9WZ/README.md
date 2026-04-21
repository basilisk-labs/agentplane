---
id: "202604210859-M2D9WZ"
title: "Inventory production console usage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "logging"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:33:13.051Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:35:24.173Z"
  updated_by: "CODER"
  note: "Added logging:check as a production console usage inventory guard with a current baseline of 26 occurrences across packages/**/*.ts excluding tests/spec/dist. Verification: bun run logging:check passed; bun run lint:core -- scripts/check-no-console.mjs passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add a production console usage inventory guard that records the current baseline without replacing console calls yet."
events:
  -
    type: "status"
    at: "2026-04-21T09:33:13.887Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a production console usage inventory guard that records the current baseline without replacing console calls yet."
  -
    type: "verify"
    at: "2026-04-21T09:35:24.173Z"
    author: "CODER"
    state: "ok"
    note: "Added logging:check as a production console usage inventory guard with a current baseline of 26 occurrences across packages/**/*.ts excluding tests/spec/dist. Verification: bun run logging:check passed; bun run lint:core -- scripts/check-no-console.mjs passed."
doc_version: 3
doc_updated_at: "2026-04-21T09:35:24.177Z"
doc_updated_by: "CODER"
description: "Add a baseline check for production console.* usage so structured logging migration has measurable progress."
sections:
  Summary: "Create a production console usage inventory/check that excludes tests and approved script/UX paths."
  Scope: "In scope: a small check script, package script wiring, baseline count, and docs in task findings. Out of scope: replacing console usages."
  Plan: |-
    1. Inspect existing script-runtime/check patterns.
    2. Add a check that scans packages/**/*.ts excluding tests and approved paths.
    3. Record a baseline and fail only above baseline for this step.
    4. Wire into an appropriate local check surface.
  Verify Steps: |-
    - Check reports current console usage count and exits non-zero when count exceeds baseline.
    - Baseline is below the audit target or justified if higher.
    - Tests/scripts are excluded deliberately, not accidentally.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:35:24.173Z — VERIFY — ok
    
    By: CODER
    
    Note: Added logging:check as a production console usage inventory guard with a current baseline of 26 occurrences across packages/**/*.ts excluding tests/spec/dist. Verification: bun run logging:check passed; bun run lint:core -- scripts/check-no-console.mjs passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:33:13.898Z, excerpt_hash=sha256:3b401cd4e479b8d6089964331dc62717354c126a931cedea428fafdd1ed4e3d0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the check and script wiring."
  Findings: "Source input: REFACTORING_PLAN B.1 and AUDIT H-2/M-7."
id_source: "generated"
---
## Summary

Create a production console usage inventory/check that excludes tests and approved script/UX paths.

## Scope

In scope: a small check script, package script wiring, baseline count, and docs in task findings. Out of scope: replacing console usages.

## Plan

1. Inspect existing script-runtime/check patterns.
2. Add a check that scans packages/**/*.ts excluding tests and approved paths.
3. Record a baseline and fail only above baseline for this step.
4. Wire into an appropriate local check surface.

## Verify Steps

- Check reports current console usage count and exits non-zero when count exceeds baseline.
- Baseline is below the audit target or justified if higher.
- Tests/scripts are excluded deliberately, not accidentally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:35:24.173Z — VERIFY — ok

By: CODER

Note: Added logging:check as a production console usage inventory guard with a current baseline of 26 occurrences across packages/**/*.ts excluding tests/spec/dist. Verification: bun run logging:check passed; bun run lint:core -- scripts/check-no-console.mjs passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:33:13.898Z, excerpt_hash=sha256:3b401cd4e479b8d6089964331dc62717354c126a931cedea428fafdd1ed4e3d0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the check and script wiring.

## Findings

Source input: REFACTORING_PLAN B.1 and AUDIT H-2/M-7.
