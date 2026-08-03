Task: `202608021535-9EWFAB`
Title: Compact and deduplicate v0.7.1 task evidence
Canonical task record: `.agentplane/tasks/202608021535-9EWFAB/README.md`

## Summary

Compact and deduplicate v0.7.1 task evidence

Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.

## Scope

- In scope: Replace repeated evaluator diffs, prompts, and raw logs with content-addressed references and compact Git-tracked manifests while preserving local-first auditability, exact hashes, ACR receipts, offline recovery, and optional access to raw objects.
- Required control-plane correction: An explicitly authorized successor after a known operation_failed stop may follow the recomputed route with a different role or operation kind, while remaining bound to the exact failed operation key. effect_in_doubt, exhausted budgets, and mismatched keys remain terminal.
- Trust boundary: The repository root and processes running as the authenticated workspace user are trusted and cooperative. Static symlinks, tampered objects, and every observable directory replacement must fail closed; adversarial same-user replacement inside the final pathname-to-syscall interval is outside the portable Node boundary used by both evaluator evidence and runner state.
- Authorization basis: The repository owner authorized the complete refactor and continuation without repeated permission prompts; v0.7.1 adopts the existing runner boundary, while native handle-relative filesystem operations remain a separate cross-platform security deliverable.
- Out of scope: Unrelated refactors and a native openat/linkat/renameat/unlinkat helper.

## Verification

- State: ok
- Note: Final code and evidence rework verification passed at 812ccf994d14.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T16:20:00.808Z
- Branch: task/202608021535-9EWFAB/compact-and-deduplicate-v0-7-1-task-evidence
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .gitattributes                                     |   1 +
 docs/reference/evidence.mdx                        |  20 +
 .../run-cli.core.route-decision.quality.test.ts    |   3 +-
 .../src/cli/run-cli/registry.run.test.ts           |   9 +-
 .../src/commands/evaluator/evaluator-episode.ts    |  93 +----
 .../evaluator/evaluator-evidence-boundary.ts       | 436 ++++++++++++++++++++
 .../evaluator-evidence-compaction.test.ts          |  74 ++++
 .../evaluator/evaluator-evidence-store.test.ts     | 438 +++++++++++++++++++++
 .../commands/evaluator/evaluator-evidence-store.ts | 316 +++++++++++++++
 .../evaluator/evaluator-execute-supervisor.ts      |  20 +-
 .../evaluator/evaluator-execute.command.test.ts    |   2 +-
 .../evaluator/evaluator-prepare.command.test.ts    |   2 +-
 .../evaluator/evaluator-quality-artifacts.ts       |   1 +
 .../commands/evaluator/evaluator-result-schema.ts  |  82 ++++
 .../commands/evaluator/evaluator-review-apply.ts   |  11 +-
 .../commands/evaluator/evaluator-review-usecase.ts | 348 ++++++++--------
 .../evaluator/evaluator-run.command.test.ts        |   1 +
 .../commands/evaluator/evaluator-test-helpers.ts   |   2 +
 .../src/commands/evaluator/evaluator-work-order.ts | 135 +++++++
 .../src/commands/hooks/run.pre-commit.ts           |   3 +
 .../route-decision-blockers.quality-review.test.ts |  52 ++-
 .../src/commands/shared/route-decision-blockers.ts |  23 +-
 .../runner/supervisor-execution-episode.test.ts    |  41 +-
 .../src/runner/supervisor-execution-episode.ts     |  49 ++-
 packages/core/src/schemas/index.ts                 |   1 +
 25 files changed, 1873 insertions(+), 290 deletions(-)
```

</details>
