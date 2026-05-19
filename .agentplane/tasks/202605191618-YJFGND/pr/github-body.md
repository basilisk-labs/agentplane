Task: `202605191618-YJFGND`
Title: Refresh evidence bundle during hosted close
Canonical task record: `.agentplane/tasks/202605191618-YJFGND/README.md`

## Summary

Refresh evidence bundle during hosted close

Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.

## Scope

- In scope: Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.
- Out of scope: unrelated refactors not required for "Refresh evidence bundle during hosted close".

## Verification

- State: ok
- Note:

```text
Implemented hosted close evidence refresh and repaired stale evidence manifest for
202605191421-D566XJ on main. Checks passed: hosted-close/evidence focused tests, agentplane
typecheck, framework:dev:bootstrap, evidence verify --strict for both tasks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T16:19:53.288Z
- Branch: task/202605191618-YJFGND/hosted-close-evidence
- Head: 0559580ce2f8

```text
No changes detected.
```

</details>
