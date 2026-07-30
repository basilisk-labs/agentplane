Task: `202607300246-Q3RDCW`
Title: Fix diverged-head recovery upstream binding
Canonical task record: `.agentplane/tasks/202607300246-Q3RDCW/README.md`

## Summary

Fix diverged-head recovery upstream binding

Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.

## Scope

- In scope: Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.
- Out of scope: unrelated refactors not required for "Fix diverged-head recovery upstream binding".

## Verification

- State: ok
- Note:

```text
Verified recovery upstream binding against a main-only remote fetch configuration: focused recovery
and conflict packet tests passed 29/29, and bun run ci:contract passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T02:49:44.325Z
- Branch: task/202607300246-Q3RDCW/fix-diverged-head-recovery-upstream-binding
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts | 23 +----
 ...li.core.route-decision.pr-open-metadata.test.ts | 99 ++++++++++++++++------
 .../src/cli/run-cli.core.route-decision.test.ts    | 78 +++++++++++++----
 .../commands/pr/conflict-rework-recovery.test.ts   | 58 ++++++++++---
 .../src/commands/pr/conflict-rework-recovery.ts    |  8 +-
 packages/testkit/src/cli-harness.ts                | 56 +++++++++++-
 6 files changed, 247 insertions(+), 75 deletions(-)
```

</details>
