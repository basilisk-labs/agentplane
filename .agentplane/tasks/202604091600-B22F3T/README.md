---
id: "202604091600-B22F3T"
title: "Expose explicit --base on finish for branch_pr closure"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T16:01:49.290Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T16:29:25.065Z"
  updated_by: "CODER"
  note: "Verified: targeted vitest, format:check, and docs:cli:check passed after regenerating CLI docs for finish --base output."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a real --base override to finish and wire it into branch_pr base validation so manual closeouts stop depending on pinned config only."
events:
  -
    type: "status"
    at: "2026-04-09T16:01:58.675Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a real --base override to finish and wire it into branch_pr base validation so manual closeouts stop depending on pinned config only."
  -
    type: "verify"
    at: "2026-04-09T16:23:56.300Z"
    author: "CODER"
    state: "ok"
    note: "Verified: target vitest and eslint passed; finish --close-commit accepts explicit --base and rejects blank overrides."
  -
    type: "verify"
    at: "2026-04-09T16:29:25.065Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted vitest, format:check, and docs:cli:check passed after regenerating CLI docs for finish --base output."
doc_version: 3
doc_updated_at: "2026-04-09T16:29:25.073Z"
doc_updated_by: "CODER"
description: "Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone."
sections:
  Summary: |-
    Expose explicit --base on finish for branch_pr closure
    
    Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.
  Scope: |-
    - In scope: Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.
    - Out of scope: unrelated refactors not required for "Expose explicit --base on finish for branch_pr closure".
  Plan: |-
    1. Implement the change for "Expose explicit --base on finish for branch_pr closure".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run targeted finish parsing and branch_pr lifecycle tests with an explicit --base override. Expected: finish accepts the flag and treats it as the validation target.
    2. Reproduce branch_pr closeout on the base checkout without a pinned base branch. Expected: finish succeeds when current branch matches --base and still rejects non-base branches.
    3. Run relevant lint/tests. Expected: existing finish flows remain unchanged when --base is omitted.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T16:23:56.300Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: target vitest and eslint passed; finish --close-commit accepts explicit --base and rejects blank overrides.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:58.691Z, excerpt_hash=sha256:72db7f1b6d4171c93bd616d92e42064470954f80c34cc125a36496bb287e797b
    
    ### 2026-04-09T16:29:25.065Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted vitest, format:check, and docs:cli:check passed after regenerating CLI docs for finish --base output.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.309Z, excerpt_hash=sha256:72db7f1b6d4171c93bd616d92e42064470954f80c34cc125a36496bb287e797b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expose explicit --base on finish for branch_pr closure

Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.

## Scope

- In scope: Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.
- Out of scope: unrelated refactors not required for "Expose explicit --base on finish for branch_pr closure".

## Plan

1. Implement the change for "Expose explicit --base on finish for branch_pr closure".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run targeted finish parsing and branch_pr lifecycle tests with an explicit --base override. Expected: finish accepts the flag and treats it as the validation target.
2. Reproduce branch_pr closeout on the base checkout without a pinned base branch. Expected: finish succeeds when current branch matches --base and still rejects non-base branches.
3. Run relevant lint/tests. Expected: existing finish flows remain unchanged when --base is omitted.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T16:23:56.300Z — VERIFY — ok

By: CODER

Note: Verified: target vitest and eslint passed; finish --close-commit accepts explicit --base and rejects blank overrides.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:58.691Z, excerpt_hash=sha256:72db7f1b6d4171c93bd616d92e42064470954f80c34cc125a36496bb287e797b

### 2026-04-09T16:29:25.065Z — VERIFY — ok

By: CODER

Note: Verified: targeted vitest, format:check, and docs:cli:check passed after regenerating CLI docs for finish --base output.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.309Z, excerpt_hash=sha256:72db7f1b6d4171c93bd616d92e42064470954f80c34cc125a36496bb287e797b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
