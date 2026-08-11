---
id: "202608110235-WCJJRD"
title: "Replace task-create keyword inference with explicit semantic intent"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
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
  updated_at: "2026-08-11T08:37:09.532Z"
  updated_by: "TESTER"
  note: "Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-11T08:38:12.333Z"
  updated_by: "HUMAN"
  note: "Task creation no longer guesses semantic intent from natural-language keywords; deterministic validation remains in the CLI, while unstructured input is handed to PLANNER and the patch keeps its prior JSON field as a deprecated exact alias."
  evaluated_sha: "c7de784fbab8d1f3bc5b6f5c1d8432dddd3e3bb2"
  blueprint_digest: "6e42bd4641d0ab0db28c9d66ab0775241614b6a96b069fa051b02adc19386944"
  evidence_refs:
    - ".agentplane/tasks/202608110235-WCJJRD/quality/20260811-083811948-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/20260811-083811948-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/objects/sha256/a74c7c43bc0435b16b8cc6c983da42a2dd56c97aa3489c0e91b24b75fb993735.md"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/20260811-083811948-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/20260811-083811948-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608110235-WCJJRD/README.md"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/objects/sha256/2767b19416d0115ba10849463f556a1340ba3e93af9a93e9708028850240d9d8.patch"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/objects/sha256/fb5bd1acf6e7e1788bdeb626d59a0dc984d9becc78223e4a4858f48a582e30c4.json"
    - ".agentplane/tasks/202608110235-WCJJRD/verification/20260811083709532-bfd9177b3422d30b.json"
    - ".agentplane/tasks/202608110235-WCJJRD/quality/objects/sha256/401907a8523393cf75cebc6e66ba47c377563c19ea58b2689c0a3bfbe01b846a.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/task/create.command.ts"
    - "packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
    - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
  findings:
    - "The implementation removes ordered keyword tables and routes English, Russian, Japanese, negated, and ambiguous unstructured descriptions to the same semantic_intake_pending boundary."
    - "Partially supplied structured intent fails closed, while complete caller-supplied task kind and mutation scope persist with explicit provenance and existing branch_pr route floors."
    - "The new semantic_intent payload is truthful and the deprecated inferred_intent alias preserves patch-level consumers without restoring inference behavior."
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-11T08:39:31.388Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "1ba74a77559f3df96ba6806231ca05b47adc74a2"
  message: "🚧 WCJJRD task: Record final quality evidence"
comments:
  -
    author: "CODER"
    body: "Start: replace keyword inference with explicit structured semantic intent and a neutral PLANNER intake boundary."
  -
    author: "CODER"
    body: "Implementation committed: task create now accepts explicit structured intent or creates a neutral PLANNER intake without keyword inference."
  -
    author: "CODER"
    body: "Compatibility adjustment committed: retain deprecated JSON inferred_intent as an exact alias of semantic_intent."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-08-11T08:34:09.304Z"
    author: "TESTER"
    state: "ok"
    note: "Verified explicit structured intent and neutral planner intake at c7de784fbab8; all focused, full regression, static, and build gates pass."
  -
    type: "status"
    at: "2026-08-11T08:36:06.536Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Compatibility adjustment committed: retain deprecated JSON inferred_intent as an exact alias of semantic_intent."
    commit: "c7de784fbab8d1f3bc5b6f5c1d8432dddd3e3bb2"
  -
    type: "verify"
    at: "2026-08-11T08:36:28.355Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution."
  -
    type: "verify"
    at: "2026-08-11T08:37:09.532Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution."
  -
    type: "status"
    at: "2026-08-11T08:39:31.388Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "1ba74a77559f3df96ba6806231ca05b47adc74a2"
