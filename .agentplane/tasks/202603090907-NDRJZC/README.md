---
id: "202603090907-NDRJZC"
title: "Refine docs shell spacing, icons, and sticky offsets"
result_summary: "Refined the docs shell so documentation pages have larger horizontal gutters, no decorative nav icons, no right-side subsection map, and a safer sticky offset under the navbar."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T09:08:16.577Z"
  updated_by: "ORCHESTRATOR"
  note: "Docs shell changes are concrete and verification is explicit."
verification:
  state: "ok"
  updated_at: "2026-03-09T09:11:44.905Z"
  updated_by: "DOCS"
  note: "docs:site:check passed; routing and doctor passed; docs shell now hides breadcrumb/sidebar icons, hides the right-side subsection map, widens horizontal gutters, and raises the sticky docs menu offset so it clears the navbar while scrolling."
commit:
  hash: "11e2c9abe457e546e29b8b7e5a1beb7e949e1a85"
  message: "🎨 NDRJZC website: tighten docs shell layout"
comments:
  -
    author: "DOCS"
    body: "Verified: docs-site checks passed, docs navigation icons were removed from the breadcrumb/sidebar shell, the right-side subsection map is hidden, and the sticky docs menu offset now clears the navbar while scrolling."
events:
  -
    type: "verify"
    at: "2026-03-09T09:11:44.905Z"
    author: "DOCS"
    state: "ok"
    note: "docs:site:check passed; routing and doctor passed; docs shell now hides breadcrumb/sidebar icons, hides the right-side subsection map, widens horizontal gutters, and raises the sticky docs menu offset so it clears the navbar while scrolling."
  -
    type: "status"
    at: "2026-03-09T09:12:14.503Z"
    author: "DOCS"
    from: "TODO"
    to: "DONE"
    note: "Verified: docs-site checks passed, docs navigation icons were removed from the breadcrumb/sidebar shell, the right-side subsection map is hidden, and the sticky docs menu offset now clears the navbar while scrolling."
doc_version: 3
doc_updated_at: "2026-03-09T09:12:14.503Z"
doc_updated_by: "DOCS"
description: "Remove decorative icons from docs navigation, widen horizontal gutters, hide right-side subsection map, and keep the docs menu from sliding under the navbar while scrolling."
id_source: "generated"
---
## Summary

Refine docs shell spacing, icons, and sticky offsets

Remove decorative icons from docs navigation, widen horizontal gutters, hide right-side subsection map, and keep the docs menu from sliding under the navbar while scrolling.

## Scope

- In scope: Remove decorative icons from docs navigation, widen horizontal gutters, hide right-side subsection map, and keep the docs menu from sliding under the navbar while scrolling.
- Out of scope: unrelated refactors not required for "Refine docs shell spacing, icons, and sticky offsets".

## Plan

1. Remove docs-shell icons from breadcrumbs and sidebar category labels while keeping collapse affordances intact. 2. Increase left and right gutters for documentation pages, hide the right-side subsection map, and raise the sticky docs shell offset so it clears the navbar during scroll. 3. Run docs-site checks plus routing and doctor, then record verification and push main.

## Verify Steps

1. Build the docs site. Expected: documentation pages compile cleanly after shell layout and navigation styling changes.
2. Review the docs shell styles. Expected: breadcrumb/sidebar icons are hidden, the right-side subsection map is hidden, and horizontal gutters are visibly larger.
3. Review sticky docs navigation behavior in CSS. Expected: docs sidebar/top shell offset clears the navbar instead of sliding under it during scroll.
4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Expected: both pass cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T09:11:44.905Z — VERIFY — ok

By: DOCS

Note: docs:site:check passed; routing and doctor passed; docs shell now hides breadcrumb/sidebar icons, hides the right-side subsection map, widens horizontal gutters, and raises the sticky docs menu offset so it clears the navbar while scrolling.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T09:08:10.435Z, excerpt_hash=sha256:87e0d0f8e55bbd1636b1a535f8a8a60ce5b1ca76da5177084a358d8a34d32a49

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
