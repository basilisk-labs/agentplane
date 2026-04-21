---
id: "202604211313-Q9ASA7"
title: "Add init v2 prompt loader"
result_summary: "Added init v2 prompt loader and focused tests."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:28.351Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:21:51.844Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass; Evidence: 3 project entries passed, 12 assertions passed. Command: bunx eslint packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass. Command: bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass."
commit:
  hash: "cb248f24159bf691cf6975a58f48680a882616d0"
  message: "✨ init: add v2 prompt loader"
comments:
  -
    author: "CODER"
    body: "Start: Implement atom #1 for init UX v2 by adding the cached Clack prompt loader and focused tests only; keep legacy init behavior and existing contracts untouched."
  -
    author: "CODER"
    body: "Verified: init v2 prompt loader added with cached Clack loading, plain-mode gating, cancellation propagation, and targeted Vitest, ESLint, and Prettier checks passing."
events:
  -
    type: "status"
    at: "2026-04-21T13:13:35.444Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement atom #1 for init UX v2 by adding the cached Clack prompt loader and focused tests only; keep legacy init behavior and existing contracts untouched."
  -
    type: "verify"
    at: "2026-04-21T13:21:51.844Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass; Evidence: 3 project entries passed, 12 assertions passed. Command: bunx eslint packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass. Command: bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass."
  -
    type: "status"
    at: "2026-04-21T13:22:57.370Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init v2 prompt loader added with cached Clack loading, plain-mode gating, cancellation propagation, and targeted Vitest, ESLint, and Prettier checks passing."
doc_version: 3
doc_updated_at: "2026-04-21T13:22:57.371Z"
doc_updated_by: "CODER"
description: "Implement atom #1 of agentplane init UX v2: add a cached Clack loader and cancellation helper for the experimental init flow without changing existing init behavior."
sections:
  Summary: |-
    Add init v2 prompt loader
    
    Implement atom #1 of agentplane init UX v2: add a cached Clack loader and cancellation helper for the experimental init flow without changing existing init behavior.
  Scope: |-
    - In scope: Implement atom #1 of agentplane init UX v2: add a cached Clack loader and cancellation helper for the experimental init flow without changing existing init behavior.
    - Out of scope: unrelated refactors not required for "Add init v2 prompt loader".
  Plan: |-
    1. Inspect existing init prompt/loading patterns and test layout.
    2. Add packages/agentplane/src/cli/commands/init/prompts-v2.ts with TTY/plain-mode gating, cached dynamic @clack/prompts import, InitAborted, and assertNotCancelled helper.
    3. Add focused unit tests for non-Clack fallback, cached import behavior, and cancellation propagation without changing legacy init contracts.
    4. Run the task verify contract plus relevant targeted tests/type checks; record evidence.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:21:51.844Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass; Evidence: 3 project entries passed, 12 assertions passed. Command: bunx eslint packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass. Command: bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:13:35.466Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add init v2 prompt loader

Implement atom #1 of agentplane init UX v2: add a cached Clack loader and cancellation helper for the experimental init flow without changing existing init behavior.

## Scope

- In scope: Implement atom #1 of agentplane init UX v2: add a cached Clack loader and cancellation helper for the experimental init flow without changing existing init behavior.
- Out of scope: unrelated refactors not required for "Add init v2 prompt loader".

## Plan

1. Inspect existing init prompt/loading patterns and test layout.
2. Add packages/agentplane/src/cli/commands/init/prompts-v2.ts with TTY/plain-mode gating, cached dynamic @clack/prompts import, InitAborted, and assertNotCancelled helper.
3. Add focused unit tests for non-Clack fallback, cached import behavior, and cancellation propagation without changing legacy init contracts.
4. Run the task verify contract plus relevant targeted tests/type checks; record evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:21:51.844Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass; Evidence: 3 project entries passed, 12 assertions passed. Command: bunx eslint packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass. Command: bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:13:35.466Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