doc_version: 3
doc_updated_at: "2026-08-11T08:39:31.399Z"
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

    ### 2026-08-11T08:34:09.304Z — VERIFY — ok

    By: TESTER

    Note: Verified explicit structured intent and neutral planner intake at c7de784fbab8; all focused, full regression, static, and build gates pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:94f149cb17f249ab9701aeb7dc0effe93125f058c44892f287447fb3fe5d0184

    Details:

    Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
    Result: pass (4 files, 36 tests).
    Evidence: Explicit structured intent persists exactly; unstructured English, Russian, Japanese, negated, and ambiguous descriptions remain neutral planner intake; help snapshots contain no inference claim.
    Scope: Focused task-create CLI, help, and documentation contracts at implementation commit c7de784fbab8.

    Command: `bun run typecheck` and `bun run lint:core`
    Result: pass.
    Evidence: TypeScript validation and core lint completed with exit code 0 after the compatibility alias change.
    Scope: Public payload types, structured option parsing, persistence, and core source lint at implementation commit c7de784fbab8.

    Command: `bun run test:fast`
    Result: pass (549 files, 3983 tests).
    Evidence: The complete fast regression suite passed after the compatibility alias change.
    Scope: Repository regression coverage including routes, task creation, duplicate locking, and handoff behavior at implementation commit c7de784fbab8.

    Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
    Result: pass.
    Evidence: Prettier, unused-code baseline, hotspot thresholds, and package build completed with exit code 0.
    Scope: Formatting, dead-code, source-size, and distributable build gates at implementation commit c7de784fbab8.

    Command: `git diff --check` and final implementation diff inspection
    Result: pass.
    Evidence: No whitespace errors; ordered keyword tables and the natural-language classifier are absent; only caller-supplied structured semantic fields are validated, otherwise `semantic_intake_pending` is emitted. The deprecated JSON `inferred_intent` field is retained as an exact alias for patch compatibility.
    Scope: Final implementation and test diff at commit c7de784fbab8.

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

    ### 2026-08-11T08:36:28.355Z — VERIFY — ok

    By: TESTER

    Note: Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:3051a093c6caff3cbebf2d02d3fef40f12bc162178c8468b1ba002fa90023147

    Details:

    Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
    Result: pass (4 files, 36 tests).
    Evidence: Reused content-addressed result already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Explicit structured intent, neutral cross-language planner intake, help, and documentation contracts.

    Command: `bun run typecheck` and `bun run lint:core`
    Result: pass.
    Evidence: Reused results already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Public payload types, structured option parsing, persistence, and core source lint.

    Command: `bun run test:fast`
    Result: pass (549 files, 3983 tests).
    Evidence: Reused complete regression result already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Routes, task creation, duplicate locking, handoff behavior, and repository regressions.

    Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
    Result: pass.
    Evidence: Reused static and build results already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Formatting, dead-code, source-size, and distributable build gates.

    Command: `git diff --check` and final implementation diff inspection
    Result: pass.
    Evidence: No whitespace errors; ordered keyword tables and natural-language classifier are absent; the deprecated JSON `inferred_intent` field remains an exact alias for patch compatibility.
    Scope: Final implementation and test diff at commit c7de784fbab8.

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

    ### 2026-08-11T08:37:09.532Z — VERIFY — ok

    By: TESTER

    Note: Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:424ab8992aadb7b22d916a5a91945a9c9b2cde9c9966d392638fcba2b7c89da3

    Details:

    Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
    Result: pass (4 files, 36 tests)
    Evidence: Reused content-addressed result already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Explicit structured intent, neutral cross-language planner intake, help, and documentation contracts.

    Command: `bun run typecheck` and `bun run lint:core`
    Result: pass.
    Evidence: Reused results already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Public payload types, structured option parsing, persistence, and core source lint.

    Command: `bun run test:fast`
    Result: pass (549 files, 3983 tests)
    Evidence: Reused complete regression result already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Routes, task creation, duplicate locking, handoff behavior, and repository regressions.

    Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
    Result: pass.
    Evidence: Reused static and build results already obtained for implementation commit c7de784fbab8; no implementation input changed.
    Scope: Formatting, dead-code, source-size, and distributable build gates.

    Command: `git diff --check` and final implementation diff inspection
    Result: pass.
    Evidence: No whitespace errors; ordered keyword tables and natural-language classifier are absent; the deprecated JSON `inferred_intent` field remains an exact alias for patch compatibility.
    Scope: Final implementation and test diff at commit c7de784fbab8.

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
  implementation_commit:
    hash: "c7de784fbab8d1f3bc5b6f5c1d8432dddd3e3bb2"
    message: "🚧 WCJJRD task: preserve task-create JSON compatibility"
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

### 2026-08-11T08:34:09.304Z — VERIFY — ok

By: TESTER

Note: Verified explicit structured intent and neutral planner intake at c7de784fbab8; all focused, full regression, static, and build gates pass.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:94f149cb17f249ab9701aeb7dc0effe93125f058c44892f287447fb3fe5d0184

