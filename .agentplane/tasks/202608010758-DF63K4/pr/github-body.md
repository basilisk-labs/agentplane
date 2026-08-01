Task: `202608010758-DF63K4`
Title: Refresh generated script inventory after TypeScript 7 adoption
Canonical task record: `.agentplane/tasks/202608010758-DF63K4/README.md`

## Summary

Refresh generated script inventory after TypeScript 7 adoption

Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.

## Scope

- In scope: Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.
- Out of scope: unrelated refactors not required for "Refresh generated script inventory after TypeScript 7 adoption".

## Verification

- State: ok
- Note:

```text
Recorded deterministic command evidence for generated inventory repair at c074e8b12; all scoped
checks and the full-fast regression suite pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T08:00:25.136Z
- Branch: task/202608010758-DF63K4/refresh-generated-script-inventory-after-typescr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/README.md | 40 +++++++++++++++++++++-------------------
 1 file changed, 21 insertions(+), 19 deletions(-)
```

</details>
