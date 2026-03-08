---
id: "202603071741-5JFHXB"
title: "Refresh generated package reference for v0.3.2"
result_summary: "Generated package reference now matches 0.3.2 and no longer blocks the post-release push."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T17:41:32.031Z"
  updated_by: "ORCHESTRATOR"
  note: "Persisted the generated package reference so docs/reference/generated-reference.mdx now reflects 0.3.2 for agentplane and @agentplaneorg/core, removing the pre-push drift that blocked the post-release push."
commit:
  hash: "db5e9d75cc7c5a5ddcf9c427d5285b2bd7a83231"
  message: "📝 5JFHXB docs: refresh generated package reference for v0.3.2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: persist the generated-reference version bump to 0.3.2, commit the new docs task artifact, and then push the post-release plus next-cycle-preparation commits cleanly to origin/main."
  -
    author: "ORCHESTRATOR"
    body: "Verified: persisted the generated package reference drift after the 0.3.2 release so the repository can be pushed cleanly with versions reflected in the docs reference."
events:
  -
    type: "status"
    at: "2026-03-07T17:41:16.676Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: persist the generated-reference version bump to 0.3.2, commit the new docs task artifact, and then push the post-release plus next-cycle-preparation commits cleanly to origin/main."
  -
    type: "verify"
    at: "2026-03-07T17:41:32.031Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Persisted the generated package reference so docs/reference/generated-reference.mdx now reflects 0.3.2 for agentplane and @agentplaneorg/core, removing the pre-push drift that blocked the post-release push."
  -
    type: "status"
    at: "2026-03-07T17:41:36.970Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: persisted the generated package reference drift after the 0.3.2 release so the repository can be pushed cleanly with versions reflected in the docs reference."
doc_version: 3
doc_updated_at: "2026-03-07T17:41:36.970Z"
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

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T17:41:32.031Z — VERIFY — ok

By: ORCHESTRATOR

Note: Persisted the generated package reference so docs/reference/generated-reference.mdx now reflects 0.3.2 for agentplane and @agentplaneorg/core, removing the pre-push drift that blocked the post-release push.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T17:41:16.676Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
