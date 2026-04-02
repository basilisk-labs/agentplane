---
id: "202604021851-DBYVXK"
title: "Auto-sync branch_pr PR artifacts on lifecycle boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604021851-2DHT5H"
tags:
  - "code"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T18:53:36.411Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user audit implementation request on 2026-04-03."
verification:
  state: "ok"
  updated_at: "2026-04-02T19:39:48.682Z"
  updated_by: "CODER"
  note: "Command: bun run lint:core && bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: auto-sync PR artifacts from branch_pr lifecycle boundaries and leave pr open/update as compatibility wrappers."
events:
  -
    type: "status"
    at: "2026-04-02T19:23:37.821Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auto-sync PR artifacts from branch_pr lifecycle boundaries and leave pr open/update as compatibility wrappers."
  -
    type: "verify"
    at: "2026-04-02T19:39:48.682Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run lint:core && bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000"
doc_version: 3
doc_updated_at: "2026-04-02T19:39:48.695Z"
doc_updated_by: "CODER"
description: "Wire PR artifact sync into start-ready, PR note, verify/integrate boundaries, and keep pr open/pr update only as compatibility and recovery wrappers so happy-path workflow no longer needs manual PR maintenance steps."
sections:
  Summary: |-
    Auto-sync branch_pr PR artifacts on lifecycle boundaries
    
    Wire PR artifact sync into start-ready, PR note, verify/integrate boundaries, and keep pr open/pr update only as compatibility and recovery wrappers so happy-path workflow no longer needs manual PR maintenance steps.
  Scope: |-
    - In scope: Wire PR artifact sync into start-ready, PR note, verify/integrate boundaries, and keep pr open/pr update only as compatibility and recovery wrappers so happy-path workflow no longer needs manual PR maintenance steps.
    - Out of scope: unrelated refactors not required for "Auto-sync branch_pr PR artifacts on lifecycle boundaries".
  Plan: |-
    1. Hook PR artifact sync into branch_pr lifecycle boundaries that already carry task meaning.
    2. Remove pr open/pr update from normal workflow while keeping them as thin compatibility wrappers.
    3. Cover new happy path and wrapper behavior with lifecycle regressions.
  Verify Steps: |-
    1. Start work or record a PR note on a branch_pr task without manual pr open/pr update. Expected: required PR artifacts exist and refresh automatically on the lifecycle boundary.
    2. Run pr open and pr update explicitly after the change. Expected: both still work as thin compatibility or recovery commands.
    3. Run targeted lifecycle and PR-flow regressions. Expected: touched tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T19:39:48.682Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run lint:core && bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:23:37.850Z, excerpt_hash=sha256:37772b69b65962e4c0d595e22e1fffe67972a3f196f4bb7210f44ddece4666d8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Auto-sync branch_pr PR artifacts on lifecycle boundaries

Wire PR artifact sync into start-ready, PR note, verify/integrate boundaries, and keep pr open/pr update only as compatibility and recovery wrappers so happy-path workflow no longer needs manual PR maintenance steps.

## Scope

- In scope: Wire PR artifact sync into start-ready, PR note, verify/integrate boundaries, and keep pr open/pr update only as compatibility and recovery wrappers so happy-path workflow no longer needs manual PR maintenance steps.
- Out of scope: unrelated refactors not required for "Auto-sync branch_pr PR artifacts on lifecycle boundaries".

## Plan

1. Hook PR artifact sync into branch_pr lifecycle boundaries that already carry task meaning.
2. Remove pr open/pr update from normal workflow while keeping them as thin compatibility wrappers.
3. Cover new happy path and wrapper behavior with lifecycle regressions.

## Verify Steps

1. Start work or record a PR note on a branch_pr task without manual pr open/pr update. Expected: required PR artifacts exist and refresh automatically on the lifecycle boundary.
2. Run pr open and pr update explicitly after the change. Expected: both still work as thin compatibility or recovery commands.
3. Run targeted lifecycle and PR-flow regressions. Expected: touched tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T19:39:48.682Z — VERIFY — ok

By: CODER

Note: Command: bun run lint:core && bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:23:37.850Z, excerpt_hash=sha256:37772b69b65962e4c0d595e22e1fffe67972a3f196f4bb7210f44ddece4666d8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
