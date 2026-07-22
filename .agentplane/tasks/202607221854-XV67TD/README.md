---
id: "202607221854-XV67TD"
title: "Prepare and publish AgentPlane 0.7.0"
status: "TODO"
priority: "high"
owner: "INTEGRATOR"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221908-83Y4AF"
tags:
  - "final"
  - "publish"
  - "release"
  - "v0.7"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap doctor"
  - "bun run release:postpublish:audit"
  - "bun run release:prepublish"
  - "bun run release:smoke:published"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:54:40.299Z"
doc_updated_by: "PLANNER"
description: "Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility."
sections:
  Summary: |-
    Prepare and publish AgentPlane 0.7.0

    Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility.
  Scope: |-
    - In scope: final integration queue, version 0.7.0 bump, release notes, prepublish gates, exact-SHA GitHub workflow publication, npm/GitHub/package audit, installed smoke, hosted-close evidence, and final clean main readback.
    - Out of scope: new feature/refactor scope after rc; any regression requires a separately approved release-blocker task.
  Plan: |-
    1. Confirm every required task dependency is DONE and no v0.7 architecture or migration blocker remains.
    2. Freeze the release SHA and run full prepublish, migration, installed-tarball, docs, architecture, and lifecycle gates.
    3. Bump all versioned packages/contracts to 0.7.0 and prepare reviewed release notes.
    4. Publish through the protected GitHub release workflow with explicit network/publish/merge authority.
    5. Audit npm packages, GitHub tag/release/workflow evidence, installed smoke, hosted close, final main SHA, and clean state.
  Verify Steps: |-
    1. Run `bun run release:prepublish` on the exact candidate SHA. Expected: all contract, test, coverage, package, docs, migration, architecture, and release gates pass with no skip.
    2. Publish through the authorized workflow. Expected: package versions, provenance, tag, GitHub Release, and workflow SHA are identical.
    3. Run `bun run release:postpublish:audit` and `bun run release:smoke:published`. Expected: every public distribution surface and installed 0.7 flow passes.
    4. Read back npm metadata, GitHub release/workflow, merged task PRs, hosted close, `origin/main`, and local main. Expected: complete traceable evidence and no version/SHA drift.
    5. Run `ap doctor` and final tracked/untracked status. Expected: no release-blocking warning or unintended artifact.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Before publication, abort the candidate and revert the version/release commit through a new approved task branch.
    - After any package is public, do not overwrite it; stop, record exact partial-publication evidence, and follow the release recovery path with a new patch version.
    - Preserve all hosted evidence and never rewrite published tags or package versions.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare and publish AgentPlane 0.7.0

Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility.

## Scope

- In scope: final integration queue, version 0.7.0 bump, release notes, prepublish gates, exact-SHA GitHub workflow publication, npm/GitHub/package audit, installed smoke, hosted-close evidence, and final clean main readback.
- Out of scope: new feature/refactor scope after rc; any regression requires a separately approved release-blocker task.

## Plan

1. Confirm every required task dependency is DONE and no v0.7 architecture or migration blocker remains.
2. Freeze the release SHA and run full prepublish, migration, installed-tarball, docs, architecture, and lifecycle gates.
3. Bump all versioned packages/contracts to 0.7.0 and prepare reviewed release notes.
4. Publish through the protected GitHub release workflow with explicit network/publish/merge authority.
5. Audit npm packages, GitHub tag/release/workflow evidence, installed smoke, hosted close, final main SHA, and clean state.

## Verify Steps

1. Run `bun run release:prepublish` on the exact candidate SHA. Expected: all contract, test, coverage, package, docs, migration, architecture, and release gates pass with no skip.
2. Publish through the authorized workflow. Expected: package versions, provenance, tag, GitHub Release, and workflow SHA are identical.
3. Run `bun run release:postpublish:audit` and `bun run release:smoke:published`. Expected: every public distribution surface and installed 0.7 flow passes.
4. Read back npm metadata, GitHub release/workflow, merged task PRs, hosted close, `origin/main`, and local main. Expected: complete traceable evidence and no version/SHA drift.
5. Run `ap doctor` and final tracked/untracked status. Expected: no release-blocking warning or unintended artifact.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Before publication, abort the candidate and revert the version/release commit through a new approved task branch.
- After any package is public, do not overwrite it; stop, record exact partial-publication evidence, and follow the release recovery path with a new patch version.
- Preserve all hosted evidence and never rewrite published tags or package versions.

## Findings
