---
id: "202603071745-T3QE04"
title: "Fix generated docs drift in release flow"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: trace the generated package-reference drift that surfaced after the 0.3.2 release, fix the release flow so it refreshes generated docs deterministically, and add regression coverage before the next release."
events:
  -
    type: "status"
    at: "2026-03-07T17:46:19.019Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the generated package-reference drift that surfaced after the 0.3.2 release, fix the release flow so it refreshes generated docs deterministically, and add regression coverage before the next release."
doc_version: 2
doc_updated_at: "2026-03-07T17:46:19.019Z"
doc_updated_by: "ORCHESTRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
