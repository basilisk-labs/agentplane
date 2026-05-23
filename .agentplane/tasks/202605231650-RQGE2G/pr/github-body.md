Task: `202605231650-RQGE2G`
Title: Redesign homepage repo evidence hero block
Canonical task record: `.agentplane/tasks/202605231650-RQGE2G/README.md`

## Summary

Redesign homepage repo evidence hero block

Redesign the homepage hero repo evidence block so it matches the orange AgentPlane visual system and reads as usable repository evidence rather than a blue dashboard-style widget.

## Scope

- In scope: Redesign the homepage hero repo evidence block so it matches the orange AgentPlane visual system and reads as usable repository evidence rather than a blue dashboard-style widget.
- Out of scope: unrelated refactors not required for "Redesign homepage repo evidence hero block".

## Verification

- State: ok
- Note:

```text
Quality review passed: scope is limited to the homepage hero repo evidence block and task artifacts;
visual checks show no text overflow at desktop 1440x1000 or mobile 390x844; docs:site:check and
design-language checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T16:51:31.967Z
- Branch: task/202605231650-RQGE2G/repo-evidence-hero
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/src/pages/_home.module.css | 159 ++++++++++++++++++++++++++++++-------
 website/src/pages/index.tsx        |  49 +++++++-----
 2 files changed, 159 insertions(+), 49 deletions(-)
```

</details>
