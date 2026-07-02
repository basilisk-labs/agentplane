Task: `202607021729-C07EE3`
Title: Force context ingest to maximum-assimilation
Canonical task record: `.agentplane/tasks/202607021729-C07EE3/README.md`

## Summary

Force context ingest to maximum-assimilation

Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.

## Scope

- In scope: Phase 0 from the 2026-07-02 Context Maximum Assimilation PRD. Make maximum-assimilation the only public context ingest task mode: map deprecated workspace modes to maximum-assimilation, always request context.maximum_assimilation from ingest, extend coverage statuses to duplicate/conflict/out_of_scope, align prompt/docs with span-level coverage terminology, and add focused tests proving no context ingest path creates context.assimilation.
- Out of scope: unrelated refactors not required for "Force context ingest to maximum-assimilation".

## Verification

- State: ok
- Note:

```text
Verified: focused ingest/SGR tests, release-readiness tests, policy routing, doctor, and
ci:local:fast passed on the task branch.
```
- Canonical workflow state lives in the task README.

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
