---
id: "202605091754-S1KM8E"
title: "Create verify command spec factory"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "verify"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run clone:check"
  - "bun run test:project -- packages/agentplane/src/commands/task"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:12.356Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T19:18:20.585Z"
  updated_by: "CODER"
  note: "Verified: created shared verify command spec/handler factory; verify CLI tests passed (2 files, 17 tests), typecheck passed, Prettier passed, clone:report improved metrics to 81 clones / 1335 duplicated lines / 14279 duplicated tokens, and clone:check passed without baseline update."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: create a shared factory for task verify ok/rework command specs and handlers."
events:
  -
    type: "status"
    at: "2026-05-09T19:13:38.791Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: create a shared factory for task verify ok/rework command specs and handlers."
  -
    type: "verify"
    at: "2026-05-09T19:18:20.585Z"
    author: "CODER"
    state: "ok"
    note: "Verified: created shared verify command spec/handler factory; verify CLI tests passed (2 files, 17 tests), typecheck passed, Prettier passed, clone:report improved metrics to 81 clones / 1335 duplicated lines / 14279 duplicated tokens, and clone:check passed without baseline update."
doc_version: 3
doc_updated_at: "2026-05-09T19:18:20.599Z"
doc_updated_by: "CODER"
description: "Replace the duplicated task verify ok/rework command spec boilerplate with a small factory that keeps verdict-specific summary and runner behavior explicit."
sections:
  Summary: |-
    Create verify command spec factory
    
    Replace the duplicated task verify ok/rework command spec boilerplate with a small factory that keeps verdict-specific summary and runner behavior explicit.
  Scope: |-
    - In scope: Replace the duplicated task verify ok/rework command spec boilerplate with a small factory that keeps verdict-specific summary and runner behavior explicit.
    - Out of scope: unrelated refactors not required for "Create verify command spec factory".
  Plan: "Introduce a small factory for task verify ok/rework command specs and handlers. Parameterize verdict-specific command id, summary/example text, getCtx command name, and runner function. Verify with task command tests, typecheck, and clone check."
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts`. Expected: verify command behavior remains green.
    2. Run `bun run typecheck`. Expected: TypeScript project references compile.
    3. Run `bunx prettier --check packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-rework.command.ts`. Expected: changed sources are formatted.
    4. Run `bun run clone:report`. Expected: verify ok/rework command spec duplicate cluster is gone and clone metrics decrease versus the pre-task report.
    5. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T19:18:20.585Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: created shared verify command spec/handler factory; verify CLI tests passed (2 files, 17 tests), typecheck passed, Prettier passed, clone:report improved metrics to 81 clones / 1335 duplicated lines / 14279 duplicated tokens, and clone:check passed without baseline update.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T19:13:38.807Z, excerpt_hash=sha256:e6cfa79415826b7b75f1502069d24a5e2301c29e0abdd8edeece3c4996ffac74
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091754-S1KM8E-verify-spec-factory/.agentplane/tasks/202605091754-S1KM8E/blueprint/resolved-snapshot.json
    - old_digest: 43a901fa90a54a2ddb018fa303a4f73e7cfb9407bbb8f7006d155ee88efcee1e
    - current_digest: 43a901fa90a54a2ddb018fa303a4f73e7cfb9407bbb8f7006d155ee88efcee1e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091754-S1KM8E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
