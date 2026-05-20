Task: `202605200819-3K686F`
Title: Simplify context init modes
Canonical task record: `.agentplane/tasks/202605200819-3K686F/README.md`

## Summary

Simplify context init modes

Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.

## Scope

- In scope: Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.
- Out of scope: unrelated refactors not required for "Simplify context init modes".

## Verification

- State: ok
- Note:

```text
EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy
minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains
empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic
mode. Evidence: focused context init and release-readiness tests pass, typecheck passes,
docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T08:27:32.331Z
- Branch: task/202605200819-3K686F/context-modes
- Head: 1cc0630396c4

```text
 .agentplane/context/agentplane.context.yaml        |   2 +-
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 docs/user/local-context.mdx                        |   6 +-
 .../src/cli/run-cli.core.context-init.test.ts      |  36 +-
 .../src/commands/context/context.command.ts        |   6 +-
 .../src/commands/context/context.spec.ts           |  19 +-
 packages/agentplane/src/commands/context/init.ts   |  28 +-
 .../src/commands/context/release-readiness.test.ts |   6 +-
 packages/agentplane/src/context/ingest-task.ts     |   8 +-
 10 files changed, 622 insertions(+), 63 deletions(-)
```

</details>
