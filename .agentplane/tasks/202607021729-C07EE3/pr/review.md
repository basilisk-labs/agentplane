# PR Review

Created: 2026-07-02T17:31:41.700Z

## Task

- Task: `202607021729-C07EE3`
- Title: Force context ingest to maximum-assimilation
- Status: DOING
- Branch: `task/202607021729-C07EE3/force-context-ingest-to-maximum-assimilation`
- Canonical task record: `.agentplane/tasks/202607021729-C07EE3/README.md`

## Verification

- State: ok
- Note: Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and ci:local:fast passed on the task branch.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T17:56:19.490Z
- Branch: task/202607021729-C07EE3/force-context-ingest-to-maximum-assimilation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607021729-1F4FNM/README.md    | 104 +++++++++++++++
 .agentplane/tasks/202607021729-8S1DF3/README.md    | 104 +++++++++++++++
 .agentplane/tasks/202607021729-BC11BT/README.md    | 104 +++++++++++++++
 .agentplane/tasks/202607021729-QWQRZY/README.md    | 104 +++++++++++++++
 .agentplane/tasks/202607021730-7KG1WF/README.md    | 100 +++++++++++++++
 docs/context/index.mdx                             |   2 +-
 docs/context/modes.mdx                             |  83 ++++--------
 docs/context/quickstart.mdx                        |   7 +-
 docs/user/cli-reference.generated.mdx              |   2 +-
 docs/user/local-context.mdx                        |  21 ++--
 .../src/commands/context/context-init-runner.ts    |   7 +-
 .../src/commands/context/context.spec.ts           |   2 +-
 .../src/commands/context/release-readiness.test.ts |  29 +++--
 .../verify-task.maximum-assimilation.unit.test.ts  |   2 +-
 .../agentplane/src/context/coverage-validation.ts  |  10 +-
 .../agentplane/src/context/ingest-task-prompt.ts   |  52 ++++----
 .../agentplane/src/context/ingest-task.test.ts     |  68 ++++++++++
 packages/agentplane/src/context/ingest-task.ts     | 139 ++++++++++-----------
 packages/agentplane/src/context/ingest.ts          |  39 ------
 .../maximum-assimilation-artifacts-validation.ts   |   4 +-
 .../agentplane/src/runtime/sgr/contract-types.ts   |   3 +
 .../agentplane/src/runtime/sgr/contracts.test.ts   |  29 +++++
 packages/agentplane/src/runtime/sgr/contracts.ts   |   3 +
 23 files changed, 777 insertions(+), 241 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
