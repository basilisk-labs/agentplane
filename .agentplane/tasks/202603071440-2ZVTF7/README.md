---
id: "202603071440-2ZVTF7"
title: "Refactor docs IA around agent workflows"
result_summary: "The public docs IA now mirrors the agent workflow model across the docs landing page, Mintlify metadata, navbar, and sidebar navigation."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-WCAH98"
  - "202603071440-C201X2"
  - "202603071440-VDK1TB"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:31:30.348Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: refactor docs IA so website navigation mirrors the agent workflow model."
verification:
  state: "ok"
  updated_at: "2026-03-07T16:35:30.356Z"
  updated_by: "REVIEWER"
  note: "Verified: docs index, Mintlify metadata, navbar, sidebar, and website IA now all mirror the same start/task-work/upgrade-recovery/reference model."
commit:
  hash: "ddfa3f585f6fb9254874c18bfacc108f173ec05a"
  message: "🧭 2ZVTF7 docs: align agent-first onboarding IA"
comments:
  -
    author: "DOCS"
    body: "Start: reorganize docs navigation around start, task work, upgrade and recovery, reference, and release entrypoints."
  -
    author: "DOCS"
    body: "Verified: refactored the docs IA so index pages, Mintlify metadata, navbar, and sidebar all mirror the same workflow-oriented model."
events:
  -
    type: "status"
    at: "2026-03-07T16:31:30.471Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: reorganize docs navigation around start, task work, upgrade and recovery, reference, and release entrypoints."
  -
    type: "verify"
    at: "2026-03-07T16:35:30.356Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: docs index, Mintlify metadata, navbar, sidebar, and website IA now all mirror the same start/task-work/upgrade-recovery/reference model."
  -
    type: "status"
    at: "2026-03-07T16:35:30.606Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: refactored the docs IA so index pages, Mintlify metadata, navbar, and sidebar all mirror the same workflow-oriented model."
doc_version: 3
doc_updated_at: "2026-03-07T16:35:30.606Z"
doc_updated_by: "DOCS"
description: "Restructure site navigation around start, task work, upgrade, recovery, and release so the website mirrors the same agent-first model as CLI and gateway."
id_source: "generated"
---
## Summary

Refactor docs IA around agent workflows

Restructure site navigation around start, task work, upgrade, recovery, and release so the website mirrors the same agent-first model as CLI and gateway.

## Scope

- In scope: Restructure site navigation around start, task work, upgrade, recovery, and release so the website mirrors the same agent-first model as CLI and gateway..
- Out of scope: unrelated refactors not required for "Refactor docs IA around agent workflows".

## Plan

1. Audit current docs navigation and identify where start, task work, upgrade, recovery, and release live today. 2. Reorder docs IA and navbar/sidebar entry points to mirror the agent-first workflow. 3. Verify the website build and generated docs remain consistent after the IA rewrite.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T16:35:30.356Z — VERIFY — ok

By: REVIEWER

Note: Verified: docs index, Mintlify metadata, navbar, sidebar, and website IA now all mirror the same start/task-work/upgrade-recovery/reference model.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:31:30.471Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
