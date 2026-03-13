---
id: "202603130527-23J8VB"
title: "Block auto-publish when Core CI is red on release SHA"
result_summary: "Added an explicit GitHub Actions status gate to publish.yml, documented the contract, and covered the helper/script path with targeted tests."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "code"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T05:28:42.673Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T05:43:36.277Z"
  updated_by: "CODER"
  note: "Verified workflow gate: publish.yml now waits for green Core CI on the exact release SHA; targeted status-gate tests, workflow lint, eslint, and prettier checks passed."
commit:
  hash: "5e5ed913a417196023e5c25b987d7b3ee0c5df01"
  message: "🛡️ 23J8VB release: gate publish on green core-ci"
comments:
  -
    author: "CODER"
    body: "Start: add an explicit Core CI status gate ahead of auto-publish for release SHAs, keep workflow_dispatch recovery usable, and back the new check with deterministic tests instead of workflow-only shell glue."
  -
    author: "CODER"
    body: "Verified: publish workflow now blocks on a non-green Core CI run for the exact release SHA before npm steps can execute."
events:
  -
    type: "status"
    at: "2026-03-13T05:37:51.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit Core CI status gate ahead of auto-publish for release SHAs, keep workflow_dispatch recovery usable, and back the new check with deterministic tests instead of workflow-only shell glue."
  -
    type: "verify"
    at: "2026-03-13T05:43:36.277Z"
    author: "CODER"
    state: "ok"
    note: "Verified workflow gate: publish.yml now waits for green Core CI on the exact release SHA; targeted status-gate tests, workflow lint, eslint, and prettier checks passed."
  -
    type: "status"
    at: "2026-03-13T05:43:58.604Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish workflow now blocks on a non-green Core CI run for the exact release SHA before npm steps can execute."
doc_version: 3
doc_updated_at: "2026-03-13T05:43:58.604Z"
doc_updated_by: "CODER"
description: "Prevent npm publication for a release commit unless the corresponding Core CI run for that exact SHA completed successfully; keep workflow_dispatch recovery available."
id_source: "generated"
---
## Summary

Block auto-publish when Core CI is red on release SHA

Prevent npm publication for a release commit unless the corresponding Core CI run for that exact SHA completed successfully; keep workflow_dispatch recovery available.

## Scope

- In scope: Prevent npm publication for a release commit unless the corresponding Core CI run for that exact SHA completed successfully; keep workflow_dispatch recovery available.
- Out of scope: unrelated refactors not required for "Block auto-publish when Core CI is red on release SHA".

## Plan

1. Change automatic npm publish so it only proceeds when the exact release SHA has a successful Core CI result.
2. Keep workflow_dispatch recovery usable for already-tagged or manually repaired refs.
3. Add regression coverage or deterministic checks for the gating logic and record evidence.

## Verify Steps

1. Run workflow/static validation for the touched release workflows. Expected: workflow syntax and command contracts stay valid.
2. Run targeted tests for the new publish-gating logic. Expected: publish is blocked when Core CI is not green for the release SHA, while recovery dispatch remains possible.
3. Review the final workflow path. Expected: auto-publish cannot race ahead of a red Core CI run on the same commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T05:43:36.277Z — VERIFY — ok

By: CODER

Note: Verified workflow gate: publish.yml now waits for green Core CI on the exact release SHA; targeted status-gate tests, workflow lint, eslint, and prettier checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T05:37:51.966Z, excerpt_hash=sha256:27bd00554452501b73349ffa0b5b7721425883445151b2e03b79084c39c9bcdc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
