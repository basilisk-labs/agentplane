Task: `202605100837-B14YQC`
Title: Pre-v0.5: update branch_pr docs and quickstart happy path
Canonical task record: `.agentplane/tasks/202605100837-B14YQC/README.md`

## Summary

Pre-v0.5: update branch_pr docs and quickstart happy path

Document the canonical branch_pr flow: base plan/approve; task worktree start-ready, implement, verify, commit, PR open/update; base integrate/merge; finish with explicit hash and close commit; cleanup worktree/branch.

## Scope

- In scope: Document the canonical branch_pr flow: base plan/approve; task worktree start-ready, implement, verify, commit, PR open/update; base integrate/merge; finish with explicit hash and close commit; cleanup worktree/branch.
- Out of scope: unrelated refactors not required for "Pre-v0.5: update branch_pr docs and quickstart happy path".

## Verification

- State: ok
- Note: Verified after rebasing branch_pr docs clarification onto current main.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T09:16:44.390Z
- Branch: task-202605100837-B14YQC-branch-pr-docs-happy-path
- Head: 095ef7f7d6bf

```text
 .../blueprint/resolved-snapshot.json               | 366 +++++++++++++++
 .agentplane/tasks/202605120909-JVPX7D/README.md    | 147 ++++++
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 docs/user/branching-and-pr-artifacts.mdx           |  20 +-
 docs/user/workflow.mdx                             |  19 +-
 docs/workflow-guides/branch-pr.mdx                 |  13 +-
 packages/agentplane/src/cli/command-guide.ts       |   7 +-
 scripts/check-agent-onboarding-scenario.mjs        |  11 +-
 8 files changed, 1080 insertions(+), 15 deletions(-)
```

</details>
