---
id: "202603061433-KWPVV9"
title: "Release agentplane 0.3.1"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: freeze v0.3.1 as the release target, write complete release notes for the post-v0.3.0 range, run the release gate, and publish through the standard release apply flow."
events:
  -
    type: "status"
    at: "2026-03-06T14:34:56.498Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: freeze v0.3.1 as the release target, write complete release notes for the post-v0.3.0 range, run the release gate, and publish through the standard release apply flow."
doc_version: 2
doc_updated_at: "2026-03-06T14:34:56.498Z"
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
