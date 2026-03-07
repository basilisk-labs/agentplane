---
id: "202603071741-5JFHXB"
title: "Refresh generated package reference for v0.3.2"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T17:41:12.523Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: persist the generated reference drift from the 0.3.2 version bump and then push main cleanly."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: persist the generated-reference version bump to 0.3.2, commit the new docs task artifact, and then push the post-release plus next-cycle-preparation commits cleanly to origin/main."
events:
  -
    type: "status"
    at: "2026-03-07T17:41:16.676Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: persist the generated-reference version bump to 0.3.2, commit the new docs task artifact, and then push the post-release plus next-cycle-preparation commits cleanly to origin/main."
doc_version: 2
doc_updated_at: "2026-03-07T17:41:16.676Z"
doc_updated_by: "ORCHESTRATOR"
description: "Pre-push regenerated docs/reference/generated-reference.mdx after the 0.3.2 version bump. Persist that generated docs drift so main can be pushed cleanly after the 0.3.2 release and next-cycle roadmap commits."
id_source: "generated"
---
## Summary

Refresh generated package reference for v0.3.2

Pre-push regenerated docs/reference/generated-reference.mdx after the 0.3.2 version bump. Persist that generated docs drift so main can be pushed cleanly after the 0.3.2 release and next-cycle roadmap commits.

## Scope

- In scope: Pre-push regenerated docs/reference/generated-reference.mdx after the 0.3.2 version bump. Persist that generated docs drift so main can be pushed cleanly after the 0.3.2 release and next-cycle roadmap commits..
- Out of scope: unrelated refactors not required for "Refresh generated package reference for v0.3.2".

## Plan

1. Persist the generated docs/reference/generated-reference.mdx update so package versions reflect 0.3.2. 2. Commit only that generated docs drift plus the new task README. 3. Push main cleanly after the post-release and next-cycle preparation commits.

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
