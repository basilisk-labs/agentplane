---
id: "202604091257-AD043V"
title: "Add helper to open pending hosted-close PRs from task-close branches"
result_summary: "integrate: squash task/202604091257-AD043V/hosted-close-open-pr"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:58:53.576Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T14:21:06.150Z"
  updated_by: "CODER"
  note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/task-hosted-close coverage for the hosted-close PR helper path."
commit:
  hash: "cc82a0fbdaae1c7407314d5567a6c026f1605f11"
  message: "🧩 AD043V integrate: github/workflow: Add helper to open pending hosted-close PRs from task-close branches"
comments:
  -
    author: "CODER"
    body: "Start: Add a helper that opens pending hosted-close PRs from existing task-close branches when hosted automation can only leave manual handoff comments."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091257-AD043V/pr."
events:
  -
    type: "status"
    at: "2026-04-09T13:11:17.099Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a helper that opens pending hosted-close PRs from existing task-close branches when hosted automation can only leave manual handoff comments."
  -
    type: "verify"
    at: "2026-04-09T13:15:19.204Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --timeout 120000 && bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/commands/task/index.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass. Evidence: hosted-close helper tests passed, help snapshots remained valid, eslint clean. Scope: manual hosted-close PR helper command and task help surface."
  -
    type: "verify"
    at: "2026-04-09T14:21:06.150Z"
    author: "CODER"
    state: "ok"
    note: "Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/task-hosted-close coverage for the hosted-close PR helper path."
  -
    type: "status"
    at: "2026-04-09T14:32:27.606Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091257-AD043V/pr."
doc_version: 3
doc_updated_at: "2026-04-09T14:32:27.610Z"
doc_updated_by: "INTEGRATOR"
description: "Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment."
sections:
  Summary: |-
    Add helper to open pending hosted-close PRs from task-close branches
    
    Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.
  Scope: |-
    - In scope: Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.
    - Out of scope: unrelated refactors not required for "Add helper to open pending hosted-close PRs from task-close branches".
  Plan: "1. Detect pending hosted-close branches that exist remotely without an open closure PR. 2. Add a command that opens the protected-main closure PR with deterministic title/body from the task-close branch/task metadata. 3. Cover the manual hosted-close fallback with regression tests and command help."
  Verify Steps: |-
    1. Simulate a merged task PR with an existing remote task-close branch and no open closure PR. Expected: the new helper opens the correct protected-main closure PR.
    2. Run focused command tests for title/body resolution and already-open/no-branch cases. Expected: the helper is deterministic and rejects inconsistent state clearly.
    3. Run relevant lint/tests. Expected: command help and GitHub interaction paths remain valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T13:15:19.204Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --timeout 120000 && bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/commands/task/index.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass. Evidence: hosted-close helper tests passed, help snapshots remained valid, eslint clean. Scope: manual hosted-close PR helper command and task help surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:17.107Z, excerpt_hash=sha256:2dcea28fe089c76f219ab13a639c88d81fcc0741330729b66b2d362219a60810
    
    ### 2026-04-09T14:21:06.150Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/task-hosted-close coverage for the hosted-close PR helper path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:15:19.211Z, excerpt_hash=sha256:2dcea28fe089c76f219ab13a639c88d81fcc0741330729b66b2d362219a60810
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add helper to open pending hosted-close PRs from task-close branches

Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.

## Scope

- In scope: Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.
- Out of scope: unrelated refactors not required for "Add helper to open pending hosted-close PRs from task-close branches".

## Plan

1. Detect pending hosted-close branches that exist remotely without an open closure PR. 2. Add a command that opens the protected-main closure PR with deterministic title/body from the task-close branch/task metadata. 3. Cover the manual hosted-close fallback with regression tests and command help.

## Verify Steps

1. Simulate a merged task PR with an existing remote task-close branch and no open closure PR. Expected: the new helper opens the correct protected-main closure PR.
2. Run focused command tests for title/body resolution and already-open/no-branch cases. Expected: the helper is deterministic and rejects inconsistent state clearly.
3. Run relevant lint/tests. Expected: command help and GitHub interaction paths remain valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T13:15:19.204Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --timeout 120000 && bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/commands/task/index.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass. Evidence: hosted-close helper tests passed, help snapshots remained valid, eslint clean. Scope: manual hosted-close PR helper command and task help surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:11:17.107Z, excerpt_hash=sha256:2dcea28fe089c76f219ab13a639c88d81fcc0741330729b66b2d362219a60810

### 2026-04-09T14:21:06.150Z — VERIFY — ok

By: CODER

Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/task-hosted-close coverage for the hosted-close PR helper path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:15:19.211Z, excerpt_hash=sha256:2dcea28fe089c76f219ab13a639c88d81fcc0741330729b66b2d362219a60810

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
