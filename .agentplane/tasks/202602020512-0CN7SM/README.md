---
id: "202602020512-0CN7SM"
title: "Init: git bootstrap + install commit"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "init"
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
  hash: "296d43fa2eecc20229fd66a0ed58b7b176da3358"
  message: "✨ 0CN7SM init git bootstrap and install commit; pin base branch; update hooks to system agentplane; add tests/docs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: update agentplane init to bootstrap git when missing, set base branch when present, and commit install with version."
  -
    author: "ORCHESTRATOR"
    body: "verified: bun run test:full | details: pre-commit ran format:check, lint, and test-fast; init bootstrap and hook changes validated."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:41.631Z"
doc_updated_by: "agentplane"
description: "Update agentplane init to create git repo when missing, set base branch when present, and commit installation with framework version without breaking existing repos."
---
## Summary

Added git bootstrap + install commit to init, and switched hooks to call system agentplane.

## Scope

Init now handles non-git roots, pins base branch, and creates an install commit; hooks invoke system agentplane; tests/docs updated for init behavior.

## Risks

Hooks now rely on system agentplane in PATH; repos without it will fail hook execution until installed. Init refuses to proceed if staged changes exist.

## Verify Steps

bun run test:full

## Rollback Plan

Revert the init/git bootstrap changes and hook script updates; rerun tests.

## Plan


## Verification
