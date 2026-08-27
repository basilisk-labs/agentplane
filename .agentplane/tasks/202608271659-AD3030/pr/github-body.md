Task: `202608271659-AD3030`
Title: Preserve task identity in closeout and worktree fixtures
Canonical task record: `.agentplane/tasks/202608271659-AD3030/README.md`

## Summary

Preserve task identity in closeout and worktree fixtures

Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.

## Scope

- In scope: Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
- Out of scope: unrelated refactors not required for "Preserve task identity in closeout and worktree fixtures".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T21:02:51.479Z
- Branch: task/202608271659-AD3030/preserve-task-identity-in-closeout-and-worktree
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.lifecycle.finish-validation.test.ts | 42 +++++++-----
 .../cli/run-cli.core.pr-flow.start-ready.test.ts   | 35 +++++++---
 .../src/cli/run-cli.core.pr-flow.test.ts           |  3 +-
 .../run-cli.core.release-tasks-reconcile.test.ts   | 75 ++++++++++++++--------
 4 files changed, 101 insertions(+), 54 deletions(-)
```

</details>
