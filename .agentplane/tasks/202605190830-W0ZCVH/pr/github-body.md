Task: `202605190830-W0ZCVH`
Title: Make context init interactive
Canonical task record: `.agentplane/tasks/202605190830-W0ZCVH/README.md`

## Summary

Make context init interactive

Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.

## Scope

- In scope: Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.
- Out of scope: unrelated refactors not required for "Make context init interactive".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for current integration candidate after CLI docs/test split and hosted
checks on PR #3924. Evidence: GitHub checks green on d60f8aa5a; local fast pre-push completed build,
docs freshness, hotspot, unit fast, and critical-cli before session cutoff; focused
tests/lint/routing recorded in task details.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:51:21.353Z
- Branch: task/202605190830-W0ZCVH/interactive-context-init
- Head: 6d564c9884e4

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 .../src/cli/run-cli.core.context-init.test.ts      | 117 +++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   1 -
 .../src/commands/context/context.command.ts        |  43 +-
 .../src/commands/context/context.spec.ts           |   5 +-
 6 files changed, 735 insertions(+), 5 deletions(-)
```

</details>
