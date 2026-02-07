---
id: "202601290714-R8MRDW"
title: "AP-036: scenario model + list/info"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202601270756-779J2V"
  - "202601290714-QE3NNN"
tags:
  - "roadmap"
  - "nodejs"
  - "recipes"
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
  hash: "9bf2757813e781d5007fbcb9fa725eaf9c4e5cee"
  message: "✨ R8MRDW scenario list/info"
comments:
  -
    author: "CODER"
    body: "Start: implement scenario schema parsing plus scenario list/info commands."
  -
    author: "CODER"
    body: "verified: manual review only | details: tests not run (suggest bun test packages/agentplane/src/run-cli.test.ts)."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:18.460Z"
doc_updated_by: "agentplane"
description: "Implement scenario schema parsing and CLI: scenario list and scenario info <recipe:scenario> (descriptive, no execution yet)."
---
## Summary

Add scenario schema parsing and scenario list/info CLI commands for installed recipes.

## Scope

- Parse scenario definitions from recipes/scenarios/*.json\n- Generate and read scenarios index for list/info\n- Add scenario list/info commands and update docs/tests

## Risks

- Strict scenario validation may break older recipes without required fields

## Verify Steps

- bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert the AP-036 commits to restore prior recipe-only behavior

## Plan


## Verification
