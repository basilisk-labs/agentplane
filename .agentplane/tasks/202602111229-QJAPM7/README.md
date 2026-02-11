---
id: "202602111229-QJAPM7"
title: "Run release gate and publish next patch"
result_summary: "Patch release v0.2.17 published successfully."
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
depends_on:
  - "202602111229-1217R7"
tags:
  - "release"
  - "npm"
  - "ci"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T12:43:48.049Z"
  updated_by: "TESTER"
  note: "Verified: release prepublish gate passed, v0.2.17 tag pushed, publish workflow succeeded, and npm now serves @agentplaneorg/core and agentplane at 0.2.17."
commit:
  hash: "26acfac7d5db916123b06370a627f5be3a0634d5"
  message: "✨ release: v0.2.17"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: running release prepublish gate and publishing the next patch release after hardening checks."
  -
    author: "INTEGRATOR"
    body: "Verified: executed release prepublish gate, generated notes for v0.2.17, applied release with push, observed successful Publish to npm workflow run 21905470910, and confirmed npm versions at 0.2.17."
events:
  -
    type: "status"
    at: "2026-02-11T12:37:37.116Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: running release prepublish gate and publishing the next patch release after hardening checks."
  -
    type: "verify"
    at: "2026-02-11T12:43:48.049Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: release prepublish gate passed, v0.2.17 tag pushed, publish workflow succeeded, and npm now serves @agentplaneorg/core and agentplane at 0.2.17."
  -
    type: "status"
    at: "2026-02-11T12:44:36.776Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: executed release prepublish gate, generated notes for v0.2.17, applied release with push, observed successful Publish to npm workflow run 21905470910, and confirmed npm versions at 0.2.17."
doc_version: 2
doc_updated_at: "2026-02-11T12:44:36.776Z"
doc_updated_by: "INTEGRATOR"
description: "Run local CI-equivalent gate and publish the next patch release after hardening changes land."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Run release prepublish gate. 2) Generate release plan for next patch. 3) Write release notes from plan changes. 4) Apply release with push. 5) Verify published versions.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T12:43:48.049Z — VERIFY — ok

By: TESTER

Note: Verified: release prepublish gate passed, v0.2.17 tag pushed, publish workflow succeeded, and npm now serves @agentplaneorg/core and agentplane at 0.2.17.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T12:37:37.116Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
