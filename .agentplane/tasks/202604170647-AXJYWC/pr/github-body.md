## Summary

Split recipes cache from project vendor store

Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.

## Scope

- In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
- Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".

## Verification

- State: ok
- Note: Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T06:49:10.581Z
- Branch: task/202604170647-AXJYWC/split-recipe-stores
- Head: 2b037eb350cc

```text
No changes detected.
```

</details>
