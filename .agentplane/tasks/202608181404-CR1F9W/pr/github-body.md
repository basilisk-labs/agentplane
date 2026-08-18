Task: `202608181404-CR1F9W`
Title: Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary
Canonical task record: `.agentplane/tasks/202608181404-CR1F9W/README.md`

## Summary

Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary

Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.

## Scope

- In scope: Generate and verify the social asset for docs/releases/v0.7.7.md. Add a typed, state-bound, USER-approved path for an evaluator or implementation-rework result to request additional writable roots without silently widening authority; invalidate stale verification and reissue a scoped EXECUTOR packet after approval. Keep the change release-blocking and compatible with branch_pr.
- Out of scope: unrelated refactors not required for "Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T14:05:34.593Z
- Branch: task/202608181404-CR1F9W/add-v0-7-7-release-social-assets-and-a-controlle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.7.7.md                            |  38 ++++
 .../src/cli/run-cli/command-catalog/task.ts        |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/task/scope-extend.command.ts      | 110 +++++++++
 .../src/commands/task/scope-extend.test.ts         | 117 ++++++++++
 .../agentplane/src/commands/task/scope-extend.ts   | 252 +++++++++++++++++++++
 .../baselines/v0.7-compatibility-candidate.json    | 128 ++++++++++-
 .../check-compatibility-contract-baseline.mjs      |  88 +++++++
 website/static/img/social/docs/releases/v0.7.7.png | Bin 0 -> 52375 bytes
 website/static/img/social/manifest.json            |   8 +
 10 files changed, 743 insertions(+), 10 deletions(-)
```

</details>
