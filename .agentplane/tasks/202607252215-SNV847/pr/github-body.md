Task: `202607252215-SNV847`
Title: Repair stale runner reclaim regression fixture
Canonical task record: `.agentplane/tasks/202607252215-SNV847/README.md`

## Summary

Repair stale runner reclaim regression fixture

Replace the invalid synthetic running-runner fixture with a real stale active-run claim scenario, preserving fail-closed behavior for unclaimed synthetic running state and covering cancellation, claim cleanup, handoff, and retry routing.

## Scope

- In scope: repair only the stale-runner reclaim test fixture and assertions in the handoff/lifecycle test surface; preserve the hardened stale-active-claim and confirmed-absent-child requirements; record this repair as a v0.7 alpha.2 release-gate dependency so qualification cannot pass with this regression red.
- Out of scope: weakening the orphan-cancellation guard, changing production cancellation policy, or unrelated runner refactors.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:16:38.350Z
- Branch: task/202607252215-SNV847/repair-stale-runner-reclaim-regression-fixture
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-9M2FBQ/README.md    |   3 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      | 185 +++++++++++++++++----
 2 files changed, 157 insertions(+), 31 deletions(-)
```

</details>
