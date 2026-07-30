---
id: "202607302125-Y61ZHN"
title: "Record superseded provider-conflict outcomes without false integration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "v0.7"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
  - "bun run typecheck"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T21:27:24.959Z"
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
    at: "2026-07-30T21:28:12.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T21:28:12.818Z"
doc_updated_by: "CODER"
description: "Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue."
sections:
  Summary: |-
    Record superseded provider-conflict outcomes without false integration

    Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.
  Scope: |-
    - In scope: Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.
    - Out of scope: unrelated refactors not required for "Record superseded provider-conflict outcomes without false integration".
  Plan: "1. Inspect the integration-queue state model, provider-conflict route projection, and existing close commands to define a terminal superseded outcome that is distinct from successful integration. 2. Add a CLI-owned recording path that accepts the agent's semantic decision plus a completed successor task, validates identities and refuses stale or non-terminal inputs, then records the queue outcome without selecting conflict hunks or rewriting branches. 3. Project the outcome through queue listing, PR flow status, and next-action so a closed superseded PR cannot keep the merge lane in rework or appear merged. 4. Cover the stale-PR and successor validation cases with focused unit/CLI tests, including a regression for an updated PR head. 5. Run focused tests, typecheck, critical CLI tests, formatting, and lint; record verification, quality review, PR and hosted checks before integration."
  Verify Steps: "1. Run the focused provider-conflict and PR-flow CLI tests. Expected: a semantic supersession can be recorded only against a current closed/conflicting PR and an existing completed successor; stale head, missing successor, and integrated-success substitution are rejected. 2. Inspect the queue and flow projections after the recorded outcome. Expected: the queue is terminally superseded rather than done/rework, the legacy task is not presented as merged, and later queued integration is not blocked. 3. Run bun run typecheck and bun run test:critical. Expected: the typed state model and critical CLI surface remain green. 4. Run format and lint checks. Expected: no formatting or lint regression in the CLI workflow surface."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "ac63ebe31bf54d8bb088669beb0dabb79fc31ad4"
    version: 1
id_source: "generated"
---
## Summary

Record superseded provider-conflict outcomes without false integration

Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.

## Scope

- In scope: Add a terminal superseded outcome for a semantic provider-conflict resolution. An agent may decide that a stale PR must not merge because a successor task owns the current-main decision; the CLI must validate and record that outcome without falsely marking the task integrated, and must unblock the integration queue.
- Out of scope: unrelated refactors not required for "Record superseded provider-conflict outcomes without false integration".

## Plan

1. Inspect the integration-queue state model, provider-conflict route projection, and existing close commands to define a terminal superseded outcome that is distinct from successful integration. 2. Add a CLI-owned recording path that accepts the agent's semantic decision plus a completed successor task, validates identities and refuses stale or non-terminal inputs, then records the queue outcome without selecting conflict hunks or rewriting branches. 3. Project the outcome through queue listing, PR flow status, and next-action so a closed superseded PR cannot keep the merge lane in rework or appear merged. 4. Cover the stale-PR and successor validation cases with focused unit/CLI tests, including a regression for an updated PR head. 5. Run focused tests, typecheck, critical CLI tests, formatting, and lint; record verification, quality review, PR and hosted checks before integration.

## Verify Steps

1. Run the focused provider-conflict and PR-flow CLI tests. Expected: a semantic supersession can be recorded only against a current closed/conflicting PR and an existing completed successor; stale head, missing successor, and integrated-success substitution are rejected. 2. Inspect the queue and flow projections after the recorded outcome. Expected: the queue is terminally superseded rather than done/rework, the legacy task is not presented as merged, and later queued integration is not blocked. 3. Run bun run typecheck and bun run test:critical. Expected: the typed state model and critical CLI surface remain green. 4. Run format and lint checks. Expected: no formatting or lint regression in the CLI workflow surface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
