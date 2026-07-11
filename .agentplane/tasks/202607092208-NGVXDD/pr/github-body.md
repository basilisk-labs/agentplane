Task: `202607092208-NGVXDD`
Title: Reduce the Knip baseline for v0.6.22
Canonical task record: `.agentplane/tasks/202607092208-NGVXDD/README.md`

## Summary

Reduce the Knip baseline for v0.6.22

Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.

## Scope

- In scope: Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
- Out of scope: unrelated refactors not required for "Reduce the Knip baseline for v0.6.22".

## Verification

- State: ok
- Note:

```text
Knip debt decreases from 574 to 554 with no ignore expansion; each remaining entry is classified and
all declared checks pass, including full 364/2157 tests.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-11T12:02:25.769Z
- Branch: task/202607092208-NGVXDD/reduce-the-knip-baseline-for-v0-6-22
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/critical/cli-runner.ts |  14 --
 .../agentplane/src/cli/run-cli/update-warning.ts   |   2 +-
 packages/agentplane/src/commands/guard/impl/dco.ts |   8 +-
 .../src/commands/pr/integrate/queue-state.ts       |   2 +-
 .../src/commands/pr/internal/note-store.ts         |   2 +-
 .../commands/pr/internal/pr-artifact-snapshot.ts   |   2 +-
 .../src/commands/pr/internal/review-template.ts    |  31 +--
 .../src/commands/pr/internal/sync-branch.ts        |   6 +-
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 .../agentplane/src/commands/recipes/impl/paths.ts  |   4 +-
 .../src/commands/recipes/impl/resolver.ts          |   4 +-
 .../src/commands/recipes/impl/version.ts           |   2 +-
 scripts/baselines/knip-baseline.json               | 239 ++++-----------------
 13 files changed, 59 insertions(+), 259 deletions(-)
```

</details>
