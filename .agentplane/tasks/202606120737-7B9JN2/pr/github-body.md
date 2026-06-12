Task: `202606120737-7B9JN2`
Title: Hide runner from default agent prompts
Canonical task record: `.agentplane/tasks/202606120737-7B9JN2/README.md`

## Summary

Hide runner from default agent prompts

Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.

## Scope

- In scope: Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.
- Out of scope: unrelated refactors not required for "Hide runner from default agent prompts".

## Verification

- State: ok
- Note:

```text
Verified: current HEAD 1e7d5cfd3 hides runner from default route/help/prompt surfaces while keeping
internal task run dispatch and the parallel-codex runner prompt exception. Checks passed on this
branch: focused vitest route/help/prompt suite (8 files, 53 tests); bun run --filter=agentplane
build; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; ap doctor (OK with two
pre-existing DONE task commit-hash warnings).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T07:39:05.478Z
- Branch: task/202606120737-7B9JN2/hide-runner-default-prompts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              | 110 ------------------
 packages/agentplane/assets/RUNNER.md               |   4 +
 .../run-cli.core.help-snap.test.ts.snap            |   6 +-
 .../cli/run-cli.core.route-decision.batch.test.ts  |   4 +-
 ...cli.core.route-decision.direct-closeout.test.ts |   8 +-
 .../src/cli/run-cli/command-catalog.test.ts        |   6 +
 .../src/cli/run-cli/command-catalog/task.ts        |  24 +++-
 .../commands/shared/route-decision-next-action.ts  |   6 -
 .../src/commands/shared/route-guidance.test.ts     |   3 +-
 .../src/commands/shared/route-guidance.ts          |   6 +-
 .../agentplane/src/commands/task/brief-render.ts   |  12 +-
 .../src/commands/task/next-action.command.ts       |  10 +-
 .../src/runner/context/base-prompts.test.ts        | 124 +++++++++++----------
 .../agentplane/src/runner/context/base-prompts.ts  |   3 +-
 14 files changed, 122 insertions(+), 204 deletions(-)
```

</details>
