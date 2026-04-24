---
id: "202604241136-45ZVBA"
title: "v0.3 freeze D2: extract shared close precheck"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604241136-ATVM0G"
tags:
  - "code"
  - "lifecycle"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T13:05:07.979Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T13:11:08.319Z"
  updated_by: "CODER"
  note: "Command: bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task => pass, 33 files / 212 tests. Command: bun run typecheck => pass. Command: bun run format:check && git diff --check => pass. Additional checks: focused cli-core pr close/superseded/hosted-close-pr passed, knip baseline passed, arch:deps passed, framework:dev:bootstrap and doctor passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract the shared close-family precheck helper for branch_pr workflow, GitHub repo/owner, non-empty close flags, and remote branch delete handling; preserve existing pr close and hosted-close-pr behavior."
events:
  -
    type: "status"
    at: "2026-04-24T13:05:16.882Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract the shared close-family precheck helper for branch_pr workflow, GitHub repo/owner, non-empty close flags, and remote branch delete handling; preserve existing pr close and hosted-close-pr behavior."
  -
    type: "verify"
    at: "2026-04-24T13:11:08.319Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task => pass, 33 files / 212 tests. Command: bun run typecheck => pass. Command: bun run format:check && git diff --check => pass. Additional checks: focused cli-core pr close/superseded/hosted-close-pr passed, knip baseline passed, arch:deps passed, framework:dev:bootstrap and doctor passed."
doc_version: 3
doc_updated_at: "2026-04-24T13:11:08.351Z"
doc_updated_by: "CODER"
description: "Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract."
sections:
  Summary: |-
    v0.3 freeze D2: extract shared close precheck
    
    Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
  Scope: |-
    - In scope: Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
    - Out of scope: unrelated refactors not required for "v0.3 freeze D2: extract shared close precheck".
  Plan: |-
    1. Add a shared close-precheck helper for close-family invariants: branch_pr workflow validation, non-empty close flags, GitHub repo/owner resolution, and remote head branch deletion with 404 mapped to already-absent.
    2. Rewire pr close, pr close-superseded, and task hosted-close-pr precheck to use the shared helper while preserving their public messages and result shapes.
    3. Add or adjust focused coverage for the shared helper and run the task verification contract plus type/format checks.
  Verify Steps: |-
    1. Run `bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:11:08.319Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task => pass, 33 files / 212 tests. Command: bun run typecheck => pass. Command: bun run format:check && git diff --check => pass. Additional checks: focused cli-core pr close/superseded/hosted-close-pr passed, knip baseline passed, arch:deps passed, framework:dev:bootstrap and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:05:16.923Z, excerpt_hash=sha256:12bf60368218918916c8f327d1c33ade64773c1c65124abe31eb8a1b24e043dd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze D2: extract shared close precheck

Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.

## Scope

- In scope: Extract common PR/task close precheck behavior from pr close and hosted-close paths into a shared helper after the taxonomy defines the common contract.
- Out of scope: unrelated refactors not required for "v0.3 freeze D2: extract shared close precheck".

## Plan

1. Add a shared close-precheck helper for close-family invariants: branch_pr workflow validation, non-empty close flags, GitHub repo/owner resolution, and remote head branch deletion with 404 mapped to already-absent.
2. Rewire pr close, pr close-superseded, and task hosted-close-pr precheck to use the shared helper while preserving their public messages and result shapes.
3. Add or adjust focused coverage for the shared helper and run the task verification contract plus type/format checks.

## Verify Steps

1. Run `bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:11:08.319Z — VERIFY — ok

By: CODER

Note: Command: bun run test -- packages/agentplane/src/commands/pr packages/agentplane/src/commands/task => pass, 33 files / 212 tests. Command: bun run typecheck => pass. Command: bun run format:check && git diff --check => pass. Additional checks: focused cli-core pr close/superseded/hosted-close-pr passed, knip baseline passed, arch:deps passed, framework:dev:bootstrap and doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:05:16.923Z, excerpt_hash=sha256:12bf60368218918916c8f327d1c33ade64773c1c65124abe31eb8a1b24e043dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
