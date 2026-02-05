---
id: "202601270756-V6CK4Q"
title: "AP-006: Project config (config.json) + validation + config show|set"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601270756-RMNY59", "202601270756-KREHV4"]
tags: ["nodejs", "config"]
verify: []
commit: { hash: "b7843363e7eae64f96f5344b3748075f00994992", message: "✨ V6CK4Q config: add core config loader/validator and cli config show|set" }
comments:
  - { author: "CODER", body: "Start: implementing .agentplane/config.json load/save+validation and wiring agentplane config show|set into the Node CLI stub." }
  - { author: "CODER", body: "verified: implemented .agentplane/config.json defaults+validation in @agentplane/core and wired agentplane config show | details: set (requires npm install+build to run)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:03.922Z"
doc_updated_by: "agentplane"
description: "Implement .agentplane/config.json read/write with defaults and schema validation, plus agentplane config show|set commands."
---
## Summary

Implement `.agentplane/config.json` defaults + schema validation and expose `agentplane config show|set`.

## Scope

- Define `config.json` schema in `packages/spec`.
- Implement config read/write:
  - merges defaults,
  - validates schema,
  - writes stable JSON formatting.
- Implement CLI:
  - `agentplane config show` (prints JSON)
  - `agentplane config set <path> <value>` (writes config)

## Risks

- Schema/format mismatches can cascade into guardrails and workflow behavior.
- `config set` must avoid clobbering unknown fields to keep forward-compat.

## Verify Steps

- `agentplane config show` prints valid JSON and includes defaulted fields.
- `agentplane config set workflow_mode direct` updates the file and still validates.
- Unit tests cover invalid config rejection.

## Rollback Plan

- Revert config read/write changes and keep config hard-coded until schema stabilizes.
