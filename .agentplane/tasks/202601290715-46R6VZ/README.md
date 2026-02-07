---
id: "202601290715-46R6VZ"
title: "AP-039: Redmine backend parity + enable recipe"
status: "DONE"
priority: "high"
owner: "REDMINE"
depends_on:
  - "202601271008-63G26Q"
  - "202601290713-TACT48"
  - "202601290714-VWQMR5"
tags:
  - "roadmap"
  - "nodejs"
  - "redmine"
  - "backend"
verify:
  - "bun run ci"
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
  hash: "6ba183351f98c0f2931deaf3084f19d34c608007"
  message: "✨ 46R6VZ normalize redmine priority"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement Redmine backend parity in Node + enable recipe."
  -
    author: "REDMINE"
    body: "verified: Redmine backend parity and recipe enablement completed | details: CI agentplane, build, and full sandbox Redmine flow (new/list/show/doc/start/block/verify/finish/push/pull) passed; full bun run ci currently fails on coverage thresholds."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:20.148Z"
doc_updated_by: "agentplane"
description: "Implement Redmine backend in core and enable via recipe; align with .env contract and offline init catalog."
---
## Summary

Implemented Node.js Redmine backend parity, backend sync routing, and Redmine recipe installer; validated full CLI flows (new/list/show/doc/start/block/verify/finish) plus push/pull sync against sandbox Redmine.

## Scope

- Task backend abstraction (local + Redmine) with .env loading and tasks.json export
- Route task/start/block/finish/verify/PR workflows through backend
- Backend sync command and Redmine cache support
- Redmine recipe assets/tool/scenario + index entry
- Fix Redmine sync params and normalize priority mapping

## Risks

- Backend routing changes can affect local-only workflows if config or cache paths are wrong
- Redmine field IDs or status mapping mismatches can drop metadata or mislabel status
- Network issues require offline cache + explicit sync to avoid stale state

## Verify Steps

- bun run ci:agentplane
- bun run build
- Full Redmine flow via built CLI: task new/list/show/doc set/start/block/verify/finish
- backend sync redmine --direction push
- backend sync redmine --direction pull
- bun run ci (fails due to global coverage thresholds in repo)

## Rollback Plan

- Revert the backend/CLI changes and the redmine recipe commit\n- Restore previous task command behavior and recipe index

## Notes

Redmine sandbox smoke tasks created: 202601291651-9D0NT9 (push test), 202601291655-EKSR2G (full flow).

## Plan


## Verification
