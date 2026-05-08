Task: `202605081617-D5TQ88`
Title: Clean up v0.5 release code debt
Canonical task record: `.agentplane/tasks/202605081617-D5TQ88/README.md`

## Summary

Clean up v0.5 release code debt

Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.

## Scope

- In scope: Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.
- Out of scope: unrelated refactors not required for "Clean up v0.5 release code debt".

## Verification

- State: ok
- Note: Implemented scoped v0.5 cleanup: recipe build warning removed, task-doc version normalization consolidated through core, testkit internal imports routed through the testkit internal facade, and knip baseline reduced by one stale export. Checks passed: agentplane build, focused recipe/task/testkit tests, release:parity, diff --check, knip:check, hotspots:check, test:fast, release:check.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T16:19:20.558Z
- Branch: task/202605081617-D5TQ88/v05-release-cleanup
- Head: 999ef2076454

```text
No changes detected.
```

</details>
