---
id: "202603071745-T3QE04"
title: "Fix generated docs drift in release flow"
result_summary: "Release flow now regenerates and stages docs/reference/generated-reference.mdx after version bumps; regression coverage protects the path."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T17:46:14.098Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: eliminate the generated-reference drift from the release flow before continuing with new content publication."
verification:
  state: "ok"
  updated_at: "2026-03-07T17:52:50.780Z"
  updated_by: "CODER"
  note: "Release apply now regenerates and stages docs/reference/generated-reference.mdx after version bumps; release apply regression test passes; routing check remains green."
commit:
  hash: "41b3e1ae0acdd7a53f3652a748da87e57c9dbd44"
  message: "🐛 T3QE04 release: refresh generated reference during apply"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: trace the generated package-reference drift that surfaced after the 0.3.2 release, fix the release flow so it refreshes generated docs deterministically, and add regression coverage before the next release."
  -
    author: "CODER"
    body: "Verified: release apply now refreshes generated package-reference docs before creating the release commit, so post-release pre-push no longer discovers a stale docs/reference/generated-reference.mdx artifact."
events:
  -
    type: "status"
    at: "2026-03-07T17:46:19.019Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the generated package-reference drift that surfaced after the 0.3.2 release, fix the release flow so it refreshes generated docs deterministically, and add regression coverage before the next release."
  -
    type: "verify"
    at: "2026-03-07T17:52:50.780Z"
    author: "CODER"
    state: "ok"
    note: "Release apply now regenerates and stages docs/reference/generated-reference.mdx after version bumps; release apply regression test passes; routing check remains green."
  -
    type: "status"
    at: "2026-03-07T17:52:58.673Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply now refreshes generated package-reference docs before creating the release commit, so post-release pre-push no longer discovers a stale docs/reference/generated-reference.mdx artifact."
doc_version: 3
doc_updated_at: "2026-03-07T17:52:58.673Z"
doc_updated_by: "CODER"
description: "Ensure release apply or an earlier release gate keeps generated docs/reference/generated-reference.mdx in sync with bumped package versions so post-release pushes do not fail on regenerated docs drift."
id_source: "generated"
---
## Summary

Fix generated docs drift in release flow

Ensure release apply or an earlier release gate keeps generated docs/reference/generated-reference.mdx in sync with bumped package versions so post-release pushes do not fail on regenerated docs drift.

## Scope

- In scope: Ensure release apply or an earlier release gate keeps generated docs/reference/generated-reference.mdx in sync with bumped package versions so post-release pushes do not fail on regenerated docs drift..
- Out of scope: unrelated refactors not required for "Fix generated docs drift in release flow".

## Plan

1. Inspect why release pre-push regenerated docs/reference/generated-reference.mdx after the 0.3.2 bump. 2. Fix the release flow so generated package reference data is refreshed deterministically before or during release apply, instead of surfacing only on the post-release push. 3. Add regression coverage and verify the release gates no longer leave this docs drift behind.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T17:52:50.780Z — VERIFY — ok

By: CODER

Note: Release apply now regenerates and stages docs/reference/generated-reference.mdx after version bumps; release apply regression test passes; routing check remains green.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T17:46:19.019Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
