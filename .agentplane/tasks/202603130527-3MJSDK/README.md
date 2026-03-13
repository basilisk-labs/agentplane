---
id: "202603130527-3MJSDK"
title: "Add GitHub-aware release recovery status diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T05:28:42.900Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T05:54:17.647Z"
  updated_by: "CODER"
  note: "Verified GitHub-aware release recovery diagnostics: the recovery script now distinguishes publish-success from sibling Core CI failure for the same release SHA, the text-mode command output is explicit, and the release/troubleshooting docs document --check-github."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add GitHub-aware release recovery diagnostics keyed to the release apply SHA so publish-success and sibling Core CI failure are reported as distinct states."
events:
  -
    type: "status"
    at: "2026-03-13T05:45:34.139Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add GitHub-aware release recovery diagnostics keyed to the release apply SHA so publish-success and sibling Core CI failure are reported as distinct states."
  -
    type: "verify"
    at: "2026-03-13T05:54:17.647Z"
    author: "CODER"
    state: "ok"
    note: "Verified GitHub-aware release recovery diagnostics: the recovery script now distinguishes publish-success from sibling Core CI failure for the same release SHA, the text-mode command output is explicit, and the release/troubleshooting docs document --check-github."
doc_version: 3
doc_updated_at: "2026-03-13T05:54:17.648Z"
doc_updated_by: "CODER"
description: "Teach release recovery/status tooling and docs to distinguish publish success from sibling CI failure on the same release SHA so operators do not rerun publish unnecessarily."
id_source: "generated"
---
## Summary

Add GitHub-aware release recovery status diagnostics

Teach release recovery/status tooling and docs to distinguish publish success from sibling CI failure on the same release SHA so operators do not rerun publish unnecessarily.

## Scope

- In scope: Teach release recovery/status tooling and docs to distinguish publish success from sibling CI failure on the same release SHA so operators do not rerun publish unnecessarily.
- Out of scope: unrelated refactors not required for "Add GitHub-aware release recovery status diagnostics".

## Plan

1. Extend release recovery/status diagnostics with GitHub workflow awareness for release SHA state.
2. Expose the distinction between publish success and sibling CI failure in operator-facing output and docs.
3. Add targeted tests and record verification evidence.

## Verify Steps

1. Run targeted tests for the new release recovery/status diagnostics. Expected: the tool distinguishes publish success from sibling CI failure for the same release SHA.
2. Run the updated recovery/status command on a representative release state. Expected: it prints an explicit state/cause/next-action summary instead of ambiguous publish-failure wording.
3. Review the docs update. Expected: release and recovery docs describe the new state model and correct operator action.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T05:54:17.647Z — VERIFY — ok

By: CODER

Note: Verified GitHub-aware release recovery diagnostics: the recovery script now distinguishes publish-success from sibling Core CI failure for the same release SHA, the text-mode command output is explicit, and the release/troubleshooting docs document --check-github.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T05:45:34.139Z, excerpt_hash=sha256:9b9447cc4aa1033062200f5f62365cbcf4a71f0c236ff433255b022c5d26f087

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
