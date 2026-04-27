---
id: "202604270853-8D0EH8"
title: "Make branch_pr pr open transactional"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604270852-3FX0AN"
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/commands/pr/internal"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:32.604Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-27T08:56:29.743Z"
doc_updated_by: "PLANNER"
description: "Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure."
sections:
  Summary: |-
    Make branch_pr pr open transactional
    
    Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.
  Scope: |-
    - In scope: Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.
    - Out of scope: unrelated refactors not required for "Make branch_pr pr open transactional".
  Plan: "1. Map current pr open partial states across local artifact sync, auto-commit, push, and remote PR create/link. 2. Introduce an explicit planned outcome for local-only, staged remote, linked remote, and failed remote paths. 3. Persist unambiguous artifact state after remote outcome is known or explicitly failed. 4. Add focused tests for push failure and remote creation failure. 5. Verify PR open tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/commands/pr/internal`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make branch_pr pr open transactional

Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.

## Scope

- In scope: Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.
- Out of scope: unrelated refactors not required for "Make branch_pr pr open transactional".

## Plan

1. Map current pr open partial states across local artifact sync, auto-commit, push, and remote PR create/link. 2. Introduce an explicit planned outcome for local-only, staged remote, linked remote, and failed remote paths. 3. Persist unambiguous artifact state after remote outcome is known or explicitly failed. 4. Add focused tests for push failure and remote creation failure. 5. Verify PR open tests and typecheck.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/commands/pr/internal`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
