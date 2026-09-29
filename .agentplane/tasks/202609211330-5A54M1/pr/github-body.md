Task: `202609211330-5A54M1`
Title: Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate
Canonical task record: `.agentplane/tasks/202609211330-5A54M1/README.md`

## Summary

Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate

Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.

## Scope

- In scope: Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
- Out of scope: unrelated refactors not required for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T14:16:18.707Z
- Branch: task/202609211330-5A54M1/repair-canonical-branch-pr-completion-persistenc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.core.task-advance.worktree-resolution.test.ts | 780 ++++++++-------------
 .../src/commands/task/advance-task-step.ts         |   4 +-
 .../commands/task/roadmap-terminal-noop.test.ts    | 130 ++++
 .../baselines/v0.7-compatibility-candidate.json    |  37 +-
 .../check-compatibility-contract-baseline.mjs      |  25 +-
 5 files changed, 476 insertions(+), 500 deletions(-)
```

</details>
