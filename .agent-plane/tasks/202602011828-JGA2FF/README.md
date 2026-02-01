---
id: "202602011828-JGA2FF"
title: "Align agentplane init AGENTS.md generation with templates and workflow mode"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["init", "agents", "docs"]
doc_version: 2
doc_updated_at: "2026-02-01T18:29:21+00:00"
doc_updated_by: "agentctl"
description: "Ensure agentplane init writes AGENTS.md and agent files exactly matching current templates; include only direct or branch_pr sections in AGENTS.md based on selection."
---
## Summary

Audit and fix agentplane init to render AGENTS.md and agent JSON files from current templates, filtering workflow-specific blocks for direct/branch_pr.

## Scope

- Locate init/template sources for AGENTS.md and agent files.
- Ensure init output matches current template text exactly.
- Filter AGENTS.md content by workflow mode (direct/branch_pr) at init.
- Add/adjust tests for init output parity.

## Risks

- Template drift between assets and runtime rendering could require updating multiple files.
- Filtering may accidentally drop shared rules if sections are not clearly delimited.

## Verify Steps

- bun run test:cli:core
- bun run test:cli:scenario

## Rollback Plan

- Revert changes to init/template rendering and related tests.
- Restore previous AGENTS.md/agent templates if needed.

