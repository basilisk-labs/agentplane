---
id: "202601301228-99W60R"
title: "Sync config.json format with code"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["config", "docs"]
verify: []
commit: { hash: "0e9d07c1b46118f7cb600143436ebc71b626b6a3", message: "✨ 99W60R sync config.json formatting with code" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: Formatting-only change | details: no automated tests run beyond pre-commit format/lint hooks." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:28.431Z"
doc_updated_by: "agentplane"
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
