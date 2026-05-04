---
id: "202605040756-SV9YYN"
title: "Align ACR example version with release"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bun run release:acr-example:check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T07:56:50.305Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T08:07:54.799Z"
  updated_by: "CODER"
  note: "ACR example fixture now matches 0.4.3 and release-time drift guard passes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: aligning the ACR example fixture with package version 0.4.3 and adding a focused drift check for future release-time validation."
events:
  -
    type: "status"
    at: "2026-05-04T07:57:24.308Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: aligning the ACR example fixture with package version 0.4.3 and adding a focused drift check for future release-time validation."
  -
    type: "verify"
    at: "2026-05-04T08:07:54.799Z"
    author: "CODER"
    state: "ok"
    note: "ACR example fixture now matches 0.4.3 and release-time drift guard passes."
doc_version: 3
doc_updated_at: "2026-05-04T08:07:54.808Z"
doc_updated_by: "CODER"
description: "Update the ACR example fixture version to the current 0.4.3 release and add a release-time guard that prevents future fixture/package version drift."
sections:
  Summary: |-
    Align ACR example version with release
    
    Update the ACR example fixture version to the current 0.4.3 release and add a release-time guard that prevents future fixture/package version drift.
  Scope: |-
    - In scope: Update the ACR example fixture version to the current 0.4.3 release and add a release-time guard that prevents future fixture/package version drift.
    - Out of scope: unrelated refactors not required for "Align ACR example version with release".
  Plan: "Update packages/spec/examples/acr.json from producer.version 0.4.2 to 0.4.3 and add a release-time check that fails when the example producer.version differs from packages/agentplane/package.json. Verify the new check passes plus existing release/docs checks relevant to ACR fixture drift."
  Verify Steps: |-
    1. bun run release:acr-example:check passes.
    2. bun run spec:examples:check passes.
    3. bun run docs:scripts:check passes.
    4. node .agentplane/policy/check-routing.mjs passes.
    5. agentplane doctor passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T08:07:54.799Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR example fixture now matches 0.4.3 and release-time drift guard passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:02:15.157Z, excerpt_hash=sha256:621321484d977860f6a2f42369515612c474383ffd65dc646f88b356fd5e2cbf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bun run release:acr-example:check passed with ACR example version OK (0.4.3); bun run spec:examples:check passed with 6 examples validated; bun run docs:scripts:check passed; node_modules/.bin/eslint scripts/check-acr-example-version.mjs passed; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed. Full lint:core still fails on pre-existing unrelated runtime.command.test.ts and upgrade.ts issues.
      Impact: N2 is closed and future release checks now fail on ACR fixture/package version drift.
      Resolution: Keep unrelated full lint:core debt outside this task scope.
id_source: "generated"
---
## Summary

Align ACR example version with release

Update the ACR example fixture version to the current 0.4.3 release and add a release-time guard that prevents future fixture/package version drift.

## Scope

- In scope: Update the ACR example fixture version to the current 0.4.3 release and add a release-time guard that prevents future fixture/package version drift.
- Out of scope: unrelated refactors not required for "Align ACR example version with release".

## Plan

Update packages/spec/examples/acr.json from producer.version 0.4.2 to 0.4.3 and add a release-time check that fails when the example producer.version differs from packages/agentplane/package.json. Verify the new check passes plus existing release/docs checks relevant to ACR fixture drift.

## Verify Steps

1. bun run release:acr-example:check passes.
2. bun run spec:examples:check passes.
3. bun run docs:scripts:check passes.
4. node .agentplane/policy/check-routing.mjs passes.
5. agentplane doctor passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T08:07:54.799Z — VERIFY — ok

By: CODER

Note: ACR example fixture now matches 0.4.3 and release-time drift guard passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:02:15.157Z, excerpt_hash=sha256:621321484d977860f6a2f42369515612c474383ffd65dc646f88b356fd5e2cbf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: bun run release:acr-example:check passed with ACR example version OK (0.4.3); bun run spec:examples:check passed with 6 examples validated; bun run docs:scripts:check passed; node_modules/.bin/eslint scripts/check-acr-example-version.mjs passed; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed. Full lint:core still fails on pre-existing unrelated runtime.command.test.ts and upgrade.ts issues.
  Impact: N2 is closed and future release checks now fail on ACR fixture/package version drift.
  Resolution: Keep unrelated full lint:core debt outside this task scope.
