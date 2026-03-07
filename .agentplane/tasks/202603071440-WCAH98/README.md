---
id: "202603071440-WCAH98"
title: "Create canonical agent bootstrap document"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-ZFZKKS"
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
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-07T14:43:05.770Z"
doc_updated_by: "DOCS"
description: "Add one canonical bootstrap document that every startup surface references instead of duplicating lifecycle instructions."
id_source: "generated"
---
## Summary

Create one canonical agent bootstrap document that startup surfaces can reference instead of restating lifecycle guidance.

## Scope

Add a concise user-facing bootstrap page covering start, task execution, verify, finish, and recovery pointers.

## Plan

1. Generate or author the canonical bootstrap doc from shared startup guidance. 2. Link it from gateway/docs. 3. Keep it short and task-oriented.

## Risks

If the document is not derived from shared guidance, drift will return quickly.

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

Remove the new page and references if it cannot be kept in sync with CLI surfaces.
