Task: `202608032042-DAMQDM`
Title: Skip provider-dependent qualification checks before provider capture
Canonical task record: `.agentplane/tasks/202608032042-DAMQDM/README.md`

## Summary

Skip provider-dependent qualification checks before provider capture

Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.

## Scope

- In scope: Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.
- Out of scope: unrelated refactors not required for "Skip provider-dependent qualification checks before provider capture".

## Verification

- State: ok
- Note:

```text
PASS after hosted lint rework. The exact 469f5239 implementation satisfies selector, lint, and both
dry-run contracts.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T20:45:10.320Z
- Branch: task/202608032042-DAMQDM/skip-provider-dependent-qualification-checks-bef
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/qualification/release-qualification.mjs    | 31 ++++++++++++++++++----
 .../qualification/release-qualification.test.mjs   | 22 ++++++++++++---
 2 files changed, 44 insertions(+), 9 deletions(-)
```

</details>
