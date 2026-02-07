---
id: "202601301232-VD2W05"
title: "Unify config namespace formatting"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "config"
  - "docs"
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
  hash: "1977c7b25fbebec771482884733965826ef2187c"
  message: "✨ VD2W05 align config example paths with .agent-plane"
comments:
  -
    author: "ORCHESTRATOR"
    body: "verified: Example/config formatting change only | details: no automated tests run beyond pre-commit format/lint hooks."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:28.824Z"
doc_updated_by: "agentplane"
description: "Make config examples use the same .agent-plane namespace format as the repo config."
---
## Summary

Align config example paths with the .agent-plane namespace used in the repo.

## Context

User requested a single unified configuration format across the repo; align spec example paths to match .agent-plane.

## Scope

- Update packages/spec/examples/config.json path values to use .agent-plane namespace.\n- Keep ordering/format consistent with existing config files.

## Risks

- Example paths may be used externally; ensure .agent-plane is intended in this repo.\n- No behavior change; documentation/example only.

## Verify Steps

- N/A (example/formatting change).

## Rollback Plan

- Revert packages/spec/examples/config.json to previous values.

## Plan


## Verification
