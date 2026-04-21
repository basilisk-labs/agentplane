---
id: "202604210900-20N2C1"
title: "Make task doc v3 the only supported version"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "breaking"
  - "code"
  - "migration"
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
doc_updated_at: "2026-04-21T09:00:44.539Z"
doc_updated_by: "PLANNER"
description: "Drop task doc v2 support only after migration policy confirms old task READMEs can fail explicitly."
sections:
  Summary: "Set supported task documentation to v3 only if T23 approves breaking removal; otherwise defer with migration criteria."
  Scope: "In scope: SUPPORTED_DOC_VERSIONS, v2 parsing/migration tests, and release/migration guidance. Out of scope: changing v3 section contract."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Change supported doc versions to v3 only.
    3. Remove or isolate v2 parsing tests and keep migration guidance.
    4. Run task doc/backend tests.
  Verify Steps: |-
    - v2 docs fail explicitly with actionable guidance.
    - v3 tasks continue to pass.
    - Migration path is documented.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore v2 support and tests."
  Findings: "Highest data-compatibility risk among bridge removals."
id_source: "generated"
---
## Summary

Set supported task documentation to v3 only if T23 approves breaking removal; otherwise defer with migration criteria.

## Scope

In scope: SUPPORTED_DOC_VERSIONS, v2 parsing/migration tests, and release/migration guidance. Out of scope: changing v3 section contract.

## Plan

1. Confirm T23 authorizes removal.
2. Change supported doc versions to v3 only.
3. Remove or isolate v2 parsing tests and keep migration guidance.
4. Run task doc/backend tests.

## Verify Steps

- v2 docs fail explicitly with actionable guidance.
- v3 tasks continue to pass.
- Migration path is documented.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore v2 support and tests.

## Findings

Highest data-compatibility risk among bridge removals.