Details:

Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
Result: pass (4 files, 36 tests).
Evidence: Explicit structured intent persists exactly; unstructured English, Russian, Japanese, negated, and ambiguous descriptions remain neutral planner intake; help snapshots contain no inference claim.
Scope: Focused task-create CLI, help, and documentation contracts at implementation commit c7de784fbab8.

Command: `bun run typecheck` and `bun run lint:core`
Result: pass.
Evidence: TypeScript validation and core lint completed with exit code 0 after the compatibility alias change.
Scope: Public payload types, structured option parsing, persistence, and core source lint at implementation commit c7de784fbab8.

Command: `bun run test:fast`
Result: pass (549 files, 3983 tests).
Evidence: The complete fast regression suite passed after the compatibility alias change.
Scope: Repository regression coverage including routes, task creation, duplicate locking, and handoff behavior at implementation commit c7de784fbab8.

Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
Result: pass.
Evidence: Prettier, unused-code baseline, hotspot thresholds, and package build completed with exit code 0.
Scope: Formatting, dead-code, source-size, and distributable build gates at implementation commit c7de784fbab8.

Command: `git diff --check` and final implementation diff inspection
Result: pass.
Evidence: No whitespace errors; ordered keyword tables and the natural-language classifier are absent; only caller-supplied structured semantic fields are validated, otherwise `semantic_intake_pending` is emitted. The deprecated JSON `inferred_intent` field is retained as an exact alias for patch compatibility.
Scope: Final implementation and test diff at commit c7de784fbab8.

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

### 2026-08-11T08:36:28.355Z — VERIFY — ok

By: TESTER

Note: Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:3051a093c6caff3cbebf2d02d3fef40f12bc162178c8468b1ba002fa90023147

Details:

Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
Result: pass (4 files, 36 tests).
Evidence: Reused content-addressed result already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Explicit structured intent, neutral cross-language planner intake, help, and documentation contracts.

Command: `bun run typecheck` and `bun run lint:core`
Result: pass.
Evidence: Reused results already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Public payload types, structured option parsing, persistence, and core source lint.

Command: `bun run test:fast`
Result: pass (549 files, 3983 tests).
Evidence: Reused complete regression result already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Routes, task creation, duplicate locking, handoff behavior, and repository regressions.

Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
Result: pass.
Evidence: Reused static and build results already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Formatting, dead-code, source-size, and distributable build gates.

Command: `git diff --check` and final implementation diff inspection
Result: pass.
Evidence: No whitespace errors; ordered keyword tables and natural-language classifier are absent; the deprecated JSON `inferred_intent` field remains an exact alias for patch compatibility.
Scope: Final implementation and test diff at commit c7de784fbab8.

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

### 2026-08-11T08:37:09.532Z — VERIFY — ok

By: TESTER

Note: Verified c7de784fbab8 using unchanged content-addressed evidence; lifecycle metadata did not trigger duplicate test execution.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a592495c95da711ecb80215b6394f03120f4aad2dfdbcaa463af64d31287db66, input_digest=sha256:424ab8992aadb7b22d916a5a91945a9c9b2cde9c9966d392638fcba2b7c89da3

Details:

Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`
Result: pass (4 files, 36 tests)
Evidence: Reused content-addressed result already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Explicit structured intent, neutral cross-language planner intake, help, and documentation contracts.

Command: `bun run typecheck` and `bun run lint:core`
Result: pass.
Evidence: Reused results already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Public payload types, structured option parsing, persistence, and core source lint.

Command: `bun run test:fast`
Result: pass (549 files, 3983 tests)
Evidence: Reused complete regression result already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Routes, task creation, duplicate locking, handoff behavior, and repository regressions.

Command: `bun run format:check`, `bun run knip:check`, `bun run hotspots:check`, and `bun run build`
Result: pass.
Evidence: Reused static and build results already obtained for implementation commit c7de784fbab8; no implementation input changed.
Scope: Formatting, dead-code, source-size, and distributable build gates.

Command: `git diff --check` and final implementation diff inspection
Result: pass.
Evidence: No whitespace errors; ordered keyword tables and natural-language classifier are absent; the deprecated JSON `inferred_intent` field remains an exact alias for patch compatibility.
Scope: Final implementation and test diff at commit c7de784fbab8.

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

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-11T08:39:31.388Z`
