---
id: "202604210856-57Q3H5"
title: "Add workspace cross-dependency consistency check"
result_summary: "Added workspace dependency drift guard to release parity."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202604210856-0J4XZH"
tags:
  - "ci"
  - "code"
  - "dependencies"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:31:42.320Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:32:50.677Z"
  updated_by: "CODER"
  note: "Extended release parity to scan internal package dependencies across packages/* and fail when @agentplaneorg/* or @agentplane/testkit ranges drift from the workspace release version. Verification: node scripts/check-release-parity.mjs passed; focused check-release-parity-script test passed (5 tests)."
commit:
  hash: "d95dfe6b643683b1fef4fcaf2ce695209e771945"
  message: "✅ 57Q3H5 code: done"
comments:
  -
    author: "CODER"
    body: "Start: Add a workspace dependency consistency guard by extending existing release parity surfaces and verifying it catches stale internal package ranges."
  -
    author: "CODER"
    body: "Verified: release parity now checks internal workspace dependency ranges across packages and rejects stale private-package deps."
events:
  -
    type: "status"
    at: "2026-04-21T09:31:51.529Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a workspace dependency consistency guard by extending existing release parity surfaces and verifying it catches stale internal package ranges."
  -
    type: "verify"
    at: "2026-04-21T09:32:50.677Z"
    author: "CODER"
    state: "ok"
    note: "Extended release parity to scan internal package dependencies across packages/* and fail when @agentplaneorg/* or @agentplane/testkit ranges drift from the workspace release version. Verification: node scripts/check-release-parity.mjs passed; focused check-release-parity-script test passed (5 tests)."
  -
    type: "status"
    at: "2026-04-21T09:32:58.467Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release parity now checks internal workspace dependency ranges across packages and rejects stale private-package deps."
doc_version: 3
doc_updated_at: "2026-04-21T09:32:58.468Z"
doc_updated_by: "CODER"
description: "Add an automated guard that fails when internal @agentplaneorg package dependencies drift from the active workspace release version."
sections:
  Summary: "Add a CI/local check for internal package version drift so the testkit mismatch class cannot recur."
  Scope: "In scope: a small script/check, package script or CI hook integration, and tests or fixture coverage if the existing tooling pattern supports it. Out of scope: changing external dependency policy."
  Plan: |-
    1. Identify existing check script conventions and generated-artifact freshness patterns.
    2. Add a workspace dependency consistency check for @agentplaneorg/* and @agentplane/testkit references.
    3. Wire it into the appropriate local/CI script surface without duplicating existing checks.
    4. Add a focused negative fixture or unit test if practical.
  Verify Steps: |-
    - The new check exits non-zero on a deliberately mismatched internal dependency.
    - Existing package scripts/checks that should call it pass.
    - No external dependencies are upgraded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:32:50.677Z — VERIFY — ok
    
    By: CODER
    
    Note: Extended release parity to scan internal package dependencies across packages/* and fail when @agentplaneorg/* or @agentplane/testkit ranges drift from the workspace release version. Verification: node scripts/check-release-parity.mjs passed; focused check-release-parity-script test passed (5 tests).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:31:51.546Z, excerpt_hash=sha256:dd70d866c2c99c957303796693bb5e652548d0957f97fd805be165c431cc2a5e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the new check and script wiring; leave T1 dependency fix intact unless explicitly reverting both."
  Findings: "Depends on T1 so the baseline starts clean."
id_source: "generated"
---
## Summary

Add a CI/local check for internal package version drift so the testkit mismatch class cannot recur.

## Scope

In scope: a small script/check, package script or CI hook integration, and tests or fixture coverage if the existing tooling pattern supports it. Out of scope: changing external dependency policy.

## Plan

1. Identify existing check script conventions and generated-artifact freshness patterns.
2. Add a workspace dependency consistency check for @agentplaneorg/* and @agentplane/testkit references.
3. Wire it into the appropriate local/CI script surface without duplicating existing checks.
4. Add a focused negative fixture or unit test if practical.

## Verify Steps

- The new check exits non-zero on a deliberately mismatched internal dependency.
- Existing package scripts/checks that should call it pass.
- No external dependencies are upgraded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:32:50.677Z — VERIFY — ok

By: CODER

Note: Extended release parity to scan internal package dependencies across packages/* and fail when @agentplaneorg/* or @agentplane/testkit ranges drift from the workspace release version. Verification: node scripts/check-release-parity.mjs passed; focused check-release-parity-script test passed (5 tests).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:31:51.546Z, excerpt_hash=sha256:dd70d866c2c99c957303796693bb5e652548d0957f97fd805be165c431cc2a5e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the new check and script wiring; leave T1 dependency fix intact unless explicitly reverting both.

## Findings

Depends on T1 so the baseline starts clean.
