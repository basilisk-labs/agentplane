---
id: "202602101802-TSVKN2"
title: "Docs help: troubleshooting and glossary refresh"
result_summary: "Help docs reference backend sync instead of legacy sync commands."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602101802-RYE0E3"
tags:
  - "docs"
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
commit:
  hash: "848c8149b08d432a578bdb8e2c847e69e3fc39b8"
  message: "📝 TSVKN2 docs: update help for backend sync"
comments:
  -
    author: "DOCS"
    body: "Start: Refresh troubleshooting pages and glossary for current error modes, approvals, and common footguns."
  -
    author: "DOCS"
    body: "Verified: Updated help docs to replace legacy sync examples with the current backend sync command."
events:
  -
    type: "status"
    at: "2026-02-10T18:35:14.898Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Refresh troubleshooting pages and glossary for current error modes, approvals, and common footguns."
  -
    type: "status"
    at: "2026-02-10T18:36:34.715Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated help docs to replace legacy sync examples with the current backend sync command."
doc_version: 2
doc_updated_at: "2026-02-10T18:36:34.715Z"
doc_updated_by: "DOCS"
description: "Update troubleshooting pages and glossary for current error modes, approvals, and common footguns."
id_source: "generated"
---
## Summary

Refresh help docs to match current command names and common workflow failures (backend sync, upgrade artifacts, approvals).

## Scope

In-scope: docs/help/troubleshooting-by-symptom.mdx (and related help pages if they contain stale command names).

## Plan

1. Search help pages for outdated command names and examples.
2. Update examples to use the current command surface (backend sync).
3. Run formatting checks.

## Risks


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

Revert the commits for this task to restore prior help wording.
