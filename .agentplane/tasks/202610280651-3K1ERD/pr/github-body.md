Task: `202610280651-3K1ERD`
Title: Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents
Canonical task record: `.agentplane/tasks/202610280651-3K1ERD/README.md`

## Summary

Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents

Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.

## Scope

- In scope: Fix the generic mismatch between existing PR adoption admission and task execution routing: branch_pr tasks declare external_write for operator-owned provider adoption, while semantic WorkOrders correctly forbid that effect. Keep semantic authority unchanged; require the declaration, network-read authority, approved plan, canonical task, and the existing exact USER operation grant. Add a regression test using a real resolved execution contract. This unblocks native adoption of Dependabot PRs #6944 and #6935 for 0.7.13.
- Out of scope: unrelated refactors not required for "Allow exact USER-granted hosted PR adoption when external write is declared but withheld from semantic agents".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-28T12:58:42.208Z
- Branch: task/202610280651-3K1ERD/allow-exact-user-granted-hosted-pr-adoption-when
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/adoption-merge.test.ts         |   7 +-
 .../src/commands/pr/adoption-request.test.ts       |   7 +-
 .../src/commands/pr/adoption-route.test.ts         |  15 +--
 .../commands/pr/adoption-task-authority.test.ts    | 107 +++++++++++++++++++--
 .../src/commands/pr/adoption-task-authority.ts     |  11 ++-
 5 files changed, 122 insertions(+), 25 deletions(-)
```

</details>
