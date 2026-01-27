---
id: "202601270943-DEBAMR"
title: "AP-007: Implement workflow mode get/set"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["nodejs", "cli", "config", "roadmap"]
verify: ["bun run ci"]
comments:
  - { author: "CODER", body: "Start: AP-007 implement agentplane mode get|set backed by .agentplane/config.json." }
  - { author: "CODER", body: "Start: implementing mode get/set CLI commands and wiring to config workflow_mode." }
doc_version: 2
doc_updated_at: "2026-01-27T09:43:43+00:00"
doc_updated_by: "agentctl"
description: "Implement workflow_mode as part of config and expose it via agentplane mode get|set <direct|branch_pr>, with tests and docs."
---
## Summary

Implement AP-007: expose workflow_mode via agentplane mode get|set <direct|branch_pr> and persist it in .agentplane/config.json.

## Scope

- Add `agentplane mode get`
- Add `agentplane mode set <direct|branch_pr>` with validation
- Update help/docs to reflect the new namespace
- Add unit/e2e-style tests for CLI behavior

## Risks

- Incorrect mode values must be rejected with stable exit codes and json error format.
- Mode switching later must not lose tasks/workflow state; this task only persists the config value.

## Verify Steps

- `bun run ci`
- `agentplane mode get` prints `direct` by default
- `agentplane mode set branch_pr` persists config and prints the new mode

## Rollback Plan

- Revert commits; remove `mode` command handling and docs references
- Existing config remains valid (workflow_mode field already supported)

