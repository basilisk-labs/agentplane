Task: `202605061631-C38BR9`
Title: Fix incident promotion and clear active registry
Canonical task record: `.agentplane/tasks/202605061631-C38BR9/README.md`

## Summary

Fix incident promotion and clear active registry

Prevent successful task verification summaries from being auto-promoted into active incidents, archive current incident entries with evidence, and leave the active incidents registry clean for release gates.

## Scope

- In scope: Prevent successful task verification summaries from being auto-promoted into active incidents, archive current incident entries with evidence, and leave the active incidents registry clean for release gates.
- Out of scope: unrelated refactors not required for "Fix incident promotion and clear active registry".

## Verification

- State: ok
- Note: Implemented explicit incident promotion: task findings are local by default, --promote/--external/--repo-fixable opt into registry candidates, success verification summaries are excluded from auto-promotion, and the active incident registry is archived/cleared for release.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T16:58:21.248Z
- Branch: task/202605061631-C38BR9/incident-registry-cleanup
- Head: d58dd947d591

```text
No changes detected.
```

</details>
