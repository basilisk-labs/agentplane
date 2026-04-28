## Summary

Make branch_pr pr open transactional

Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.

## Scope

- In scope: Refactor pr open so local artifacts, branch push/linking, and remote PR creation use an explicit planned outcome. Persist unambiguous staged or failed remote state instead of leaving fresh-looking local artifacts after partial failure.
- Out of scope: unrelated refactors not required for "Make branch_pr pr open transactional".

## Verification

- State: ok
- Note: pr open partial push/create failures now persist explicit remote_failed or remote_staged artifact state; focused PR open tests and typecheck passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T05:15:30.213Z
- Branch: task/202604270853-8D0EH8/pr-open-transactional
- Head: cff117aecad6

```text
No changes detected.
```

</details>
