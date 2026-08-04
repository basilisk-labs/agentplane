---
id: "202608041057-WZRXEX"
title: "Disambiguate hosted release evidence task selection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "post-merge-fix"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:58:01.027Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T10:58:31.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T11:03:38.788Z"
doc_updated_by: "CODER"
description: "Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release."
sections:
  Summary: |-
    Disambiguate hosted release evidence task selection

    Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
  Scope: |-
    - In scope: Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
    - Out of scope: unrelated refactors not required for "Disambiguate hosted release evidence task selection".
  Plan: "Patch-release plan: version=0.7.2, tag=v0.7.2. 1. Reproduce the hosted publish evidence ambiguity when several DONE release tasks mention one version. 2. Change release-task selection to prefer the unique exact-release-commit task candidate, intersected with version-qualified release tasks, and retain fail-closed behavior for genuine ambiguity. 3. Add focused unit/integration regressions covering unique commit match, multiple registry matches, fallback, and ambiguity. 4. Apply the successful v0.7.1 publish-result to task 202608021232-YCNM1S so its canonical README records hosted publication while preserving unavailable token provenance. 5. Run targeted tests, release contracts, full prepublish, and independent evaluator on the final candidate. 6. Merge through the integration queue, publish v0.7.2 for the exact merged SHA, and verify npm, tag, GitHub Release, clean install, postpublish audit, evidence follow-up, main parity, and branch cleanup. Stop on product drift beyond this repair, tag/version drift, active incidents, or any failed required gate."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: exact-commit task selection, version fallback, and genuine ambiguity cases pass.
    2. Run the `prepare` command against the archived v0.7.1 `publish-result.json`. Expected: task `202608021232-YCNM1S` is selected despite other DONE v0.7.1 release tasks.
    3. Run `bun run ci:contract` and `bun run release:prepublish`. Expected: all blocking contracts and release gates pass on the final v0.7.2 candidate.
    4. Verify task `202608021232-YCNM1S` contains hosted publish evidence for SHA `f519d9518c34226075a61d2b01b936127a77e587` and retains explicit unavailable token provenance.
    5. After merge and publish, verify npm `latest` for all three packages is `0.7.2`, tag and GitHub Release `v0.7.2` point to the exact merged SHA, a clean install reports `0.7.2`, postpublish audit passes from the workflow artifact, release evidence follow-up succeeds, main is clean and matches origin, and merged branches/worktrees are removed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The v0.7.1 Publish release workflow published every channel successfully but skipped release-task evidence because three DONE release tasks matched the same version and the selector ignored task-scoped files in the exact release commit.
      Impact: The release itself was correct, but the canonical publish task README retained only pre-merge verification and required manual provenance recovery from the publish-result artifact.
      Resolution: Resolve all task ids touched by the exact release commit, intersect them with version-qualified release tasks, select a unique exact match, and preserve fail-closed fallback behavior for genuine ambiguity; regression and real v0.7.1 replay pass.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "f519d9518c34226075a61d2b01b936127a77e587"
    version: 1
id_source: "generated"
---
## Summary

Disambiguate hosted release evidence task selection

Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.

## Scope

- In scope: Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
- Out of scope: unrelated refactors not required for "Disambiguate hosted release evidence task selection".

## Plan

Patch-release plan: version=0.7.2, tag=v0.7.2. 1. Reproduce the hosted publish evidence ambiguity when several DONE release tasks mention one version. 2. Change release-task selection to prefer the unique exact-release-commit task candidate, intersected with version-qualified release tasks, and retain fail-closed behavior for genuine ambiguity. 3. Add focused unit/integration regressions covering unique commit match, multiple registry matches, fallback, and ambiguity. 4. Apply the successful v0.7.1 publish-result to task 202608021232-YCNM1S so its canonical README records hosted publication while preserving unavailable token provenance. 5. Run targeted tests, release contracts, full prepublish, and independent evaluator on the final candidate. 6. Merge through the integration queue, publish v0.7.2 for the exact merged SHA, and verify npm, tag, GitHub Release, clean install, postpublish audit, evidence follow-up, main parity, and branch cleanup. Stop on product drift beyond this repair, tag/version drift, active incidents, or any failed required gate.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: exact-commit task selection, version fallback, and genuine ambiguity cases pass.
2. Run the `prepare` command against the archived v0.7.1 `publish-result.json`. Expected: task `202608021232-YCNM1S` is selected despite other DONE v0.7.1 release tasks.
3. Run `bun run ci:contract` and `bun run release:prepublish`. Expected: all blocking contracts and release gates pass on the final v0.7.2 candidate.
4. Verify task `202608021232-YCNM1S` contains hosted publish evidence for SHA `f519d9518c34226075a61d2b01b936127a77e587` and retains explicit unavailable token provenance.
5. After merge and publish, verify npm `latest` for all three packages is `0.7.2`, tag and GitHub Release `v0.7.2` point to the exact merged SHA, a clean install reports `0.7.2`, postpublish audit passes from the workflow artifact, release evidence follow-up succeeds, main is clean and matches origin, and merged branches/worktrees are removed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The v0.7.1 Publish release workflow published every channel successfully but skipped release-task evidence because three DONE release tasks matched the same version and the selector ignored task-scoped files in the exact release commit.
  Impact: The release itself was correct, but the canonical publish task README retained only pre-merge verification and required manual provenance recovery from the publish-result artifact.
  Resolution: Resolve all task ids touched by the exact release commit, intersect them with version-qualified release tasks, select a unique exact match, and preserve fail-closed fallback behavior for genuine ambiguity; regression and real v0.7.1 replay pass.
  Promotion: incident-candidate
  Fixability: repo-fixable
