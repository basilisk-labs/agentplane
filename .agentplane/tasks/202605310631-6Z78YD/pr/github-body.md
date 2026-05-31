Task: `202605310631-6Z78YD`
Title: Require final untracked artifact audit
Canonical task record: `.agentplane/tasks/202605310631-6Z78YD/README.md`

## Summary

Require final untracked artifact audit

Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.

## Scope

- In scope: Make AgentPlane closeout guidance require an explicit final git status with --untracked-files=all so agents cannot miss generated task or quality artifacts before reporting completion.
- Out of scope: unrelated refactors not required for "Require final untracked artifact audit".

## Verification

- State: ok
- Note:

```text
Implemented final untracked artifact audit guidance across policy, bootstrap, preflight, finish
diagnostics, docs, and tests. Checks passed: policy routing, Vitest targeted suite, bootstrap doc
freshness, format:changed, doctor, preflight, and explicit git status --short --untracked-files=all
review.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T06:33:45.472Z
- Branch: task/202605310631-6Z78YD/require-final-untracked-artifact-audit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
