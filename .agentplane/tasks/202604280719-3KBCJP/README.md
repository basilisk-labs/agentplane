---
id: "202604280719-3KBCJP"
title: "Release v0.3.29"
result_summary: "Merged via PR #557."
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "tooling"
verify:
  - "bun run release:prepublish"
  - "git ls-remote --tags origin v0.3.29"
  - "npm view agentplane version"
plan_approval:
  state: "approved"
  updated_at: "2026-04-28T07:19:56.122Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "a4aa33ce12fedb462fdbb69d48a639101382ddd0"
  message: "Merge pull request #557 from basilisk-labs/task/202604280719-3KBCJP/release-v0-3-29"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Preparing v0.3.29 release candidate from the approved branch_pr release plan, including notes, version bump, prepublish verification, PR publication, protected main integration, and release evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #557 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-28T07:20:13.158Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing v0.3.29 release candidate from the approved branch_pr release plan, including notes, version bump, prepublish verification, PR publication, protected main integration, and release evidence."
  -
    type: "status"
    at: "2026-04-28T09:44:28.026Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #557 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-28T09:44:28.031Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence."
sections:
  Summary: |-
    Release v0.3.29
    
    Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.
  Scope: |-
    - In scope: Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.
    - Out of scope: unrelated refactors not required for "Release v0.3.29".
  Plan: "Release plan: version=v0.3.29, tag=v0.3.29, scope=patch release from current main after completed lifecycle/runner/stdio/testkit/tooling tasks. Steps: generate release plan, prepare branch_pr release candidate, run release prepublish checks, open/update release PR, integrate candidate into main without squash, verify hosted publication/tag/npm evidence, then finish the task with release evidence."
  Verify Steps: |-
    1. Review the requested outcome for "Release v0.3.29". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release v0.3.29

Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.

## Scope

- In scope: Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.
- Out of scope: unrelated refactors not required for "Release v0.3.29".

## Plan

Release plan: version=v0.3.29, tag=v0.3.29, scope=patch release from current main after completed lifecycle/runner/stdio/testkit/tooling tasks. Steps: generate release plan, prepare branch_pr release candidate, run release prepublish checks, open/update release PR, integrate candidate into main without squash, verify hosted publication/tag/npm evidence, then finish the task with release evidence.

## Verify Steps

1. Review the requested outcome for "Release v0.3.29". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
