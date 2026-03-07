---
id: "202603071715-P3T5FT"
title: "Release agentplane 0.3.2"
result_summary: "Released v0.3.2 and confirmed npm publication plus green CI on the release SHA."
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T17:15:37.370Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: ship the intermediate 0.3.2 patch release first, then resume the next-release roadmap."
verification:
  state: "ok"
  updated_at: "2026-03-07T17:35:44.726Z"
  updated_by: "ORCHESTRATOR"
  note: "Released v0.3.2 from 8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98; Core CI, Docs CI, Publish to npm, and Pages Deploy all succeeded, and npm now serves agentplane@0.3.2 plus @agentplaneorg/core@0.3.2."
commit:
  hash: "8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98"
  message: "✨ release: v0.3.2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: cut v0.3.2 from the current stable mainline, verify publication, and only then continue with the next release-preparation roadmap."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Released v0.3.2 from 8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98 with green GitHub workflows, published npm packages, and a GitHub Release for v0.3.2."
events:
  -
    type: "status"
    at: "2026-03-07T17:15:37.988Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: cut v0.3.2 from the current stable mainline, verify publication, and only then continue with the next release-preparation roadmap."
  -
    type: "verify"
    at: "2026-03-07T17:35:44.726Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Released v0.3.2 from 8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98; Core CI, Docs CI, Publish to npm, and Pages Deploy all succeeded, and npm now serves agentplane@0.3.2 plus @agentplaneorg/core@0.3.2."
  -
    type: "status"
    at: "2026-03-07T17:35:44.807Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Released v0.3.2 from 8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98 with green GitHub workflows, published npm packages, and a GitHub Release for v0.3.2."
doc_version: 2
doc_updated_at: "2026-03-07T17:35:44.807Z"
doc_updated_by: "ORCHESTRATOR"
description: "Cut a patch release for the framework-checkout repo-local handoff, recent agent-first docs alignment, and related runtime ergonomics already landed on main."
id_source: "generated"
---
## Summary

Release agentplane 0.3.2

Cut a patch release for the framework-checkout repo-local handoff, recent agent-first docs alignment, and related runtime ergonomics already landed on main.

## Scope

- In scope: Cut a patch release for the framework-checkout repo-local handoff, recent agent-first docs alignment, and related runtime ergonomics already landed on main..
- Out of scope: unrelated refactors not required for "Release agentplane 0.3.2".

## Plan

1. Generate the patch release plan from v0.3.1 and draft docs/releases/v0.3.2.md from the actual landed changes. 2. Run release gates, apply the release, and push commit plus tag so GitHub publish can ship 0.3.2. 3. Verify npm/GitHub publication, then return to the next-release roadmap and start the first post-0.3.2 preparation task.

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
#### 2026-03-07T17:35:44.726Z — VERIFY — ok

By: ORCHESTRATOR

Note: Released v0.3.2 from 8ffbebd27d5fa6dcf906b1781f8fe2d0030c6c98; Core CI, Docs CI, Publish to npm, and Pages Deploy all succeeded, and npm now serves agentplane@0.3.2 plus @agentplaneorg/core@0.3.2.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T17:15:37.988Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
