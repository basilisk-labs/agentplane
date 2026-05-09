---
id: "202605091753-A9YYYQ"
title: "Deduplicate hook task intent context"
result_summary: "Merged via PR #3530."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run clone:check"
  - "bun run test:project -- packages/agentplane/src/commands/hooks"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:09.886Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T18:37:16.060Z"
  updated_by: "CODER"
  note: "Verified: extracted shared hook task context helper; focused hook tests passed (2 files, 33 tests), typecheck passed, Prettier passed, clone:report improved metrics to 84 clones / 1420 duplicated lines / 15111 duplicated tokens, and clone:check passed without baseline update."
  attempts: 0
commit:
  hash: "1067a720ba81e4a3701883ac972259b3b8e5e9e7"
  message: "Merge pull request #3530 from basilisk-labs/task/202605091753-A9YYYQ/hook-context"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3530 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "verify"
    at: "2026-05-09T18:37:16.060Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted shared hook task context helper; focused hook tests passed (2 files, 33 tests), typecheck passed, Prettier passed, clone:report improved metrics to 84 clones / 1420 duplicated lines / 15111 duplicated tokens, and clone:check passed without baseline update."
  -
    type: "status"
    at: "2026-05-09T18:40:32.416Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: PR #3530 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T18:40:32.424Z"
doc_updated_by: "INTEGRATOR"
description: "Extract common hook helpers for task intent loading, enum parsing, environment flags, and branch task-id inference from pre-commit and commit-msg hooks."
sections:
  Summary: |-
    Deduplicate hook task intent context
    
    Extract common hook helpers for task intent loading, enum parsing, environment flags, and branch task-id inference from pre-commit and commit-msg hooks.
  Scope: |-
    - In scope: Extract common hook helpers for task intent loading, enum parsing, environment flags, and branch task-id inference from pre-commit and commit-msg hooks.
    - Out of scope: unrelated refactors not required for "Deduplicate hook task intent context".
  Plan: "Create a shared hooks context helper for task intent parsing, enum extraction, env flags, and task id inference that can be consumed by pre-commit and commit-msg hooks. Preserve distinct hook policy actions and message-file handling. Verify with hook tests, typecheck, and clone check."
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts`. Expected: commit-msg and pre-commit hook behavior remains green.
    2. Run `bun run typecheck`. Expected: TypeScript project references compile.
    3. Run `bunx prettier --check packages/agentplane/src/commands/hooks/task-context.ts packages/agentplane/src/commands/hooks/run.commit-msg.ts packages/agentplane/src/commands/hooks/run.pre-commit.ts`. Expected: changed files are formatted.
    4. Run `bun run clone:report`. Expected: hook task-intent clone cluster is gone and clone metrics decrease versus the pre-task report.
    5. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T18:37:16.060Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted shared hook task context helper; focused hook tests passed (2 files, 33 tests), typecheck passed, Prettier passed, clone:report improved metrics to 84 clones / 1420 duplicated lines / 15111 duplicated tokens, and clone:check passed without baseline update.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T18:36:46.706Z, excerpt_hash=sha256:149454c47a20a6d5245530f3ef8c50661427b094eaf0526e239488b8733b1a47
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091753-A9YYYQ-hook-context/.agentplane/tasks/202605091753-A9YYYQ/blueprint/resolved-snapshot.json
    - old_digest: 00ef0dbbe84c7e0d33efa079e6a0cedb56b1662cdd5fe7e21f3ed77320fd30e5
    - current_digest: 00ef0dbbe84c7e0d33efa079e6a0cedb56b1662cdd5fe7e21f3ed77320fd30e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091753-A9YYYQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The first start-ready command ran from base checkout, so the task worktree initially lacked a resolved blueprint snapshot; regenerated the snapshot from the task worktree before verification.
      Impact: The task now has current blueprint evidence and the hook refactor preserves commit-msg/pre-commit behavior while removing the task-intent clone cluster.
      Resolution: Continue remaining refactor tasks for task-doc parsing, task transition flow, verify spec factory, and knip cleanup.
id_source: "generated"
---
