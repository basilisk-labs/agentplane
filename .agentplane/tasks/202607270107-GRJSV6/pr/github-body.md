Task: `202607270107-GRJSV6`
Title: Preserve authority-only tails during merged cleanup
Canonical task record: `.agentplane/tasks/202607270107-GRJSV6/README.md`

## Summary

Preserve authority-only tails during merged cleanup

Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.

## Scope

- In scope: Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
- Out of scope: unrelated refactors not required for "Preserve authority-only tails during merged cleanup".

## Verification

- State: ok
- Note:

```text
Verified targeted cleanup acceptance, authority classification, ci:contract, and the complete hosted
PR #4636 gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T01:23:26.428Z
- Branch: task/202607270107-GRJSV6/preserve-authority-only-tails-during-merged-clea
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged-proof.ts    | 91 +++++++++++++++++++---
 .../branch/cleanup-merged.targeted.test.ts         | 61 +++++++++++++++
 .../src/commands/shared/quality-review-target.ts   |  2 +-
 .../commands/shared/side-effect-authority.test.ts  |  4 +-
 .../src/commands/shared/side-effect-authority.ts   |  5 +-
 5 files changed, 150 insertions(+), 13 deletions(-)
```

</details>
