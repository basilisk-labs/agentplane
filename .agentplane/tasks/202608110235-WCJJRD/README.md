---
id: "202608110235-WCJJRD"
title: "Replace task-create keyword inference with explicit semantic intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "intake"
  - "ux"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/create.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T02:35:40.285Z"
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
    body: "Start: replace keyword inference with explicit structured semantic intent and a neutral PLANNER intake boundary."
events:
  -
    type: "status"
    at: "2026-08-11T02:36:02.384Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace keyword inference with explicit structured semantic intent and a neutral PLANNER intake boundary."
doc_version: 3
doc_updated_at: "2026-08-11T02:36:02.384Z"
doc_updated_by: "CODER"
description: "Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route."
sections:
  Summary: |-
    Replace task-create keyword inference with explicit semantic intent

    Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.
  Scope: |-
    - In scope: Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.
    - Out of scope: unrelated refactors not required for "Replace task-create keyword inference with explicit semantic intent".
  Plan: "1. Replace the keyword tables and ordered natural-language classifier in task create with an explicit structured-intent contract matching task new: task kind, mutation scope, risk flags, blueprint request, and tags are data supplied by the calling agent or user. 2. When structured intent is absent, create a neutral intake task whose only next semantic step is PLANNER classification; do not infer code, docs, release, ops, security, context, performance, quality, analysis, route, or tags from title words. 3. Keep deterministic validation in the CLI: reject incompatible structured combinations, validate blueprint and route floors, persist provenance showing whether intent was supplied or remains pending, and render the exact next action. 4. Preserve a simple natural-language task-create entry point and backwards-compatible output fields where they remain truthful; remove claims that intent was inferred. 5. Add regression tests with English, Russian, ambiguous, and adversarial wording proving identical neutral behavior without structured input and exact behavior with structured input. 6. Run focused tests, typecheck, lint, format, full fast tests, and build; record content-addressed evidence before evaluator review and branch_pr integration."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/create.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c8d4ebd0ccd74b5afee77d1b44eb008a810a9bd0"
    version: 1
id_source: "generated"
---
## Summary

Replace task-create keyword inference with explicit semantic intent

Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.

## Scope

- In scope: Remove ordered natural-language keyword classification from task create. The CLI must validate structured task intent supplied by the agent or user, and otherwise create a neutral semantic-intake boundary for PLANNER without guessing task kind, mutation scope, risks, tags, blueprint, or execution route.
- Out of scope: unrelated refactors not required for "Replace task-create keyword inference with explicit semantic intent".

## Plan

1. Replace the keyword tables and ordered natural-language classifier in task create with an explicit structured-intent contract matching task new: task kind, mutation scope, risk flags, blueprint request, and tags are data supplied by the calling agent or user. 2. When structured intent is absent, create a neutral intake task whose only next semantic step is PLANNER classification; do not infer code, docs, release, ops, security, context, performance, quality, analysis, route, or tags from title words. 3. Keep deterministic validation in the CLI: reject incompatible structured combinations, validate blueprint and route floors, persist provenance showing whether intent was supplied or remains pending, and render the exact next action. 4. Preserve a simple natural-language task-create entry point and backwards-compatible output fields where they remain truthful; remove claims that intent was inferred. 5. Add regression tests with English, Russian, ambiguous, and adversarial wording proving identical neutral behavior without structured input and exact behavior with structured input. 6. Run focused tests, typecheck, lint, format, full fast tests, and build; record content-addressed evidence before evaluator review and branch_pr integration.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/create.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
