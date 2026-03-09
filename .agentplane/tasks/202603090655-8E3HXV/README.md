---
id: "202603090655-8E3HXV"
title: "Document install-first remote backend setup and recovery"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T07:50:28.897Z"
  updated_by: "ORCHESTRATOR"
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
    body: "Start: syncing install-first remote backend setup and recovery docs with the projection-first runtime contract."
events:
  -
    type: "status"
    at: "2026-03-09T07:50:40.933Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: syncing install-first remote backend setup and recovery docs with the projection-first runtime contract."
doc_version: 3
doc_updated_at: "2026-03-09T07:50:40.933Z"
doc_updated_by: "DOCS"
description: "Update user and developer docs so remote backends are explained as first-class install-first flows with explicit projection, sync, and snapshot semantics."
id_source: "generated"
---
## Summary

Document install-first remote backend setup and recovery

Update user and developer docs so remote backends are explained as first-class install-first flows with explicit projection, sync, and snapshot semantics.

## Scope

- In scope: Update user and developer docs so remote backends are explained as first-class install-first flows with explicit projection, sync, and snapshot semantics.
- Out of scope: unrelated refactors not required for "Document install-first remote backend setup and recovery".

## Plan

1. Audit user-facing backend setup and troubleshooting docs for local-only or remote-first assumptions that still contradict projection-first install semantics.
2. Update the minimum docs surfaces so Redmine and other remote backends are described through the same source/projection/sync/snapshot model used by the CLI.
3. Verify the docs site and close the task once install-first setup and recovery guidance is internally consistent.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: install-first backend docs build cleanly and keep navigation/examples consistent.
2. Review updated backend setup and troubleshooting pages. Expected: remote backends are described through explicit projection, sync, and snapshot semantics without stale cache-fallback wording.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
