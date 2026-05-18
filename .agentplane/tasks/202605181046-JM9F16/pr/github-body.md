Task: `202605181046-JM9F16`
Title: Gate runner surfaces for v0.7
Canonical task record: `.agentplane/tasks/202605181046-JM9F16/README.md`

## Summary

Gate runner surfaces for v0.7

Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.

## Scope

- In scope: Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.
- Out of scope: unrelated refactors not required for "Gate runner surfaces for v0.7".

## Verification

- State: ok
- Note:

```text
Removed public runner command surfaces and context --run shortcuts for current release; runner
implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck,
ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T10:46:40.621Z
- Branch: task/202605181046-JM9F16/gate-runner-v0-7
- Head: 88585c94c356

```text
No changes detected.
```

</details>
