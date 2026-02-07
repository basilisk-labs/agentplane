---
id: "202601200924-1YRX4P"
title: "Orchestrator reads global bundle"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "agents"
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
  hash: "fd7b8cd355edd6c825de15c80511ceabeb28b3e7"
  message: "✅ 1YRX4P orchestrator: read global bundle"
comments: []
doc_version: 2
doc_updated_at: "2026-01-20T09:25:15+00:00"
doc_updated_by: "agentctl"
description: "Update ORCHESTRATOR workflow to read global bundle summary and per-recipe docs via recipes.py bundle show."
---
## Summary

Update ORCHESTRATOR workflow to read the global bundle summary and recipe details via CLI.

## Context

The orchestrator should explicitly load bundle summary and per-recipe docs before execution.

## Scope

- Update ORCHESTRATOR.json to call recipes.py bundle show --summary and --recipe when needed.

## Risks

Wording could imply implicit tool execution; maintain explicit confirmation requirement.

## Verify Steps

Review ORCHESTRATOR.json for updated instructions.

## Rollback Plan

Revert ORCHESTRATOR.json changes.

## Plan


## Verification
