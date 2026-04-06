---
id: "202604062228-9JBSSW"
title: "Fix hosted-close when merge commit object is absent in checkout"
result_summary: "Merged via PR #97."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T22:28:49.815Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T22:52:17.256Z"
  updated_by: "CODER"
  note: "Rebased 9JBSSW onto main@734042f6c6538441d624a68e737e5910aaecc9be, reran focused hosted-close vitest plus workflow contract coverage, and reran eslint on touched sources; all checks passed."
commit:
  hash: "1d4af00e11de09a0c42aa63bb61053763269a744"
  message: "workflow: Fix hosted-close when merge commit object is absent in checkout (9JBSSW) (#97)"
comments:
  -
    author: "CODER"
    body: "Start: reproducing the hosted-close bad-object failure from merged PR #91 and implementing a fallback that closes tasks without requiring the squash merge object in the local checkout."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #97 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-06T22:30:07.579Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the hosted-close bad-object failure from merged PR #91 and implementing a fallback that closes tasks without requiring the squash merge object in the local checkout."
  -
    type: "verify"
    at: "2026-04-06T22:36:49.644Z"
    author: "CODER"
    state: "ok"
    note: "Hosted-close no longer requires the merged commit object to exist locally; focused vitest for task hosted-close plus workflow contract and eslint on touched files passed."
  -
    type: "verify"
    at: "2026-04-06T22:50:43.830Z"
    author: "CODER"
    state: "ok"
    note: "Rebased onto origin/main; hosted-close fallback regression tests and workflow contract test passed; eslint passed. Commands: bun x vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts; bun x eslint packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts."
  -
    type: "verify"
    at: "2026-04-06T22:52:17.256Z"
    author: "CODER"
    state: "ok"
    note: "Rebased 9JBSSW onto main@734042f6c6538441d624a68e737e5910aaecc9be, reran focused hosted-close vitest plus workflow contract coverage, and reran eslint on touched sources; all checks passed."
  -
    type: "status"
    at: "2026-04-06T23:00:05.820Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #97 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-06T23:00:05.826Z"
doc_updated_by: "INTEGRATOR"
description: "Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA."
sections:
  Summary: |-
    Fix hosted-close when merge commit object is absent in checkout
    
    Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.
  Scope: |-
    - In scope: Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.
    - Out of scope: unrelated refactors not required for "Fix hosted-close when merge commit object is absent in checkout".
  Plan: "1. Reproduce the hosted-close failure path where the merged PR event references a merge_commit_sha that is not present in the checkout. 2. Make task hosted-close derive closure metadata without requiring git log on an unavailable merge object, while preserving canonical merge metadata in pr/meta and task docs. 3. Add regression coverage for the missing-merge-object case and re-verify the hosted-close workflow path."
  Verify Steps: |-
    - Reproduce the hosted-close path where merge_commit_sha is missing from the local git object graph.
    - Run focused vitest coverage for task hosted-close and any helper touched by the fallback.
    - Run eslint on the touched hosted-close source/tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T22:36:49.644Z — VERIFY — ok
    
    By: CODER
    
    Note: Hosted-close no longer requires the merged commit object to exist locally; focused vitest for task hosted-close plus workflow contract and eslint on touched files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:30:07.599Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3
    
    ### 2026-04-06T22:50:43.830Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased onto origin/main; hosted-close fallback regression tests and workflow contract test passed; eslint passed. Commands: bun x vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts; bun x eslint packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:36:49.649Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3
    
    ### 2026-04-06T22:52:17.256Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased 9JBSSW onto main@734042f6c6538441d624a68e737e5910aaecc9be, reran focused hosted-close vitest plus workflow contract coverage, and reran eslint on touched sources; all checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:50:43.843Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix hosted-close when merge commit object is absent in checkout

Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.

## Scope

- In scope: Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.
- Out of scope: unrelated refactors not required for "Fix hosted-close when merge commit object is absent in checkout".

## Plan

1. Reproduce the hosted-close failure path where the merged PR event references a merge_commit_sha that is not present in the checkout. 2. Make task hosted-close derive closure metadata without requiring git log on an unavailable merge object, while preserving canonical merge metadata in pr/meta and task docs. 3. Add regression coverage for the missing-merge-object case and re-verify the hosted-close workflow path.

## Verify Steps

- Reproduce the hosted-close path where merge_commit_sha is missing from the local git object graph.
- Run focused vitest coverage for task hosted-close and any helper touched by the fallback.
- Run eslint on the touched hosted-close source/tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T22:36:49.644Z — VERIFY — ok

By: CODER

Note: Hosted-close no longer requires the merged commit object to exist locally; focused vitest for task hosted-close plus workflow contract and eslint on touched files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:30:07.599Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3

### 2026-04-06T22:50:43.830Z — VERIFY — ok

By: CODER

Note: Rebased onto origin/main; hosted-close fallback regression tests and workflow contract test passed; eslint passed. Commands: bun x vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts; bun x eslint packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:36:49.649Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3

### 2026-04-06T22:52:17.256Z — VERIFY — ok

By: CODER

Note: Rebased 9JBSSW onto main@734042f6c6538441d624a68e737e5910aaecc9be, reran focused hosted-close vitest plus workflow contract coverage, and reran eslint on touched sources; all checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T22:50:43.843Z, excerpt_hash=sha256:6394e86f9933ad1aebbf33e8bde502bc86cb59e26d5df53e4f70fabf4d00c5e3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
