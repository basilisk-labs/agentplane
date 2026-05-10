Task: `202605100836-NKKQEH`
Title: Pre-v0.5: document Git mutation model
Canonical task record: `.agentplane/tasks/202605100836-NKKQEH/README.md`

## Summary

Pre-v0.5: document Git mutation model

Define the internal model for AgentPlane Git mutation kinds: implementation commits, lifecycle/status commits, PR artifact updates, branch_pr close-tail commits, hook-time checks, and integration queue Git operations.

## Scope

- In scope: Define the internal model for AgentPlane Git mutation kinds: implementation commits, lifecycle/status commits, PR artifact updates, branch_pr close-tail commits, hook-time checks, and integration queue Git operations.
- Out of scope: unrelated refactors not required for "Pre-v0.5: document Git mutation model".

## Verification

- State: ok
- Note: Internal design doc added at docs/internal/git-mutation-model.mdx. It names implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check, with checkout/owner/lock boundaries and the branch_pr finish matrix. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck; NO_UPDATE_NOTIFIER=1 bun --cwd website docusaurus build; built page contains Git Mutation Model and mutation-kind table. Build warnings were limited to existing webpack cache/localStorage/vscode-languageserver warnings.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T09:40:07.951Z
- Branch: task/202605100836-NKKQEH/git-mutation-model
- Head: ef92f7404f0c

```text
 .../blueprint/resolved-snapshot.json               | 350 +++++++++++++++++++++
 docs/internal/git-mutation-model.mdx               | 155 +++++++++
 2 files changed, 505 insertions(+)
```

</details>
