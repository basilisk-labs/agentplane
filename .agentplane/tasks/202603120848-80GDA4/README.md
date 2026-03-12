---
id: "202603120848-80GDA4"
title: "Clarify reconcile failures for invalid task README frontmatter"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:51:30.409Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make reconcile preflight errors explicitly name invalid task README frontmatter and point users to the minimal strict-read recovery path."
events:
  -
    type: "status"
    at: "2026-03-12T08:57:16.281Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make reconcile preflight errors explicitly name invalid task README frontmatter and point users to the minimal strict-read recovery path."
doc_version: 3
doc_updated_at: "2026-03-12T08:57:16.281Z"
doc_updated_by: "CODER"
description: "Make mutation preflight diagnostics explicitly explain when reconcile failed because an active task README could not be parsed, and point the user to the minimal recovery command."
id_source: "generated"
---
## Summary

Clarify reconcile failures for invalid task README frontmatter

Make mutation preflight diagnostics explicitly explain when reconcile failed because an active task README could not be parsed, and point the user to the minimal recovery command.

## Scope

- In scope: Make mutation preflight diagnostics explicitly explain when reconcile failed because an active task README could not be parsed, and point the user to the minimal recovery command.
- Out of scope: unrelated refactors not required for "Clarify reconcile failures for invalid task README frontmatter".

## Plan

1. Refine reconcile warning summarization so invalid task README frontmatter is surfaced as the concrete cause for mutation preflight failure. 2. Keep the recovery command narrow and actionable. 3. Add targeted unit and CLI regressions covering the improved error text/context.

## Verify Steps

1. Create a mutation-path regression where the task scan encounters `invalid_readme_frontmatter`. Expected: the CLI error explains that a task README could not be parsed and points to `agentplane task list --strict-read` as the recovery step.
2. Run `bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: targeted reconcile diagnostics remain green.
3. Review the emitted diagnostic fields. Expected: `state`, `likelyCause`, `nextAction`, and `reason_code` stay coherent with the new wording.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
