---
id: "202608061742-G2ZA4T"
title: "Redesign init around safe defaults and progressive disclosure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202608061646-30TKV4"
tags:
  - "cli"
  - "code"
  - "onboarding"
  - "ux"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:onboarding:check"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.init.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T17:43:24.904Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-06T23:43:38.216Z"
  updated_by: "TESTER"
  note: "Progressive init is verified: 27 focused tests pass, onboarding and generated CLI docs are aligned, TypeScript compiles, and policy routing remains valid."
  attempts: 0
commit:
  hash: "1b63fb8813a54cc74aa197719a5c81e759110d27"
  message: "✨ G2ZA4T ux: add progressive setup flow"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: progressive quick/advanced init flow, exact first-task handoff, tool-specific defaults, and supervisor-first setup docs."
events:
  -
    type: "status"
    at: "2026-08-06T23:23:34.973Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T23:43:10.919Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: progressive quick/advanced init flow, exact first-task handoff, tool-specific defaults, and supervisor-first setup docs."
  -
    type: "verify"
    at: "2026-08-06T23:43:38.216Z"
    author: "TESTER"
    state: "ok"
    note: "Progressive init is verified: 27 focused tests pass, onboarding and generated CLI docs are aligned, TypeScript compiles, and policy routing remains valid."
doc_version: 3
doc_updated_at: "2026-08-06T23:43:39.071Z"
doc_updated_by: "CODER"
description: "Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step."
sections:
  Summary: |-
    Redesign init around safe defaults and progressive disclosure

    Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.
  Scope: |-
    - In scope: Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.
    - Out of scope: unrelated refactors not required for "Redesign init around safe defaults and progressive disclosure".
  Plan: "1. Replace the default init questionnaire with a short path that detects repository facts and applies explicit safe defaults. 2. Ask only workflow, automation/provider, and policy decisions that materially change generated configuration; keep advanced controls behind one optional path. 3. Render a final configuration summary with reasons and the exact first-task command. 4. Preserve non-interactive flags and existing config compatibility. 5. Cover new, existing, non-interactive, cancelled, and advanced init paths. Approved scope: packages/agentplane/src/commands/init/**, packages/agentplane/src/cli/run-cli/commands/init/**, packages/agentplane/src/cli/**/*init*.test.ts, docs/user/**, README.md, generated onboarding artifacts, and focused snapshots."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init
    - bun run docs:onboarding:check
    - bun run docs:cli:check
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T23:43:38.216Z — VERIFY — ok

    By: TESTER

    Note: Progressive init is verified: 27 focused tests pass, onboarding and generated CLI docs are aligned, TypeScript compiles, and policy routing remains valid.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T23:43:10.919Z, excerpt_hash=sha256:7e72d145f9d263a8ae6ddc091eb4cbf3aa6d1b045a24a7b0df8263a9b80b4ce7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061742-G2ZA4T-redesign-init-around-safe-defaults-and-progressi/.agentplane/tasks/202608061742-G2ZA4T/blueprint/resolved-snapshot.json
    - old_digest: 8bbdf779570acb8261d631105f77c1d2e753d8307f1d1e83bf7e015dfedd8cfb
    - current_digest: 8bbdf779570acb8261d631105f77c1d2e753d8307f1d1e83bf7e015dfedd8cfb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061742-G2ZA4T

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608061742-G2ZA4T
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the init UX commit. Existing non-interactive flags and generated configuration remain the compatibility baseline; no user repository content is migrated destructively."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "762d0a6ce3d9c3b6a8e3f0781875e928abe81317"
    version: 1
id_source: "generated"
---
## Summary

Redesign init around safe defaults and progressive disclosure

Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.

## Scope

- In scope: Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.
- Out of scope: unrelated refactors not required for "Redesign init around safe defaults and progressive disclosure".

## Plan

1. Replace the default init questionnaire with a short path that detects repository facts and applies explicit safe defaults. 2. Ask only workflow, automation/provider, and policy decisions that materially change generated configuration; keep advanced controls behind one optional path. 3. Render a final configuration summary with reasons and the exact first-task command. 4. Preserve non-interactive flags and existing config compatibility. 5. Cover new, existing, non-interactive, cancelled, and advanced init paths. Approved scope: packages/agentplane/src/commands/init/**, packages/agentplane/src/cli/run-cli/commands/init/**, packages/agentplane/src/cli/**/*init*.test.ts, docs/user/**, README.md, generated onboarding artifacts, and focused snapshots.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli/commands/init
- bun run docs:onboarding:check
- bun run docs:cli:check
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T23:43:38.216Z — VERIFY — ok

By: TESTER

Note: Progressive init is verified: 27 focused tests pass, onboarding and generated CLI docs are aligned, TypeScript compiles, and policy routing remains valid.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T23:43:10.919Z, excerpt_hash=sha256:7e72d145f9d263a8ae6ddc091eb4cbf3aa6d1b045a24a7b0df8263a9b80b4ce7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061742-G2ZA4T-redesign-init-around-safe-defaults-and-progressi/.agentplane/tasks/202608061742-G2ZA4T/blueprint/resolved-snapshot.json
- old_digest: 8bbdf779570acb8261d631105f77c1d2e753d8307f1d1e83bf7e015dfedd8cfb
- current_digest: 8bbdf779570acb8261d631105f77c1d2e753d8307f1d1e83bf7e015dfedd8cfb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061742-G2ZA4T

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608061742-G2ZA4T
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the init UX commit. Existing non-interactive flags and generated configuration remain the compatibility baseline; no user repository content is migrated destructively.

## Findings
