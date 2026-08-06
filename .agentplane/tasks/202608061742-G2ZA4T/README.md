---
id: "202608061742-G2ZA4T"
title: "Redesign init around safe defaults and progressive disclosure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
    at: "2026-08-06T23:23:34.973Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T23:23:34.973Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the init UX commit. Existing non-interactive flags and generated configuration remain the compatibility baseline; no user repository content is migrated destructively.

## Findings
