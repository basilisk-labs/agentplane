Task: `202608080355-G5FXDA`
Title: Correct stale plan comparison in next-action diagnostics
Canonical task record: `.agentplane/tasks/202608080355-G5FXDA/README.md`

## Summary

Correct stale plan comparison in next-action diagnostics

Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.

## Scope

- In scope: Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
- Out of scope: unrelated refactors not required for "Correct stale plan comparison in next-action diagnostics".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T03:55:51.970Z
- Branch: task/202608080355-G5FXDA/correct-stale-plan-comparison-in-next-action-dia
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/release-next-action-script.test.ts     | 58 ++++++++++++++++++++++
 scripts/release/next-action.mjs                    | 54 +++++++++++++++++++-
 2 files changed, 111 insertions(+), 1 deletion(-)
```

</details>
