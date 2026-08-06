---
id: "202608062021-Z0X584"
title: "Converge generated agent guidance on the supervisor-first protocol"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "prompts"
  - "supervisor"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts"
  - "bun run docs:onboarding:check"
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/command-guide.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:25:32.603Z"
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
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T20:27:51.775Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T20:27:51.775Z"
doc_updated_by: "DOCS"
description: "Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policy modules, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces."
sections:
  Summary: |-
    Converge generated agent guidance on the supervisor-first protocol

    Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
  Scope: |-
    - In scope: Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
    - Out of scope: unrelated refactors not required for "Converge generated agent guidance on the supervisor-first protocol".
  Plan: "1. Inventory every bundled policy, generated gateway, skill, README, and workflow-document surface that addresses an external or managed agent. 2. Define one normal supervisor-first route: task active, task advance with typed semantic results, or task run for a configured managed runner; move work start, start-ready, verify, finish, integrate, cleanup, Git, and PR choreography to explicitly operator/recovery-only sections. 3. Rewrite the bundled Markdown assets and public docs, including complete managed and external first workflows without hidden manual transitions. 4. Add asset/generation contract tests so installed gateways and skills cannot regress to manual lifecycle cognition. 5. Regenerate docs and validate gateway policy budgets."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    - bun run docs:onboarding:check
    - bun run docs:cli:check
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

Converge generated agent guidance on the supervisor-first protocol

Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.

## Scope

- In scope: Replace manual lifecycle choreography in bundled AGENTS.md, direct and branch_pr policies, role and quickstart guides, Codex skill, README, and workflow docs with task active, task advance, and task run as the only normal agent paths; provide one copy-paste executable first workflow and retain manual commands only as explicit operator or recovery interfaces.
- Out of scope: unrelated refactors not required for "Converge generated agent guidance on the supervisor-first protocol".

## Plan

1. Inventory every bundled policy, generated gateway, skill, README, and workflow-document surface that addresses an external or managed agent. 2. Define one normal supervisor-first route: task active, task advance with typed semantic results, or task run for a configured managed runner; move work start, start-ready, verify, finish, integrate, cleanup, Git, and PR choreography to explicitly operator/recovery-only sections. 3. Rewrite the bundled Markdown assets and public docs, including complete managed and external first workflows without hidden manual transitions. 4. Add asset/generation contract tests so installed gateways and skills cannot regress to manual lifecycle cognition. 5. Regenerate docs and validate gateway policy budgets.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
- bun run docs:onboarding:check
- bun run docs:cli:check
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
