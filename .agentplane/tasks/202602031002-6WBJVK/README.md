---
id: "202602031002-6WBJVK"
title: "CLI update check on startup"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
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
  hash: "f881f51201a0ce8c6b608ca394433164a46578a3"
  message: "✨ 6WBJVK add update check on startup"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: plan approved; implementing CLI update check with opt-out flag."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:cli:core; update-check tests added and passing."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:cli:core; update-check tests added and passing."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:51.914Z"
doc_updated_by: "agentplane"
description: "Add version check on CLI startup; compare installed version vs npm latest and suggest upgrade with opt-out flag."
id_source: "generated"
---
## Summary

Add startup update check against npm registry with opt-out flag, warning on newer versions.

Normalized task doc sections (dedupe).

## Scope

Update CLI global flags, help text, and command guide; add npm version check and tests.

## Risks

Startup warning could appear in stderr; npm registry fetch is best-effort but should not block CLI.

## Verify Steps

bun run test:cli:core

## Rollback Plan

Revert the update-check changes in run-cli.ts, help.ts, command-guide.ts, and related tests.

## Plan


## Verification
