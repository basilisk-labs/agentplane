---
id: "202603071440-XT4PAE"
title: "Rewrite quickstart as shortest agent path"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071440-WCAH98"
tags:
  - "code"
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
doc_updated_at: "2026-03-07T14:43:06.498Z"
doc_updated_by: "CODER"
description: "Refocus agentplane quickstart on the minimum command path agents need to start, verify, recover, and finish work."
id_source: "generated"
---
## Summary

Rewrite quickstart as the shortest useful agent path instead of a mixed catalog page.

## Scope

Update quickstart to foreground preflight, the canonical bootstrap path, and the smallest happy-path command set.

## Plan

1. Refactor quickstart renderer around bootstrap stages. 2. De-emphasize secondary command catalogs. 3. Ensure the output still fits terminal-first use.

## Risks

If too much detail is removed, quickstart may become less useful for humans; if too much remains, it stays noisy for agents.

## Verify Steps

1. Run CLI help/quickstart tests. 2. Regenerate startup docs if needed. 3. Confirm quickstart highlights the bootstrap path and direct finish semantics.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the previous quickstart renderer and regenerate derived docs if the new output fails tests or usability checks.
