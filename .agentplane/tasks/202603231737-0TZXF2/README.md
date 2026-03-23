---
id: "202603231737-0TZXF2"
title: "Make pre-push verification non-mutating"
result_summary: "hooks: non-mutating pre-push enforcement"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:30.079Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T18:41:41.271Z"
  updated_by: "CODER"
  note: "Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope."
commit:
  hash: "9db485fb59bcd526c656c612ce33e2da6bf2ae1b"
  message: "✅ 0TZXF2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: make pre-push read-only by replacing formatter writes with check-only enforcement and by tightening hook messaging around deterministic remediation."
  -
    author: "CODER"
    body: "Verified: Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope."
events:
  -
    type: "status"
    at: "2026-03-23T18:34:29.079Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make pre-push read-only by replacing formatter writes with check-only enforcement and by tightening hook messaging around deterministic remediation."
  -
    type: "verify"
    at: "2026-03-23T18:41:41.271Z"
    author: "CODER"
    state: "ok"
    note: "Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope."
  -
    type: "status"
    at: "2026-03-23T18:45:00.914Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope."
doc_version: 3
doc_updated_at: "2026-03-23T18:45:00.916Z"
doc_updated_by: "CODER"
description: "Replace formatter write behavior in pre-push with check-only enforcement and keep local CI gates read-only so push hooks never dirty the working tree."
sections:
  Summary: |-
    Make pre-push verification non-mutating
    
    Replace formatter write behavior in pre-push with check-only enforcement and keep local CI gates read-only so push hooks never dirty the working tree.
  Scope: |-
    - In scope: Replace formatter write behavior in pre-push with check-only enforcement and keep local CI gates read-only so push hooks never dirty the working tree.
    - Out of scope: unrelated refactors not required for "Make pre-push verification non-mutating".
  Plan: |-
    1. Change pre-push enforcement to check formatting instead of rewriting files so push hooks never mutate tracked content.
    2. Keep the local CI path read-only and tighten any post-CI mutation guards around generated artifacts.
    3. Update hook tests and docs so developers get a deterministic failure message with the exact remediation command instead of surprise formatter edits.
  Verify Steps: |-
    1. Trigger the pre-push hook in an isolated repo with formatting drift. Expected: the hook fails with a check-only message and does not rewrite tracked files.
    2. Run `node scripts/run-local-ci.mjs --mode fast` on a clean tree. Expected: the read-only gate passes without mutating tracked artifacts.
    3. Re-run `git push` against a clean branch. Expected: hook behavior remains deterministic and non-mutating.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T18:41:41.271Z — VERIFY — ok
    
    By: CODER
    
    Note: Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:34:29.080Z, excerpt_hash=sha256:464306183a2c7d3dc31252f97b0098fda0e500c99b505e2ec4a5e79696655bae
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make pre-push verification non-mutating

Replace formatter write behavior in pre-push with check-only enforcement and keep local CI gates read-only so push hooks never dirty the working tree.

## Scope

- In scope: Replace formatter write behavior in pre-push with check-only enforcement and keep local CI gates read-only so push hooks never dirty the working tree.
- Out of scope: unrelated refactors not required for "Make pre-push verification non-mutating".

## Plan

1. Change pre-push enforcement to check formatting instead of rewriting files so push hooks never mutate tracked content.
2. Keep the local CI path read-only and tighten any post-CI mutation guards around generated artifacts.
3. Update hook tests and docs so developers get a deterministic failure message with the exact remediation command instead of surprise formatter edits.

## Verify Steps

1. Trigger the pre-push hook in an isolated repo with formatting drift. Expected: the hook fails with a check-only message and does not rewrite tracked files.
2. Run `node scripts/run-local-ci.mjs --mode fast` on a clean tree. Expected: the read-only gate passes without mutating tracked artifacts.
3. Re-run `git push` against a clean branch. Expected: hook behavior remains deterministic and non-mutating.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T18:41:41.271Z — VERIFY — ok

By: CODER

Note: Made pre-push read-only by switching to format:check, added direct hook tests for formatting drift and post-CI mutation detection, and verified the hook contour with targeted vitest. A repo-wide docs:cli freshness blocker still fails unrelated fast-CI runs outside this task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:34:29.080Z, excerpt_hash=sha256:464306183a2c7d3dc31252f97b0098fda0e500c99b505e2ec4a5e79696655bae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
