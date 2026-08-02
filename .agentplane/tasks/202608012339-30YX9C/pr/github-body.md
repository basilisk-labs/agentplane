Task: `202608012339-30YX9C`
Title: Allow documentation tasks to commit canonical site artifacts
Canonical task record: `.agentplane/tasks/202608012339-30YX9C/README.md`

## Summary

Allow documentation tasks to commit canonical site artifacts

Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.

## Scope

- In scope: Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
- Out of scope: unrelated refactors not required for "Allow documentation tasks to commit canonical site artifacts".

## Verification

- State: ok
- Note: Current base-sync commit passes the focused policy, type, documentation, routing, and formatting gates.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T23:41:05.580Z
- Branch: task/202608012339-30YX9C/allow-documentation-tasks-to-commit-canonical-si
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/policy/rules/task-bound-mutation.test.ts   | 70 ++++++++++++++++++++++
 .../src/policy/rules/task-bound-mutation.ts        | 14 ++++-
 2 files changed, 83 insertions(+), 1 deletion(-)
```

</details>
