---
id: "202606031942-Y9BSF3"
title: "Add structured feedback issue triage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T19:42:54.805Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T19:54:27.102Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Result: pass, 11 tests. Scope: insights triage and issue dry-run behavior. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts. Result: pass, 26 tests. Scope: command catalog/help snapshot. Command: bun run docs:cli:check. Result: pass. Scope: CLI docs freshness. Command: bun run typecheck. Result: pass. Scope: TypeScript project build. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement structured feedback issue triage in the dedicated branch_pr worktree, preserving required agent-written context while adding privacy-bounded CLI-generated diagnostic findings."
events:
  -
    type: "status"
    at: "2026-06-03T19:43:22.806Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement structured feedback issue triage in the dedicated branch_pr worktree, preserving required agent-written context while adding privacy-bounded CLI-generated diagnostic findings."
  -
    type: "verify"
    at: "2026-06-03T19:54:27.102Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Result: pass, 11 tests. Scope: insights triage and issue dry-run behavior. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts. Result: pass, 26 tests. Scope: command catalog/help snapshot. Command: bun run docs:cli:check. Result: pass. Scope: CLI docs freshness. Command: bun run typecheck. Result: pass. Scope: TypeScript project build. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: policy routing."
doc_version: 3
doc_updated_at: "2026-06-03T19:54:27.133Z"
doc_updated_by: "CODER"
description: "Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis."
sections:
  Summary: |-
    Add structured feedback issue triage

    Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.
  Scope: |-
    - In scope: Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.
    - Out of scope: unrelated refactors not required for "Add structured feedback issue triage".
  Plan: "Implement a privacy-bounded insights triage surface for feedback issues. Scope: add an insights triage subcommand with at least a startup-routing preset, add insights issue --triage <preset> integration that appends structured triage while preserving the required agent-written context for E_INTERNAL, update command docs/help generation as needed, and add focused tests for triage output and issue dry-run rendering. Verify with targeted insights tests, CLI help/docs generation checks if affected, ap task verify-show, and routing validation."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts`. Expected: insights report, triage, and issue dry-run tests pass.
    2. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: help catalog and snapshots pass with insights triage listed.
    3. Run `bun run docs:cli:check`. Expected: generated CLI reference remains fresh.
    4. Run `bun run typecheck`. Expected: TypeScript project build succeeds.
    5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T19:54:27.102Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Result: pass, 11 tests. Scope: insights triage and issue dry-run behavior. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts. Result: pass, 26 tests. Scope: command catalog/help snapshot. Command: bun run docs:cli:check. Result: pass. Scope: CLI docs freshness. Command: bun run typecheck. Result: pass. Scope: TypeScript project build. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T19:53:59.643Z, excerpt_hash=sha256:a29bcc81002dcaa1d97a8e04642911abf7361d393ee41d3df2b143edfa0d1ce4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031942-Y9BSF3-add-structured-feedback-issue-triage/.agentplane/tasks/202606031942-Y9BSF3/blueprint/resolved-snapshot.json
    - old_digest: 5b43669e50f4928a767f8e1762ecf59e5a6e3786d8e6271a411007a104638bfb
    - current_digest: 5b43669e50f4928a767f8e1762ecf59e5a6e3786d8e6271a411007a104638bfb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606031942-Y9BSF3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add structured feedback issue triage

Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.

## Scope

- In scope: Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.
- Out of scope: unrelated refactors not required for "Add structured feedback issue triage".

## Plan

Implement a privacy-bounded insights triage surface for feedback issues. Scope: add an insights triage subcommand with at least a startup-routing preset, add insights issue --triage <preset> integration that appends structured triage while preserving the required agent-written context for E_INTERNAL, update command docs/help generation as needed, and add focused tests for triage output and issue dry-run rendering. Verify with targeted insights tests, CLI help/docs generation checks if affected, ap task verify-show, and routing validation.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts`. Expected: insights report, triage, and issue dry-run tests pass.
2. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: help catalog and snapshots pass with insights triage listed.
3. Run `bun run docs:cli:check`. Expected: generated CLI reference remains fresh.
4. Run `bun run typecheck`. Expected: TypeScript project build succeeds.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T19:54:27.102Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Result: pass, 11 tests. Scope: insights triage and issue dry-run behavior. Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts. Result: pass, 26 tests. Scope: command catalog/help snapshot. Command: bun run docs:cli:check. Result: pass. Scope: CLI docs freshness. Command: bun run typecheck. Result: pass. Scope: TypeScript project build. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T19:53:59.643Z, excerpt_hash=sha256:a29bcc81002dcaa1d97a8e04642911abf7361d393ee41d3df2b143edfa0d1ce4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031942-Y9BSF3-add-structured-feedback-issue-triage/.agentplane/tasks/202606031942-Y9BSF3/blueprint/resolved-snapshot.json
- old_digest: 5b43669e50f4928a767f8e1762ecf59e5a6e3786d8e6271a411007a104638bfb
- current_digest: 5b43669e50f4928a767f8e1762ecf59e5a6e3786d8e6271a411007a104638bfb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606031942-Y9BSF3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
