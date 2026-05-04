---
id: "202605041610-RPW8E0"
title: "Refresh active docs for v0.4 line"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T16:16:21.474Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T16:25:37.823Z"
  updated_by: "DOCS"
  note: "Command: rg -n active `0.3|active v0.3|v0.3 recipe|v0.3 vocabulary|0.3 stabilization|ADR 0011 is reserved|Lifecycle and close taxonomy v0.3 docs/developer docs/user. Result: pass. Evidence: no stale active-v0.3 wording remains in active developer/user docs. Command: bun run docs:site:typecheck. Result: pass. Command: bunx eslint scripts/check-docs-ia.mjs website/sidebars.ts website/src/data/homepage-content.ts. Result: pass. Command: git diff --check. Result: pass."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: refresh active documentation wording so current developer and user guidance describes the v0.4 line instead of old v0.3 stabilization."
events:
  -
    type: "status"
    at: "2026-05-04T16:17:46.860Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh active documentation wording so current developer and user guidance describes the v0.4 line instead of old v0.3 stabilization."
  -
    type: "verify"
    at: "2026-05-04T16:25:37.823Z"
    author: "DOCS"
    state: "ok"
    note: "Command: rg -n active `0.3|active v0.3|v0.3 recipe|v0.3 vocabulary|0.3 stabilization|ADR 0011 is reserved|Lifecycle and close taxonomy v0.3 docs/developer docs/user. Result: pass. Evidence: no stale active-v0.3 wording remains in active developer/user docs. Command: bun run docs:site:typecheck. Result: pass. Command: bunx eslint scripts/check-docs-ia.mjs website/sidebars.ts website/src/data/homepage-content.ts. Result: pass. Command: git diff --check. Result: pass."
doc_version: 3
doc_updated_at: "2026-05-04T16:25:37.830Z"
doc_updated_by: "DOCS"
description: "Update active architecture, topology, recipe, and lifecycle documentation so current guidance no longer describes v0.3 stabilization as active work."
sections:
  Summary: |-
    Refresh active docs for v0.4 line
    
    Update active architecture, topology, recipe, and lifecycle documentation so current guidance no longer describes v0.3 stabilization as active work.
  Scope: |-
    - In scope: Update active architecture, topology, recipe, and lifecycle documentation so current guidance no longer describes v0.3 stabilization as active work.
    - Out of scope: unrelated refactors not required for "Refresh active docs for v0.4 line".
  Plan: "1. Replace active v0.3 stabilization wording in architecture, recipe, lifecycle, and close-taxonomy pages with current v0.4 wording. 2. Fix stale ADR/topology cross-reference text that says ADR 0011 is reserved. 3. Preserve historical ADR/release context while making active guidance version-neutral or v0.4-current. 4. Verify with targeted grep, docs site typecheck, routing, and doctor."
  Verify Steps: |-
    1. Review the requested outcome for "Refresh active docs for v0.4 line". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T16:25:37.823Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: rg -n active `0.3|active v0.3|v0.3 recipe|v0.3 vocabulary|0.3 stabilization|ADR 0011 is reserved|Lifecycle and close taxonomy v0.3 docs/developer docs/user. Result: pass. Evidence: no stale active-v0.3 wording remains in active developer/user docs. Command: bun run docs:site:typecheck. Result: pass. Command: bunx eslint scripts/check-docs-ia.mjs website/sidebars.ts website/src/data/homepage-content.ts. Result: pass. Command: git diff --check. Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:46.860Z, excerpt_hash=sha256:cc4fcb6fc5824c4ac3ecc7fa1e64a9c3c5eb8603e6c20cb1422dd4ab58ea5bc1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh active docs for v0.4 line

Update active architecture, topology, recipe, and lifecycle documentation so current guidance no longer describes v0.3 stabilization as active work.

## Scope

- In scope: Update active architecture, topology, recipe, and lifecycle documentation so current guidance no longer describes v0.3 stabilization as active work.
- Out of scope: unrelated refactors not required for "Refresh active docs for v0.4 line".

## Plan

1. Replace active v0.3 stabilization wording in architecture, recipe, lifecycle, and close-taxonomy pages with current v0.4 wording. 2. Fix stale ADR/topology cross-reference text that says ADR 0011 is reserved. 3. Preserve historical ADR/release context while making active guidance version-neutral or v0.4-current. 4. Verify with targeted grep, docs site typecheck, routing, and doctor.

## Verify Steps

1. Review the requested outcome for "Refresh active docs for v0.4 line". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T16:25:37.823Z — VERIFY — ok

By: DOCS

Note: Command: rg -n active `0.3|active v0.3|v0.3 recipe|v0.3 vocabulary|0.3 stabilization|ADR 0011 is reserved|Lifecycle and close taxonomy v0.3 docs/developer docs/user. Result: pass. Evidence: no stale active-v0.3 wording remains in active developer/user docs. Command: bun run docs:site:typecheck. Result: pass. Command: bunx eslint scripts/check-docs-ia.mjs website/sidebars.ts website/src/data/homepage-content.ts. Result: pass. Command: git diff --check. Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:46.860Z, excerpt_hash=sha256:cc4fcb6fc5824c4ac3ecc7fa1e64a9c3c5eb8603e6c20cb1422dd4ab58ea5bc1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
