---
id: "202602110502-SJ0GT0"
title: "T4: Add agents/schemas drift checks into CI"
result_summary: "CI fails automatically on schema or agent template drift"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602110502-PCFAWM"
tags:
  - "ci"
  - "cli"
  - "quality"
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
commit:
  hash: "6ef63f9924a93890813d05e57cf1c20cdec521ee"
  message: "🛠 SJ0GT0 ci: gate schema and agent template drift"
comments:
  -
    author: "CODER"
    body: "Start: wire schema and agent drift checks into root CI script."
  -
    author: "CODER"
    body: "Verified: root CI now includes schemas:check and agents:check before typecheck/lint/coverage, so drift is enforced in PR CI."
events:
  -
    type: "status"
    at: "2026-02-11T05:06:48.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wire schema and agent drift checks into root CI script."
  -
    type: "status"
    at: "2026-02-11T05:07:46.159Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: root CI now includes schemas:check and agents:check before typecheck/lint/coverage, so drift is enforced in PR CI."
doc_version: 2
doc_updated_at: "2026-02-11T05:07:46.159Z"
doc_updated_by: "CODER"
description: "Wire bun run schemas:check and bun run agents:check into root CI command path so PRs fail on drift."
id_source: "generated"
---
## Summary

Enable CI guardrails for schema drift and agent template drift so pull requests fail automatically when generated/runtime copies diverge from canonical templates.

## Scope

In scope:
- `package.json` root `ci` script

Out of scope:
- changing per-scope ci jobs in `scripts/ci-scope.mjs`

## Plan

1. Update root `ci` script to run `schemas:check` and `agents:check`.
2. Run the checks and validate command ordering still works.
3. Run build/lint/test gates and commit.

## Risks

- Risk: CI runtime increase.
Mitigation: checks are small local file comparisons.

## Verification


## Rollback Plan

Revert the task commit to restore previous CI command sequence.

## Verify Steps

- `bun run schemas:check`
- `bun run agents:check`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bun run test:fast`
Pass criteria:
- drift checks pass and are part of `bun run ci` script
