---
id: "202604280719-3KBCJP"
title: "Release v0.3.29"
result_summary: "Release v0.3.29 published"
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-28T09:48:05.108Z"
  updated_by: "INTEGRATOR"
  note: "Command: release candidate --push --yes, PR #557 hosted checks, Publish to npm run 25045751901, npm view agentplane/@agentplaneorg/core/@agentplaneorg/recipes version, git ls-remote --tags origin v0.3.29, gh release view v0.3.29; Result: pass; Evidence: PR #557 merged into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, Publish to npm succeeded, npm versions are 0.3.29, tag v0.3.29 points at a4aa33ce12fedb462fdbb69d48a639101382ddd0, GitHub Release v0.3.29 is published; Scope: v0.3.29 release publication and task evidence."
commit:
  hash: "a4aa33ce12fedb462fdbb69d48a639101382ddd0"
  message: "Merge pull request #557 from basilisk-labs/task/202604280719-3KBCJP/release-v0-3-29"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Preparing v0.3.29 release candidate from the approved branch_pr release plan, including notes, version bump, prepublish verification, PR publication, protected main integration, and release evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.3.29 was prepared through branch_pr, merged via PR #557 into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, published by hosted Publish to npm run 25045751901, and verified on npm, remote tag, and GitHub Release."
events:
  -
    type: "status"
    at: "2026-04-28T07:20:13.158Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing v0.3.29 release candidate from the approved branch_pr release plan, including notes, version bump, prepublish verification, PR publication, protected main integration, and release evidence."
  -
    type: "verify"
    at: "2026-04-28T09:48:05.108Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Command: release candidate --push --yes, PR #557 hosted checks, Publish to npm run 25045751901, npm view agentplane/@agentplaneorg/core/@agentplaneorg/recipes version, git ls-remote --tags origin v0.3.29, gh release view v0.3.29; Result: pass; Evidence: PR #557 merged into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, Publish to npm succeeded, npm versions are 0.3.29, tag v0.3.29 points at a4aa33ce12fedb462fdbb69d48a639101382ddd0, GitHub Release v0.3.29 is published; Scope: v0.3.29 release publication and task evidence."
  -
    type: "status"
    at: "2026-04-28T09:48:17.240Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.29 was prepared through branch_pr, merged via PR #557 into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, published by hosted Publish to npm run 25045751901, and verified on npm, remote tag, and GitHub Release."
doc_version: 3
doc_updated_at: "2026-04-28T09:48:17.240Z"
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
    ### 2026-04-28T09:48:05.108Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Command: release candidate --push --yes, PR #557 hosted checks, Publish to npm run 25045751901, npm view agentplane/@agentplaneorg/core/@agentplaneorg/recipes version, git ls-remote --tags origin v0.3.29, gh release view v0.3.29; Result: pass; Evidence: PR #557 merged into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, Publish to npm succeeded, npm versions are 0.3.29, tag v0.3.29 points at a4aa33ce12fedb462fdbb69d48a639101382ddd0, GitHub Release v0.3.29 is published; Scope: v0.3.29 release publication and task evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T07:20:13.158Z, excerpt_hash=sha256:009e20588fe00231554a34b05235fe4fab3bd1ba2559277944de3463142ec546
    
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
### 2026-04-28T09:48:05.108Z — VERIFY — ok

By: INTEGRATOR

Note: Command: release candidate --push --yes, PR #557 hosted checks, Publish to npm run 25045751901, npm view agentplane/@agentplaneorg/core/@agentplaneorg/recipes version, git ls-remote --tags origin v0.3.29, gh release view v0.3.29; Result: pass; Evidence: PR #557 merged into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, Publish to npm succeeded, npm versions are 0.3.29, tag v0.3.29 points at a4aa33ce12fedb462fdbb69d48a639101382ddd0, GitHub Release v0.3.29 is published; Scope: v0.3.29 release publication and task evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T07:20:13.158Z, excerpt_hash=sha256:009e20588fe00231554a34b05235fe4fab3bd1ba2559277944de3463142ec546

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
