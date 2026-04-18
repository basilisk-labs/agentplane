## Summary

Reduce branch_pr lifecycle redundancy and document the optimized route

Analyze branch_pr workflow for repeated local-only steps, duplicate task/PR artifact churn, and long feedback loops; implement the minimal docs/tooling changes that remove redundant actions without weakening branch-based controls.

## Scope

- In scope: Analyze branch_pr workflow for repeated local-only steps, duplicate task/PR artifact churn, and long feedback loops; implement the minimal docs/tooling changes that remove redundant actions without weakening branch-based controls.
- Out of scope: unrelated refactors not required for "Reduce branch_pr lifecycle redundancy and document the optimized route".

## Verification

- State: ok
- Note: branch_pr workflow docs and command help now document worktree-local owner commands, one-pass pr open, and merged-branch cleanup expectations; routing check, typecheck, and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:19:21.209Z
- Branch: task/202604180701-Z8WS24/branch-pr-route-docs
- Head: 7f2b563a2703

```text
 .agentplane/policy/workflow.branch_pr.md                  | 15 ++++++++++-----
 .../agentplane/src/commands/branch/work-start.command.ts  |  1 +
 packages/agentplane/src/commands/pr/pr.command.ts         | 10 ++++++++--
 3 files changed, 19 insertions(+), 7 deletions(-)
```

</details>
