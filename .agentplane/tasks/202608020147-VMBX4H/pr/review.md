# PR Review

Created: 2026-08-02T01:48:08.791Z

## Task

- Task: `202608020147-VMBX4H`
- Title: Scope pre-commit mutation policy to task-side base-sync diff
- Status: DONE
- Branch: `task/202608020147-VMBX4H/base-sync-policy`
- Canonical task record: `.agentplane/tasks/202608020147-VMBX4H/README.md`

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts. Result: pass. Evidence: 19/19; configured-base acceptance survives a concurrent linear main advance, task-side implementation is still rejected by both hooks, and reachable side-parent topic merges are rejected. Scope: first-parent merge attribution and policy enforcement. Command: bun run typecheck && bun run lint:core. Result: pass. Evidence: both exited 0. Scope: TypeScript and lint. Command: bun run arch:check && bun run knip:check. Result: pass. Evidence: zero dependency violations; Knip baseline 543/543. Scope: architecture and unused-code regression. Command: bun run format:check && git diff --check. Result: pass. Evidence: Prettier clean and no whitespace errors. Scope: formatting. Post-integration acceptance remains the real YMYYQ8 configured-base merge.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T01:59:08.696Z
- Branch: task/202608020147-VMBX4H/base-sync-policy
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 217 +++++++++++++++++++++
 .../src/commands/hooks/base-sync-policy-paths.ts   |  70 +++++++
 .../src/commands/hooks/run.commit-msg.ts           |  22 ++-
 .../src/commands/hooks/run.pre-commit.ts           |   9 +-
 4 files changed, 315 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
