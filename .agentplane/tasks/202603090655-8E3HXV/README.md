---
id: "202603090655-8E3HXV"
title: "Document install-first remote backend setup and recovery"
result_summary: "Aligned remote backend setup and recovery docs with the projection-first install-first contract."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-09T07:52:19.264Z"
  updated_by: "DOCS"
  note: |-
    Verified install-first remote backend docs.
    - bun run docs:site:check
    - Reviewed updated setup, commands, troubleshooting, and Redmine operational wording for projection-first semantics.
commit:
  hash: "25d9061b58c1493266ccc33cf237cf66d11e6d0f"
  message: "📝 8E3HXV docs: align remote backend setup and recovery"
comments:
  -
    author: "DOCS"
    body: "Start: syncing install-first remote backend setup and recovery docs with the projection-first runtime contract."
  -
    author: "DOCS"
    body: "Verified: install-first remote backend setup, sync, export, and troubleshooting docs now use one projection-first model across user-facing pages."
events:
  -
    type: "status"
    at: "2026-03-09T07:50:40.933Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: syncing install-first remote backend setup and recovery docs with the projection-first runtime contract."
  -
    type: "verify"
    at: "2026-03-09T07:52:19.264Z"
    author: "DOCS"
    state: "ok"
    note: |-
      Verified install-first remote backend docs.
      - bun run docs:site:check
      - Reviewed updated setup, commands, troubleshooting, and Redmine operational wording for projection-first semantics.
  -
    type: "status"
    at: "2026-03-09T07:52:27.961Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: install-first remote backend setup, sync, export, and troubleshooting docs now use one projection-first model across user-facing pages."
doc_version: 3
doc_updated_at: "2026-03-09T07:52:27.961Z"
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
#### 2026-03-09T07:52:19.264Z — VERIFY — ok

By: DOCS

Note: Verified install-first remote backend docs.
- bun run docs:site:check
- Reviewed updated setup, commands, troubleshooting, and Redmine operational wording for projection-first semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T07:50:40.933Z, excerpt_hash=sha256:cf231cd6a04de7f8d67247fbe2cf2af5c8efd7fa992095108727638d440507eb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
