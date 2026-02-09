---
id: "202602091522-FHPGXT"
title: "init: remove legacy module/class fields from backend stubs"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "init"
  - "backend"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:22:48.527Z"
doc_updated_by: "CODER"
description: "Update init backend.json stub templates to include only id/version/settings (remove legacy module/class fields that are ignored)."
id_source: "generated"
---
## Summary

Remove legacy module/class fields from generated backend stubs; keep backend.json stubs aligned with the actual loader contract (id/version/settings).

## Scope

packages/agentplane/src/cli/run-cli/commands/init/* backend stub writer and related tests.

## Plan

1. Update backend stub templates to remove module/class.\n2. Update docs/tests that assert stub contents.\n3. bun run lint + bun run test:full.

## Risks

Low risk; only affects generated defaults. Existing user configs with legacy fields remain accepted/ignored.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit; stubs return to previous shape.
