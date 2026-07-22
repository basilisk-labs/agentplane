---
id: "202607221344-D9JTEY"
title: "Release AgentPlane v0.6.24"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T13:44:49.181Z"
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
    body: "Start: prepare v0.6.24 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
events:
  -
    type: "status"
    at: "2026-07-22T13:45:45.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.24 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
doc_version: 3
doc_updated_at: "2026-07-22T14:29:35.341Z"
doc_updated_by: "CODER"
description: "Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops."
sections:
  Summary: |-
    Release AgentPlane v0.6.24

    Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.
  Scope: "Release v0.6.24 from main at base SHA 9de894461a781549fd1044d588037870e5532acc. In scope: generated release plan; docs/releases/v0.6.24.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and new feature work."
  Plan: "1. Freeze v0.6.24 from v0.6.23 at base 9de894461a781549fd1044d588037870e5532acc and preserve every planned change. 2. Generate the release plan and write complete English release notes covering all commits since v0.6.23. 3. Generate the branch_pr release candidate so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run evaluator, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged release SHA. 7. Verify tag, GitHub Release, workflow success, and npm parity for every published package; confirm clean main and untouched agentplane-loops."
  Verify Steps: "1. Confirm the release plan targets exactly 0.6.24 from v0.6.23 and every planned commit is represented in docs/releases/v0.6.24.md. 2. Run bun run release:incidents:check, bun run release:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run test:full-fast. 3. Confirm hosted PR checks pass on the closure head and protected-main integration completes through the queue. 4. Dispatch Publish to npm with the exact merged release SHA and require a successful workflow. 5. Verify tag v0.6.24, GitHub Release v0.6.24, and exact npm 0.6.24 parity for all published packages. 6. Confirm main is clean and the original agentplane-loops checkout remains unchanged."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, close or revert the release candidate PR without tagging. After publication, do not rewrite v0.6.24; prepare a new patch release that reverts or corrects the defective change and preserve the immutable tag and npm evidence."
  Findings: |-
    - Observation: The release prepublish suite found the top-level CLI help snapshot omitted the shipped context finalize-task command.
      Impact: The release candidate could not pass the immutable help contract even though runtime registration and generated CLI documentation were correct.
      Resolution: Updated only the canonical help snapshot, added the release-note entry, and reran the focused 13-test help snapshot suite successfully.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Release candidate preparation updated .agentplane/WORKFLOW.md to 0.6.24 and the workflow hook refreshed last-known-good.md, leaving the recovery snapshot as a tracked post-commit change.
      Impact: The candidate branch was not clean and recovery would otherwise remain pinned to an older expected CLI version.
      Resolution: Included the refreshed last-known-good snapshot and release-note entry in a dedicated signed release fix commit, then revalidated parity and workflow freshness.
      Promotion: incident-candidate
      Fixability: repo-fixable
id_source: "generated"
---
## Summary

Release AgentPlane v0.6.24

Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.24 from main at base SHA 9de894461a781549fd1044d588037870e5532acc. In scope: generated release plan; docs/releases/v0.6.24.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and new feature work.

## Plan

1. Freeze v0.6.24 from v0.6.23 at base 9de894461a781549fd1044d588037870e5532acc and preserve every planned change. 2. Generate the release plan and write complete English release notes covering all commits since v0.6.23. 3. Generate the branch_pr release candidate so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run evaluator, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged release SHA. 7. Verify tag, GitHub Release, workflow success, and npm parity for every published package; confirm clean main and untouched agentplane-loops.

## Verify Steps

1. Confirm the release plan targets exactly 0.6.24 from v0.6.23 and every planned commit is represented in docs/releases/v0.6.24.md. 2. Run bun run release:incidents:check, bun run release:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run test:full-fast. 3. Confirm hosted PR checks pass on the closure head and protected-main integration completes through the queue. 4. Dispatch Publish to npm with the exact merged release SHA and require a successful workflow. 5. Verify tag v0.6.24, GitHub Release v0.6.24, and exact npm 0.6.24 parity for all published packages. 6. Confirm main is clean and the original agentplane-loops checkout remains unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, close or revert the release candidate PR without tagging. After publication, do not rewrite v0.6.24; prepare a new patch release that reverts or corrects the defective change and preserve the immutable tag and npm evidence.

## Findings

- Observation: The release prepublish suite found the top-level CLI help snapshot omitted the shipped context finalize-task command.
  Impact: The release candidate could not pass the immutable help contract even though runtime registration and generated CLI documentation were correct.
  Resolution: Updated only the canonical help snapshot, added the release-note entry, and reran the focused 13-test help snapshot suite successfully.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Release candidate preparation updated .agentplane/WORKFLOW.md to 0.6.24 and the workflow hook refreshed last-known-good.md, leaving the recovery snapshot as a tracked post-commit change.
  Impact: The candidate branch was not clean and recovery would otherwise remain pinned to an older expected CLI version.
  Resolution: Included the refreshed last-known-good snapshot and release-note entry in a dedicated signed release fix commit, then revalidated parity and workflow freshness.
  Promotion: incident-candidate
  Fixability: repo-fixable
