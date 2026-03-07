---
id: "202603071710-Y4YT4P"
title: "Layer CLI help surfaces"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071710-EKJZW1"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:45:03.650Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: shorten quickstart first-screen output and push deeper details into role/help/reference surfaces."
events:
  -
    type: "status"
    at: "2026-03-07T19:45:10.627Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: shorten quickstart first-screen output and push deeper details into role/help/reference surfaces."
doc_version: 2
doc_updated_at: "2026-03-07T19:45:10.627Z"
doc_updated_by: "DOCS"
description: "Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces."
id_source: "generated"
---
## Summary

Layer CLI help surfaces

Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces.

## Scope

- In scope: Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces..
- Out of scope: unrelated refactors not required for "Layer CLI help surfaces".

## Plan

1. Shorten renderQuickstart() so the first screen contains only the canonical bootstrap pointer, preflight, one minimal direct route, and explicit pointers to deeper role/help/reference surfaces instead of duplicating the full bootstrap doc. 2. Move any detailed or exceptional guidance that no longer belongs on the first screen into role-oriented or on-demand help references, keeping the quickstart narrative layered rather than flat. 3. Update targeted CLI help tests, run the command-guide and run-cli quickstart checks, rebuild agentplane, and verify that the shorter quickstart still points agents to the right deeper surfaces.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `docs`

### Checks
1. `bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts`
2. `bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts`
3. `bun run --filter=agentplane build`

### Evidence / Commands
- Record whether quickstart became shorter while still pointing to role, help, bootstrap, and reference surfaces.

### Pass criteria
- The first-screen quickstart is shorter than before and no longer restates the full bootstrap structure.
- Detailed and exceptional paths are discoverable through role/help/reference surfaces.
- Targeted CLI tests and build pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Keep the first quickstart screen intentionally short; do not re-expand it with fallback flags or commit-format detail.
- Prefer pointers to role/help/reference surfaces over inline duplication.
- Do not break quickstart JSON output or the canonical bootstrap link.
