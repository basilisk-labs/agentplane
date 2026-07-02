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
Implemented maximum-assimilation v2 migration command and docs. Verified with targeted unit tests,
full context test slice, CLI docs freshness, lint, format, policy routing, command smoke test, and
doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T20:30:03.849Z
- Branch: task/202607021730-7KG1WF/document-and-migrate-maximum-assimilation-v2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607021729-8S1DF3/README.md    | 25 ++++++++++++++++++----
 .agentplane/tasks/202607021729-8S1DF3/pr/meta.json |  7 ++++++
 2 files changed, 28 insertions(+), 4 deletions(-)
```

</details>
