Task: `202605210633-3ZGMA1`
Title: Fix README stale run examples
Canonical task record: `.agentplane/tasks/202605210633-3ZGMA1/README.md`

## Summary

Fix README stale run examples

Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.

## Scope

- In scope: Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.
- Out of scope: unrelated refactors not required for "Fix README stale run examples".

## Verification

- State: ok
- Note:

```text
Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README
runner/trace examples are removed, package README had no matching stale surface, and required docs
checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this
README-scoped task.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T06:34:14.504Z
- Branch: task/202605210633-3ZGMA1/readme-cli-drift
- Head: a25ac4fc2bf7

```text
No changes detected.
```

</details>
