---
id: "202602111036-1WABSX"
title: "Apply and publish patch release"
result_summary: "Release commit/tag pushed and both npm packages are available at 0.2.14."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
depends_on:
  - "202602111036-WTAN7Z"
tags:
  - "release"
  - "npm"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T10:38:53.785Z"
  updated_by: "ORCHESTRATOR"
  note: "Publish task plan approved"
verification:
  state: "ok"
  updated_at: "2026-02-11T10:42:10.429Z"
  updated_by: "TESTER"
  note: "Release applied and published"
commit:
  hash: "bcefec5633c2d0c2f4275bdba59b708782f0afa5"
  message: "✅ 1WABSX task: release was applied, pushed, and published successfully with matching npm versions and a successful GitHub publish workflow run"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: apply patch release, push release commit/tag, and confirm publication trigger"
  -
    author: "INTEGRATOR"
    body: "Verified: release was applied, pushed, and published successfully with matching npm versions and a successful GitHub publish workflow run"
events:
  -
    type: "status"
    at: "2026-02-11T10:38:51.790Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: apply patch release, push release commit/tag, and confirm publication trigger"
  -
    type: "verify"
    at: "2026-02-11T10:42:10.429Z"
    author: "TESTER"
    state: "ok"
    note: "Release applied and published"
  -
    type: "status"
    at: "2026-02-11T10:42:22.665Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release was applied, pushed, and published successfully with matching npm versions and a successful GitHub publish workflow run"
doc_version: 2
doc_updated_at: "2026-02-11T10:42:22.962Z"
doc_updated_by: "INTEGRATOR"
description: "Apply release plan, publish packages to npm, push commit/tag to origin, and verify published versions."
id_source: "generated"
---
## Summary

Apply v0.2.14 release artifacts, push to origin, and confirm package publication path.

## Scope

In scope: agentplane release apply --push --yes; remote tag push; publish trigger validation.

## Plan

1) Apply release plan. 2) Push commit+tag. 3) Validate versions and publish trigger.

## Risks

Risk: auth/push failure or publish pipeline failure; mitigation is immediate verification of remote tag/workflow status.

## Verification

Release commit and v0.2.14 tag exist on origin; package versions resolve to 0.2.14 in npm.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T10:42:10.429Z — VERIFY — ok

By: TESTER

Note: Release applied and published

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T10:38:53.500Z, excerpt_hash=sha256:af73d7eaa221e22a2db6ef66e76ecfe2b76dfd62edfc8fd4537cbbe0a8fd43ff

Details:

Ran: agentplane release apply --push --yes; confirmed origin tag v0.2.14; GitHub publish workflow run 21901826081 completed successfully; npm versions: agentplane=0.2.14, @agentplaneorg/core=0.2.14.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If publish fails after tagging, ship forward with next patch and corrective release notes.

## Verify Steps

- agentplane release apply --push --yes
- git ls-remote --tags origin v0.2.14
- npm view agentplane version && npm view @agentplaneorg/core version
