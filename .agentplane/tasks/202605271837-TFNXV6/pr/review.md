# PR Review

Created: 2026-05-27T18:40:20.050Z

## Task

- Task: `202605271837-TFNXV6`
- Title: Improve commit message formatting
- Status: DOING
- Branch: `task/202605271837-TFNXV6/commit-message-format`
- Canonical task record: `.agentplane/tasks/202605271837-TFNXV6/README.md`

## Verification

- State: ok
- Note: Command: bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts. Result: pass. Evidence: 17 tests passed, including emoji subject and verification wording regressions. Scope: close commit message builder. Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts. Result: pass. Evidence: 5 tests passed. Scope: commit wrapper close integration. Command: bun test packages/core/src/commit/commit-policy.test.ts. Result: pass. Evidence: 29 tests passed. Scope: commit subject policy. Command: bunx eslint touched guard files. Result: pass. Evidence: targeted lint exited 0 after CI lint fix. Scope: touched guard bucket files. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: bunx prettier --check touched files. Result: pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace typecheck. Command: bun run ci:local:fast. Result: pass. Evidence: full-fast completed through critical CLI checks. Scope: local fast CI. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: final diff.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T18:40:20.050Z
- Branch: task/202605271837-TFNXV6/commit-message-format
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  5 +-
 .../src/commands/guard/impl/close-message.test.ts  | 40 ++++++++----
 .../src/commands/guard/impl/close-message.ts       | 71 ++++++++++++++++++----
 3 files changed, 89 insertions(+), 27 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
