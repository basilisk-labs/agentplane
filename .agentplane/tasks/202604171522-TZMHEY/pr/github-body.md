## Summary

Refactor command catalog dispatch metadata into needs union

Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.

## Scope

- In scope: Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
- Out of scope: unrelated refactors not required for "Refactor command catalog dispatch metadata into needs union".

## Verification

- State: ok
- Note: Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:23:32.504Z
- Branch: task/202604171522-TZMHEY/command-catalog-needs-union
- Head: b0c53c8aae1a

```text
No changes detected.
```

</details>
