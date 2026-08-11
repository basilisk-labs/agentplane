---
id: "202608111036-QHR892"
title: "Make verification evidence atomic, immediately fresh, and reusable"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
  - "verification"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:fast"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T11:22:48.013Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-11T11:23:13.656Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-11T12:07:12.652Z"
doc_updated_by: "CODER"
description: "Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command."
sections:
  Summary: |-
    Make verification evidence atomic, immediately fresh, and reusable

    Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
  Scope: |-
    - In scope: Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
    - Out of scope: unrelated refactors not required for "Make verification evidence atomic, immediately fresh, and reusable".
  Plan: |-
    1. Reproduce both invalid-pass and self-stale paths in focused route/verification tests.
    2. Validate concrete Command/Result/Evidence/Scope details before any verification mutation when the route requires them.
    3. Separate metadata mismatch from missing/changed evidence so next-action explains the real cause.
    4. Keep verification input based on implementation, Verify Steps, tool context, environment, and evidence; prove lifecycle-only task/PR artifacts reuse the accepted record without rerunning checks.
    5. Add a CLI-level regression proving one valid verify command immediately advances to quality review.
    6. Run focused tests, typecheck, and test:fast.
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts. Expected: parser, freshness classification, and pre-mutation rejection tests pass.
    2. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Expected: a one-shot passing verification with structured Finding is immediately fresh and remains reusable after a lifecycle-only commit.
    3. Run bun run typecheck and bun run docs:cli:check. Expected: type safety passes and public CLI guidance matches the generated reference.
    4. Run bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Expected: the complete fast repository suite passes under bounded local concurrency.
    5. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs production dependencies from a sanitized package payload. Expected: the resource-intensive standalone dependency fixture passes without contention from the rest of the suite.
    6. Inspect the final task route after recording all checks in one verify command. Expected: verification_required is absent and the next gate is emitted without rerunning tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c6f34bc7c9b39e376eb69092cd750356721f0f3d"
    version: 1
id_source: "generated"
---
## Summary

Make verification evidence atomic, immediately fresh, and reusable

Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.

## Scope

- In scope: Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
- Out of scope: unrelated refactors not required for "Make verification evidence atomic, immediately fresh, and reusable".

## Plan

1. Reproduce both invalid-pass and self-stale paths in focused route/verification tests.
2. Validate concrete Command/Result/Evidence/Scope details before any verification mutation when the route requires them.
3. Separate metadata mismatch from missing/changed evidence so next-action explains the real cause.
4. Keep verification input based on implementation, Verify Steps, tool context, environment, and evidence; prove lifecycle-only task/PR artifacts reuse the accepted record without rerunning checks.
5. Add a CLI-level regression proving one valid verify command immediately advances to quality review.
6. Run focused tests, typecheck, and test:fast.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/verification-details.test.ts packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts. Expected: parser, freshness classification, and pre-mutation rejection tests pass.
2. Run bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts. Expected: a one-shot passing verification with structured Finding is immediately fresh and remains reusable after a lifecycle-only commit.
3. Run bun run typecheck and bun run docs:cli:check. Expected: type safety passes and public CLI guidance matches the generated reference.
4. Run bun run test:fast -- --maxWorkers=4 --exclude packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts. Expected: the complete fast repository suite passes under bounded local concurrency.
5. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts -t installs production dependencies from a sanitized package payload. Expected: the resource-intensive standalone dependency fixture passes without contention from the rest of the suite.
6. Inspect the final task route after recording all checks in one verify command. Expected: verification_required is absent and the next gate is emitted without rerunning tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
