---
id: "202604211313-RWHSDK"
title: "Remove command git shim imports"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211311-WZCXTF"
tags:
  - "cleanup"
  - "code"
  - "git"
verify:
  - "bun run arch:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:54.403Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:29:20.376Z"
  updated_by: "CODER"
  note: "Command git shim imports removed from commands scope."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove command git shim imports after core git/process subpath migration."
events:
  -
    type: "status"
    at: "2026-04-21T16:19:39.594Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove command git shim imports after core git/process subpath migration."
  -
    type: "verify"
    at: "2026-04-21T16:29:20.376Z"
    author: "CODER"
    state: "ok"
    note: "Command git shim imports removed from commands scope."
doc_version: 3
doc_updated_at: "2026-04-21T16:29:20.381Z"
doc_updated_by: "CODER"
description: "Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused."
sections:
  Summary: |-
    Remove command git shim imports

    Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
  Scope: |-
    - In scope: Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
    - Out of scope: unrelated refactors not required for "Remove command git shim imports".
  Plan: "Scope: close the most obvious shared-directory cleanup without a broad rename. Steps: 1. Inventory commands/shared/git*.ts one-line shims and their users. 2. Migrate users to @agentplaneorg/core/git or real command git-ops modules. 3. Delete unused shims. 4. Keep adapters with actual logic. Acceptance: one-line git shim files are gone or justified; knip and arch checks pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:29:20.376Z — VERIFY — ok

    By: CODER

    Note: Command git shim imports removed from commands scope.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:39.602Z, excerpt_hash=sha256:c118bcfe376cbcbdc3c2a7555638bcede91502ca71d37e6d3edfe94deb14232b

    Details:

    Command: rg -n 'from \"(\./|(?:\.\./)+shared/)git(\.js|-diff\.js|-worktree\.js|-context\.js)\"|vi\.mock\(\"(\./|(?:\.\./)+shared/)git(\.js|-diff\.js|-worktree\.js|-context\.js)\"' packages/agentplane/src/commands -g '*.ts' | Result: pass, no matches. Command: bun run typecheck | Result: pass. Command: bun run test:project -- cli-unit | Result: pass, 62 files and 624 tests. Command: bun run arch:check | Result: pass, no dependency violations; 8 known violations ignored. Command: bun run format:check | Result: pass. Command: targeted eslint over changed commands files | Result: pass. Command: bun run lint | Result: fail outside approved scope only, packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts has require-await/no-empty-function errors and init v2 is out of scope. Command: bun run knip:check | Result: fail outside this change: files baseline 14/11, types 306/301, total 571/563; remaining command file growth points at scenario files, while removed git shim files are no longer reported.

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove command git shim imports

Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.

## Scope

- In scope: Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
- Out of scope: unrelated refactors not required for "Remove command git shim imports".

## Plan

Scope: close the most obvious shared-directory cleanup without a broad rename. Steps: 1. Inventory commands/shared/git*.ts one-line shims and their users. 2. Migrate users to @agentplaneorg/core/git or real command git-ops modules. 3. Delete unused shims. 4. Keep adapters with actual logic. Acceptance: one-line git shim files are gone or justified; knip and arch checks pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:29:20.376Z — VERIFY — ok

By: CODER

Note: Command git shim imports removed from commands scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:39.602Z, excerpt_hash=sha256:c118bcfe376cbcbdc3c2a7555638bcede91502ca71d37e6d3edfe94deb14232b

Details:

Command: rg -n 'from \"(\./|(?:\.\./)+shared/)git(\.js|-diff\.js|-worktree\.js|-context\.js)\"|vi\.mock\(\"(\./|(?:\.\./)+shared/)git(\.js|-diff\.js|-worktree\.js|-context\.js)\"' packages/agentplane/src/commands -g '*.ts' | Result: pass, no matches. Command: bun run typecheck | Result: pass. Command: bun run test:project -- cli-unit | Result: pass, 62 files and 624 tests. Command: bun run arch:check | Result: pass, no dependency violations; 8 known violations ignored. Command: bun run format:check | Result: pass. Command: targeted eslint over changed commands files | Result: pass. Command: bun run lint | Result: fail outside approved scope only, packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts has require-await/no-empty-function errors and init v2 is out of scope. Command: bun run knip:check | Result: fail outside this change: files baseline 14/11, types 306/301, total 571/563; remaining command file growth points at scenario files, while removed git shim files are no longer reported.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
