---
id: "202605200826-947S9Q"
title: "Unblock hosted close-tail PR verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T08:27:08.676Z"
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
    body: "Start: Add hosted-close generated PR verification check-run so task-close branches created by Actions can satisfy protected-main required checks."
events:
  -
    type: "status"
    at: "2026-05-20T08:27:18.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add hosted-close generated PR verification check-run so task-close branches created by Actions can satisfy protected-main required checks."
doc_version: 3
doc_updated_at: "2026-05-20T08:30:30.967Z"
doc_updated_by: "CODER"
description: "Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI."
sections:
  Summary: |-
    Unblock hosted close-tail PR verification

    Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
  Scope: |-
    - In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
    - Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".
  Plan: |-
    Plan:
    1. Extend task-hosted-close workflow permissions with checks:write.
    2. After creating or recovering a hosted closure PR, validate the deterministic closure SHA and create a GitHub Actions check-run named PR verification for that exact head SHA.
    3. Update workflow contract tests to require the check-run route.
    4. Run focused tests and policy routing, then publish/merge via branch_pr.
    5. Backfill the same check-run for the already-open close-tail PR #3960 if needed after the fix is merged.
  Verify Steps: |-
    1. `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts` passes.
    2. `node .agentplane/policy/check-routing.mjs` passes.
    3. `git diff --check` passes.
    4. `bun run format:changed` passes.
    5. `bun run --filter=agentplane typecheck` passes.
    6. Hosted #3960 close-tail recovery is triggered by user reopen or future workflow-created check-run.
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

Unblock hosted close-tail PR verification

Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.

## Scope

- In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
- Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".

## Plan

Plan:
1. Extend task-hosted-close workflow permissions with checks:write.
2. After creating or recovering a hosted closure PR, validate the deterministic closure SHA and create a GitHub Actions check-run named PR verification for that exact head SHA.
3. Update workflow contract tests to require the check-run route.
4. Run focused tests and policy routing, then publish/merge via branch_pr.
5. Backfill the same check-run for the already-open close-tail PR #3960 if needed after the fix is merged.

## Verify Steps

1. `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts` passes.
2. `node .agentplane/policy/check-routing.mjs` passes.
3. `git diff --check` passes.
4. `bun run format:changed` passes.
5. `bun run --filter=agentplane typecheck` passes.
6. Hosted #3960 close-tail recovery is triggered by user reopen or future workflow-created check-run.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
