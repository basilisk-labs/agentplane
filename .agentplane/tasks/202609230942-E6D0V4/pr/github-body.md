Task: `202609230942-E6D0V4`
Title: Make canonical AgentPlane autonomy safe and default
Canonical task record: `.agentplane/tasks/202609230942-E6D0V4/README.md`

## Summary

Make canonical AgentPlane autonomy safe and default

Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.

## Scope

- In scope: Fix the root cause that blocks Codex-hosted autonomous execution after explicit user intent. Converge canonical and ordinary plan-approval transport, validate every semantic Plan as a strict subset of the trusted task execution contract before any approval, add an authenticated native host decision adapter boundary, and add an explicit repository-policy approval mode that records POLICY provenance rather than impersonating USER. Make safe contract-bounded repository work autonomous by default; retain human stops for material scope/risk drift, credentials, destructive Git, and unavailable provider authority. Do not accept agent-supplied host identity or unsigned CLI JSON. Add focused unit, integration, canonical replay, and end-to-end coverage plus current documentation. This is a bootstrap prerequisite to task 202609222155-C5ZRA9 and the remaining pre-0.7.12 gates.
- Out of scope: unrelated refactors not required for "Make canonical AgentPlane autonomy safe and default".

## Verification

- State: ok
- Note: Canonical validation sha256:5e8298c1a7b3254408d6f69fb13ffd26cb6b44f617b306f78672546c59375241
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T10:25:48.224Z
- Branch: task/202609230942-E6D0V4/make-canonical-agentplane-autonomy-safe-and-defa
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/task-execution-authority.mdx        |  13 +-
 docs/user/cli-reference.generated.mdx              |   5 +
 docs/user/configuration.mdx                        |  10 +-
 docs/user/task-lifecycle.mdx                       |  30 ++--
 .../task-backend/kernel-authority-schema.ts        |   2 +-
 .../src/commands/task/advance-task-step.ts         |  17 +++
 .../agentplane/src/commands/task/create.command.ts | 153 ++++++++++++++++++-
 .../commands/task/kernel-plan-authority.test.ts    | 170 +++++++++++++++++++++
 .../src/commands/task/kernel-plan-authority.ts     | 104 +++++++++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |   2 +
 .../src/commands/task/kernel-runtime-context.ts    |  37 ++++-
 .../src/commands/task/kernel-semantic-result.ts    |   2 +
 packages/agentplane/src/commands/task/new.ts       |  34 +++--
 .../src/runner/usecases/kernel-authority.test.ts   | 108 +++++++------
 .../src/runner/usecases/kernel-authority.ts        |  49 +++++-
 .../core/src/tasks/task-artifact-schema.task.ts    |   8 +
 .../src/tasks/task-kernel/authority-lineage.ts     |  20 ++-
 packages/core/src/tasks/task-kernel/kernel.ts      |  11 +-
 packages/core/src/tasks/task-kernel/model.ts       |   3 +-
 .../task-kernel/repository-policy-approval.test.ts |  63 ++++++++
 packages/core/src/tasks/task-store.ts              |   4 +
 21 files changed, 738 insertions(+), 107 deletions(-)
```

</details>
