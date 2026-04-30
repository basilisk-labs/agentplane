---
id: "202604300956-6CRM12"
title: "Publish v0.4.0 release"
result_summary: "Merged via PR #611."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "publish"
  - "release"
verify:
  - "GitHub PR checks pass"
  - "Publish to npm workflow succeeds"
  - "agentplane release candidate --push --yes"
  - "agentplane release plan --minor --yes"
  - "bun run release:check"
  - "bun run release:parity"
  - "gh release view v0.4.0"
  - "git ls-remote --tags origin v0.4.0"
  - "npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T09:56:44.077Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "060b70ca465b780337c2ec9da035fc66e615803f"
  message: "Merge pull request #611 from basilisk-labs/task/202604300956-6CRM12/v0-4-0-release"
comments:
  -
    author: "CODER"
    body: "Start: prepare the modular prompt assembly milestone as v0.4.0 through the branch_pr release-candidate route, including release-gate fixes needed for publication."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #611 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T10:07:30.351Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare the modular prompt assembly milestone as v0.4.0 through the branch_pr release-candidate route, including release-gate fixes needed for publication."
  -
    type: "status"
    at: "2026-04-30T17:40:21.716Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #611 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-30T17:40:21.722Z"
doc_updated_by: "INTEGRATOR"
description: "Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence."
sections:
  Summary: |-
    Publish v0.4.0 release
    
    Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
  Scope: |-
    - In scope: Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
    - Out of scope: unrelated refactors not required for "Publish v0.4.0 release".
  Plan: |-
    Release plan: version=0.4.0, tag=v0.4.0, scope=current modular prompt assembly milestone plus release artifacts and release notes.
    
    1. Clean up/ignore the aborted v0.3.30 local candidate state and start from current origin/main in a dedicated v0.4.0 release worktree.
    2. Generate a minor release plan with agentplane release plan --minor --yes; write docs/releases/v0.4.0.md from that plan.
    3. Run agentplane release candidate --push --yes; if release gates fail, fix only release-scope blockers required for the candidate, including currently known hotspot blockers.
    4. Run local release checks: task verify-show, bun run release:parity, bun run release:check, and any targeted checks for release-gate fixes.
    5. Open/update release PR, wait for hosted checks, integrate to main, and wait for Publish to npm.
    6. Verify npm latest versions are 0.4.0, remote tag v0.4.0 exists, GitHub Release v0.4.0 exists, and task evidence is not pending.
    
    Re-approval triggers: target changes from 0.4.0, release gate requires broad refactor outside release readiness, publish workflow requires secret/config changes, or publication evidence cannot be verified.
  Verify Steps: |-
    1. Run `agentplane release plan --minor --yes`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane release candidate --push --yes`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run release:parity`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `GitHub PR checks pass`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `Publish to npm workflow succeeds`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Run `npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version`. Expected: it succeeds and confirms the requested outcome for this task.
    8. Run `git ls-remote --tags origin v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
    9. Run `gh release view v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
    10. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    11. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Publish v0.4.0 release

Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.

## Scope

- In scope: Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
- Out of scope: unrelated refactors not required for "Publish v0.4.0 release".

## Plan

Release plan: version=0.4.0, tag=v0.4.0, scope=current modular prompt assembly milestone plus release artifacts and release notes.

1. Clean up/ignore the aborted v0.3.30 local candidate state and start from current origin/main in a dedicated v0.4.0 release worktree.
2. Generate a minor release plan with agentplane release plan --minor --yes; write docs/releases/v0.4.0.md from that plan.
3. Run agentplane release candidate --push --yes; if release gates fail, fix only release-scope blockers required for the candidate, including currently known hotspot blockers.
4. Run local release checks: task verify-show, bun run release:parity, bun run release:check, and any targeted checks for release-gate fixes.
5. Open/update release PR, wait for hosted checks, integrate to main, and wait for Publish to npm.
6. Verify npm latest versions are 0.4.0, remote tag v0.4.0 exists, GitHub Release v0.4.0 exists, and task evidence is not pending.

Re-approval triggers: target changes from 0.4.0, release gate requires broad refactor outside release readiness, publish workflow requires secret/config changes, or publication evidence cannot be verified.

## Verify Steps

1. Run `agentplane release plan --minor --yes`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane release candidate --push --yes`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run release:parity`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `GitHub PR checks pass`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `Publish to npm workflow succeeds`. Expected: it succeeds and confirms the requested outcome for this task.
7. Run `npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version`. Expected: it succeeds and confirms the requested outcome for this task.
8. Run `git ls-remote --tags origin v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
9. Run `gh release view v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
10. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
11. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
