Task: `202607260005-EMP7RC`
Title: Reconcile provider-rebased protected PR heads
Canonical task record: `.agentplane/tasks/202607260005-EMP7RC/README.md`

## Summary

Correct a branch_pr recovery gap after a protected provider rebases a verified task PR. The CLI must reconcile proven provider truth with a stale local task head without republishing the stale commit or weakening branch/worktree cleanup safety.

## Scope

In scope: provider snapshot and lineage proof, route and integration reconciliation, hosted-close and cleanup handoff guards, task-local evidence, and focused regressions. Current concrete regression: ZMV 202607252051-ZMVZRZ had local head d61ab0f55d1c122e5acbaf2a296e2ff508e87b55 while GitHub provider head was 2a6d152b87666912d189304c4a6084eccaaff262; the protected PR merged as main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: semantic conflict resolution, automatic rebase, raw Git rewrite, automatic force-push, direct provider merge, or loosening any cleanup refusal.

## Verification

- State: ok
- Note:

```text
Independent re-verification passed: full canonical OID gate rejects main, short SHA, refs, and
malformed provider identities before Git revision use; each negative reports cleanup_blocked with no
command and preserves branch/worktree. Symmetric provider-patch and race coverage remains green;
focused suites 27 plus 23 passed; static checks passed; live ZMV dry run reported
proof=provider_rebase without cleanup.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T00:39:19.677Z
- Branch: task/202607260005-EMP7RC/reconcile-provider-rebased-protected-pr-heads
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged-proof.ts    | 252 ++++++++-----
 .../cleanup-merged-provider-reconciliation.ts      | 404 +++++++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 404 ++++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 packages/agentplane/src/commands/shared/git-ops.ts |  19 +
 .../shared/route-decision-next-action.test.ts      |  49 +++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/shared/workflow-step-branch.ts    |  46 ++-
 .../src/commands/task/close-tail-state.test.ts     |  16 +-
 .../src/commands/task/close-tail-state.ts          |  12 +-
 10 files changed, 1104 insertions(+), 125 deletions(-)
```

</details>
