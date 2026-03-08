---
id: "202603081422-QMHF8T"
title: "Refocus blog release surface on the 0.3.x line"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081422-FFKF4E"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:42:08.664Z"
  updated_by: "ORCHESTRATOR"
  note: "Primary blog release line must start at 0.3.0 and keep 0.2.25 accessible separately."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: adjust the blog landing page so the primary release line begins with 0.3.0 and earlier releases move to a secondary surface."
events:
  -
    type: "status"
    at: "2026-03-08T14:42:14.325Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust the blog landing page so the primary release line begins with 0.3.0 and earlier releases move to a secondary surface."
doc_version: 3
doc_updated_at: "2026-03-08T14:43:10.147Z"
doc_updated_by: "DOCS"
description: "Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line."
id_source: "generated"
---
## Summary

Refocus blog release surface on the 0.3.x line

Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line.

## Scope

- In scope: Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line.
- Out of scope: unrelated refactors not required for "Refocus blog release surface on the 0.3.x line".

## Plan

1. Split the custom /blog landing page into a primary 0.3.x release line and a separate earlier-releases surface.
2. Keep 0.3.0 -> 0.3.1 -> 0.3.2 in chronological order on the main release line while preserving access to 0.2.25 and roadmap materials.
3. Run site checks, record verification, and close the task with a scoped commit.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: the site builds successfully and the design-language check passes.
2. Review `website/src/pages/blog/index.tsx`. Expected: the primary release line starts at 0.3.0 and proceeds through 0.3.1 and 0.3.2 in order.
3. Review the same page for secondary links. Expected: 0.2.25 remains accessible outside the primary 0.3.x line, alongside roadmap/archive context.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
