---
id: "202602111229-QJAPM7"
title: "Run release gate and publish next patch"
status: "DOING"
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
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: running release prepublish gate and publishing the next patch release after hardening checks."
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
doc_version: 2
doc_updated_at: "2026-02-11T12:43:48.056Z"
doc_updated_by: "TESTER"
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
