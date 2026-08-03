Task: `202608021535-9EWFAB`
Title: Compact and deduplicate v0.7.1 task evidence
Canonical task record: `.agentplane/tasks/202608021535-9EWFAB/README.md`

## Summary

Compact and deduplicate v0.7.1 task evidence

Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.

## Scope

- In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
- Out of scope: unrelated refactors not required for "Compact and deduplicate v0.7.1 task evidence".

## Verification

- State: ok
- Note: Content-addressed evaluator packets passed the task-specific and repository-wide verification contract.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T16:20:00.808Z
- Branch: task/202608021535-9EWFAB/compact-and-deduplicate-v0-7-1-task-evidence
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .gitattributes                                     |   1 +
 docs/reference/evidence.mdx                        |  20 ++
 .../run-cli.core.route-decision.quality.test.ts    |   3 +-
 .../src/cli/run-cli/registry.run.test.ts           |   9 +-
 .../src/commands/evaluator/evaluator-episode.ts    |  93 +-----
 .../evaluator-evidence-compaction.test.ts          |  74 +++++
 .../evaluator/evaluator-evidence-store.test.ts     | 136 ++++++++
 .../commands/evaluator/evaluator-evidence-store.ts | 307 ++++++++++++++++++
 .../evaluator/evaluator-prepare.command.test.ts    |   2 +-
 .../commands/evaluator/evaluator-result-schema.ts  |  82 +++++
 .../commands/evaluator/evaluator-review-apply.ts   |  11 +-
 .../commands/evaluator/evaluator-review-usecase.ts | 348 ++++++++++-----------
 .../commands/evaluator/evaluator-test-helpers.ts   |   2 +
 .../src/commands/evaluator/evaluator-work-order.ts | 135 ++++++++
 .../src/commands/hooks/run.pre-commit.ts           |   3 +
 15 files changed, 958 insertions(+), 268 deletions(-)
```

</details>
