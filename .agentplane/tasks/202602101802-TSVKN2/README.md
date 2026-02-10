---
id: "202602101802-TSVKN2"
title: "Docs help: troubleshooting and glossary refresh"
status: "DOING"
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
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Refresh troubleshooting pages and glossary for current error modes, approvals, and common footguns."
events:
  -
    type: "status"
    at: "2026-02-10T18:35:14.898Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Refresh troubleshooting pages and glossary for current error modes, approvals, and common footguns."
doc_version: 2
doc_updated_at: "2026-02-10T18:35:59.107Z"
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
