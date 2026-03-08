---
id: "202603071440-ESTVFV"
title: "Trim AGENTS gateway to bootstrap-first structure"
result_summary: "Trimmed the gateway to a bootstrap-first startup structure."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-ZFZKKS"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:43:11.267Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: bootstrap-doc agent-first cleanup batch."
verification:
  state: "ok"
  updated_at: "2026-03-07T14:55:05.672Z"
  updated_by: "REVIEWER"
  note: "Verified: AGENTS startup guidance now points to the canonical bootstrap doc and no longer advertises stale direct close semantics in the task lifecycle block."
commit:
  hash: "aed6d519fbe50ff428d5fc81e8d6d2566dfa2e98"
  message: "✨ ZFZKKS docs: unify agent bootstrap surfaces"
comments:
  -
    author: "DOCS"
    body: "Start: tighten the policy gateway so it points to the shared bootstrap path without restating lower-level workflow prose."
  -
    author: "DOCS"
    body: "Verified: AGENTS now stays a compact gateway and routes startup reading to the canonical bootstrap doc instead of duplicating lower-level lifecycle prose."
events:
  -
    type: "status"
    at: "2026-03-07T14:54:58.600Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten the policy gateway so it points to the shared bootstrap path without restating lower-level workflow prose."
  -
    type: "verify"
    at: "2026-03-07T14:55:05.672Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: AGENTS startup guidance now points to the canonical bootstrap doc and no longer advertises stale direct close semantics in the task lifecycle block."
  -
    type: "status"
    at: "2026-03-07T14:55:17.474Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS now stays a compact gateway and routes startup reading to the canonical bootstrap doc instead of duplicating lower-level lifecycle prose."
doc_version: 3
doc_updated_at: "2026-03-07T14:55:17.474Z"
doc_updated_by: "DOCS"
description: "Keep AGENTS.md as a compact gateway that points agents to the canonical bootstrap path without duplicate workflow prose."
id_source: "generated"
---
## Summary

Trim AGENTS.md into a cleaner bootstrap-first gateway without duplicating lower-level guidance.

## Scope

Keep AGENTS compact, preserve routing and command contracts, and point all startup reading toward the canonical bootstrap doc.

## Plan

1. Remove startup duplication from AGENTS where possible. 2. Preserve command contracts and routing. 3. Add a single reference to the canonical bootstrap doc.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T14:55:05.672Z — VERIFY — ok

By: REVIEWER

Note: Verified: AGENTS startup guidance now points to the canonical bootstrap doc and no longer advertises stale direct close semantics in the task lifecycle block.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:54:58.600Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the previous gateway wording if the new structure weakens routing clarity or fails policy checks.

## Findings


## Risks

Gateway edits can break routing assumptions or line-budget constraints.
