---
id: "202605171232-QB3YP7"
title: "Fix blueprint explain context kind help"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "cli"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T12:33:07.316Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T12:37:46.882Z"
  updated_by: "CODER"
  note: "Focused checks passed: Vitest cli-core help/blueprint tests, docs:cli:check, ESLint on touched TS files, Prettier check, policy routing, and git diff --check."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix blueprint explain help metadata so context is listed as a supported synthetic task kind."
events:
  -
    type: "status"
    at: "2026-05-17T12:33:23.518Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix blueprint explain help metadata so context is listed as a supported synthetic task kind."
  -
    type: "verify"
    at: "2026-05-17T12:37:46.882Z"
    author: "CODER"
    state: "ok"
    note: "Focused checks passed: Vitest cli-core help/blueprint tests, docs:cli:check, ESLint on touched TS files, Prettier check, policy routing, and git diff --check."
doc_version: 3
doc_updated_at: "2026-05-17T12:37:46.890Z"
doc_updated_by: "CODER"
description: "Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests."
sections:
  Summary: |-
    Fix blueprint explain context kind help

    Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.
  Scope: |-
    - In scope: Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.
    - Out of scope: unrelated refactors not required for "Fix blueprint explain context kind help".
  Plan: |-
    1. Update blueprint explain --kind value hint to include context.
    2. Refresh affected CLI help snapshots if needed.
    3. Verify blueprint explain help includes context and --kind context still resolves context.assimilation.
    4. Run focused blueprint/help tests and close via PR.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T12:37:46.882Z — VERIFY — ok

    By: CODER

    Note: Focused checks passed: Vitest cli-core help/blueprint tests, docs:cli:check, ESLint on touched TS files, Prettier check, policy routing, and git diff --check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:33:23.518Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170941-ZXBF4Q-close-clone/.agentplane/worktrees/202605171232-QB3YP7-blueprint-help-context-kind/.agentplane/tasks/202605171232-QB3YP7/blueprint/resolved-snapshot.json
    - old_digest: 1a6c60830ec7a4fad821c942919621a62bd3a5fd677398dc641a1175ef7ff681
    - current_digest: 1a6c60830ec7a4fad821c942919621a62bd3a5fd677398dc641a1175ef7ff681
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171232-QB3YP7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix blueprint explain context kind help

Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.

## Scope

- In scope: Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.
- Out of scope: unrelated refactors not required for "Fix blueprint explain context kind help".

## Plan

1. Update blueprint explain --kind value hint to include context.
2. Refresh affected CLI help snapshots if needed.
3. Verify blueprint explain help includes context and --kind context still resolves context.assimilation.
4. Run focused blueprint/help tests and close via PR.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T12:37:46.882Z — VERIFY — ok

By: CODER

Note: Focused checks passed: Vitest cli-core help/blueprint tests, docs:cli:check, ESLint on touched TS files, Prettier check, policy routing, and git diff --check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T12:33:23.518Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170941-ZXBF4Q-close-clone/.agentplane/worktrees/202605171232-QB3YP7-blueprint-help-context-kind/.agentplane/tasks/202605171232-QB3YP7/blueprint/resolved-snapshot.json
- old_digest: 1a6c60830ec7a4fad821c942919621a62bd3a5fd677398dc641a1175ef7ff681
- current_digest: 1a6c60830ec7a4fad821c942919621a62bd3a5fd677398dc641a1175ef7ff681
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171232-QB3YP7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
