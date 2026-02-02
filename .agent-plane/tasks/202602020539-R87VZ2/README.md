---
id: "202602020539-R87VZ2"
title: "Init: restrict IDE selection to Codex CLI only"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["init"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: restrict init IDE choice to Codex CLI only; remove cursor/windsurf options; update prompts, tests, and docs; verify with full test run." }
doc_version: 2
doc_updated_at: "2026-02-02T05:39:32+00:00"
doc_updated_by: "agentctl"
description: "Limit init IDE prompt/options to Codex CLI only; disable cursor/windsurf/both for now; update docs/tests accordingly."
---
## Summary

Limit init IDE selection to Codex CLI only and remove other IDE options for now.

## Scope

Adjust init prompts/flags and IDE sync behavior to only support Codex CLI; update tests and docs accordingly.

## Risks

Users expecting Cursor/Windsurf rules will no longer get them; ensure messaging and flags are clear to avoid confusion.

## Verify Steps

bun run test:full

## Rollback Plan

Restore prior IDE prompt/options and IDE sync behavior; re-run tests.

