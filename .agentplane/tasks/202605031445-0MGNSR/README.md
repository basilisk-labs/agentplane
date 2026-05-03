---
id: "202605031445-0MGNSR"
title: "Refresh recipes inventory after CMO close drift"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "docs"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T14:46:01.345Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T14:46:54.622Z"
  updated_by: "DOCS"
  note: "Regenerated docs/recipes-inventory.json from the current recipe tree; bun run docs:recipes:check passes."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: refresh stale recipes inventory so closure branches can pass the configured freshness gate."
events:
  -
    type: "status"
    at: "2026-05-03T14:46:12.748Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh stale recipes inventory so closure branches can pass the configured freshness gate."
  -
    type: "verify"
    at: "2026-05-03T14:46:54.622Z"
    author: "DOCS"
    state: "ok"
    note: "Regenerated docs/recipes-inventory.json from the current recipe tree; bun run docs:recipes:check passes."
doc_version: 3
doc_updated_at: "2026-05-03T14:46:54.625Z"
doc_updated_by: "DOCS"
description: "Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published."
sections:
  Summary: |-
    Refresh recipes inventory after CMO close drift
    
    Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.
  Scope: |-
    - In scope: Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.
    - Out of scope: unrelated refactors not required for "Refresh recipes inventory after CMO close drift".
  Plan: "Regenerate only docs/recipes-inventory.json from the current recipe tree, verify the recipes freshness check passes, then publish through branch_pr so CMO leaf close-tail branches can pass pre-push/CI without bypassing hooks."
  Verify Steps: |-
    1. Review the requested outcome for "Refresh recipes inventory after CMO close drift". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T14:46:54.622Z — VERIFY — ok
    
    By: DOCS
    
    Note: Regenerated docs/recipes-inventory.json from the current recipe tree; bun run docs:recipes:check passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:46:12.748Z, excerpt_hash=sha256:36736d7f17e00d6ae782c876912b3c922a988489dc86b0cc38a6a771bb7fd3b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: node scripts/generate-recipes-inventory.mjs && bun run docs:recipes:check; Result: pass; Evidence: docs/recipes-inventory.json is up to date after removing the stale llm-wiki recipe entry.
      Impact: The configured recipes inventory freshness gate no longer blocks publishing CMO leaf close-tail branches.
      Resolution: Commit the regenerated inventory and route it through branch_pr before retrying close branch publication.
id_source: "generated"
---
## Summary

Refresh recipes inventory after CMO close drift

Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.

## Scope

- In scope: Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.
- Out of scope: unrelated refactors not required for "Refresh recipes inventory after CMO close drift".

## Plan

Regenerate only docs/recipes-inventory.json from the current recipe tree, verify the recipes freshness check passes, then publish through branch_pr so CMO leaf close-tail branches can pass pre-push/CI without bypassing hooks.

## Verify Steps

1. Review the requested outcome for "Refresh recipes inventory after CMO close drift". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T14:46:54.622Z — VERIFY — ok

By: DOCS

Note: Regenerated docs/recipes-inventory.json from the current recipe tree; bun run docs:recipes:check passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:46:12.748Z, excerpt_hash=sha256:36736d7f17e00d6ae782c876912b3c922a988489dc86b0cc38a6a771bb7fd3b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: node scripts/generate-recipes-inventory.mjs && bun run docs:recipes:check; Result: pass; Evidence: docs/recipes-inventory.json is up to date after removing the stale llm-wiki recipe entry.
  Impact: The configured recipes inventory freshness gate no longer blocks publishing CMO leaf close-tail branches.
  Resolution: Commit the regenerated inventory and route it through branch_pr before retrying close branch publication.
