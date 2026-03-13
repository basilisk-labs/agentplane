---
id: "202603130558-VQWTGD"
title: "Switch auto-publish to workflow_run manifest-driven flow"
status: "DOING"
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
  updated_at: "2026-03-13T05:58:21.488Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:13:29.339Z"
  updated_by: "CODER"
  note: "Verified manifest-driven publish flow: workflow lint, prettier, eslint, the release-ready source resolver regressions, and the publish workflow contract test all passed. Auto-publish now starts from successful Core CI workflow_run only, consumes the release-ready artifact, and no longer uses the old polling gate."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: switch automatic publish from push-triggered detection to workflow_run after successful Core CI, and make both auto and manual publish paths consume the same release-ready artifact contract."
events:
  -
    type: "status"
    at: "2026-03-13T06:04:45.358Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch automatic publish from push-triggered detection to workflow_run after successful Core CI, and make both auto and manual publish paths consume the same release-ready artifact contract."
  -
    type: "verify"
    at: "2026-03-13T06:13:29.339Z"
    author: "CODER"
    state: "ok"
    note: "Verified manifest-driven publish flow: workflow lint, prettier, eslint, the release-ready source resolver regressions, and the publish workflow contract test all passed. Auto-publish now starts from successful Core CI workflow_run only, consumes the release-ready artifact, and no longer uses the old polling gate."
doc_version: 3
doc_updated_at: "2026-03-13T06:13:29.340Z"
doc_updated_by: "CODER"
description: "Move automatic npm publish off direct push triggers to workflow_run after successful Core CI, consume the release-ready artifact, and keep workflow_dispatch recovery on the same manifest contract."
id_source: "generated"
---
## Summary

Switch auto-publish to workflow_run manifest-driven flow

Move automatic npm publish off direct push triggers to workflow_run after successful Core CI, consume the release-ready artifact, and keep workflow_dispatch recovery on the same manifest contract.

## Scope

- In scope: Move automatic npm publish off direct push triggers to workflow_run after successful Core CI, consume the release-ready artifact, and keep workflow_dispatch recovery on the same manifest contract.
- Out of scope: unrelated refactors not required for "Switch auto-publish to workflow_run manifest-driven flow".

## Plan

1. Convert automatic publish from push-triggered detection to workflow_run on successful Core CI. 2. Make publish consume the release-ready artifact as its only readiness source and keep workflow_dispatch recovery on the same contract. 3. Remove the redundant in-workflow Core CI polling gate and add targeted regressions/docs updates.

## Verify Steps

1. Run workflow lint/static validation for the touched publish workflow paths. Expected: workflow syntax and command contracts stay valid.
2. Run targeted tests for the publish manifest-resolution path. Expected: auto-publish only proceeds from a successful Core CI workflow_run with a valid release-ready artifact, while recovery dispatch remains explicit.
3. Review the final workflow graph. Expected: auto-publish cannot start from a red or unrelated SHA, and workflow_dispatch uses the same manifest contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:13:29.339Z — VERIFY — ok

By: CODER

Note: Verified manifest-driven publish flow: workflow lint, prettier, eslint, the release-ready source resolver regressions, and the publish workflow contract test all passed. Auto-publish now starts from successful Core CI workflow_run only, consumes the release-ready artifact, and no longer uses the old polling gate.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:04:45.359Z, excerpt_hash=sha256:62a05ed42db9aad293800b2a417dc05cbea1112ea2f2abfabe6a2930c9a52b52

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
