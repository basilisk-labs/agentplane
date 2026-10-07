Task: `202610071534-BV344Y`
Title: Preserve unchanged PR review artifacts during provider hydration
Canonical task record: `.agentplane/tasks/202610071534-BV344Y/README.md`

## Summary

Preserve unchanged PR review artifacts during provider hydration

Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.

## Scope

- In scope: Fix the v0.7.13 release qualification failure in PR hydration. Candidate task 202610070445-2MV36M release CI reached chunk 43 and failed two existing open-hydration tests because linking a newly created remote PR advances metadata.updated_at and rewrites unchanged review/body AUTO SUMMARY timestamps. Keep provider metadata freshness and identity intact. Preserve rendered timestamps only when summary evidence is unchanged. Cover a third rerun, genuine diff/content changes and malformed blocks. Do not weaken tests, baselines, review requirements or gates. Native task protocol, independent evaluation, full verification and hosted integration are required. User authorizes necessary release repairs and main integration. Candidate failure evidence remains retained at .git/agentplane/kernel/exchanges/202610070445-2MV36M/9b109fab2b9197a91cfb6d791b0969cb72e516dd7b8819b13b49b76e9b6d2c33/native-validation-6b153127c1625b6773a89ee0cd50c891a4c0f399170b620f258305a1c76741fd.json. No release version changes or paid measurements.
- Out of scope: unrelated refactors not required for "Preserve unchanged PR review artifacts during provider hydration".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T15:54:41.605Z
- Branch: task/202610071534-BV344Y/preserve-unchanged-pr-review-artifacts-during-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...re.pr-flow.pr-validation.open-hydration.test.ts | 66 +++++++++++++++++++++-
 .../commands/pr/internal/review-template.test.ts   | 55 ++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    | 29 +++++++++-
 .../src/commands/pr/internal/sync-open-step.ts     |  7 +++
 4 files changed, 153 insertions(+), 4 deletions(-)
```

</details>
