---
id: "202601301228-99W60R"
title: "Sync config.json format with code"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["config", "docs"]
doc_version: 2
doc_updated_at: "2026-01-30T12:29:12+00:00"
doc_updated_by: "agentctl"
description: "Align .agent-plane/config.json formatting with the canonical format used in code/specs."
---
## Summary

Align .agent-plane/config.json formatting and key ordering with the canonical example in code.

## Context

User requested syncing config format with code; use packages/spec/examples/config.json as canonical layout.

## Scope

- Reformat .agent-plane/config.json to match canonical ordering/structure.\n- Preserve existing values.

## Risks

- Reordering keys might obscure diffs for active branches.\n- Accidental value change would alter behavior; verify values stay the same.

## Verify Steps

- N/A (formatting-only change).

## Rollback Plan

- Revert .agent-plane/config.json to the previous revision.

