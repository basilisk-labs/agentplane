---
id: "202601200924-REXHR8"
title: "Connect agents to global bundle"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202601200924-JRZ9CZ"
  - "202601200924-1YRX4P"
tags:
  - "recipes"
  - "workflow"
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
  hash: "fd7b8cd355edd6c825de15c80511ceabeb28b3e7"
  message: "✅ 1YRX4P orchestrator: read global bundle"
comments: []
doc_version: 2
doc_updated_at: "2026-01-20T09:25:24+00:00"
doc_updated_by: "agentctl"
description: "Ensure agents/orchestrator read the global recipes bundle via CLI summary and per-recipe docs."
---
## Summary

Connect agents to the global recipes bundle via CLI summary and per-recipe views.

## Context

Agents need a standard discovery path for available recipes and detailed docs.

## Scope

- Add bundle read guidance to AGENTS.md and RECIPES.md.
- Update ORCHESTRATOR workflow to read bundle summary and per-recipe docs.

## Risks

Docs could be misread as implicit execution; keep explicit confirmation language.

## Verify Steps

Review AGENTS.md, RECIPES.md, and ORCHESTRATOR.json for consistency.

## Rollback Plan

Revert docs and workflow changes.

## Plan


## Verification
