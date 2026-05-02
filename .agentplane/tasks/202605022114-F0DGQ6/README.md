---
id: "202605022114-F0DGQ6"
title: "Fix repo-local handoff dependency detection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T21:14:58.598Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T21:25:48.137Z"
  updated_by: "CODER"
  note: "Verified: repo-local handoff dependency detection now accepts workspace-local @agentplaneorg/core resolution and rejects missing package-local installs when resolution escapes the framework checkout. Evidence: bun test packages/agentplane/src/cli/repo-local-handoff.test.ts passed 7/7; combined affected suite passed 14/14; prettier check passed; git diff --check passed; agentplane doctor passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Apply the repo-local handoff dependency detection fix from a fresh worktree and verify the wrapper behavior before the next patch release."
events:
  -
    type: "status"
    at: "2026-05-02T21:15:28.101Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Apply the repo-local handoff dependency detection fix from a fresh worktree and verify the wrapper behavior before the next patch release."
  -
    type: "verify"
    at: "2026-05-02T21:25:48.137Z"
    author: "CODER"
    state: "ok"
    note: "Verified: repo-local handoff dependency detection now accepts workspace-local @agentplaneorg/core resolution and rejects missing package-local installs when resolution escapes the framework checkout. Evidence: bun test packages/agentplane/src/cli/repo-local-handoff.test.ts passed 7/7; combined affected suite passed 14/14; prettier check passed; git diff --check passed; agentplane doctor passed."
doc_version: 3
doc_updated_at: "2026-05-02T21:25:48.158Z"
doc_updated_by: "CODER"
description: "Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules."
sections:
  Summary: |-
    Fix repo-local handoff dependency detection

    Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.
  Scope: |-
    - In scope: Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.
    - Out of scope: unrelated refactors not required for "Fix repo-local handoff dependency detection".
  Plan: "1. Reproduce the stale worktree patch on a fresh branch_pr worktree from current main. 2. Update repo-local dependency readiness so workspace-resolved @agentplaneorg/core inside the framework checkout counts as available, while external/global resolution still requires package-local node_modules. 3. Keep the repo-local handoff test compatible with dist and source conditional-export resolution. 4. Run the task Verify Steps plus targeted repo-local handoff test and diff hygiene checks. 5. Open, merge, finish, and clean the obsolete v0.4.2 worktree/branch."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T21:25:48.137Z — VERIFY — ok

    By: CODER

    Note: Verified: repo-local handoff dependency detection now accepts workspace-local @agentplaneorg/core resolution and rejects missing package-local installs when resolution escapes the framework checkout. Evidence: bun test packages/agentplane/src/cli/repo-local-handoff.test.ts passed 7/7; combined affected suite passed 14/14; prettier check passed; git diff --check passed; agentplane doctor passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:15:28.101Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix repo-local handoff dependency detection

Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.

## Scope

- In scope: Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.
- Out of scope: unrelated refactors not required for "Fix repo-local handoff dependency detection".

## Plan

1. Reproduce the stale worktree patch on a fresh branch_pr worktree from current main. 2. Update repo-local dependency readiness so workspace-resolved @agentplaneorg/core inside the framework checkout counts as available, while external/global resolution still requires package-local node_modules. 3. Keep the repo-local handoff test compatible with dist and source conditional-export resolution. 4. Run the task Verify Steps plus targeted repo-local handoff test and diff hygiene checks. 5. Open, merge, finish, and clean the obsolete v0.4.2 worktree/branch.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T21:25:48.137Z — VERIFY — ok

By: CODER

Note: Verified: repo-local handoff dependency detection now accepts workspace-local @agentplaneorg/core resolution and rejects missing package-local installs when resolution escapes the framework checkout. Evidence: bun test packages/agentplane/src/cli/repo-local-handoff.test.ts passed 7/7; combined affected suite passed 14/14; prettier check passed; git diff --check passed; agentplane doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:15:28.101Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
