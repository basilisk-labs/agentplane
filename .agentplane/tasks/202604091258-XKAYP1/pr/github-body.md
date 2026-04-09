## Summary

Reduce pr open artifact churn after remote PR linkage

When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.

## Scope

- In scope: When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.
- Out of scope: unrelated refactors not required for "Reduce pr open artifact churn after remote PR linkage".

## Verification

### Plan

1. Reproduce pr open against create/link-existing GitHub PR paths. Expected: review/body artifacts stay unchanged when only linkage metadata changes.
2. Run focused pr-flow tests around pr open idempotence and existing-PR hydration. Expected: only the required metadata delta remains.
3. Run relevant lint/tests. Expected: PR artifact generation still passes existing contract checks.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t "pr open keeps review/body stable" && bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: create-path and existing-PR-path stability tests passed and eslint stayed clean. Scope: pr open artifact rendering during remote PR linkage.

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

- Updated: 2026-04-09T13:13:53.609Z
- Branch: task/202604091258-XKAYP1/pr-open-churn
- Head: 0c2ad60b7a72

```text
No changes detected.
```

</details>
