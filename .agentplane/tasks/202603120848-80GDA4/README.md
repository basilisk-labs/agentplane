---
id: "202603120848-80GDA4"
title: "Clarify reconcile failures for invalid task README frontmatter"
result_summary: "reconcile preflight now names malformed task README frontmatter as the concrete cause and points to strict-read recovery"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T09:04:47.822Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000"
commit:
  hash: "9133b24cea6052d463762a404cfad5c092747f88"
  message: "🩺 80GDA4 cli: clarify reconcile readme failures"
comments:
  -
    author: "CODER"
    body: "Start: make reconcile preflight errors explicitly name invalid task README frontmatter and point users to the minimal strict-read recovery path."
  -
    author: "CODER"
    body: "Verified: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000"
events:
  -
    type: "status"
    at: "2026-03-12T08:57:16.281Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make reconcile preflight errors explicitly name invalid task README frontmatter and point users to the minimal strict-read recovery path."
  -
    type: "verify"
    at: "2026-03-12T09:04:47.822Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000"
  -
    type: "status"
    at: "2026-03-12T09:05:10.265Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000"
doc_version: 3
doc_updated_at: "2026-03-12T09:05:10.265Z"
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
#### 2026-03-12T09:04:47.822Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:57:16.281Z, excerpt_hash=sha256:9c1ca0360c2922fd6b52e52a9278af44d5745c4e1c70eed785d5ea6029e24ee6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
