---
id: "202602071634-YJ026P"
title: "AP-AGENTS-02: Require ISO timestamps in agent notes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "roadmap"
  - "agents"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:35:00.442Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T16:34:46.379Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T16:48:35.546Z"
  updated_by: "CODER"
  note: "Verified: Updated local and asset agent instructions to require ISO 8601 UTC timestamps with time when writing approval and verification notes; ran bun run test:cli:core (all tests passed)."
commit:
  hash: "75ea474185f46c43f0282b03e264fe6886c774d9"
  message: "✨ YJ026P agents: require ISO timestamps in notes"
comments:
  -
    author: "CODER"
    body: "Start: Update agent instructions to require ISO 8601 UTC timestamps (with time) when writing approval and verification notes."
  -
    author: "CODER"
    body: "Verified: Agent instructions now require ISO 8601 UTC timestamps with time for plan approval and verification notes, and the CLI core test suite passed."
doc_version: 2
doc_updated_at: "2026-02-07T16:48:44.340Z"
doc_updated_by: "CODER"
description: "Update agent instruction templates and local agent definitions to require ISO 8601 UTC timestamps (with time) in plan approval and verification notes."
id_source: "generated"
---
## Summary

Require ISO 8601 UTC timestamps (with time) in agent-authored plan approval and verification notes.

## Context

Task metadata notes sometimes used date-only strings (YYYY-MM-DD). We now normalize these in the migrator, but agents should also write notes in the canonical format to keep traceability consistent.

## Scope

- Update local agent definitions under `.agentplane/agents/*.json`.
- Update shipped templates under `packages/agentplane/assets/agents/*.json`.
- Ensure all added/modified text is English-only.

## Plan

1. Find agent instructions that mention plan approval / verification notes.
2. Add an explicit requirement:
   - Use ISO 8601 UTC timestamps with time, e.g. `2026-02-07T16:20:02.717Z`.
   - Avoid date-only values like `2026-02-07`.
3. Run `bun run test:cli:core`.

## Risks

- Overly strict wording could confuse agents that do not directly set plan approvals; keep the instruction scoped to when they do.

## Verification

- `bun run test:cli:core` passes.
- `rg` confirms the ISO requirement exists in both local and asset agent definitions.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T16:48:35.546Z — VERIFY — ok

By: CODER

Note: Verified: Updated local and asset agent instructions to require ISO 8601 UTC timestamps with time when writing approval and verification notes; ran bun run test:cli:core (all tests passed).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task.
