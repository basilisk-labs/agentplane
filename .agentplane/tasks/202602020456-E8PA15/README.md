---
id: "202602020456-E8PA15"
title: "Use agentplane CLI in installed agent templates"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents"]
verify: []
commit: { hash: "c9314757c69915c7c390dbafe19322effd70a038", message: "🔧 E8PA15 use agentplane CLI in agent templates: switch to .agentplane paths; update docs/tests" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: update installed agent templates to use system agentplane CLI and .agentplane paths; align docs/tests." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test:cli:core | details: pre-commit hooks ran prettier check, eslint, and bun run test:fast during commit." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test:cli:core | details: pre-commit hooks ran prettier check, eslint, and bun run test:fast during commit." }
doc_version: 2
doc_updated_at: "2026-02-02T04:56:24+00:00"
doc_updated_by: "agentctl"
description: "Update installed AGENTS.md and agent JSON templates to reference system 'agentplane' CLI and .agentplane paths; refresh docs/tests accordingly."
---
## Summary

Switch installed agent templates to use the system agentplane CLI and .agentplane paths; align docs/tests.

## Scope

Update packages/agentplane/assets/AGENTS.md and agents/*.json to reference agentplane CLI and .agentplane folder; refresh related docs/tests.

## Risks

Template changes may break tests that assert exact text; docs may already have pending edits.

## Verify Steps

Run bun run test:cli:core (and any template-related tests that fail).

## Rollback Plan

Revert template/doc/test changes to restore previous agentctl.py references if needed.
