---
id: "202607131641-Z7NE99"
title: "Align master and agent prompts with GPT-5.6 guidance"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "code"
  - "prompting"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run agents:check"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts"
  - "git status --short --untracked-files=all"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-13T16:42:43.054Z"
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
    body: "Start: align the canonical master prompt and all bundled agent profiles with GPT-5.6 guidance, preserve compatibility, sync managed mirrors, and run the approved verification contract."
events:
  -
    type: "status"
    at: "2026-07-13T16:44:02.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align the canonical master prompt and all bundled agent profiles with GPT-5.6 guidance, preserve compatibility, sync managed mirrors, and run the approved verification contract."
doc_version: 3
doc_updated_at: "2026-07-13T16:44:02.261Z"
doc_updated_by: "CODER"
description: "Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops."
sections:
  Summary: |-
    Align master and agent prompts with GPT-5.6 guidance

    Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops.
  Scope: "In scope: packages/agentplane/assets/AGENTS.md; all packages/agentplane/assets/agents/*.json profiles; synchronized .agentplane/agents/*.json mirrors; GPT-5.6 prompt-contract diagnostics and targeted tests under packages/agentplane/src/runtime/prompt-modules; docs/developer/modular-prompt-assembly.mdx; task and PR artifacts. Out of scope: agentplane-loops, recipe-owned prompts, provider/model defaults, API migration, release/version changes, and unrelated policy modules."
  Plan: "1. Audit the canonical master prompt and every bundled agent profile against the official GPT-5.6 guidance. 2. Centralize shared autonomy, tool-routing, response-length, evidence, and completion rules in the master prompt while preserving enforcement-backed invariants. 3. Make minimal role-specific edits across all agent profiles, removing duplicated gateway scaffolding and retaining product-specific constraints. 4. Replace the GPT-5.5-labelled diagnostic contract with a GPT-5.6 contract while preserving the old exported function as a compatibility alias. 5. Synchronize managed agent mirrors and update the canonical developer contract documentation. 6. Run all declared checks, record evidence, review the diff, publish the task PR, and integrate it into main through AgentPlane."
  Verify Steps: |-
    1. Run bun run agents:check. Expected: canonical and managed agent profiles are identical.
    2. Run bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts. Expected: prompt source parity, GPT-5.6 outcome contract, compatibility alias, and bundled profile diagnostics pass.
    3. Run bun run lint:core. Expected: no lint errors in changed source or tests.
    4. Run bun run typecheck. Expected: TypeScript build succeeds.
    5. Run node .agentplane/policy/check-routing.mjs. Expected: gateway and policy budgets, markers, imports, and routes pass.
    6. Run ap doctor. Expected: no task-introduced prompt, policy, or managed-tree errors.
    7. Review the complete diff against the official GPT-5.6 guidance. Expected: every bundled profile was audited; shared rules occur once in the gateway; role-specific requirements and public compatibility are preserved.
    8. Run git status --short --untracked-files=all. Expected: only task-owned tracked artifacts remain before commit and no unreviewed untracked files remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation commit and regenerate managed agent mirrors from the prior canonical assets. The compatibility alias prevents an immediate downstream API break during rollback or upgrade."
  Findings: "Initial audit: main matches origin/main at 507940f05; agentplane-loops is excluded. All 15 bundled profiles already expose Goal, Success criteria, Constraints, Stop rules, and Output. The main measured gaps are duplicated gateway constraints across roles, stale GPT-5.5 contract naming, broad brevity wording, and shared routing/autonomy rules spread across role prompts."
id_source: "generated"
---
## Summary

Align master and agent prompts with GPT-5.6 guidance

Update canonical master and agent prompts on main using official GPT-5.6 guidance; preserve diagnostic compatibility, sync managed mirrors, document the contract, validate changes, and do not touch agentplane-loops.

## Scope

In scope: packages/agentplane/assets/AGENTS.md; all packages/agentplane/assets/agents/*.json profiles; synchronized .agentplane/agents/*.json mirrors; GPT-5.6 prompt-contract diagnostics and targeted tests under packages/agentplane/src/runtime/prompt-modules; docs/developer/modular-prompt-assembly.mdx; task and PR artifacts. Out of scope: agentplane-loops, recipe-owned prompts, provider/model defaults, API migration, release/version changes, and unrelated policy modules.

## Plan

1. Audit the canonical master prompt and every bundled agent profile against the official GPT-5.6 guidance. 2. Centralize shared autonomy, tool-routing, response-length, evidence, and completion rules in the master prompt while preserving enforcement-backed invariants. 3. Make minimal role-specific edits across all agent profiles, removing duplicated gateway scaffolding and retaining product-specific constraints. 4. Replace the GPT-5.5-labelled diagnostic contract with a GPT-5.6 contract while preserving the old exported function as a compatibility alias. 5. Synchronize managed agent mirrors and update the canonical developer contract documentation. 6. Run all declared checks, record evidence, review the diff, publish the task PR, and integrate it into main through AgentPlane.

## Verify Steps

1. Run bun run agents:check. Expected: canonical and managed agent profiles are identical.
2. Run bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/gpt56-contract.test.ts. Expected: prompt source parity, GPT-5.6 outcome contract, compatibility alias, and bundled profile diagnostics pass.
3. Run bun run lint:core. Expected: no lint errors in changed source or tests.
4. Run bun run typecheck. Expected: TypeScript build succeeds.
5. Run node .agentplane/policy/check-routing.mjs. Expected: gateway and policy budgets, markers, imports, and routes pass.
6. Run ap doctor. Expected: no task-introduced prompt, policy, or managed-tree errors.
7. Review the complete diff against the official GPT-5.6 guidance. Expected: every bundled profile was audited; shared rules occur once in the gateway; role-specific requirements and public compatibility are preserved.
8. Run git status --short --untracked-files=all. Expected: only task-owned tracked artifacts remain before commit and no unreviewed untracked files remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit and regenerate managed agent mirrors from the prior canonical assets. The compatibility alias prevents an immediate downstream API break during rollback or upgrade.

## Findings

Initial audit: main matches origin/main at 507940f05; agentplane-loops is excluded. All 15 bundled profiles already expose Goal, Success criteria, Constraints, Stop rules, and Output. The main measured gaps are duplicated gateway constraints across roles, stale GPT-5.5 contract naming, broad brevity wording, and shared routing/autonomy rules spread across role prompts.
