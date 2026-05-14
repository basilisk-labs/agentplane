Task: `202605141619-44RW98`
Title: Fix runner playbook knip exports
Canonical task record: `.agentplane/tasks/202605141619-44RW98/README.md`

## Summary

Fix runner playbook knip exports

Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.

## Scope

- In scope: Remove unintended public exports from the runner playbook contract slice so the dead-code baseline gate passes after the runner playbook merge.
- Out of scope: unrelated refactors not required for "Fix runner playbook knip exports".

## Verification

- State: ok
- Note:

```text
Verified: narrowed runner playbook exports fix the knip dead-code baseline failure while preserving
playbook behavior.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T16:21:58.404Z
- Branch: task/202605141619-44RW98/runner-playbook-knip-fix
- Head: a6f73b0650e3

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 packages/agentplane/src/runner/playbooks.ts        |   6 +-
 packages/agentplane/src/runner/types.ts            |  15 -
 3 files changed, 555 insertions(+), 18 deletions(-)
```

</details>
