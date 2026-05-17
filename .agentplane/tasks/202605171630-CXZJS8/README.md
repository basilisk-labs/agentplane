---
id: "202605171630-CXZJS8"
title: "Keep failed pr open publish attempts artifact-clean"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T16:30:41.424Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T16:41:51.364Z"
  updated_by: "CODER"
  note: "Focused PR-open failed-publish artifact regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers simulated publish failure leaving tracked PR artifacts clean."
  attempts: 0
commit:
  hash: "fc45ebe2582dce6b20cd180f2b7527160be17ef1"
  message: "Merge pull request #3836 from basilisk-labs/task/202605171630-FBWA1N/pr-open-publish-transaction"
comments:
  -
    author: "CODER"
    body: "Start: Implementing failed-publish artifact cleanup in the same approved batch worktree as 202605171630-FBWA1N because both defects share the pr open publish transaction path."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3836 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T16:31:29.845Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing failed-publish artifact cleanup in the same approved batch worktree as 202605171630-FBWA1N because both defects share the pr open publish transaction path."
  -
    type: "verify"
    at: "2026-05-17T16:41:51.364Z"
    author: "CODER"
    state: "ok"
    note: "Focused PR-open failed-publish artifact regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers simulated publish failure leaving tracked PR artifacts clean."
  -
    type: "status"
    at: "2026-05-17T17:02:47.420Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3836 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T17:02:47.425Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure agentplane pr open does not leave dirty pr/meta.json or other transient PR artifacts when remote publication fails before PR creation/linking."
sections:
  Summary: |-
    Keep failed pr open publish attempts artifact-clean

    Ensure agentplane pr open does not leave dirty pr/meta.json or other transient PR artifacts when remote publication fails before PR creation/linking.
  Scope: |-
    - In scope: Ensure agentplane pr open does not leave dirty pr/meta.json or other transient PR artifacts when remote publication fails before PR creation/linking.
    - Out of scope: unrelated refactors not required for "Keep failed pr open publish attempts artifact-clean".
  Plan: "Batch implementation with 202605171630-FBWA1N in one branch_pr worktree. Scope: make failed remote publish attempts transactional for PR artifacts so pr/meta.json is not left dirty when push/remote creation fails before a PR is linked; add regression coverage for simulated push failure; verify focused PR-flow tests and policy routing."
  Verify Steps: "Run bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts. Expected: a simulated task branch publish failure returns an error without writing remote_failed or leaving tracked PR artifacts dirty."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T16:41:51.364Z — VERIFY — ok

    By: CODER

    Note: Focused PR-open failed-publish artifact regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers simulated publish failure leaving tracked PR artifacts clean.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T16:39:03.343Z, excerpt_hash=sha256:adf5bacf5319f15bd65a1e23d9fc75c8804b5974d496fcc84b9fd359a410ebff

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171630-FBWA1N-pr-open-publish-transaction/.agentplane/tasks/202605171630-CXZJS8/blueprint/resolved-snapshot.json
    - old_digest: f7fbab170a654bf0e7dd6a01d84ee2748ae34af81f1b4f3bfd4a5338f0122ead
    - current_digest: f7fbab170a654bf0e7dd6a01d84ee2748ae34af81f1b4f3bfd4a5338f0122ead
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171630-CXZJS8

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts
      Impact: Result: pass; Scope: failed pr open publish attempts and pr/meta.json cleanliness.
      Resolution: Removed remote_failed metadata mutation on task-branch publish failure and asserted clean tracked status.
id_source: "generated"
---
## Summary

Keep failed pr open publish attempts artifact-clean

Ensure agentplane pr open does not leave dirty pr/meta.json or other transient PR artifacts when remote publication fails before PR creation/linking.

## Scope

- In scope: Ensure agentplane pr open does not leave dirty pr/meta.json or other transient PR artifacts when remote publication fails before PR creation/linking.
- Out of scope: unrelated refactors not required for "Keep failed pr open publish attempts artifact-clean".

## Plan

Batch implementation with 202605171630-FBWA1N in one branch_pr worktree. Scope: make failed remote publish attempts transactional for PR artifacts so pr/meta.json is not left dirty when push/remote creation fails before a PR is linked; add regression coverage for simulated push failure; verify focused PR-flow tests and policy routing.

## Verify Steps

Run bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts. Expected: a simulated task branch publish failure returns an error without writing remote_failed or leaving tracked PR artifacts dirty.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T16:41:51.364Z — VERIFY — ok

By: CODER

Note: Focused PR-open failed-publish artifact regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers simulated publish failure leaving tracked PR artifacts clean.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T16:39:03.343Z, excerpt_hash=sha256:adf5bacf5319f15bd65a1e23d9fc75c8804b5974d496fcc84b9fd359a410ebff

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171630-FBWA1N-pr-open-publish-transaction/.agentplane/tasks/202605171630-CXZJS8/blueprint/resolved-snapshot.json
- old_digest: f7fbab170a654bf0e7dd6a01d84ee2748ae34af81f1b4f3bfd4a5338f0122ead
- current_digest: f7fbab170a654bf0e7dd6a01d84ee2748ae34af81f1b4f3bfd4a5338f0122ead
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171630-CXZJS8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts
  Impact: Result: pass; Scope: failed pr open publish attempts and pr/meta.json cleanliness.
  Resolution: Removed remote_failed metadata mutation on task-branch publish failure and asserted clean tracked status.
