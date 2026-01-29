---
id: "202601290714-208EQK"
title: "AP-030: generate .agentplane/RECIPES.md"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-GGRDKD"]
tags: ["roadmap", "nodejs", "recipes"]
commit: { hash: "0c9aaf4c9339acadaf7444e5cc8a08c803c90ad5", message: "feat: 208EQK sync recipes index" }
comments:
  - { author: "CODER", body: "Start: generate RECIPES.md index and keep it in sync with recipe list output." }
  - { author: "CODER", body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: RECIPES.md index synced with recipe list output." }
doc_version: 2
doc_updated_at: "2026-01-29T09:49:05+00:00"
doc_updated_by: "agentctl"
description: "Generate RECIPES.md index after recipe install/remove and keep it in sync with recipe list output."
---
## Summary

Keep .agentplane/RECIPES.md in sync with recipe list output by centralizing index generation.

## Scope

- Add shared helpers to build/write RECIPES.md from recipes.lock.json.\n- Use the same summaries for recipe list output and RECIPES.md.\n- Add tests to ensure list syncs RECIPES.md when manifest summaries change.

## Risks

- recipe list now writes RECIPES.md; this adds a small IO side effect to a read-only command.\n- Missing/invalid manifests still degrade summaries; handled with a fallback string.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit(s) to restore previous recipe list/index behavior.

