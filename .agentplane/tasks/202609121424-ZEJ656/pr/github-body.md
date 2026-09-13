Task: `202609121424-ZEJ656`
Title: Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07
Canonical task record: `.agentplane/tasks/202609121424-ZEJ656/README.md`

## Summary

Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07

Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.
- Out of scope: unrelated refactors not required for "Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T17:28:08.451Z
- Branch: task/202609121424-ZEJ656/conserve-0-7-9-semantic-requirements-and-managed
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/adapters/codex-result-transport.ts  |  46 ++-
 packages/agentplane/src/runner/adapters/codex.ts   |   7 +-
 .../runner/adapters/roadmap-output-parity.test.ts  | 427 +++++++++++++++++++++
 packages/agentplane/src/runner/artifacts.ts        |   2 +-
 .../roadmap-requirement-conservation.test.ts       |  67 ++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  14 +-
 packages/core/src/runner/agent-work-order.ts       |  17 +-
 scripts/lib/test-route-registry.mjs                |   2 +
 8 files changed, 576 insertions(+), 6 deletions(-)
```

</details>
