Task: `202609222258-EC35TN`
Title: Execute completed-task integration effects from the base checkout without a Kernel controller transition
Canonical task record: `.agentplane/tasks/202609222258-EC35TN/README.md`

## Summary

Execute completed-task integration effects from the base checkout without a Kernel controller transition

Fix the broken supervisor transition discovered while validating the 0.7.11 lifecycle feedback. integration.enqueue and integration.run_next must execute from the base checkout without sending record_controller_transfer to an already COMPLETED Task Kernel aggregate.

## Scope

- In scope: Fix the broken supervisor transition discovered while validating the 0.7.11 lifecycle feedback. integration.enqueue and integration.run_next must execute from the base checkout without sending record_controller_transfer to an already COMPLETED Task Kernel aggregate.
- Out of scope: unrelated refactors not required for "Execute completed-task integration effects from the base checkout without a Kernel controller transition".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T00:31:34.638Z
- Branch: task/202609222258-EC35TN/canonical-integration-base-checkout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202609221053-GMZJ6N/README.md    | 1213 --------------------
 .../tasks/202609221053-GMZJ6N/pr/diffstat.txt      |    8 -
 .../tasks/202609221053-GMZJ6N/pr/github-body.md    |   40 -
 .../tasks/202609221053-GMZJ6N/pr/github-title.txt  |    1 -
 .agentplane/tasks/202609221053-GMZJ6N/pr/meta.json |   32 -
 .agentplane/tasks/202609221053-GMZJ6N/pr/review.md |   43 -
 ...c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json |  Bin 8497 -> 0 bytes
 ...87e07dfff35ea84123952ef257b9037259c0405a62.json |  Bin 10258 -> 0 bytes
 ...9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json |  Bin 7278 -> 0 bytes
 .../supervision/declared-checks.json               |  115 --
 .../supervision/implementation-evidence.json       |   78 --
 .../20260922221327270-d5763aed36d18755.json        |  270 -----
 .agentplane/tasks/202609222222-GGCDPS/README.md    | 1114 ------------------
 .../tasks/202609222222-GGCDPS/pr/diffstat.txt      |    3 -
 .../tasks/202609222222-GGCDPS/pr/github-body.md    |   35 -
 .../tasks/202609222222-GGCDPS/pr/github-title.txt  |    1 -
 .agentplane/tasks/202609222222-GGCDPS/pr/meta.json |   32 -
 .agentplane/tasks/202609222222-GGCDPS/pr/review.md |   38 -
 ...c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json |  Bin 8497 -> 0 bytes
 ...87e07dfff35ea84123952ef257b9037259c0405a62.json |  Bin 10258 -> 0 bytes
 ...9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json |  Bin 7278 -> 0 bytes
 .../supervision/declared-checks.json               |   94 --
 .../supervision/implementation-evidence.json       |   73 --
 .../20260922224220049-3454975f6bdb9b8c.json        |  246 ----
 .../shared/roadmap-rework-conservation.test.ts     |    2 +-
 .../src/commands/task/advance-task-step.ts         |   19 +
 .../task/branch-task-supervisor-episodes.ts        |    3 +
 .../commands/task/branch-task-verification.test.ts |   14 +-
 .../task/kernel-provider-effect-coordinator.ts     |   28 +-
 29 files changed, 60 insertions(+), 3442 deletions(-)
```

</details>
