Task: `202605061518-ZJM8VR`
Title: Separate framework dev CLI help surface
Canonical task record: `.agentplane/tasks/202605061518-ZJM8VR/README.md`

## Summary

Separate framework dev CLI help surface

Hide AgentPlane framework-maintainer commands such as release from the default installed-project command surface, expose them only in framework checkout/dev help, and organize command help to reduce agent cognitive load.

## Scope

- In scope: Hide AgentPlane framework-maintainer commands such as release from the default installed-project command surface, expose them only in framework checkout/dev help, and organize command help to reduce agent cognitive load.
- Out of scope: unrelated refactors not required for "Separate framework dev CLI help surface".

## Verification

- State: ok
- Note: Verified CLI help surface split: normal help hides release/framework and advanced maintenance commands, framework checkout help exposes Framework Dev, docs reference is fresh, focused tests and typecheck passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T15:19:21.500Z
- Branch: task/202605061518-ZJM8VR/cli-help-surfaces
- Head: 6feb8fc5d884

```text
No changes detected.
```

</details>
