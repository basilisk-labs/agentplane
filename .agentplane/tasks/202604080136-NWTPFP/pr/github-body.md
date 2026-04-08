## Summary

Let pr open create or explicitly stage remote GitHub PRs

pr open still acts as local artifact sync only unless an existing GitHub PR is already found. Add a first-class remote creation path or explicit remote-open mode so operators do not need manual gh pr create after every branch_pr task.

## Scope

- In scope: pr open still acts as local artifact sync only unless an existing GitHub PR is already found. Add a first-class remote creation path or explicit remote-open mode so operators do not need manual gh pr create after every branch_pr task.
- Out of scope: unrelated refactors not required for "Let pr open create or explicitly stage remote GitHub PRs".

## Verification

### Plan

1. Run targeted CLI tests around `pr open` and sync internals. Expected: local-only sync, staged-remote guidance, and remote-create paths behave deterministically in touched scenarios.
2. Verify the operator-facing output for `pr open`. Expected: the command either creates a GitHub PR or explicitly reports that remote creation is staged/deferred; it must not silently look "done" when only local artifacts changed.
3. Review the final task and PR artifacts. Expected: `pr/meta.json`, title/body artifacts, and CLI output remain consistent with the new remote-open semantics and branch_pr workflow.

### Current Status

- State: ok
- Note: Targeted vitest for pr open flows and pr input validation passed; eslint passed after final sync-only/output cleanup. pr open now auto-creates remote PRs when GitHub is available and otherwise reports explicit staged/skipped remote semantics.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T04:32:24.670Z
- Branch: task/202604080136-NWTPFP/remote-pr-open
- Head: 7de5c2956604

```text
No changes detected.
```

</details>
