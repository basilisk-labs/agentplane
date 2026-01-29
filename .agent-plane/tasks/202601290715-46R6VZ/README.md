---
id: "202601290715-46R6VZ"
title: "AP-039: Redmine backend parity + enable recipe"
status: "DOING"
priority: "high"
owner: "REDMINE"
depends_on: ["202601271008-63G26Q", "202601290713-TACT48", "202601290714-VWQMR5"]
tags: ["roadmap", "nodejs", "redmine", "backend"]
verify: ["bun run ci"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: implement Redmine backend parity in Node + enable recipe." }
doc_version: 2
doc_updated_at: "2026-01-29T15:52:27+00:00"
doc_updated_by: "agentctl"
description: "Implement Redmine backend in core and enable via recipe; align with .env contract and offline init catalog."
---
## Summary

Implement Node task backend routing with Redmine parity, add backend sync CLI, and ship a Redmine recipe installer template.

## Scope

- Add task-backend abstraction (local + Redmine) with .env loading and tasks.json export\n- Route task/start/block/finish/verify/PR workflows through backend\n- Implement backend sync command\n- Add Redmine recipe assets/tool/scenario + index entry

## Risks

- Task workflow commands now depend on backend; regressions may affect local-only flows\n- Redmine API/field mismatches could surface during sync or export

## Verify Steps

- bun run ci

## Rollback Plan

- Revert the backend/CLI changes and the redmine recipe commit\n- Restore previous task command behavior and recipe index

