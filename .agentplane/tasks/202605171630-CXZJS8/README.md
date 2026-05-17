---
id: "202605171630-CXZJS8"
title: "Keep failed pr open publish attempts artifact-clean"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing failed-publish artifact cleanup in the same approved batch worktree as 202605171630-FBWA1N because both defects share the pr open publish transaction path."
events:
  -
    type: "status"
    at: "2026-05-17T16:31:29.845Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing failed-publish artifact cleanup in the same approved batch worktree as 202605171630-FBWA1N because both defects share the pr open publish transaction path."
doc_version: 3
doc_updated_at: "2026-05-17T16:39:03.343Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
