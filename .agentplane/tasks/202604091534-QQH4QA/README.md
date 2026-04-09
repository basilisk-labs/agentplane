---
id: "202604091534-QQH4QA"
title: "Sanitize hosted-merge-sync gh lookups"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T15:34:41.181Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T15:44:24.394Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
    Result: pass
    Evidence: 16/16 targeted tests passed, including the leaked GIT_DIR/GIT_WORK_TREE normalize regression.
    Scope: hosted-merge-sync gh environment sanitization and CLI reconcile path.
    
    Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
    Result: pass
    Evidence: eslint exited 0 for all touched hosted-merge-sync files.
    Scope: implementation, unit regression, and CLI normalize regression.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce hosted-merge-sync gh child-process auth drift and move it onto the shared sanitized gh environment path."
events:
  -
    type: "status"
    at: "2026-04-09T15:34:41.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce hosted-merge-sync gh child-process auth drift and move it onto the shared sanitized gh environment path."
  -
    type: "verify"
    at: "2026-04-09T15:44:24.394Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
      Result: pass
      Evidence: 16/16 targeted tests passed, including the leaked GIT_DIR/GIT_WORK_TREE normalize regression.
      Scope: hosted-merge-sync gh environment sanitization and CLI reconcile path.
      
      Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
      Result: pass
      Evidence: eslint exited 0 for all touched hosted-merge-sync files.
      Scope: implementation, unit regression, and CLI normalize regression.
doc_version: 3
doc_updated_at: "2026-04-09T15:44:24.402Z"
doc_updated_by: "CODER"
description: "Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated."
sections:
  Summary: |-
    Sanitize hosted-merge-sync gh lookups
    
    Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.
  Scope: |-
    - In scope: Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.
    - Out of scope: unrelated refactors not required for "Sanitize hosted-merge-sync gh lookups".
  Plan: "1. Reproduce and codify the gh env contract for hosted-merge-sync lookups. 2. Route the lookup through the shared gh env/helper path and add regression coverage. 3. Verify normalize hosted reconcile works without manual gh workarounds."
  Verify Steps: "1. Reproduce hosted branch_pr reconcile from the CLI while standalone gh remains authenticated. Expected: hosted merge lookup succeeds without child-process 401 drift. 2. Run focused tests for hosted merge sync and related gh environment handling. Expected: sanitized gh env is preserved and reconcile behavior stays deterministic. 3. Verify the task normalize reconcile path or equivalent targeted command completes without manual gh workarounds."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T15:44:24.394Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
    Result: pass
    Evidence: 16/16 targeted tests passed, including the leaked GIT_DIR/GIT_WORK_TREE normalize regression.
    Scope: hosted-merge-sync gh environment sanitization and CLI reconcile path.
    
    Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
    Result: pass
    Evidence: eslint exited 0 for all touched hosted-merge-sync files.
    Scope: implementation, unit regression, and CLI normalize regression.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:34:41.653Z, excerpt_hash=sha256:3a11b2ed110c5297188282c35fc63bafdc62d8004db8add5fd3f1fdb05369a9c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sanitize hosted-merge-sync gh lookups

Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.

## Scope

- In scope: Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.
- Out of scope: unrelated refactors not required for "Sanitize hosted-merge-sync gh lookups".

## Plan

1. Reproduce and codify the gh env contract for hosted-merge-sync lookups. 2. Route the lookup through the shared gh env/helper path and add regression coverage. 3. Verify normalize hosted reconcile works without manual gh workarounds.

## Verify Steps

1. Reproduce hosted branch_pr reconcile from the CLI while standalone gh remains authenticated. Expected: hosted merge lookup succeeds without child-process 401 drift. 2. Run focused tests for hosted merge sync and related gh environment handling. Expected: sanitized gh env is preserved and reconcile behavior stays deterministic. 3. Verify the task normalize reconcile path or equivalent targeted command completes without manual gh workarounds.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T15:44:24.394Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
Result: pass
Evidence: 16/16 targeted tests passed, including the leaked GIT_DIR/GIT_WORK_TREE normalize regression.
Scope: hosted-merge-sync gh environment sanitization and CLI reconcile path.

Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
Result: pass
Evidence: eslint exited 0 for all touched hosted-merge-sync files.
Scope: implementation, unit regression, and CLI normalize regression.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:34:41.653Z, excerpt_hash=sha256:3a11b2ed110c5297188282c35fc63bafdc62d8004db8add5fd3f1fdb05369a9c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
