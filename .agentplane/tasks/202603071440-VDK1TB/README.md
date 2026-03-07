---
id: "202603071440-VDK1TB"
title: "Rewrite finish flow as direct-first narrative"
result_summary: "Rewrote finish guidance as a direct-first narrative."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-WCAH98"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:57:55.454Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: rewrite finish guidance around the direct-mode default."
verification:
  state: "ok"
  updated_at: "2026-03-07T15:00:37.336Z"
  updated_by: "REVIEWER"
  note: "Verified: direct-mode user and policy docs now describe finish auto-close as the default narrative and push explicit flags into exceptional handling only."
commit:
  hash: "d336a63eccb2cb36737cc79dbaa62ae7622b84cf"
  message: "📝 C201X2 docs: add recovery and direct-finish guidance"
comments:
  -
    author: "DOCS"
    body: "Start: rewrite finish guidance so direct-mode docs and policy surfaces treat auto-close as the default narrative rather than the explicit flag path."
  -
    author: "DOCS"
    body: "Verified: finish guidance now treats direct-mode auto-close as the default story across user docs and the direct workflow policy module."
events:
  -
    type: "status"
    at: "2026-03-07T14:57:55.819Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: rewrite finish guidance so direct-mode docs and policy surfaces treat auto-close as the default narrative rather than the explicit flag path."
  -
    type: "verify"
    at: "2026-03-07T15:00:37.336Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: direct-mode user and policy docs now describe finish auto-close as the default narrative and push explicit flags into exceptional handling only."
  -
    type: "status"
    at: "2026-03-07T15:00:37.980Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: finish guidance now treats direct-mode auto-close as the default story across user docs and the direct workflow policy module."
doc_version: 2
doc_updated_at: "2026-03-07T15:00:37.980Z"
doc_updated_by: "DOCS"
description: "Update docs and CLI guidance so the normal direct-mode finish path reflects auto-close semantics without legacy mental models."
id_source: "generated"
---
## Summary

Rewrite finish flow as direct-first narrative

Update docs and CLI guidance so the normal direct-mode finish path reflects auto-close semantics without legacy mental models.

## Scope

- In scope: Update docs and CLI guidance so the normal direct-mode finish path reflects auto-close semantics without legacy mental models..
- Out of scope: unrelated refactors not required for "Rewrite finish flow as direct-first narrative".

## Plan

1. Implement the change for "Rewrite finish flow as direct-first narrative".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

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
#### 2026-03-07T15:00:37.336Z — VERIFY — ok

By: REVIEWER

Note: Verified: direct-mode user and policy docs now describe finish auto-close as the default narrative and push explicit flags into exceptional handling only.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:57:55.819Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
