Task: `202605141342-R793XK`
Title: Add SGR schema for context extraction
Canonical task record: `.agentplane/tasks/202605141342-R793XK/README.md`

## Summary

Add SGR schema for context extraction

Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.

## Scope

- In scope: Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.
- Out of scope: unrelated refactors not required for "Add SGR schema for context extraction".

## Verification

- State: ok
- Note:

```text
Verified: context extraction SGR contract requires source_refs, confidence, status, stale/conflict
markers, and bounded output kinds. Checks passed: bun test
packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck;
focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only
pre-existing branch_pr reconciliation warnings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T13:45:49.767Z
- Branch: task/202605141342-R793XK/sgr-reliability-schemas
- Head: 3d5c3b4706ea

```text
No changes detected.
```

</details>
