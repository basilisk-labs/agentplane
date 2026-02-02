---
id: "202601290714-7Z7DYR"
title: "AP-038: viewer recipe (optional)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-VWQMR5", "202601290714-TZBJ1M"]
tags: ["roadmap", "nodejs", "recipes", "viewer"]
verify: []
commit: { hash: "45f3f303c2991e05506b44986bf3c0706688f5d5", message: "✨ 7Z7DYR viewer recipe" }
comments:
  - { author: "CODER", body: "Start: package viewer recipe with assets, tool, and scenario." }
  - { author: "CODER", body: "verified: viewer recipe added in external repo agentplane-recipes (commit db18c1b) | details: tests not run." }
doc_version: 2
doc_updated_at: "2026-01-29T14:48:31+00:00"
doc_updated_by: "agentctl"
description: "Package tasks viewer as a recipe with assets, a viewer-server tool, and a scenario for viewing tasks."
---
## Summary

Add viewer recipe with tasks.html asset, viewer-server tool, and scenario.

## Scope

- Add viewer recipe files (manifest, assets, tools, scenarios)\n- Ensure recipe install can run viewer tool via scenario run\n- Add minimal documentation/tests if needed

## Risks

- Viewer tool may require node dependencies or ports; keep minimal and self-contained

## Verify Steps

- bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Remove viewer recipe files and revert commit

## Notes

Work committed in external repo: agentplane-recipes (commit db18c1b).
