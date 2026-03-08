---
id: "202603061433-KWPVV9"
title: "Release agentplane 0.3.1"
result_summary: "Released agentplane 0.3.1 and @agentplaneorg/core 0.3.1 from commit 1be96fc4 with green CI and successful npm publication."
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:34:46.859Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-06T15:26:58.155Z"
  updated_by: "ORCHESTRATOR"
  note: "Release v0.3.1 published successfully: Core CI/Docs CI/Publish to npm all green for 1be96fc4; npm latest=0.3.1 for agentplane and @agentplaneorg/core; GitHub release v0.3.1 created."
commit:
  hash: "1be96fc47916b76925f9bc59ce7d24176216a87f"
  message: "📝 release: sync generated reference for v0.3.1"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: freeze v0.3.1 as the release target, write complete release notes for the post-v0.3.0 range, run the release gate, and publish through the standard release apply flow."
  -
    author: "ORCHESTRATOR"
    body: "Verified: v0.3.1 released, published to npm, and mirrored on GitHub Releases."
events:
  -
    type: "status"
    at: "2026-03-06T14:34:56.498Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: freeze v0.3.1 as the release target, write complete release notes for the post-v0.3.0 range, run the release gate, and publish through the standard release apply flow."
  -
    type: "verify"
    at: "2026-03-06T15:26:58.155Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Release v0.3.1 published successfully: Core CI/Docs CI/Publish to npm all green for 1be96fc4; npm latest=0.3.1 for agentplane and @agentplaneorg/core; GitHub release v0.3.1 created."
  -
    type: "status"
    at: "2026-03-06T15:27:11.039Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.1 released, published to npm, and mirrored on GitHub Releases."
doc_version: 3
doc_updated_at: "2026-03-06T15:27:11.039Z"
doc_updated_by: "ORCHESTRATOR"
description: "Prepare, validate, tag, and publish release 0.3.1 for agentplane and @agentplaneorg/core, including release notes, parity checks, push, and post-publish verification."
id_source: "generated"
---
## Summary

Ship patch release 0.3.1 for agentplane and @agentplaneorg/core, replacing the blocked 0.3.0 npm target with a clean publish that includes the post-v0.3.0 policy, docs, and website changes.

## Scope

- In scope: Prepare, validate, tag, and publish release 0.3.1 for agentplane and @agentplaneorg/core, including release notes, parity checks, push, and post-publish verification..
- Out of scope: unrelated refactors not required for "Release agentplane 0.3.1".

## Plan

Release plan: version=0.3.1, tag=v0.3.1, scope=all commits in .agentplane/.release/plan/2026-03-06T14-33-49-606Z since v0.3.0; write docs/releases/v0.3.1.md covering the full range, bump @agentplaneorg/core and agentplane to 0.3.1 with exact dependency parity, run bun run release:prepublish, then run agentplane release apply --push --yes and verify npm/GitHub publication evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T15:26:58.155Z — VERIFY — ok

By: ORCHESTRATOR

Note: Release v0.3.1 published successfully: Core CI/Docs CI/Publish to npm all green for 1be96fc4; npm latest=0.3.1 for agentplane and @agentplaneorg/core; GitHub release v0.3.1 created.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T14:34:56.498Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
