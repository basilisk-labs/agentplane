Task: `202607221846-9XC1H0`
Title: Enforce role-scoped sandboxes and actual write boundaries
Canonical task record: `.agentplane/tasks/202607221846-9XC1H0/README.md`

## Summary

Enforce role-scoped sandboxes and actual write boundaries

RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations.

## Scope

- In scope: role-derived sandbox policy, authority provenance for danger-full-access, adapter capability downgrade reporting, actual delta-based scope checks, protected paths, unacceptable-run policy, and negative fixtures.
- Out of scope: promising enforcement an adapter cannot provide; such cases must surface a typed capability downgrade.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T18:45:27.072Z
- Branch: task/202607221846-9XC1H0/enforce-role-scoped-sandboxes-and-actual-write-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
