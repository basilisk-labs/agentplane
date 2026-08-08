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

- State: needs_rework
- Note:

```text
Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests),
typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551
bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite
remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:11:40.567Z
- Branch: task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  98 ++++++
 docs/user/commands.mdx                             |  39 +++
 .../src/cli/run-cli.core.evidence.test.ts          |  55 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |  20 ++
 .../src/cli/run-cli/command-loaders/project.ts     |  23 ++
 .../src/commands/evidence/evidence-inventory.ts    | 354 ++++++++++++++++++++
 .../evidence/evidence-maintenance.command.ts       | 185 +++++++++++
 .../commands/evidence/evidence-maintenance.test.ts | 360 +++++++++++++++++++++
 .../src/commands/evidence/evidence-maintenance.ts  | 216 +++++++++++++
 .../src/commands/evidence/evidence.command.ts      |   4 +-
 10 files changed, 1352 insertions(+), 2 deletions(-)
```

</details>
