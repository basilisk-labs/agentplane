---
id: "202603071440-WCAH98"
title: "Create canonical agent bootstrap document"
result_summary: "Published the canonical generated agent bootstrap document."
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
  updated_at: "2026-03-07T14:54:58.475Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: canonical bootstrap doc follows the shared bootstrap contract."
verification:
  state: "ok"
  updated_at: "2026-03-07T14:55:05.893Z"
  updated_by: "REVIEWER"
  note: "Verified: docs/user/agent-bootstrap.generated.mdx is generated from shared CLI bootstrap source and matches the enforced drift check."
commit:
  hash: "aed6d519fbe50ff428d5fc81e8d6d2566dfa2e98"
  message: "✨ ZFZKKS docs: unify agent bootstrap surfaces"
comments:
  -
    author: "DOCS"
    body: "Start: publish the canonical bootstrap document from the shared startup contract so quickstart and docs can point to one source."
  -
    author: "DOCS"
    body: "Verified: the canonical bootstrap page is now generated from shared CLI bootstrap source and linked from startup-facing docs surfaces."
events:
  -
    type: "status"
    at: "2026-03-07T14:54:58.733Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: publish the canonical bootstrap document from the shared startup contract so quickstart and docs can point to one source."
  -
    type: "verify"
    at: "2026-03-07T14:55:05.893Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: docs/user/agent-bootstrap.generated.mdx is generated from shared CLI bootstrap source and matches the enforced drift check."
  -
    type: "status"
    at: "2026-03-07T14:55:17.745Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the canonical bootstrap page is now generated from shared CLI bootstrap source and linked from startup-facing docs surfaces."
doc_version: 2
doc_updated_at: "2026-03-07T14:55:17.745Z"
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
#### 2026-03-07T14:55:05.893Z — VERIFY — ok

By: REVIEWER

Note: Verified: docs/user/agent-bootstrap.generated.mdx is generated from shared CLI bootstrap source and matches the enforced drift check.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:54:58.733Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the new page and references if it cannot be kept in sync with CLI surfaces.
