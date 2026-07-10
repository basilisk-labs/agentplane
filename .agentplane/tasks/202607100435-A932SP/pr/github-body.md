Task: `202607100435-A932SP`
Title: Release integration lane after pre-merge Hosted Close
Canonical task record: `.agentplane/tasks/202607100435-A932SP/README.md`

## Summary

Release integration lane after pre-merge Hosted Close

For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.

## Scope

- In scope: For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.
- Out of scope: unrelated refactors not required for "Release integration lane after pre-merge Hosted Close".

## Verification

- State: needs_rework
- Note:

```text
Review thread identified missing task-closure and basis/head validation before queue release;
implement the same validation contract as Hosted Close.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T09:06:02.845Z
- Branch: task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   2 +
 docs/internal/v0.6.22-refactor-plan.md             |   5 +-
 .../src/commands/pr/flow-status.pre-merge.test.ts  | 117 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  51 +++++++++
 4 files changed, 173 insertions(+), 2 deletions(-)
```

</details>
