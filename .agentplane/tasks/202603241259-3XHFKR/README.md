---
id: "202603241259-3XHFKR"
title: "Make runner approval contract honest after Codex probe"
result_summary: "Main-repo runner and recipe execution paths no longer advertise requires_human_approval; targeted tests, builds, lint, and formatting checks passed."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202603241259-8FZ0H6"
tags:
  - "code"
  - "runner"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:13:52.245Z"
  updated_by: "ORCHESTRATOR"
  note: "Approval contract cleanup scope accepted after the live Codex probe proved approval modes are permissive in non-interactive exec."
verification:
  state: "ok"
  updated_at: "2026-03-24T13:25:40.364Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts ; Result: pass ; Evidence: 7 files, 81 tests passed. Scope: runner, recipe, and CLI approval-contract cleanup in the main repo. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build ; Result: pass ; Evidence: both package builds exited 0. Scope: touched runner and recipe execution code. Command: bunx eslint ... and bunx prettier --check ... on touched main-repo files ; Result: pass ; Evidence: no lint or formatting violations. Scope: touched main-repo files. Skipped: generated recipe inventory or submodule schema regeneration. Reason: agentplane-recipes catalog sync requires separate submodule git history and is intentionally deferred. Risk: external catalog data may still advertise requires_human_approval until the follow-up sync task lands. Approval: user-approved continuation and documented follow-up scope."
commit:
  hash: "55f17d0aa5b9c61e35a457af2fced748694015a6"
  message: "✅ 3XHFKR code: done"
comments:
  -
    author: "CODER"
    body: "Start: remove the non-enforceable requires_human_approval field from recipe and runner execution surfaces, update affected tests and generated artifacts, and keep the diff scoped to approval-contract cleanup only."
  -
    author: "CODER"
    body: "Verified: removed the non-enforceable runner approval field from the main-repo execution surfaces and rewired refusal coverage to honest sandbox-based checks."
events:
  -
    type: "status"
    at: "2026-03-24T13:14:02.472Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the non-enforceable requires_human_approval field from recipe and runner execution surfaces, update affected tests and generated artifacts, and keep the diff scoped to approval-contract cleanup only."
  -
    type: "verify"
    at: "2026-03-24T13:25:40.364Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts ; Result: pass ; Evidence: 7 files, 81 tests passed. Scope: runner, recipe, and CLI approval-contract cleanup in the main repo. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build ; Result: pass ; Evidence: both package builds exited 0. Scope: touched runner and recipe execution code. Command: bunx eslint ... and bunx prettier --check ... on touched main-repo files ; Result: pass ; Evidence: no lint or formatting violations. Scope: touched main-repo files. Skipped: generated recipe inventory or submodule schema regeneration. Reason: agentplane-recipes catalog sync requires separate submodule git history and is intentionally deferred. Risk: external catalog data may still advertise requires_human_approval until the follow-up sync task lands. Approval: user-approved continuation and documented follow-up scope."
  -
    type: "status"
    at: "2026-03-24T13:27:16.230Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: removed the non-enforceable runner approval field from the main-repo execution surfaces and rewired refusal coverage to honest sandbox-based checks."
doc_version: 3
doc_updated_at: "2026-03-24T13:27:16.230Z"
doc_updated_by: "CODER"
description: "Use the measured Codex approval-mode behavior to either map requires_human_approval natively or remove the field from runner execution surfaces that cannot enforce it honestly."
sections:
  Summary: |-
    Make runner approval contract honest after Codex probe
    
    Use the measured Codex approval-mode behavior to either map requires_human_approval natively or remove the field from runner execution surfaces that cannot enforce it honestly.
  Scope: |-
    - In scope: remove requires_human_approval from the main-repo runner and recipe execution surfaces that currently pretend to enforce it.
    - Out of scope: agentplane-recipes submodule/schema/catalog sync, which requires separate git history handling.
  Plan: |-
    1. Remove requires_human_approval from main-repo recipe parsing, resolved run_profile types, runner env export, adapter capability declarations, and runner preflight compatibility checks.
    2. Update affected tests and fixtures so refusal coverage stays on honest sandbox-based enforcement paths.
    3. Run targeted runner/recipe/CLI tests plus source builds, record verification evidence, and finish with one task-scoped commit.
  Verify Steps: |-
    1. Run focused runner, recipe, and CLI tests covering removal of requires_human_approval and sandbox-based refusal paths.
    2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build.
    3. Run eslint and prettier on the touched main-repo files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T13:25:40.364Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts ; Result: pass ; Evidence: 7 files, 81 tests passed. Scope: runner, recipe, and CLI approval-contract cleanup in the main repo. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build ; Result: pass ; Evidence: both package builds exited 0. Scope: touched runner and recipe execution code. Command: bunx eslint ... and bunx prettier --check ... on touched main-repo files ; Result: pass ; Evidence: no lint or formatting violations. Scope: touched main-repo files. Skipped: generated recipe inventory or submodule schema regeneration. Reason: agentplane-recipes catalog sync requires separate submodule git history and is intentionally deferred. Risk: external catalog data may still advertise requires_human_approval until the follow-up sync task lands. Approval: user-approved continuation and documented follow-up scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:25:02.638Z, excerpt_hash=sha256:a7038695d852e70700fe6ecd525bb48267dfee075a74c02f07c149e9618d6b3e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- agentplane-recipes catalog sync is intentionally deferred because it requires separate submodule git history and would violate the single main-repo commit boundary for this task."
id_source: "generated"
---
## Summary

Make runner approval contract honest after Codex probe

Use the measured Codex approval-mode behavior to either map requires_human_approval natively or remove the field from runner execution surfaces that cannot enforce it honestly.

## Scope

- In scope: remove requires_human_approval from the main-repo runner and recipe execution surfaces that currently pretend to enforce it.
- Out of scope: agentplane-recipes submodule/schema/catalog sync, which requires separate git history handling.

## Plan

1. Remove requires_human_approval from main-repo recipe parsing, resolved run_profile types, runner env export, adapter capability declarations, and runner preflight compatibility checks.
2. Update affected tests and fixtures so refusal coverage stays on honest sandbox-based enforcement paths.
3. Run targeted runner/recipe/CLI tests plus source builds, record verification evidence, and finish with one task-scoped commit.

## Verify Steps

1. Run focused runner, recipe, and CLI tests covering removal of requires_human_approval and sandbox-based refusal paths.
2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build.
3. Run eslint and prettier on the touched main-repo files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T13:25:40.364Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/codex-smoke.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts ; Result: pass ; Evidence: 7 files, 81 tests passed. Scope: runner, recipe, and CLI approval-contract cleanup in the main repo. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build ; Result: pass ; Evidence: both package builds exited 0. Scope: touched runner and recipe execution code. Command: bunx eslint ... and bunx prettier --check ... on touched main-repo files ; Result: pass ; Evidence: no lint or formatting violations. Scope: touched main-repo files. Skipped: generated recipe inventory or submodule schema regeneration. Reason: agentplane-recipes catalog sync requires separate submodule git history and is intentionally deferred. Risk: external catalog data may still advertise requires_human_approval until the follow-up sync task lands. Approval: user-approved continuation and documented follow-up scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:25:02.638Z, excerpt_hash=sha256:a7038695d852e70700fe6ecd525bb48267dfee075a74c02f07c149e9618d6b3e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- agentplane-recipes catalog sync is intentionally deferred because it requires separate submodule git history and would violate the single main-repo commit boundary for this task.
