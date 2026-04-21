---
id: "202604211311-6RM7SK"
title: "Make command catalog a thin registry fan-in"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211311-BA2037"
tags:
  - "architecture"
  - "cli"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run docs:cli:check"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:30.786Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:39:13.962Z"
  updated_by: "CODER"
  note: "Command: bun run arch:check; Result: pass. Command: bun run docs:cli:check; Result: pass; Evidence: cli-reference generated output unchanged. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: making command-catalog.ts a thin registry fan-in after loader domain split, preserving command graph semantics and docs output."
events:
  -
    type: "status"
    at: "2026-04-21T13:21:57.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: making command-catalog.ts a thin registry fan-in after loader domain split, preserving command graph semantics and docs output."
  -
    type: "verify"
    at: "2026-04-21T13:39:13.962Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run arch:check; Result: pass. Command: bun run docs:cli:check; Result: pass; Evidence: cli-reference generated output unchanged. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run."
doc_version: 3
doc_updated_at: "2026-04-21T13:39:13.989Z"
doc_updated_by: "CODER"
description: "Refactor command-catalog.ts and command-catalog/{task,core,project,lifecycle}.ts so they assemble registry entries without owning shared types or importing loaders back through cycles."
sections:
  Summary: |-
    Make command catalog a thin registry fan-in
    
    Refactor command-catalog.ts and command-catalog/{task,core,project,lifecycle}.ts so they assemble registry entries without owning shared types or importing loaders back through cycles.
  Scope: |-
    - In scope: Refactor command-catalog.ts and command-catalog/{task,core,project,lifecycle}.ts so they assemble registry entries without owning shared types or importing loaders back through cycles.
    - Out of scope: unrelated refactors not required for "Make command catalog a thin registry fan-in".
  Plan: "Scope: remove the T-shaped cycle between catalog aggregate, domain catalogs, shared command module types, and loaders. Steps: 1. Move any remaining shared type ownership to the kernel. 2. Convert command-catalog.ts into a registry fan-in with no loader knowledge. 3. Ensure domain catalog files do not import aggregate catalog types from command-catalog.ts. 4. Regenerate/check CLI reference if command docs are affected. Acceptance: dep-cruiser cycle baseline is lower; CLI docs freshness and command catalog contract tests pass."
  Verify Steps: |-
    1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:39:13.962Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run arch:check; Result: pass. Command: bun run docs:cli:check; Result: pass; Evidence: cli-reference generated output unchanged. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:57.788Z, excerpt_hash=sha256:5219dde9ab945675f7f8c03614d0d6000d748c350111ea43965c0043b5deffb2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make command catalog a thin registry fan-in

Refactor command-catalog.ts and command-catalog/{task,core,project,lifecycle}.ts so they assemble registry entries without owning shared types or importing loaders back through cycles.

## Scope

- In scope: Refactor command-catalog.ts and command-catalog/{task,core,project,lifecycle}.ts so they assemble registry entries without owning shared types or importing loaders back through cycles.
- Out of scope: unrelated refactors not required for "Make command catalog a thin registry fan-in".

## Plan

Scope: remove the T-shaped cycle between catalog aggregate, domain catalogs, shared command module types, and loaders. Steps: 1. Move any remaining shared type ownership to the kernel. 2. Convert command-catalog.ts into a registry fan-in with no loader knowledge. 3. Ensure domain catalog files do not import aggregate catalog types from command-catalog.ts. 4. Regenerate/check CLI reference if command docs are affected. Acceptance: dep-cruiser cycle baseline is lower; CLI docs freshness and command catalog contract tests pass.

## Verify Steps

1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:39:13.962Z — VERIFY — ok

By: CODER

Note: Command: bun run arch:check; Result: pass. Command: bun run docs:cli:check; Result: pass; Evidence: cli-reference generated output unchanged. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --pool=forks --maxWorkers 4; Result: pass via combined targeted run.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:57.788Z, excerpt_hash=sha256:5219dde9ab945675f7f8c03614d0d6000d748c350111ea43965c0043b5deffb2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
