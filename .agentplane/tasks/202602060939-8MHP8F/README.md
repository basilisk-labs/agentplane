---
id: "202602060939-8MHP8F"
title: "D4: Enforce require_verify by blocking finish/integrate without ok"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602060902-QW7TBG"
tags:
  - "roadmap"
  - "approvals"
  - "verification"
  - "guard"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T09:40:24.689Z"
  updated_by: "USER"
  note: "Approved"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement require_verify enforcement (finish/integrate guards) and update tests to use record-only verification results."
doc_version: 2
doc_updated_at: "2026-02-06T09:40:31.844Z"
doc_updated_by: "CODER"
description: "Add ensureVerificationSatisfiedIfRequired guard and wire into finish/integrate; update tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add ensureVerificationSatisfiedIfRequired guard (pending/needs_rework blocks)\n2) Wire guard into finish (direct) + integrate (branch_pr)\n3) Update workflow/run-cli tests to set verification ok before finish/integrate\n4) Verify: format:check, lint, test:fast, test:cli:core

## Risks


## Verification


## Rollback Plan
