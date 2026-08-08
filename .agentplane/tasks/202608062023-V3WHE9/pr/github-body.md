Task: `202608062023-V3WHE9`
Title: Add safe local evidence retention, statistics, and garbage collection
Canonical task record: `.agentplane/tasks/202608062023-V3WHE9/README.md`

## Summary

Add safe local evidence retention, statistics, and garbage collection

Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.

## Scope

- In scope: Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
- Out of scope: unrelated refactors not required for "Add safe local evidence retention, statistics, and garbage collection".

## Verification

- State: ok
- Note:

```text
Result: pass; all declared verification steps and the full contract suite passed for implementation
9ecb9fa40f42d2dc934c91da8d5cb814a7f122c8.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:11:40.567Z
- Branch: task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  97 +++++
 docs/user/commands.mdx                             |  39 ++
 .../src/cli/run-cli.core.evidence.test.ts          |  55 +++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  15 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  28 +-
 .../src/cli/run-cli/command-loaders/evidence.ts    |  44 ++
 .../src/cli/run-cli/command-loaders/project.ts     |  11 -
 .../src/commands/evidence/evidence-inventory.ts    | 343 ++++++++++++++++
 .../evidence/evidence-maintenance.command.ts       | 185 +++++++++
 .../commands/evidence/evidence-maintenance.test.ts | 442 +++++++++++++++++++++
 .../src/commands/evidence/evidence-maintenance.ts  | 270 +++++++++++++
 .../src/commands/evidence/evidence-manifest.ts     |  16 +-
 .../src/commands/evidence/evidence-sha256.ts       |  12 +
 .../src/commands/evidence/evidence.command.ts      |   4 +-
 .../baselines/v0.7-compatibility-candidate.json    | 195 ++++++++-
 .../check-compatibility-contract-baseline.mjs      | 130 +++++-
 16 files changed, 1842 insertions(+), 44 deletions(-)
```

</details>
