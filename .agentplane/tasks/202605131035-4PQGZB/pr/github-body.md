Task: `202605131035-4PQGZB`
Title: Improve provider-neutral PR flow observability
Canonical task record: `.agentplane/tasks/202605131035-4PQGZB/README.md`

## Summary

Improve provider-neutral PR flow observability

Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.

## Scope

- In scope: Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
- Out of scope: unrelated refactors not required for "Improve provider-neutral PR flow observability".

## Verification

- State: ok
- Note: Verified: focused CLI tests, typecheck, lint, format, workflow lint, routing check, docs CLI check, critical tests, knip check, and PR flow status smoke passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T11:00:46.404Z
- Branch: task/202605131035-4PQGZB/pr-flow-status
- Head: 43e3edc6a5a0

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  37 +-
 .../run-cli.core.help-snap.test.ts.snap            | 336 ++++++++++++++
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  82 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  64 ++-
 packages/agentplane/src/commands/pr/flow-status.ts | 309 +++++++++++++
 packages/agentplane/src/commands/pr/pr.command.ts  |  15 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  27 +-
 .../agentplane/src/commands/task/finish-execute.ts |   7 +-
 .../src/commands/task/hosted-close-pr.execute.ts   |   6 +
 .../src/commands/task/hosted-close-pr.report.ts    |   5 +-
 .../src/commands/task/hosted-close-pr.types.ts     |   6 +
 scripts/wait-remote-pr-checks.mjs                  |  48 +-
 15 files changed, 1453 insertions(+), 9 deletions(-)
```

</details>
