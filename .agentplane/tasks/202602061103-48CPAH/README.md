---
id: "202602061103-48CPAH"
title: "Fix full test suite for approvals enforcement"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "testing"
  - "workflow"
  - "approvals"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T11:03:22.085Z"
  updated_by: "USER"
  note: "Approved: fix pre-push tests"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix failing full test suite after approvals enforcement (require_plan / require_network)."
doc_version: 2
doc_updated_at: "2026-02-06T11:03:22.576Z"
doc_updated_by: "CODER"
description: "Update CLI smoke and recipes tests to account for require_plan and require_network enforcement (exit code 3 without approval/--yes)."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Исправить tests, которые ожидают код 0 там, где теперь требуется plan approval / network approval.
2) Прогнать bun run test:full локально (это то же, что гоняет pre-push).
3) Закоммитить через agentplane commit с allowlist.
4) verify(ok) + finish + close commit.

## Risks


## Verification


## Rollback Plan
