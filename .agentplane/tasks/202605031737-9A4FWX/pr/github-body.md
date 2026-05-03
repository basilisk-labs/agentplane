Task: `202605031737-9A4FWX`
Title: Make DCO multi-author safe and optionalize tasks export snapshot

## Summary

Make DCO multi-author safe and optionalize tasks export snapshot

Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.

## Scope

- In scope: Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.
- Out of scope: unrelated refactors not required for "Make DCO multi-author safe and optionalize tasks export snapshot".

## Verification

- State: ok
- Note: Final verification after optional tasks export branch_pr guard adjustments and commit-stage fix.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T18:17:04.500Z
- Branch: task/202605031737-9A4FWX/dco-tasks-export-optional
- Head: fe21cf574a2e

```text
 .agentplane/tasks.json                             | 42043 -------------------
 docs/help/troubleshooting-by-symptom.mdx           |     2 +-
 docs/help/troubleshooting.mdx                      |     2 +-
 docs/user/backends/local.mdx                       |     4 +-
 docs/user/backends/redmine.mdx                     |     2 +-
 docs/user/cli-reference.generated.mdx              |    12 +-
 docs/user/commands.mdx                             |     6 +-
 docs/user/tasks-and-backends.mdx                   |     4 +-
 docs/user/workflow.mdx                             |     2 +-
 .../run-cli.core.help-snap.test.ts.snap            |     2 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |     2 +-
 .../src/cli/run-cli.core.help-snap.test.ts         |     4 +-
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |     4 +-
 packages/agentplane/src/commands/commit.spec.ts    |     4 +-
 .../agentplane/src/commands/guard/commit.spec.ts   |     2 +-
 .../src/commands/guard/impl/commit-stage.ts        |     6 +-
 packages/agentplane/src/commands/guard/impl/dco.ts |    32 +-
 .../agentplane/src/commands/guard/impl/env.test.ts |    38 +
 .../commands/pr/integrate/internal/prepare.test.ts |    12 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |     9 -
 .../agentplane/src/commands/task/export.command.ts |     9 +-
 .../src/commands/task/set-status.command.ts        |     2 +-
 packages/agentplane/src/policy/evaluate.test.ts    |    23 +-
 .../agentplane/src/policy/rules/branch-pr-base.ts  |    15 +-
 24 files changed, 134 insertions(+), 42107 deletions(-)
```

</details>
