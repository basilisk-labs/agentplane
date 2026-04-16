## Summary

Clarify integrate route when run from a task worktree

Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.

## Scope

- In scope: Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.
- Out of scope: unrelated refactors not required for "Clarify integrate route when run from a task worktree".

## Verification

- State: ok
- Note: Verified integrate wrong-branch diagnostics with focused coverage: bun vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T07:14:11.838Z
- Branch: task/202604160713-2MVFXY/clarify-integrate-base-checkout-route
- Head: a544c270fca7

```text
No changes detected.
```

</details>
