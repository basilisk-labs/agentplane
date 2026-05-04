---
id: "202605041907-B7VKWQ"
title: "Fix lint blockers for docs branch push"
status: "DOING"
priority: "high"
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
  updated_at: "2026-05-04T19:08:12.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:09:59.462Z"
  updated_by: "CODER"
  note: "Focused lint blockers fixed and verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix the two focused ESLint blockers reported by pre-push without changing behavior or broadening the docs branch scope."
events:
  -
    type: "status"
    at: "2026-05-04T19:08:18.729Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the two focused ESLint blockers reported by pre-push without changing behavior or broadening the docs branch scope."
  -
    type: "verify"
    at: "2026-05-04T19:09:59.462Z"
    author: "CODER"
    state: "ok"
    note: "Focused lint blockers fixed and verified."
doc_version: 3
doc_updated_at: "2026-05-04T19:09:59.466Z"
doc_updated_by: "CODER"
description: "Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts."
sections:
  Summary: |-
    Fix lint blockers for docs branch push
    
    Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.
  Scope: |-
    - In scope: Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.
    - Out of scope: unrelated refactors not required for "Fix lint blockers for docs branch push".
  Plan: |-
    1. Replace the regex match usage in runtime.command.test.ts with RegExp.exec to satisfy @typescript-eslint/prefer-regexp-exec.
    2. Remove the unused CONFIG_REL_PATH import from upgrade.ts.
    3. Run focused ESLint on both files and record verification evidence.
    4. Commit only the two lint fixes plus task artifacts.
  Verify Steps: |-
    1. Run bun run lint:core -- packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/upgrade.ts. Expected: ESLint passes for the two files that blocked pre-push.
    2. Run git diff --check. Expected: no whitespace errors.
    3. Confirm git diff for code changes is limited to runtime.command.test.ts and upgrade.ts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:09:59.462Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused lint blockers fixed and verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:08:18.729Z, excerpt_hash=sha256:0cacb3cd9f613860c0715d02f58ff2441fb786a426bb7c6339ee83889fc1e435
    
    Details:
    
    Command: bun run lint:core -- packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/upgrade.ts; Result: pass; Evidence: ESLint completed with exit code 0 after replacing String.match with RegExp.exec and removing the unused CONFIG_REL_PATH import. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Review: code diff is limited to packages/agentplane/src/commands/runtime.command.test.ts and packages/agentplane/src/commands/upgrade.ts.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix lint blockers for docs branch push

Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.

## Scope

- In scope: Fix the two ESLint errors blocking pre-push on the docs branch: prefer RegExp.exec in runtime.command.test.ts and remove the unused CONFIG_REL_PATH import in upgrade.ts.
- Out of scope: unrelated refactors not required for "Fix lint blockers for docs branch push".

## Plan

1. Replace the regex match usage in runtime.command.test.ts with RegExp.exec to satisfy @typescript-eslint/prefer-regexp-exec.
2. Remove the unused CONFIG_REL_PATH import from upgrade.ts.
3. Run focused ESLint on both files and record verification evidence.
4. Commit only the two lint fixes plus task artifacts.

## Verify Steps

1. Run bun run lint:core -- packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/upgrade.ts. Expected: ESLint passes for the two files that blocked pre-push.
2. Run git diff --check. Expected: no whitespace errors.
3. Confirm git diff for code changes is limited to runtime.command.test.ts and upgrade.ts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:09:59.462Z — VERIFY — ok

By: CODER

Note: Focused lint blockers fixed and verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:08:18.729Z, excerpt_hash=sha256:0cacb3cd9f613860c0715d02f58ff2441fb786a426bb7c6339ee83889fc1e435

Details:

Command: bun run lint:core -- packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/upgrade.ts; Result: pass; Evidence: ESLint completed with exit code 0 after replacing String.match with RegExp.exec and removing the unused CONFIG_REL_PATH import. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Review: code diff is limited to packages/agentplane/src/commands/runtime.command.test.ts and packages/agentplane/src/commands/upgrade.ts.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
