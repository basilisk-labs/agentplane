---
id: "202603241335-YFM5RK"
title: "Refresh recipes inventory after catalog approval-field removal"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "recipes"
  - "submodule"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:59:58.943Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T14:01:32.853Z"
  updated_by: "CODER"
  note: "ok: regenerated docs/recipes-inventory.json from submodule commit 021c99b, confirmed the legacy field is gone, and passed docs:recipes:check, routing, and doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: regenerate docs/recipes-inventory.json from the updated agentplane-recipes submodule pointer, keep the diff limited to the generated inventory, and rerun the freshness checks before closing."
events:
  -
    type: "status"
    at: "2026-03-24T14:00:29.244Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate docs/recipes-inventory.json from the updated agentplane-recipes submodule pointer, keep the diff limited to the generated inventory, and rerun the freshness checks before closing."
  -
    type: "verify"
    at: "2026-03-24T14:01:32.853Z"
    author: "CODER"
    state: "ok"
    note: "ok: regenerated docs/recipes-inventory.json from submodule commit 021c99b, confirmed the legacy field is gone, and passed docs:recipes:check, routing, and doctor."
doc_version: 3
doc_updated_at: "2026-03-24T14:01:32.863Z"
doc_updated_by: "CODER"
description: "Update the main repo submodule pointer and regenerate docs/recipes-inventory.json after the external catalog removes the legacy requires_human_approval field."
sections:
  Summary: |-
    Refresh recipes inventory after catalog approval-field removal
    
    Update the main repo submodule pointer and regenerate docs/recipes-inventory.json after the external catalog removes the legacy requires_human_approval field.
  Scope: |-
    - In scope: Update the main repo submodule pointer and regenerate docs/recipes-inventory.json after the external catalog removes the legacy requires_human_approval field.
    - Out of scope: unrelated refactors not required for "Refresh recipes inventory after catalog approval-field removal".
  Plan: "1. Update the main repo to the new agentplane-recipes submodule commit. 2. Regenerate docs/recipes-inventory.json from the synced catalog source and confirm the legacy field is gone. 3. Verify docs tooling, finish the task, and then push the updated refs."
  Verify Steps: |-
    1. Update the main repo submodule pointer and regenerate docs/recipes-inventory.json from the synced catalog source.
    2. Run node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs.
    3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T14:01:32.853Z — VERIFY — ok
    
    By: CODER
    
    Note: ok: regenerated docs/recipes-inventory.json from submodule commit 021c99b, confirmed the legacy field is gone, and passed docs:recipes:check, routing, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:01:32.294Z, excerpt_hash=sha256:046bbcfb3117831b566dfcc7b7f7a317464f68aa75cf7a03d7ae9e6fa63c2612
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Regenerated docs/recipes-inventory.json after updating the agentplane-recipes submodule pointer to 021c99b.
    2. The generated inventory no longer contains requires_human_approval and now matches the refreshed catalog snapshot exactly.
id_source: "generated"
---
## Summary

Refresh recipes inventory after catalog approval-field removal

Update the main repo submodule pointer and regenerate docs/recipes-inventory.json after the external catalog removes the legacy requires_human_approval field.

## Scope

- In scope: Update the main repo submodule pointer and regenerate docs/recipes-inventory.json after the external catalog removes the legacy requires_human_approval field.
- Out of scope: unrelated refactors not required for "Refresh recipes inventory after catalog approval-field removal".

## Plan

1. Update the main repo to the new agentplane-recipes submodule commit. 2. Regenerate docs/recipes-inventory.json from the synced catalog source and confirm the legacy field is gone. 3. Verify docs tooling, finish the task, and then push the updated refs.

## Verify Steps

1. Update the main repo submodule pointer and regenerate docs/recipes-inventory.json from the synced catalog source.
2. Run node scripts/generate-recipes-inventory.mjs and node scripts/check-recipes-inventory-fresh.mjs.
3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T14:01:32.853Z — VERIFY — ok

By: CODER

Note: ok: regenerated docs/recipes-inventory.json from submodule commit 021c99b, confirmed the legacy field is gone, and passed docs:recipes:check, routing, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:01:32.294Z, excerpt_hash=sha256:046bbcfb3117831b566dfcc7b7f7a317464f68aa75cf7a03d7ae9e6fa63c2612

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Regenerated docs/recipes-inventory.json after updating the agentplane-recipes submodule pointer to 021c99b.
2. The generated inventory no longer contains requires_human_approval and now matches the refreshed catalog snapshot exactly.
