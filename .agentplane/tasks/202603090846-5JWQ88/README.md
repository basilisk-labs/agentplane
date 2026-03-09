---
id: "202603090846-5JWQ88"
title: "Publish 0.3.4 blog post and refine navbar chrome"
result_summary: "Published a new public release post for 0.3.4, backfilled 0.3.3 on the custom blog landing page, relaxed DESIGN to allow only minimal shell rounding, and updated the navbar chrome plus design checker accordingly."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T08:47:16.947Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: docs/frontend-only scope for release journal backfill, release-line ordering, and navbar contract polish."
verification:
  state: "ok"
  updated_at: "2026-03-09T08:52:41.899Z"
  updated_by: "DOCS"
  note: "docs:site:check passed; routing and doctor passed; release line on /blog is ordered 0.3.4 -> 0.3.3 -> 0.3.2 -> 0.3.1 -> 0.3.0; DESIGN and checker now allow only minimal shell rounding and the navbar chrome is rounder and more transparent."
commit:
  hash: "73204ed5170b0b07f0bc310eda4911a730187060"
  message: "📝 5JWQ88 website: publish 0.3.4 release notes and refine navbar"
comments:
  -
    author: "DOCS"
    body: "Verified: docs-site checks passed, the blog release line is newest-first from 0.3.4 down to 0.3.0, and the navbar chrome now uses a more transparent minimally rounded shell aligned with the updated design contract."
events:
  -
    type: "verify"
    at: "2026-03-09T08:52:41.899Z"
    author: "DOCS"
    state: "ok"
    note: "docs:site:check passed; routing and doctor passed; release line on /blog is ordered 0.3.4 -> 0.3.3 -> 0.3.2 -> 0.3.1 -> 0.3.0; DESIGN and checker now allow only minimal shell rounding and the navbar chrome is rounder and more transparent."
  -
    type: "status"
    at: "2026-03-09T08:53:47.209Z"
    author: "DOCS"
    from: "TODO"
    to: "DONE"
    note: "Verified: docs-site checks passed, the blog release line is newest-first from 0.3.4 down to 0.3.0, and the navbar chrome now uses a more transparent minimally rounded shell aligned with the updated design contract."
doc_version: 3
doc_updated_at: "2026-03-09T08:53:47.209Z"
doc_updated_by: "DOCS"
description: "Add a public 0.3.4 release post, update DESIGN.md to allow minimal rounding, make the navbar softer and more transparent, and reorder blog release entries from newest to oldest."
id_source: "generated"
---
## Summary

Publish 0.3.4 blog post and refine navbar chrome

Add a public 0.3.4 release post, update DESIGN.md to allow minimal rounding, make the navbar softer and more transparent, and reorder blog release entries from newest to oldest.

## Scope

- In scope: Add a public 0.3.4 release post, update DESIGN.md to allow minimal rounding, make the navbar softer and more transparent, and reorder blog release entries from newest to oldest.
- Out of scope: unrelated refactors not required for "Publish 0.3.4 blog post and refine navbar chrome".

## Plan

1. Add public release-journal entries for 0.3.3 and 0.3.4 using the formal release notes as source material, keeping the tone plain and operational.\n2. Update the custom blog landing page so the release line is ordered newest to oldest, with 0.3.4 first and 0.3.3 immediately below it.\n3. Relax the website design contract for minimal rounding, then update the navbar chrome to use a slightly rounded, lighter, more transparent shell without drifting into heavy glassmorphism.\n4. Run docs-site checks, record verification, and publish by pushing main.

## Verify Steps

1. Build the docs site. Expected: the website compiles cleanly after the new release entries, blog ordering change, and navbar styling update.
2. Review the custom blog landing page data and release posts. Expected: the visible 0.3.x release line is ordered 0.3.4, 0.3.3, 0.3.2, 0.3.1, 0.3.0.
3. Review the navbar styling and DESIGN.md contract together. Expected: minimal rounding is explicitly allowed and the navbar uses a softer, more transparent rounded shell without introducing broad card-style rounding across the site.
4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Expected: policy routing and repository health remain clean after the docs/frontend-only change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T08:52:41.899Z — VERIFY — ok

By: DOCS

Note: docs:site:check passed; routing and doctor passed; release line on /blog is ordered 0.3.4 -> 0.3.3 -> 0.3.2 -> 0.3.1 -> 0.3.0; DESIGN and checker now allow only minimal shell rounding and the navbar chrome is rounder and more transparent.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T08:47:16.983Z, excerpt_hash=sha256:537e898d386c7715cc2d9e2a6fcc1aa80d22c797d0810873c437a7cb58a4811c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
