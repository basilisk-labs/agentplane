---
id: "202604081816-TQKZ66"
title: "Add repair command to close superseded task PRs after protected-main closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  updated_at: "2026-04-08T18:17:42.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T18:40:51.970Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun x eslint packages/agentplane/src/commands/pr/close-superseded.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/pr/index.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun run framework:dev:bootstrap; agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch; gh pr view 141 --json number,state,closed,headRefName. Result: pass. Evidence: focused tests are green, the new repair path closes stale task PR #141 and deletes its remote task branch, and GitHub now reports PR #141 CLOSED. Scope: pr close-superseded repair path."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect the live A1XE27/#141 stale PR drift, then add the smallest artifact-driven repair path that can close superseded task PRs after protected-main closure."
events:
  -
    type: "status"
    at: "2026-04-08T18:26:53.837Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the live A1XE27/#141 stale PR drift, then add the smallest artifact-driven repair path that can close superseded task PRs after protected-main closure."
  -
    type: "verify"
    at: "2026-04-08T18:40:51.970Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun x eslint packages/agentplane/src/commands/pr/close-superseded.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/pr/index.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun run framework:dev:bootstrap; agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch; gh pr view 141 --json number,state,closed,headRefName. Result: pass. Evidence: focused tests are green, the new repair path closes stale task PR #141 and deletes its remote task branch, and GitHub now reports PR #141 CLOSED. Scope: pr close-superseded repair path."
doc_version: 3
doc_updated_at: "2026-04-08T18:40:51.986Z"
doc_updated_by: "CODER"
description: "Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands."
sections:
  Summary: |-
    Add repair command to close superseded task PRs after protected-main closure
    
    Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.
  Scope: |-
    - In scope: Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.
    - Out of scope: unrelated refactors not required for "Add repair command to close superseded task PRs after protected-main closure".
  Plan: "1. Inspect current task PR metadata, stale PR #141, and existing pr close/doctor flows to define the smallest coherent repair surface. 2. Implement a command or command extension that resolves a DONE task's open task PR from task artifacts and closes it as superseded, with optional remote branch deletion. 3. Add focused tests around successful repair, already-closed/no-op behavior, and safe failure when task state is not eligible. 4. Use the new repair path to close the live stale PR and verify GitHub/task state convergence."
  Verify Steps: "1. Run the focused PR repair/close test suite. Expected: a DONE task with open task PR artifacts can be reconciled and closed deterministically from task metadata. 2. Exercise the command against the live stale PR. Expected: PR #141 closes with a superseded note and task state remains DONE. 3. Confirm GitHub and local cleanup state. Expected: no stale open task PR remains for the repaired task, and any optional remote branch deletion is explicit."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T18:40:51.970Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun x eslint packages/agentplane/src/commands/pr/close-superseded.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/pr/index.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun run framework:dev:bootstrap; agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch; gh pr view 141 --json number,state,closed,headRefName. Result: pass. Evidence: focused tests are green, the new repair path closes stale task PR #141 and deletes its remote task branch, and GitHub now reports PR #141 CLOSED. Scope: pr close-superseded repair path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:26:53.851Z, excerpt_hash=sha256:7675aea6165a63732506d2950fbecdf6b72952064f69b9058eb9de05fe9add3b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add repair command to close superseded task PRs after protected-main closure

Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.

## Scope

- In scope: Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.
- Out of scope: unrelated refactors not required for "Add repair command to close superseded task PRs after protected-main closure".

## Plan

1. Inspect current task PR metadata, stale PR #141, and existing pr close/doctor flows to define the smallest coherent repair surface. 2. Implement a command or command extension that resolves a DONE task's open task PR from task artifacts and closes it as superseded, with optional remote branch deletion. 3. Add focused tests around successful repair, already-closed/no-op behavior, and safe failure when task state is not eligible. 4. Use the new repair path to close the live stale PR and verify GitHub/task state convergence.

## Verify Steps

1. Run the focused PR repair/close test suite. Expected: a DONE task with open task PR artifacts can be reconciled and closed deterministically from task metadata. 2. Exercise the command against the live stale PR. Expected: PR #141 closes with a superseded note and task state remains DONE. 3. Confirm GitHub and local cleanup state. Expected: no stale open task PR remains for the repaired task, and any optional remote branch deletion is explicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T18:40:51.970Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun x eslint packages/agentplane/src/commands/pr/close-superseded.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/pr/index.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun run framework:dev:bootstrap; agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch; gh pr view 141 --json number,state,closed,headRefName. Result: pass. Evidence: focused tests are green, the new repair path closes stale task PR #141 and deletes its remote task branch, and GitHub now reports PR #141 CLOSED. Scope: pr close-superseded repair path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:26:53.851Z, excerpt_hash=sha256:7675aea6165a63732506d2950fbecdf6b72952064f69b9058eb9de05fe9add3b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
