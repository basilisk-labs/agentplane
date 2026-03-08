---
id: "202603081315-X7JEE2"
title: "Restore chronological release ordering in blog surfaces"
result_summary: "Release posts on the custom blog landing page now read from the earliest shipped version to the latest shipped version."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081315-E6P3T0"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:11:49.130Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:12:44.380Z"
  updated_by: "DOCS"
  note: "Verified: bun run docs:site:check passes, the custom blog landing page now lists release posts chronologically from 0.2.25 through 0.3.2, and the roadmap entry remains separate from the release line."
commit:
  hash: "36455810bd175d103c7b809636e3709db8222cac"
  message: "📝 X7JEE2 docs: restore chronological blog release order"
comments:
  -
    author: "DOCS"
    body: "Start: confirmed the custom blog landing page is the only surface that still keeps release posts in a non-chronological manual order; I will narrow the fix to that array, verify docs-site health, and leave unrelated navigation unchanged."
  -
    author: "DOCS"
    body: "Verified: docs-site checks pass, the custom blog landing page now shows release posts in chronological order from 0.2.25 through 0.3.2, and the roadmap entry remains outside the release line."
events:
  -
    type: "status"
    at: "2026-03-08T14:11:49.829Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: confirmed the custom blog landing page is the only surface that still keeps release posts in a non-chronological manual order; I will narrow the fix to that array, verify docs-site health, and leave unrelated navigation unchanged."
  -
    type: "verify"
    at: "2026-03-08T14:12:44.380Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: bun run docs:site:check passes, the custom blog landing page now lists release posts chronologically from 0.2.25 through 0.3.2, and the roadmap entry remains separate from the release line."
  -
    type: "status"
    at: "2026-03-08T14:13:26.128Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs-site checks pass, the custom blog landing page now shows release posts in chronological order from 0.2.25 through 0.3.2, and the roadmap entry remains outside the release line."
doc_version: 3
doc_updated_at: "2026-03-08T14:13:26.128Z"
doc_updated_by: "DOCS"
description: "Ensure release posts on the blog index and related navigation surfaces are ordered from earliest to latest so version 0.3 appears before 0.3.1 and 0.3.2 consistently."
id_source: "generated"
---
## Summary

- Problem: the custom blog landing page presents release posts in a manually curated order, so the release line is not consistently chronological.
- Target outcome: all release posts on the landing page read from the earliest shipped version to the latest shipped version.
- Constraint: keep the scope limited to the custom blog surface and do not change unrelated blog content or navigation behavior.

## Scope

### In scope
- reorder release entries on the custom `/blog` landing page
- keep the roadmap entry available without mixing it into the release chronology
- verify the docs site still builds cleanly after the reorder

### Out of scope
- rewriting blog post copy
- changing individual post content or frontmatter
- broader blog IA or visual redesign

## Plan

1. Audit the custom blog landing page and identify the release entries that are manually ordered.
2. Reorder release posts from the earliest shipped version to the latest shipped version while keeping the roadmap entry separate.
3. Run docs-site verification, record the result, and close the task with traceable commit metadata.

## Verify Steps

1. Open `website/src/pages/blog/index.tsx`. Expected: the release entries appear in chronological order from `0.2.25` to `0.3.2`.
2. Run `bun run docs:site:check`. Expected: the docs site builds and checks pass without blog-related regressions.
3. Review the rendered release list logic in the diff. Expected: the roadmap entry remains separate and the release line is no longer manually out of order.

## Rollback Plan

1. Revert the task commit that changes the blog entry order.
2. Re-run `bun run docs:site:check` to confirm the rollback restores the previous docs state.

## Findings

- Observation: the issue is isolated to the custom blog landing page entry array, not to Docusaurus global blog ordering.
  Impact: the fix can stay narrow and low-risk.
  Resolution: reorder only the manual release entries and keep the roadmap entry separate.
  Promotion: none

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:12:44.380Z — VERIFY — ok

By: DOCS

Note: Verified: bun run docs:site:check passes, the custom blog landing page now lists release posts chronologically from 0.2.25 through 0.3.2, and the roadmap entry remains separate from the release line.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:11:49.829Z, excerpt_hash=sha256:a5aa0cc0622ea3e0db685650ccca6601d9eee60b26a7c16b65996fa8fff206e0

<!-- END VERIFICATION RESULTS -->
