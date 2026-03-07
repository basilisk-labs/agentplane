---
id: "202603071440-ESTVFV"
title: "Trim AGENTS gateway to bootstrap-first structure"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-ZFZKKS"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:43:11.267Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: bootstrap-doc agent-first cleanup batch."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-07T14:43:04.971Z"
doc_updated_by: "DOCS"
description: "Keep AGENTS.md as a compact gateway that points agents to the canonical bootstrap path without duplicate workflow prose."
id_source: "generated"
---
## Summary

Trim AGENTS.md into a cleaner bootstrap-first gateway without duplicating lower-level guidance.

## Scope

Keep AGENTS compact, preserve routing and command contracts, and point all startup reading toward the canonical bootstrap doc.

## Plan

1. Remove startup duplication from AGENTS where possible. 2. Preserve command contracts and routing. 3. Add a single reference to the canonical bootstrap doc.

## Risks

Gateway edits can break routing assumptions or line-budget constraints.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the previous gateway wording if the new structure weakens routing clarity or fails policy checks.
