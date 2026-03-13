---
id: "202603130558-T6CQV4"
title: "Teach release recovery to read release-ready artifacts"
result_summary: "Extended release recovery diagnostics to read the release-ready artifact model, covered the new state machine with script-level fixture tests, and updated the release/recovery docs for the new operator flow."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "code"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T05:58:22.159Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:18:28.572Z"
  updated_by: "CODER"
  note: "Verified artifact-aware release recovery: recovery script regressions, release-ready source tests, publish workflow contract test, eslint, and prettier all passed. The tool now treats release-ready artifacts as the canonical readiness source and separates missing-ready, ready-but-unpublished, already-published, and sibling-CI-failure states."
commit:
  hash: "95c58e2850a6ee542a36c7292459827f62232520"
  message: "🧭 T6CQV4 release: teach recovery about release-ready artifacts"
comments:
  -
    author: "CODER"
    body: "Verified: release recovery now treats the release-ready artifact as the canonical readiness source and reports missing-ready, ready-but-unpublished, already-published, and sibling Core CI failure states separately."
events:
  -
    type: "verify"
    at: "2026-03-13T06:18:28.572Z"
    author: "CODER"
    state: "ok"
    note: "Verified artifact-aware release recovery: recovery script regressions, release-ready source tests, publish workflow contract test, eslint, and prettier all passed. The tool now treats release-ready artifacts as the canonical readiness source and separates missing-ready, ready-but-unpublished, already-published, and sibling-CI-failure states."
  -
    type: "status"
    at: "2026-03-13T06:18:53.245Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: release recovery now treats the release-ready artifact as the canonical readiness source and reports missing-ready, ready-but-unpublished, already-published, and sibling Core CI failure states separately."
doc_version: 3
doc_updated_at: "2026-03-13T06:18:53.245Z"
doc_updated_by: "CODER"
description: "Extend release recovery/status tooling to classify missing release-ready artifacts separately from publish or sibling-CI states, using the new manifest as the canonical readiness source."
id_source: "generated"
---
## Summary

Teach release recovery to read release-ready artifacts

Extend release recovery/status tooling to classify missing release-ready artifacts separately from publish or sibling-CI states, using the new manifest as the canonical readiness source.

## Scope

- In scope: Extend release recovery/status tooling to classify missing release-ready artifacts separately from publish or sibling-CI states, using the new manifest as the canonical readiness source.
- Out of scope: unrelated refactors not required for "Teach release recovery to read release-ready artifacts".

## Plan

1. Extend release recovery/status diagnostics to read release-ready artifacts or report their absence explicitly. 2. Add state synthesis that distinguishes no release-ready artifact, publish succeeded, publish failed, and sibling Core CI failure. 3. Cover the new state model in tests and docs.

## Verify Steps

1. Run targeted tests for the updated release recovery/status diagnostics. Expected: the tool distinguishes release-ready-missing from publish/CI outcomes and uses the manifest as the canonical readiness source.
2. Run the updated recovery/status command on representative artifact fixtures. Expected: it prints an explicit state/cause/next-action summary for missing-ready vs published/failure cases.
3. Review the docs update. Expected: release and recovery docs describe the release-ready manifest model and the new operator actions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:18:28.572Z — VERIFY — ok

By: CODER

Note: Verified artifact-aware release recovery: recovery script regressions, release-ready source tests, publish workflow contract test, eslint, and prettier all passed. The tool now treats release-ready artifacts as the canonical readiness source and separates missing-ready, ready-but-unpublished, already-published, and sibling-CI-failure states.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T05:58:21.937Z, excerpt_hash=sha256:e41d8b0dd2df281bccb64bf310ba347e5f566a94e76f38ede462e36ed1adf656

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
