Task: `202608040106-CC1TAP`
Title: Remove calendar-date flake from merge token-usage unit test
Canonical task record: `.agentplane/tasks/202608040106-CC1TAP/README.md`

## Summary

Remove calendar-date flake from merge token-usage unit test

Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.

## Scope

- In scope: Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
- Out of scope: unrelated refactors not required for "Remove calendar-date flake from merge token-usage unit test".

## Verification

- State: ok
- Note:

```text
Confirmed the CI failure was a UTC calendar-boundary assertion, then froze reconciliation time and
proved exact timestamp semantics: focused 3/3 and nearby 16/16 tests plus TypeScript 7, ESLint,
Prettier, and diff checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T01:06:52.139Z
- Branch: task/202608040106-CC1TAP/fix-token-usage-date-flake
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/hosted-merge-sync.token-usage.test.ts       | 20 ++++++++++++++------
 1 file changed, 14 insertions(+), 6 deletions(-)
```

</details>
