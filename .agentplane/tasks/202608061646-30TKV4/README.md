---
id: "202608061646-30TKV4"
title: "Add user-first task intake and execution preview"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608061646-WCARQG"
tags:
  - "cli"
  - "code"
  - "ux"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:cli:check"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T16:47:36.527Z"
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
    at: "2026-08-06T19:12:24.367Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T19:12:24.367Z"
doc_updated_by: "CODER"
description: "Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts."
sections:
  Summary: |-
    Add user-first task intake and execution preview

    Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
  Scope: |-
    - In scope: Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
    - Out of scope: unrelated refactors not required for "Add user-first task intake and execution preview".
  Plan: "1. Add a user-first natural-language task create command that infers safe defaults and preserves task new as the advanced contract. 2. Add concise human status and execution preview surfaces showing route, reasons, context, approvals, checks, and token budget where available. 3. Keep task advance --agent-json and existing scripts backward compatible. 4. Update generated CLI references and onboarding docs. Approved scope: packages/agentplane/src/commands/task/**, packages/agentplane/src/cli/**, packages/agentplane/src/runtime/task-intake/**, docs/user/**, README.md, generated CLI snapshots, and focused tests."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts
    - bun run docs:cli:check
    - bun run docs:onboarding:check
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the UX feature commit. Existing task new, task run, task status, and task advance contracts remain the compatibility baseline."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Add user-first task intake and execution preview

Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.

## Scope

- In scope: Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
- Out of scope: unrelated refactors not required for "Add user-first task intake and execution preview".

## Plan

1. Add a user-first natural-language task create command that infers safe defaults and preserves task new as the advanced contract. 2. Add concise human status and execution preview surfaces showing route, reasons, context, approvals, checks, and token budget where available. 3. Keep task advance --agent-json and existing scripts backward compatible. 4. Update generated CLI references and onboarding docs. Approved scope: packages/agentplane/src/commands/task/**, packages/agentplane/src/cli/**, packages/agentplane/src/runtime/task-intake/**, docs/user/**, README.md, generated CLI snapshots, and focused tests.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts
- bun run docs:cli:check
- bun run docs:onboarding:check
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the UX feature commit. Existing task new, task run, task status, and task advance contracts remain the compatibility baseline.

## Findings
