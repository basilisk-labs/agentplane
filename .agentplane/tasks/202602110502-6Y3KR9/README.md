---
id: "202602110502-6Y3KR9"
title: "T5: Remove double resolveProject in run-cli"
result_summary: "resolveProject runs at most once for commands that pre-resolve project"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "code"
  - "perf"
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
  hash: "f5dbc9e8305babb8282e66097fe377ae7426c7c3"
  message: "🛠 6Y3KR9 cli: reuse pre-resolved project in run-cli"
comments:
  -
    author: "CODER"
    body: "Start: seed projectPromise with already-resolved project in run-cli."
  -
    author: "CODER"
    body: "Verified: run-cli now seeds projectPromise from the initial resolved project, avoiding a second resolveProject call while preserving fallback/error mapping behavior."
events:
  -
    type: "status"
    at: "2026-02-11T05:08:45.541Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: seed projectPromise with already-resolved project in run-cli."
  -
    type: "status"
    at: "2026-02-11T05:09:44.736Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: run-cli now seeds projectPromise from the initial resolved project, avoiding a second resolveProject call while preserving fallback/error mapping behavior."
doc_version: 2
doc_updated_at: "2026-02-11T05:09:44.736Z"
doc_updated_by: "CODER"
description: "Reuse already resolved project in run-cli by seeding projectPromise from resolved result to avoid second resolveProject call."
id_source: "generated"
---
## Summary

Avoid duplicate `resolveProject` calls in `run-cli` by reusing the first resolved project result for deferred `getResolvedProject`/`getLoadedConfig` dependencies.

## Scope

In scope:
- `packages/agentplane/src/cli/run-cli.ts`

Out of scope:
- broader command loading refactors

## Plan

1. Seed `projectPromise` with already computed `resolved` value.
2. Keep error mapping behavior unchanged.
3. Validate with run-cli tests and full gates.

## Risks

- Risk: altered error path for commands requiring project.
Mitigation: keep fallback `resolveProject` path when pre-resolve is absent.

## Verification


## Rollback Plan

Revert the task commit to restore previous run-cli project resolution behavior.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`
- `bun run test:fast`
