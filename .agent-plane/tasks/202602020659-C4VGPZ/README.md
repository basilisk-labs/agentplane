---
id: "202602020659-C4VGPZ"
title: "Init IDE selection: only chosen IDE installs rules"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["init"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: restrict init IDE prompt to Codex CLI default and ensure only selected IDE rules are installed (no cursor/windsurf leakage)." }
doc_version: 2
doc_updated_at: "2026-02-02T07:05:07+00:00"
doc_updated_by: "agentctl"
description: "Fix agentplane init prompt/options so default is Node (Codex CLI) and only the selected IDE entrypoints are installed."
---
## Summary

Limit init IDE selection to Codex default and install only the selected IDE’s rules; update ide sync to support targeted output and adjust tests/docs.

## Scope

Update init/IDE handling in run-cli.ts, refresh help usage, adjust CLI core tests, and add setup documentation note.

## Risks

Init no longer prompts for IDE selection; anyone relying on both Cursor/Windsurf rules on init must run agentplane ide sync explicitly.

## Verify Steps

bun run test:cli:core

## Rollback Plan

Revert the commit for 202602020659-C4VGPZ.

