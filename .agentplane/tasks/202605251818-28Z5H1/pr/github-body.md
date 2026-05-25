Task: `202605251818-28Z5H1`
Title: Reduce redundancy in AgentPlane code
Canonical task record: `.agentplane/tasks/202605251818-28Z5H1/README.md`

## Summary

Reduce redundancy in AgentPlane code

Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.

## Scope

- In scope: Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
- Out of scope: unrelated refactors not required for "Reduce redundancy in AgentPlane code".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T18:20:35.354Z
- Branch: task/202605251818-28Z5H1/reduce-redundancy-in-agentplane-code
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend/shared/domain-values.ts  | 44 ++++++++++
 .../src/backends/task-backend/shared/record.ts     | 48 ++---------
 packages/agentplane/src/cli/prompts.test.ts        | 50 +++++------
 packages/agentplane/src/cli/prompts.ts             |  4 -
 .../src/commands/blueprint/task-input.ts           | 47 ++--------
 .../agentplane/src/commands/hooks/task-context.ts  | 38 ++-------
 .../src/commands/shared/route-decision.ts          | 69 ++-------------
 .../src/commands/shared/source-confidence.ts       | 99 ++++++++++++++++++++++
 .../commands/task/agent-work-context-contract.ts   |  1 +
 .../agentplane/src/commands/task/brief.command.ts  | 58 ++-----------
 packages/agentplane/src/commands/task/new.ts       | 48 ++---------
 scripts/generate/render-homebrew-formula.mjs       | 45 ++--------
 scripts/generate/render-scoop-manifest.mjs         | 45 ++--------
 .../generate/render-setup-agentplane-action.mjs    | 45 ++--------
 scripts/lib/release-distribution-render.mjs        | 39 +++++++++
 15 files changed, 268 insertions(+), 412 deletions(-)
```

</details>
