---
id: "202607131808-4XZ5WY"
title: "Prepare and publish patch release v0.6.23"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "ops"
  - "release"
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
  - "bun run ci:local:fast"
  - "bun run docs:readme-header:check"
  - "bun run release:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-13T18:11:07.050Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prepare v0.6.23 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
events:
  -
    type: "status"
    at: "2026-07-13T18:11:52.085Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.23 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
doc_version: 3
doc_updated_at: "2026-07-13T18:11:52.085Z"
doc_updated_by: "CODER"
description: "Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops."
sections:
  Summary: |-
    Prepare and publish patch release v0.6.23

    Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.
  Scope: "Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work."
  Plan: "1. Freeze v0.6.23 from v0.6.22 at base eb05aa537e11518c9b3542a43f46e0cbdcc35260 and preserve every planned change. 2. Write detailed English release notes with at least ten concrete bullets. 3. Generate the branch_pr release candidate with AgentPlane so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run EVALUATOR, pre-merge closure, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged SHA. 7. Verify tag, GitHub Release, publish workflow, and npm parity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; confirm clean main and untouched agentplane-loops."
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: version parity, release notes, package manifests, and release invariants pass for 0.6.23.
    2. Run `bun run docs:readme-header:check`. Expected: release-facing README headers are current.
    3. Run `bun run ci:local:fast`. Expected: the full-fast local lane passes; if a runner-only infrastructure timeout recurs, preserve the failing log and require the equivalent hosted lane to pass before merge.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: gateway budgets, imports, markers, and routes pass.
    5. Run `ap doctor`. Expected: no task-introduced repository/runtime errors.
    6. Inspect `docs/releases/v0.6.23.md` against the frozen plan. Expected: all ten listed commits are represented by at least ten human-readable English bullets.
    7. After merge, verify GitHub PR checks and dispatch `Publish to npm` with the merged release SHA. Expected: workflow succeeds and creates tag/release v0.6.23.
    8. Run `npm view` for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.23. Expected: all three resolve to 0.6.23.
    9. Run final GitHub Release/tag and git status readbacks. Expected: v0.6.23 is non-draft/non-prerelease, main matches origin/main, and agentplane-loops is unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, revert the release-candidate commits or close the PR. After npm publication, do not rewrite or delete the published version; prepare a corrective patch release from main, document the defect, and leave v0.6.23 immutable."
  Findings: "Initial release truth: main and origin/main are eb05aa537e11518c9b3542a43f46e0cbdcc35260; active incident registry is empty; GitHub Latest, git tag, agentplane, @agentplaneorg/core, and @agentplaneorg/recipes all report 0.6.22; frozen next target is v0.6.23; agentplane-loops is excluded."
id_source: "generated"
---
## Summary

Prepare and publish patch release v0.6.23

Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work.

## Plan

1. Freeze v0.6.23 from v0.6.22 at base eb05aa537e11518c9b3542a43f46e0cbdcc35260 and preserve every planned change. 2. Write detailed English release notes with at least ten concrete bullets. 3. Generate the branch_pr release candidate with AgentPlane so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run EVALUATOR, pre-merge closure, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged SHA. 7. Verify tag, GitHub Release, publish workflow, and npm parity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; confirm clean main and untouched agentplane-loops.

## Verify Steps

1. Run `bun run release:check`. Expected: version parity, release notes, package manifests, and release invariants pass for 0.6.23.
2. Run `bun run docs:readme-header:check`. Expected: release-facing README headers are current.
3. Run `bun run ci:local:fast`. Expected: the full-fast local lane passes; if a runner-only infrastructure timeout recurs, preserve the failing log and require the equivalent hosted lane to pass before merge.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: gateway budgets, imports, markers, and routes pass.
5. Run `ap doctor`. Expected: no task-introduced repository/runtime errors.
6. Inspect `docs/releases/v0.6.23.md` against the frozen plan. Expected: all ten listed commits are represented by at least ten human-readable English bullets.
7. After merge, verify GitHub PR checks and dispatch `Publish to npm` with the merged release SHA. Expected: workflow succeeds and creates tag/release v0.6.23.
8. Run `npm view` for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.23. Expected: all three resolve to 0.6.23.
9. Run final GitHub Release/tag and git status readbacks. Expected: v0.6.23 is non-draft/non-prerelease, main matches origin/main, and agentplane-loops is unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, revert the release-candidate commits or close the PR. After npm publication, do not rewrite or delete the published version; prepare a corrective patch release from main, document the defect, and leave v0.6.23 immutable.

## Findings

Initial release truth: main and origin/main are eb05aa537e11518c9b3542a43f46e0cbdcc35260; active incident registry is empty; GitHub Latest, git tag, agentplane, @agentplaneorg/core, and @agentplaneorg/recipes all report 0.6.22; frozen next target is v0.6.23; agentplane-loops is excluded.
