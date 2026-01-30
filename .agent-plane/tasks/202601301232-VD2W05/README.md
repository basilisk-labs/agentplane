---
id: "202601301232-VD2W05"
title: "Unify config namespace formatting"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["config", "docs"]
doc_version: 2
doc_updated_at: "2026-01-30T12:33:39+00:00"
doc_updated_by: "agentctl"
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

