---
id: "202603271940-EG3B0C"
title: "Automate branch_pr task closure after hosted merge"
result_summary: "Merged via PR #31."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "github"
  - "branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T19:41:20.241Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T20:06:52.295Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/command-guide.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check scripts/prepare-hosted-task-closure.mjs .github/workflows/task-hosted-close.yml docs/user/branching-and-pr-artifacts.mdx packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: merged hosted PR events now map to deterministic hosted closure metadata, task hosted-close writes canonical DONE task artifacts on an automation branch, Task Hosted Close opens an auto-merged follow-up PR, and close commits now reset the rebuildable task index cache after reconcile so branch_pr hosted closure does not fail on a dirty tasks-index cache."
commit:
  hash: "8eda0b3cd66feebf34d82d4f6493c42c5972bc57"
  message: "♻️ EG3B0C workflow: degrade hosted closure gracefully under org PR policy (#31)"
comments:
  -
    author: "CODER"
    body: "Start: replace the local branch_pr close-commit tail with a hosted closure automation path that records DONE task artifacts from merged PR metadata on the server, so main no longer needs a manual finish-only commit after each hosted merge."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #31 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-03-27T19:41:46.282Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the local branch_pr close-commit tail with a hosted closure automation path that records DONE task artifacts from merged PR metadata on the server, so main no longer needs a manual finish-only commit after each hosted merge."
  -
    type: "verify"
    at: "2026-03-27T20:06:52.295Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/command-guide.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check scripts/prepare-hosted-task-closure.mjs .github/workflows/task-hosted-close.yml docs/user/branching-and-pr-artifacts.mdx packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: merged hosted PR events now map to deterministic hosted closure metadata, task hosted-close writes canonical DONE task artifacts on an automation branch, Task Hosted Close opens an auto-merged follow-up PR, and close commits now reset the rebuildable task index cache after reconcile so branch_pr hosted closure does not fail on a dirty tasks-index cache."
  -
    type: "status"
    at: "2026-03-27T20:38:38.265Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #31 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-03-27T20:38:38.272Z"
doc_updated_by: "INTEGRATOR"
description: "Eliminate manual local base close commits by introducing a hosted branch_pr closure path that records merged task state on the server after PR merge, so local main no longer needs to run finish --close-commit just to converge task projection."
sections:
  Summary: |-
    Automate branch_pr task closure after hosted merge
    
    Eliminate manual local base close commits by introducing a hosted branch_pr closure path that records merged task state on the server after PR merge, so local main no longer needs to run finish --close-commit just to converge task projection.
  Scope: |-
    - In scope: Eliminate manual local base close commits by introducing a hosted branch_pr closure path that records merged task state on the server after PR merge, so local main no longer needs to run finish --close-commit just to converge task projection.
    - Out of scope: unrelated refactors not required for "Automate branch_pr task closure after hosted merge".
  Plan: |-
    1. Add a hosted branch_pr closure workflow triggered after a task PR merges into main; derive the task id and merged SHA deterministically from the merged PR payload and generate the exact task artifact update on a server-side branch instead of relying on a local base close commit.
    2. Reuse existing finish/close logic or extract the minimal reusable closure primitive so the hosted flow records DONE state, implementation commit provenance, and tracked task artifacts without duplicating task mutation rules.
    3. Add focused tests and workflow contract checks for task-id extraction, closure branch generation, and no-op/already-closed behavior; then document the new closure path and record any remaining GitHub limitations explicitly.
  Verify Steps: |-
    1. Simulate a merged task PR and run the hosted closure entrypoint. Expected: it derives the task id/merge SHA deterministically, writes only the canonical task artifact scope, and produces a stable closure branch payload.
    2. Re-run the entrypoint for an already-closed or non-task PR input. Expected: the workflow becomes a no-op instead of creating duplicate closure commits or branches.
    3. Run the smallest relevant workflow/script/build/test suite. Expected: the hosted closure path integrates cleanly with existing finish/close semantics and the branch_pr docs/checks stay consistent.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T20:06:52.295Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/command-guide.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check scripts/prepare-hosted-task-closure.mjs .github/workflows/task-hosted-close.yml docs/user/branching-and-pr-artifacts.mdx packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: merged hosted PR events now map to deterministic hosted closure metadata, task hosted-close writes canonical DONE task artifacts on an automation branch, Task Hosted Close opens an auto-merged follow-up PR, and close commits now reset the rebuildable task index cache after reconcile so branch_pr hosted closure does not fail on a dirty tasks-index cache.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T19:41:46.283Z, excerpt_hash=sha256:4336b77fa1e6868928559f9a122964a4beabf1483cb5c6fc435d86193f133e92
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Automate branch_pr task closure after hosted merge

Eliminate manual local base close commits by introducing a hosted branch_pr closure path that records merged task state on the server after PR merge, so local main no longer needs to run finish --close-commit just to converge task projection.

## Scope

- In scope: Eliminate manual local base close commits by introducing a hosted branch_pr closure path that records merged task state on the server after PR merge, so local main no longer needs to run finish --close-commit just to converge task projection.
- Out of scope: unrelated refactors not required for "Automate branch_pr task closure after hosted merge".

## Plan

1. Add a hosted branch_pr closure workflow triggered after a task PR merges into main; derive the task id and merged SHA deterministically from the merged PR payload and generate the exact task artifact update on a server-side branch instead of relying on a local base close commit.
2. Reuse existing finish/close logic or extract the minimal reusable closure primitive so the hosted flow records DONE state, implementation commit provenance, and tracked task artifacts without duplicating task mutation rules.
3. Add focused tests and workflow contract checks for task-id extraction, closure branch generation, and no-op/already-closed behavior; then document the new closure path and record any remaining GitHub limitations explicitly.

## Verify Steps

1. Simulate a merged task PR and run the hosted closure entrypoint. Expected: it derives the task id/merge SHA deterministically, writes only the canonical task artifact scope, and produces a stable closure branch payload.
2. Re-run the entrypoint for an already-closed or non-task PR input. Expected: the workflow becomes a no-op instead of creating duplicate closure commits or branches.
3. Run the smallest relevant workflow/script/build/test suite. Expected: the hosted closure path integrates cleanly with existing finish/close semantics and the branch_pr docs/checks stay consistent.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T20:06:52.295Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/command-guide.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bunx prettier --check scripts/prepare-hosted-task-closure.mjs .github/workflows/task-hosted-close.yml docs/user/branching-and-pr-artifacts.mdx packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: merged hosted PR events now map to deterministic hosted closure metadata, task hosted-close writes canonical DONE task artifacts on an automation branch, Task Hosted Close opens an auto-merged follow-up PR, and close commits now reset the rebuildable task index cache after reconcile so branch_pr hosted closure does not fail on a dirty tasks-index cache.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T19:41:46.283Z, excerpt_hash=sha256:4336b77fa1e6868928559f9a122964a4beabf1483cb5c6fc435d86193f133e92

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
