---
id: "202601290714-VWQMR5"
title: "AP-033: bundled offline recipes catalog for init"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-GGRDKD", "202601290713-51T41E"]
tags: ["roadmap", "nodejs", "recipes", "init"]
verify: []
commit: { hash: "3eda90d1ff88a4170a5ad81999b49cd2c26b5423", message: "feat: VWQMR5 bundled recipes" }
comments:
  - { author: "CODER", body: "Start: add bundled offline recipes catalog and init selection validation." }
  - { author: "CODER", body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: bundled recipes catalog used for init selection." }
doc_version: 2
doc_updated_at: "2026-01-29T11:44:46+00:00"
doc_updated_by: "agentctl"
description: "Bundle snapshot of official recipes into npm package and use it in init for offline recipe selection."
---
## Summary

Bundle an offline recipes catalog for init and validate selected recipes against it.

## Scope

- Add bundled recipes catalog data in @packages/agentplane/src/bundled-recipes.ts.\n- Use catalog for init prompts/validation without network.\n- Add tests for init recipe validation.

## Risks

- Bundled catalog can become stale if recipes evolve; requires periodic refresh.\n- Empty catalog means init cannot validate recipe ids.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit(s) and remove bundled catalog usage in init.
