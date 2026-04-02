---
id: "202604021603-CK5W52"
title: "Fix npm install failure after v0.3.8 release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T16:04:20.196Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-02T17:16:23.393Z"
  updated_by: "CODER"
  note: "Verified locally: refreshed hook shim fallback order and test env isolation, reran hook/release-smoke/upgrade targeted vitest, packed and npm-installed the publishable tarball successfully, and passed bun run release:prepublish on the exact release tree."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproducing the broken v0.3.8 npm install path, repairing the publishable package manifest, adding a release guard for workspace/private dependency leaks, and preparing the replacement patch release."
events:
  -
    type: "status"
    at: "2026-04-02T16:04:31.777Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the broken v0.3.8 npm install path, repairing the publishable package manifest, adding a release guard for workspace/private dependency leaks, and preparing the replacement patch release."
  -
    type: "verify"
    at: "2026-04-02T16:35:48.349Z"
    author: "CODER"
    state: "ok"
    note: "Verified locally: reproduced published v0.3.8 manifest leak, packed and npm-installed fixed CLI successfully, ran targeted recipe/release tests, test:workflow-coverage, test:significant-coverage, and bun run release:prepublish."
  -
    type: "verify"
    at: "2026-04-02T17:16:23.393Z"
    author: "CODER"
    state: "ok"
    note: "Verified locally: refreshed hook shim fallback order and test env isolation, reran hook/release-smoke/upgrade targeted vitest, packed and npm-installed the publishable tarball successfully, and passed bun run release:prepublish on the exact release tree."
doc_version: 3
doc_updated_at: "2026-04-02T17:16:23.411Z"
doc_updated_by: "CODER"
description: "Repair the published agentplane package so npm install no longer fails on a workspace dependency leak, add a release gate for publishable package manifests, and ship a patch release."
sections:
  Summary: |-
    Fix npm install failure after v0.3.8 release
    
    Repair the published agentplane package so npm install no longer fails on a workspace dependency leak, add a release gate for publishable package manifests, and ship a patch release.
  Scope: |-
    - In scope: Repair the published agentplane package so npm install no longer fails on a workspace dependency leak, add a release gate for publishable package manifests, and ship a patch release.
    - Out of scope: unrelated refactors not required for "Fix npm install failure after v0.3.8 release".
  Plan: |-
    Release plan: version=v0.3.9, tag=v0.3.9, scope=repair the published agentplane package after the v0.3.8 workspace dependency leak, add a publishable-manifest release guard, update release notes, and publish the replacement patch release.
    
    Execution plan:
    1. Reproduce and isolate the installability failure from the published v0.3.8 tarball and confirm the precise manifest defect.
    2. Change packaging so the published CLI no longer leaks a workspace/private dependency edge.
    3. Add automated release checks that fail on unsupported publishable manifest dependencies before npm publish.
    4. Run targeted tests, pack/install smoke checks, and release prepublish checks.
    5. Publish v0.3.9 and verify npm install, npm metadata, tag, and GitHub release state.
  Verify Steps: |-
    1. Inspect the published v0.3.8 package manifest. Expected: it shows the broken workspace/private dependency edge, so the regression is proven against the actual npm artifact.
    2. Build and pack the fixed CLI package locally, then inspect the packed manifest and install it with npm in a clean temp directory. Expected: no unsupported workspace dependency remains and installation succeeds.
    3. Run the targeted release/packaging tests and the required local release gate. Expected: the new publishable-manifest guard passes for the fix and fails for the old defect shape.
    4. Publish v0.3.9 and query npm and GitHub. Expected: npm installable package metadata, tag, and release evidence all point to the new patch version.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T16:35:48.349Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified locally: reproduced published v0.3.8 manifest leak, packed and npm-installed fixed CLI successfully, ran targeted recipe/release tests, test:workflow-coverage, test:significant-coverage, and bun run release:prepublish.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T16:04:31.792Z, excerpt_hash=sha256:d87c9378986bbe3a7d04912f64fb2fd2d1e21f77606246529a3638419c91ed34
    
    ### 2026-04-02T17:16:23.393Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified locally: refreshed hook shim fallback order and test env isolation, reran hook/release-smoke/upgrade targeted vitest, packed and npm-installed the publishable tarball successfully, and passed bun run release:prepublish on the exact release tree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T16:35:48.363Z, excerpt_hash=sha256:d87c9378986bbe3a7d04912f64fb2fd2d1e21f77606246529a3638419c91ed34
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix npm install failure after v0.3.8 release

Repair the published agentplane package so npm install no longer fails on a workspace dependency leak, add a release gate for publishable package manifests, and ship a patch release.

## Scope

- In scope: Repair the published agentplane package so npm install no longer fails on a workspace dependency leak, add a release gate for publishable package manifests, and ship a patch release.
- Out of scope: unrelated refactors not required for "Fix npm install failure after v0.3.8 release".

## Plan

Release plan: version=v0.3.9, tag=v0.3.9, scope=repair the published agentplane package after the v0.3.8 workspace dependency leak, add a publishable-manifest release guard, update release notes, and publish the replacement patch release.

Execution plan:
1. Reproduce and isolate the installability failure from the published v0.3.8 tarball and confirm the precise manifest defect.
2. Change packaging so the published CLI no longer leaks a workspace/private dependency edge.
3. Add automated release checks that fail on unsupported publishable manifest dependencies before npm publish.
4. Run targeted tests, pack/install smoke checks, and release prepublish checks.
5. Publish v0.3.9 and verify npm install, npm metadata, tag, and GitHub release state.

## Verify Steps

1. Inspect the published v0.3.8 package manifest. Expected: it shows the broken workspace/private dependency edge, so the regression is proven against the actual npm artifact.
2. Build and pack the fixed CLI package locally, then inspect the packed manifest and install it with npm in a clean temp directory. Expected: no unsupported workspace dependency remains and installation succeeds.
3. Run the targeted release/packaging tests and the required local release gate. Expected: the new publishable-manifest guard passes for the fix and fails for the old defect shape.
4. Publish v0.3.9 and query npm and GitHub. Expected: npm installable package metadata, tag, and release evidence all point to the new patch version.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T16:35:48.349Z — VERIFY — ok

By: CODER

Note: Verified locally: reproduced published v0.3.8 manifest leak, packed and npm-installed fixed CLI successfully, ran targeted recipe/release tests, test:workflow-coverage, test:significant-coverage, and bun run release:prepublish.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T16:04:31.792Z, excerpt_hash=sha256:d87c9378986bbe3a7d04912f64fb2fd2d1e21f77606246529a3638419c91ed34

### 2026-04-02T17:16:23.393Z — VERIFY — ok

By: CODER

Note: Verified locally: refreshed hook shim fallback order and test env isolation, reran hook/release-smoke/upgrade targeted vitest, packed and npm-installed the publishable tarball successfully, and passed bun run release:prepublish on the exact release tree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T16:35:48.363Z, excerpt_hash=sha256:d87c9378986bbe3a7d04912f64fb2fd2d1e21f77606246529a3638419c91ed34

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
