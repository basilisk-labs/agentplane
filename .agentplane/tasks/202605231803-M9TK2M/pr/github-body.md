Task: `202605231803-M9TK2M`
Title: Fix agent context cognitive-load regressions
Canonical task record: `.agentplane/tasks/202605231803-M9TK2M/README.md`

## Summary

Fix agent context cognitive-load regressions

Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.

## Scope

- In scope: Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.
- Out of scope: unrelated refactors not required for "Fix agent context cognitive-load regressions".

## Verification

- State: ok
- Note: Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T18:12:14.991Z
- Branch: task/202605231803-M9TK2M/fix-agent-context-load
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
