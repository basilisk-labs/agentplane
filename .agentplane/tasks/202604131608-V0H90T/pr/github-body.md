## Summary

Allow post-merge cleanup under stale-dist guard

Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.

## Scope

- In scope: Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.
- Out of scope: unrelated refactors not required for "Allow post-merge cleanup under stale-dist guard".

## Verification

- State: ok
- Note: Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T16:09:25.111Z
- Branch: task/202604131608-V0H90T/stale-post-merge-allowlist
- Head: da3c9773871c

```text
No changes detected.
```

</details>
