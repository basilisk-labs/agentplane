Task: `202605282222-D43531`
Title: Context command dispatcher decomposition
Canonical task record: `.agentplane/tasks/202605282222-D43531/README.md`

## Summary

Context command dispatcher decomposition

Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Context command dispatcher decomposition".

## Verification

- State: ok
- Note:

```text
Context command dispatcher split into thin entrypoint, runner, group usage handlers, and interactive
init runner. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and
hotspot threshold check (runtime warnings 40 -> 39).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T22:23:10.540Z
- Branch: task/202605282222-D43531/context-command-dispatcher-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/context-groups.ts         |  91 ++++
 .../src/commands/context/context-init-runner.ts    |  55 +++
 .../src/commands/context/context-runner.ts         | 340 ++++++++++++++
 .../src/commands/context/context.command.ts        | 502 +--------------------
 4 files changed, 487 insertions(+), 501 deletions(-)
```

</details>
