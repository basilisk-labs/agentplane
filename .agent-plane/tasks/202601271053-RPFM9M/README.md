---
id: "202601271053-RPFM9M"
title: "Mintlify docs.json: add colors + minimal design"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs", "mintlify"]
commit: { hash: "8f308f4e0d0cb84223b3238874668095466cecf2", message: "✨ RPFM9M mintlify: add colors + minimal design settings" }
comments:
  - { author: "DOCS", body: "Start: Update Mintlify docs/docs.json (colors, navigation schema, minimal theme assets)." }
  - { author: "DOCS", body: "verified: docs/docs.json now has required colors.primary + schema-compliant navigation.groups | details: logo/favicon added; bun run ci passed (pre-commit)." }
doc_version: 2
doc_updated_at: "2026-01-27T10:56:18+00:00"
doc_updated_by: "agentctl"
description: "Fix Mintlify validation by adding required colors + valid navigation schema to docs/docs.json, and add minimal branding assets (logo + favicon)."
---
## Summary

Make Mintlify docs/docs.json pass schema validation (colors + navigation schema) and add minimal branding assets.

## Scope

- Update `docs/docs.json`:
  - add required `colors.primary`
  - switch `navigation` to schema-compliant `navigation.groups`
  - add minimal `logo` + `favicon` + `topbarLinks`
- Add minimal SVG assets under `docs/assets/`

## Risks

- Mintlify may require additional keys depending on project structure; adjust after preview if new schema errors appear.

## Verify Steps

- Run Mintlify preview/build and confirm `docs/docs.json` no longer reports validation errors (colors/navigation).
- Confirm logo + favicon render and navigation sidebar groups appear.

## Rollback Plan

- Revert the commit for this task to restore the previous docs/docs.json and remove docs/assets SVGs.

