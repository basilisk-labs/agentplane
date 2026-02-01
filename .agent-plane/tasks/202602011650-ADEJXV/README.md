---
id: "202602011650-ADEJXV"
title: "Init renders AGENTS.md by workflow mode"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "init", "agents", "docs"]
doc_version: 2
doc_updated_at: "2026-02-01T17:12:58+00:00"
doc_updated_by: "agentctl"
description: "Verify agentplane init generates AGENTS.md and .agentplane/agents content matching root AGENTS.md, and make AGENTS.md assembly depend on direct vs branch_pr sections only."
---
## Summary

Bundle AGENTS.md and agent templates with agentplane and generate workflow-filtered AGENTS.md during init, with tests to verify parity.

## Scope

- Add bundled AGENTS.md/agents assets
- Filter AGENTS.md by workflow_mode during init
- Ensure init copies bundled agent templates
- Add/adjust tests for bundled templates and init output

## Risks

- Bundle/template drift if AGENTS.md changes without updating assets
- Longer CLI test runtime when running full run-cli.test.ts

## Verify Steps

- bun run test -- packages/agentplane/src/agents-template.test.ts
- bun run test -- packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert the commit for this task (or remove the new assets and helper module)
- Restore prior init behavior and tests

