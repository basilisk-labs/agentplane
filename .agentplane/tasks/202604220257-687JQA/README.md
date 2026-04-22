---
id: "202604220257-687JQA"
title: "Split incidents shared dependencies and lower cycle baseline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604220257-AMWKB1"
tags:
  - "architecture"
  - "deps"
  - "incidents"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:12.246Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T08:58:17.867Z"
  updated_by: "CODER"
  note: "Verified: incidents/shared cycle cleanup is already satisfied by AMWKB1, dependency-cruiser known baseline remains zero, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: validate incidents/shared cycle cleanup after PR sync port extraction, confirm zero dependency-cruiser baseline, and close as no-code follow-up if full verification remains green."
events:
  -
    type: "status"
    at: "2026-04-22T08:54:27.683Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate incidents/shared cycle cleanup after PR sync port extraction, confirm zero dependency-cruiser baseline, and close as no-code follow-up if full verification remains green."
  -
    type: "verify"
    at: "2026-04-22T08:58:17.867Z"
    author: "CODER"
    state: "ok"
    note: "Verified: incidents/shared cycle cleanup is already satisfied by AMWKB1, dependency-cruiser known baseline remains zero, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed."
doc_version: 3
doc_updated_at: "2026-04-22T08:58:17.877Z"
doc_updated_by: "CODER"
description: "Resolve remaining no-circular violations around incidents/shared and publish a stricter dep-cruiser baseline."
sections:
  Summary: "Finish current known no-circular cleanup after task and PR cycle reductions."
  Scope: "Incidents shared modules, dep-cruiser known violations file, and affected tests. Do not change incident semantics."
  Plan: |-
    1. Inspect incidents/shared cycle path.
    2. Move neutral types/helpers into a cycle-free module.
    3. Update imports and tests.
    4. Lower known violation baseline to the remaining count or zero.
  Verify Steps: "Run arch:baseline && arch:deps, incident tests, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:58:17.867Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: incidents/shared cycle cleanup is already satisfied by AMWKB1, dependency-cruiser known baseline remains zero, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:54:27.691Z, excerpt_hash=sha256:56df624ac39697df92481f2bd10ffb69d25c1dd0051b0f1d6b6b5fc1c280c07d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous incident imports and known violations baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Finish current known no-circular cleanup after task and PR cycle reductions.

## Scope

Incidents shared modules, dep-cruiser known violations file, and affected tests. Do not change incident semantics.

## Plan

1. Inspect incidents/shared cycle path.
2. Move neutral types/helpers into a cycle-free module.
3. Update imports and tests.
4. Lower known violation baseline to the remaining count or zero.

## Verify Steps

Run arch:baseline && arch:deps, incident tests, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:58:17.867Z — VERIFY — ok

By: CODER

Note: Verified: incidents/shared cycle cleanup is already satisfied by AMWKB1, dependency-cruiser known baseline remains zero, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:54:27.691Z, excerpt_hash=sha256:56df624ac39697df92481f2bd10ffb69d25c1dd0051b0f1d6b6b5fc1c280c07d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous incident imports and known violations baseline.

## Findings

None yet.
