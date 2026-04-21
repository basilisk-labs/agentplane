---
id: "202604210856-57Q3H5"
title: "Add workspace cross-dependency consistency check"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T08:56:26.951Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the new check and script wiring; leave T1 dependency fix intact unless explicitly reverting both.

## Findings

Depends on T1 so the baseline starts clean.
