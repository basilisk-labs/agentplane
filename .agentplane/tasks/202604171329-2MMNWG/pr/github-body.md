## Summary

Remove bundled recipes fallback path

Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.

## Scope

- In scope: Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.
- Out of scope: unrelated refactors not required for "Remove bundled recipes fallback path".

## Verification

- State: ok
- Note: Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T13:30:22.922Z
- Branch: task/202604171329-2MMNWG/remove-bundled-recipes-path
- Head: 0117987c40f2

```text
No changes detected.
```

</details>
