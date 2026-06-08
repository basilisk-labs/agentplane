Task: `202606080517-1ZYCFK`
Title: Surface AgentPlane-owned automation boundaries
Canonical task record: `.agentplane/tasks/202606080517-1ZYCFK/README.md`

## Summary

Surface AgentPlane-owned automation boundaries

Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.

## Scope

- In scope: Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.
- Out of scope: unrelated refactors not required for "Surface AgentPlane-owned automation boundaries".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/commands/shared/route-oracle.test.ts | Result: pass | Evidence: 5 \
  pass, 0 fail, 12 expect calls. Command: bun run agents:check | Result: pass | Evidence: agents \
  templates OK after canonical policy asset sync. Command: node .agentplane/policy/check-routing.mjs \
  | Result: pass | Evidence: policy routing OK; workflow.branch_pr policy and asset are 98 lines. \
  Command: bun run format:check | Result: pass | Evidence: All matched files use Prettier code \
  style. Command: agentplane doctor | Result: pass | Evidence: OK; only two pre-existing DONE-task \
  missing-commit warnings outside this task. Command: git diff --check | Result: pass | Evidence: no \
  whitespace errors.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T05:22:46.289Z
- Branch: task/202606080517-1ZYCFK/surface-agentplane-owned-automation-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/workflow.branch_pr.md           |  2 +-
 docs/user/task-lifecycle.mdx                       | 23 ++++++++++++
 .../agentplane/assets/policy/workflow.branch_pr.md |  2 +-
 .../src/commands/shared/route-oracle.test.ts       | 15 ++++++++
 .../agentplane/src/commands/shared/route-oracle.ts | 43 +++++++++++++++++++---
 5 files changed, 78 insertions(+), 7 deletions(-)
```

</details>
