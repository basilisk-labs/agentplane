Task: `202605281714-VX8QQ2`
Title: Decouple prompt assembly from optional local context
Canonical task record: `.agentplane/tasks/202605281714-VX8QQ2/README.md`

## Summary

Decouple prompt assembly from optional local context

Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.

## Scope

- In scope: Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.
- Out of scope: unrelated refactors not required for "Decouple prompt assembly from optional local context".

## Verification

- State: ok
- Note:

```text
Focused prompt/context tests, docs freshness checks, typecheck, format check, diff check, routing
policy, and doctor passed. Local context is now documented as optional and independent from runner
prompt assembly; context init default remains maximum-assimilation.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T17:15:16.988Z
- Branch: task/202605281714-VX8QQ2/prompt-context-decoupling
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/context/index.mdx                             |  9 ++++++---
 docs/context/modes.mdx                             | 23 +++++++++++++++++-----
 docs/context/quickstart.mdx                        |  7 ++++++-
 .../documentation-information-architecture.mdx     |  4 +++-
 docs/user/commands.mdx                             |  7 ++++---
 docs/user/local-context.mdx                        | 20 ++++++++++---------
 docs/user/overview.mdx                             |  6 +++++-
 docs/user/setup.mdx                                |  7 ++++++-
 docs/user/website-ia.mdx                           |  5 ++++-
 .../src/commands/context/context.command.ts        |  4 ++--
 packages/agentplane/src/commands/context/init.ts   |  3 ++-
 .../src/runner/context/base-prompts.test.ts        | 20 +++++++++++++++++++
 12 files changed, 87 insertions(+), 28 deletions(-)
```

</details>
