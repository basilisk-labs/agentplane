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
doc_updated_at: "2026-02-01T13:03:21+00:00"
doc_updated_by: "agentctl"
description: "Update agent startup to read config and CLI instructions before work begins, without printing contents to user; report only that data loaded."
---
## Summary

Verified the policy already requires loading config and CLI guidance silently (reporting only that they were loaded); no additional code changes needed.

## Scope

Policy review only (AGENTS.md and agent JSON guidance); no runtime code changes.

## Risks

If the policy is bypassed, agents could print config or guide contents; monitor preflight behavior.

## Verify Steps

Manual review of AGENTS.md and agent role guidance to confirm only load status is reported.

## Rollback Plan

None required (policy-only verification); revert guidance if behavior changes are introduced later.

