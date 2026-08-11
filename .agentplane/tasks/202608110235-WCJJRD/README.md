---
id: "202608110235-WCJJRD"
title: "Replace task-create keyword inference with explicit semantic intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-08-11T02:48:19.636Z"
  updated_by: "TESTER"
  note: "Explicit semantic task intent verified: CLI classification is independent of natural-language keywords, and missing intent deterministically routes to neutral PLANNER intake."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "9db650cb39af2db83252ae0c137fbb4552510acb"
  message: "🚧 WCJJRD task: require explicit semantic task intent"
comments:
  -
    author: "CODER"
    body: "Start: replace keyword inference with explicit structured semantic intent and a neutral PLANNER intake boundary."
  -
    author: "CODER"
    body: "Implementation committed: task create now accepts explicit structured intent or creates a neutral PLANNER intake without keyword inference."
events:
  -
    type: "status"
    at: "2026-08-11T02:36:02.384Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace keyword inference with explicit structured semantic intent and a neutral PLANNER intake boundary."
  -
    type: "status"
    at: "2026-08-11T02:45:57.509Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: task create now accepts explicit structured intent or creates a neutral PLANNER intake without keyword inference."
    commit: "9db650cb39af2db83252ae0c137fbb4552510acb"
  -
    type: "verify"
    at: "2026-08-11T02:48:19.636Z"
    author: "TESTER"
    state: "ok"
    note: "Explicit semantic task intent verified: CLI classification is independent of natural-language keywords, and missing intent deterministically routes to neutral PLANNER intake."
doc_version: 3
doc_updated_at: "2026-08-11T02:48:20.891Z"
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
  Verify Steps: "1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`. Expected: explicit structured intent persists exactly; unstructured English, Russian, Japanese, negated, and ambiguous outcomes all remain neutral PLANNER intake; help surfaces contain no keyword-inference claim. 2. Run `bun run typecheck` and `bun run lint:core`. Expected: structured option parsing, persisted task fields, and public payload types pass static validation. 3. Run `bun run test:fast`. Expected: the complete regression suite passes with no route, task creation, duplicate locking, or agent handoff regression. 4. Run `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`. Expected: formatting, unused-code, size, and package build gates pass. 5. Inspect the final diff. Expected: ordered keyword tables and natural-language classifier code are absent; the CLI only validates caller-supplied semantic fields or emits `semantic_intake_pending`."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-11T02:48:19.636Z — VERIFY — ok

    By: TESTER

    Note: Explicit semantic task intent verified: CLI classification is independent of natural-language keywords, and missing intent deterministically routes to neutral PLANNER intake.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:305ffbc5a079d94db92f8931fa0c51dd53d9094ec22374928f478a4049be6098

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts
    Result: pass (4 files, 36 tests)
    Evidence: Explicit intent, language-neutral pending intake, help contract, duplicate locking, and compact handoff scenarios exited 0.
    Scope: Task creation semantic intent and public CLI help behavior.

    Command: bun run typecheck && bun run lint:core
    Result: pass.
    Evidence: TypeScript build and complete packages/scripts lint surface exited 0.
    Scope: Static contracts for structured task-create options, persisted fields, and output payloads.

    Command: bun run test:fast
    Result: pass (549 files, 3983 tests)
    Evidence: Complete agentplane, core, recipes, and testkit suite exited 0 at implementation 9db650cb3.
    Scope: Repository regression behavior.

    Command: bun run format:check && bun run knip:check && bun run hotspots:check && bun run build
    Result: pass.
    Evidence: Formatting, unused-code baseline, hotspot thresholds, and distributable bundle build exited 0.
    Scope: Repository architecture and packaging contracts.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608110235-WCJJRD-replace-task-create-keyword-inference-with-expli/.agentplane/tasks/202608110235-WCJJRD/blueprint/resolved-snapshot.json
    - old_digest: 6e42bd4641d0ab0db28c9d66ab0775241614b6a96b069fa051b02adc19386944
    - current_digest: 6e42bd4641d0ab0db28c9d66ab0775241614b6a96b069fa051b02adc19386944
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608110235-WCJJRD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`. Expected: explicit structured intent persists exactly; unstructured English, Russian, Japanese, negated, and ambiguous outcomes all remain neutral PLANNER intake; help surfaces contain no keyword-inference claim. 2. Run `bun run typecheck` and `bun run lint:core`. Expected: structured option parsing, persisted task fields, and public payload types pass static validation. 3. Run `bun run test:fast`. Expected: the complete regression suite passes with no route, task creation, duplicate locking, or agent handoff regression. 4. Run `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`. Expected: formatting, unused-code, size, and package build gates pass. 5. Inspect the final diff. Expected: ordered keyword tables and natural-language classifier code are absent; the CLI only validates caller-supplied semantic fields or emits `semantic_intake_pending`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-11T02:48:19.636Z — VERIFY — ok

By: TESTER

Note: Explicit semantic task intent verified: CLI classification is independent of natural-language keywords, and missing intent deterministically routes to neutral PLANNER intake.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:305ffbc5a079d94db92f8931fa0c51dd53d9094ec22374928f478a4049be6098

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts
Result: pass (4 files, 36 tests)
Evidence: Explicit intent, language-neutral pending intake, help contract, duplicate locking, and compact handoff scenarios exited 0.
Scope: Task creation semantic intent and public CLI help behavior.

Command: bun run typecheck && bun run lint:core
Result: pass.
Evidence: TypeScript build and complete packages/scripts lint surface exited 0.
Scope: Static contracts for structured task-create options, persisted fields, and output payloads.

Command: bun run test:fast
Result: pass (549 files, 3983 tests)
Evidence: Complete agentplane, core, recipes, and testkit suite exited 0 at implementation 9db650cb3.
Scope: Repository regression behavior.

Command: bun run format:check && bun run knip:check && bun run hotspots:check && bun run build
Result: pass.
Evidence: Formatting, unused-code baseline, hotspot thresholds, and distributable bundle build exited 0.
Scope: Repository architecture and packaging contracts.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608110235-WCJJRD-replace-task-create-keyword-inference-with-expli/.agentplane/tasks/202608110235-WCJJRD/blueprint/resolved-snapshot.json
- old_digest: 6e42bd4641d0ab0db28c9d66ab0775241614b6a96b069fa051b02adc19386944
- current_digest: 6e42bd4641d0ab0db28c9d66ab0775241614b6a96b069fa051b02adc19386944
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608110235-WCJJRD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
