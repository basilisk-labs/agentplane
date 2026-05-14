Task: `202605131913-YPT798`
Title: Serialize framework dev build lane
Canonical task record: `.agentplane/tasks/202605131913-YPT798/README.md`

## Summary

Serialize framework dev build lane

Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.

## Scope

- In scope: Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.
- Out of scope: unrelated refactors not required for "Serialize framework dev build lane".

## Verification

- State: ok
- Note:

```text
Verified final branch after formatter fix and push. Passed full pre-push gate: local CI fast
selector full-fast, 299 Vitest files / 1766 passed / 2 skipped, plus critical CLI E2E 5 files / 14
passed. Branch pushed to origin/task/202605131913-YPT798/serialize-build-lane.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T05:58:03.551Z
- Branch: task/202605131913-YPT798/serialize-build-lane
- Head: 3951865a3c60

```text
 .agentplane/policy/incidents.md                    |   2 +-
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 docs/developer/incident-archive.mdx                |   1 +
 packages/agentplane/assets/policy/incidents.md     |   1 -
 packages/agentplane/bin/agentplane.js              |  61 ++-
 .../src/cli/bootstrap-framework-dev-script.test.ts |  74 +++
 scripts/checks/run-local-ci.mjs                    |   9 +-
 scripts/lib/framework-build-lock.mjs               | 113 +++++
 scripts/workflow/bootstrap-framework-dev.mjs       |  31 +-
 9 files changed, 792 insertions(+), 26 deletions(-)
```

</details>
