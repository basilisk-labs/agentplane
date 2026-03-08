---
id: "202602061103-48CPAH"
title: "Fix full test suite for approvals enforcement"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-06T11:06:27.258Z"
  updated_by: "CODER"
  note: "Pre-push gate fixed: bun run test:full passes; smoke test now approves plan and records verify before finish; remote recipes list-remote test uses --yes under require_network."
commit:
  hash: "460da49e111829c12cb69f03c88e5e55808b9993"
  message: "🧪 48CPAH fix"
comments:
  -
    author: "CODER"
    body: "Start: Fix failing full test suite after approvals enforcement (require_plan / require_network)."
  -
    author: "CODER"
    body: "Verified: Updated CLI smoke and recipes tests to satisfy require_plan and require_network enforcement. Pre-push full suite (bun run test:full) is green; lint and format checks pass."
doc_version: 3
doc_updated_at: "2026-02-06T11:06:49.204Z"
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

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T11:06:27.258Z — VERIFY — ok

By: CODER

Note: Pre-push gate fixed: bun run test:full passes; smoke test now approves plan and records verify before finish; remote recipes list-remote test uses --yes under require_network.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
