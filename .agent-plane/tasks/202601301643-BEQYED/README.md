---
id: "202601301643-BEQYED"
title: "Ensure agents load config and CLI instructions silently on start"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "cli", "config", "workflow"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: Updating agent policy to load config and CLI instructions quietly before work begins." }
doc_version: 2
doc_updated_at: "2026-01-30T16:46:55+00:00"
doc_updated_by: "agentctl"
description: "Update agent startup to read config and CLI instructions before work begins, without printing contents to user; report only that data loaded."
---
## Summary

Updated agent policy to load config and CLI instructions at startup without exposing contents; report only load status.

## Scope

AGENTS.md preflight reporting updated; ORCHESTRATOR agent instruction aligned.

## Risks

Risk: reduced visibility into config values unless users request them explicitly.

## Verify Steps

No automated tests required. Verify in a dry run that preflight reports only load status and does not print config or CLI instruction contents.

## Rollback Plan

Revert AGENTS.md and ORCHESTRATOR.json to restore prior preflight reporting behavior.

