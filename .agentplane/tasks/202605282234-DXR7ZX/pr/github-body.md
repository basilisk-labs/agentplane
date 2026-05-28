Task: `202605282234-DXR7ZX`
Title: Context init builder decomposition
Canonical task record: `.agentplane/tasks/202605282234-DXR7ZX/README.md`

## Summary

Context init builder decomposition

Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.
- Out of scope: unrelated refactors not required for "Context init builder decomposition".

## Verification

- State: ok
- Note:

```text
Context init was decomposed into command orchestration, bootstrap/git helpers, and content builders.
Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold
check (runtime warnings 39 -> 38).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T22:34:52.803Z
- Branch: task/202605282234-DXR7ZX/context-init-builder-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
