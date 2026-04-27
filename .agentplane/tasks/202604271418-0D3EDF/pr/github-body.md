## Summary

Preserve branch_pr merge history by default

Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.

## Scope

- In scope: Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
- Out of scope: unrelated refactors not required for "Preserve branch_pr merge history by default".

## Verification

- State: ok
- Note: Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T14:18:58.754Z
- Branch: task/202604271418-0D3EDF/preserve-merge-history
- Head: 0662769ce92f

```text
No changes detected.
```

</details>
