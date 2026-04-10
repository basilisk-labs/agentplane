## Summary

Seed approvable Verify Steps for verify-required task scaffolds

Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.

## Scope

- In scope: Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
- Out of scope: unrelated refactors not required for "Seed approvable Verify Steps for verify-required task scaffolds".

## Verification

### Plan

1. Create or derive a verify-required task and approve its plan without manually rewriting README sections. Expected: plan approval succeeds with the scaffolded Verify Steps as-is.
2. Run the focused task new/derive plus plan-approve regression slice for verify-required tasks. Expected: the scaffolded Verify Steps stay actionable and tests pass.
3. Inspect the seeded Verify Steps text. Expected: it contains concrete acceptance steps and no placeholder marker.

### Current Status

- State: ok
- Note: OK: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t 'task new seeds Verify Steps in README for verify-required primary tags|task new without verify commands still seeds approvable Verify Steps for verify-required primary tags'; bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts -t 'task derive seeds verify steps for implementation tasks and task list shows wait deps until spike is DONE|task derive without verify commands still seeds approvable Verify Steps'; bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t 'task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery'; bun x eslint packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/derive.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T02:35:53.792Z
- Branch: task/202604100213-1AAPW1/verify-steps-scaffold-approval
- Head: f79f3b9571c3

```text
 .agentplane/tasks/202604100213-1AAPW1/README.md    | 95 ++++++++++++++++++++++
 .../src/cli/run-cli.core.lifecycle.test.ts         | 66 +++++++++++++++
 .../cli/run-cli.core.tasks.scaffold-derive.test.ts | 73 ++++++++++++++++-
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  | 38 ++++++++-
 packages/agentplane/src/commands/task/derive.ts    |  2 +-
 .../agentplane/src/commands/task/doc-template.ts   |  6 +-
 packages/agentplane/src/commands/task/new.ts       |  2 +-
 7 files changed, 274 insertions(+), 8 deletions(-)
```

</details>
