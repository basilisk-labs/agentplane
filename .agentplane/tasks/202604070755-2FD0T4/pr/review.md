# PR Review

Created: 2026-04-07T09:37:31.149Z
Branch: task/202604070755-2FD0T4/gh-transport-retry

## Summary

Add retryable gh transport wrapper for flaky GitHub API calls

Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.

## Scope

- In scope: Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.
- Out of scope: unrelated refactors not required for "Add retryable gh transport wrapper for flaky GitHub API calls".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts`. Expected: transient GitHub transport errors are retried where intended, while auth/usage failures still stop immediately.
2. Run `bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/pr/close.ts`. Expected: the shared transport wrapper and touched command paths stay lint-clean.
3. Review the touched GitHub transport call sites. Expected: retry/backoff logic is centralized instead of duplicated, and the command paths stay REST-first where a REST endpoint already exists.

### Current Status

- State: ok
- Note: Command: bun test hosted-merge-sync.test.ts and run-cli.core.pr-close.test.ts; Result: pass; Evidence: 11 pass, 0 fail covering transient retry and permanent auth stop behavior in hosted-merge-sync and pr close. Scope: shared GitHub transport retry wrapper and both consumer command paths. Command: bun x eslint touched gh transport files; Result: pass; Evidence: no lint errors. Scope: shared helper, command consumers, and regression tests. Command: review call sites; Result: pass; Evidence: retry/backoff classifier is centralized and pr close stays on REST gh api endpoints. Scope: transport call-site design.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T09:37:31.149Z
- Branch: task/202604070755-2FD0T4/gh-transport-retry
- Head: 498565593001

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
