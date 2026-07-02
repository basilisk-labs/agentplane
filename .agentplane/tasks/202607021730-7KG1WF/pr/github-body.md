Task: `202607021730-7KG1WF`
Title: Document and migrate maximum-assimilation v2
Canonical task record: `.agentplane/tasks/202607021730-7KG1WF/README.md`

## Summary

Document and migrate maximum-assimilation v2

Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.

## Scope

- In scope: Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
- Out of scope: unrelated refactors not required for "Document and migrate maximum-assimilation v2".

## Verification

- State: ok
- Note:

```text
Verified source_refs review fix. Checks: migrate unit test, maximum-assimilation artifact validation
tests, targeted eslint, format:changed, framework bootstrap.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T20:54:00.170Z
- Branch: task/202607021730-7KG1WF/document-and-migrate-maximum-assimilation-v2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/context/modes.mdx                             |  15 +
 docs/context/quickstart.mdx                        |  10 +
 docs/context/review.mdx                            |   2 +
 docs/releases/v0.6.21.md                           |   2 +
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../src/commands/context/context-runner.ts         |  13 +
 .../src/commands/context/context.spec.ts           |  34 ++
 .../agentplane/src/commands/context/migrate.ts     | 359 +++++++++++++++++++++
 .../src/commands/context/migrate.unit.test.ts      | 208 ++++++++++++
 9 files changed, 645 insertions(+)
```

</details>
