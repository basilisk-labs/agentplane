# PR Review

Created: 2026-05-28T17:30:45.669Z

## Task

- Task: `202605281713-EW6N63`
- Title: Optimize prompt policy surfaces
- Status: DOING
- Branch: `task/202605281713-EW6N63/optimize-prompt-policy-surfaces`
- Canonical task record: `.agentplane/tasks/202605281713-EW6N63/README.md`

## Verification

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bun run framework:dev:bootstrap -> pass; repo-local runtime 0.6.11 active. Command: ap task next-action 202605281713-EW6N63 --explain -> pass; prints authoritative_checkout_path, mutation_path_hint, safe_to_mutate. Command: ap doctor -> OK with 0 warnings. Command: git diff --check -> pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:30:45.669Z
- Branch: task/202605281713-EW6N63/optimize-prompt-policy-surfaces
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/agent-bootstrap.generated.mdx            |  26 +--
 packages/agentplane/assets/AGENTS.md               |  45 ++--
 packages/agentplane/src/cli/bootstrap-guide.ts     |  26 +--
 packages/agentplane/src/cli/command-guide.test.ts  |  17 +-
 packages/agentplane/src/cli/command-guide.ts       |  18 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |  35 ++-
 .../src/commands/shared/route-decision.ts          |  53 ++++-
 .../agentplane/src/commands/shared/route-oracle.ts | 246 +++++++++++++++------
 .../agentplane/src/commands/task/brief.command.ts  |  39 ++++
 .../src/commands/task/next-action.command.ts       |   7 +
 .../agentplane/src/commands/task/status.command.ts |   6 +
 .../src/runner/usecases/task-run-blueprint.test.ts |   9 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |  13 +-
 13 files changed, 391 insertions(+), 149 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
