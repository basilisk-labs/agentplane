---
id: "202601290715-0XACWT"
title: "AP-043: v1 documentation + breaking changes"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: ["202601290713-51T41E", "202601271401-Q2WSGM", "202601290714-GGRDKD", "202601290715-WJ0QVE"]
tags: ["roadmap", "docs"]
verify: []
commit: { hash: "2aab74b36ac7bc9cec0b28a3221d7e72cf820388", message: "✨ 0XACWT document v1 setup and breaking changes" }
comments:
  - { author: "DOCS", body: "Start: draft v1 Node-first docs + breaking changes overview and update relevant guides." }
  - { author: "DOCS", body: "verified: ran bun run ci on 2026-01-30 | details: all checks passed (format, typecheck, lint, coverage)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:19.863Z"
doc_updated_by: "agentplane"
description: "Write Node-first docs for install/init/modes/recipes/upgrade/redmine + breaking changes page."
---
## Summary

Document v1 Node-first usage, add breaking changes page, and update setup/commands for install, upgrade, recipes, and backend sync.


## Scope

- Add breaking changes page (v1 Node-first).
- Update docs index, setup, and commands for v1 install/upgrade/recipes/backend sync.
- Keep references aligned with ROADMAP v1.


## Risks

- Breaking changes might conflict with existing internal workflows; keep migration steps explicit.
- Docs should remain consistent with CLI contract and ROADMAP.


## Verify Steps

bun run ci


## Rollback Plan

Revert documentation updates and remove breaking-changes page if guidance is incorrect.
