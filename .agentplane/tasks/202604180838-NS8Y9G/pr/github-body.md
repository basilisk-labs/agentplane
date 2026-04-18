## Summary

Skip full pre-push CI for delete-only remote cleanup pushes

Detect git push operations that only delete remote task branches without sending new commits, and bypass the expensive full pre-push CI path for that case while preserving the existing checks for normal branch pushes and release refs.

## Scope

- In scope: Detect git push operations that only delete remote task branches without sending new commits, and bypass the expensive full pre-push CI path for that case while preserving the existing checks for normal branch pushes and release refs.
- Out of scope: unrelated refactors not required for "Skip full pre-push CI for delete-only remote cleanup pushes".

## Verification

- State: ok
- Note: pre-push hook now skips format/local-ci for pure remote branch deletions while preserving normal and release push checks
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T08:38:39.608Z
- Branch: task/202604180838-NS8Y9G/pre-push-delete-fast-path
- Head: e29650d5065e

```text
No changes detected.
```

</details>
