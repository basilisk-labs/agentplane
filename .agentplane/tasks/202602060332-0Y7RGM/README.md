---
id: "202602060332-0Y7RGM"
title: "AP-BR-06 Stabilize task README formatting"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T05:17:43.269Z"
  updated_by: "USER"
  note: "Approved to stabilize README formatting with tests."
verification:
  state: "ok"
  updated_at: "2026-02-07T05:47:43.319Z"
  updated_by: "ORCHESTRATOR"
  note: "bun run test:core and bun run test:agentplane passed; event rendering/export covered."
commit:
  hash: "99427994db0b756fc7bf93a8fb73e4e1de261823"
  message: "✨ KYXD2V tasks: append-only task events"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: README formatting stabilized with deterministic event rendering and export behavior; tests are green."
doc_version: 2
doc_updated_at: "2026-02-07T05:49:29.661Z"
doc_updated_by: "ORCHESTRATOR"
description: "Optional: centralize task README formatting (frontmatter order, newlines, section normalization) in core to reduce diff noise. Include tests and docs if implemented."
id_source: "generated"
---
## Summary

Stabilized task README formatting by adding deterministic rendering for append-only events and optional export behavior.

## Scope

Core task README rendering and export formatting; docs mention append-only events.

## Plan

1) Audit task README formatting noise and current renderer.
2) Implement stable formatting in core (frontmatter order/newlines/sections) with tests.
3) Update docs if needed and verify.

## Risks

Low; events remain optional to avoid breaking older tasks.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T05:47:43.319Z — VERIFY — ok

By: ORCHESTRATOR

Note: bun run test:core and bun run test:agentplane passed; event rendering/export covered.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
