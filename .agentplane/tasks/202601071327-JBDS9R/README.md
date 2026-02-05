---
id: "202601071327-JBDS9R"
title: "Reduce snapshot references in agent instructions"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["agents", "docs"]
verify: []
commit: { hash: "7d60d437aba09ecb77ccfa5f895c0401b7479a6c", message: "🧰 JBDS9R reduce snapshot mentions: centralize export rules in AGENTS; remove snapshot wording from agent roles; simplify export references" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:34.625Z"
doc_updated_by: "agentplane"
description: "Minimize repeated snapshot mentions across AGENTS.md and agent JSONs by centralizing the rule and pointing to agentctl.md for details; keep only a single explicit 'do not edit snapshot' rule."
---
## Summary

- Centralized snapshot/export rules in @AGENTS.md.
- Removed snapshot wording from agent role specs, relying on agentctl guidance.
- Simplified workflow wording to avoid repeated export references.

## Goal

- Keep snapshot handling centralized with a single explicit rule and agentctl references.

## Scope

- @AGENTS.md
- @.agent-plane/agents/*.json

## Risks

- Low: reduced wording may require cross-check if new docs add snapshot references.

## Verify Steps

- None (doc/instruction changes only).

## Rollback Plan

- Revert commit `7d60d437aba0`.
