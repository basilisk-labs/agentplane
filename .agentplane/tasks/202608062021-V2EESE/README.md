---
id: "202608062021-V2EESE"
title: "Project semantic-only provider prompts and reject process choreography"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "prompts"
  - "quality"
  - "supervisor"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:22:25.882Z"
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
  requested_mode: "auto"
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
    at: "2026-08-06T21:10:33.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T21:10:33.947Z"
doc_updated_by: "CODER"
description: "Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt."
sections:
  Summary: |-
    Project semantic-only provider prompts and reject process choreography

    Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
  Scope: |-
    - In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
    - Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".
  Plan: "1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    - bun run test:critical
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Project semantic-only provider prompts and reject process choreography

Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.

## Scope

- In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
- Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".

## Plan

1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
- bun run test:critical
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
