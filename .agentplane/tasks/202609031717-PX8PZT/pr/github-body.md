Task: `202609031717-PX8PZT`
Title: Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches
Canonical task record: `.agentplane/tasks/202609031717-PX8PZT/README.md`

## Summary

Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches

Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.

## Scope

- In scope: Complete the Clean Core salvage boundary on current main without merging stale branches. Preserve four narrowly scoped behaviors with current-architecture adaptations and regressions: (1) resolve protected integration handoffs from the owning base checkout while validating task and protected-route identity; source DVS5NN. (2) recover no-PR branch publication only for exact task-artifact-only advances with same-repository, unique-not-found PR, exact local/remote heads, and force-with-lease guards; source HBSZ4F. (3) safely parse and execute top-level whitespace-delimited literal && declared-check sequences as structured argv, validate all segments before execution, share one timeout budget, and stop on first failure or zero-test result; source QWP8S8. (4) reject reuse of missing, incomplete, or task-worktree-owned node_modules layouts during worktree dependency preparation and framework bootstrap; source 9T9528. Keep WorkItems sequential and one active at a time. Reuse current code and tests, adapt rather than cherry-pick, and do not expand into MPXQBK, full T4RR70/GitLab, release/version/publication metadata, dependencies, or unrelated product work. Verify exact-head/protected-base behavior already present rather than importing 9RCWZQ release logic. Final verification must include focused regressions, formatting, lint, typecheck, routing, task diagnostics where applicable, and bun run ci:local:full.
- Out of scope: unrelated refactors not required for "Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-03T17:26:07.913Z
- Branch: task/202609031717-PX8PZT/port-the-minimal-missing-clean-core-lifecycle-bo
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-handoff.test.ts      | 103 ++++++-
 .../src/commands/pr/branch-publication.test.ts     | 325 ++++++++++++++++++++-
 .../src/commands/pr/branch-publication.ts          | 110 ++++++-
 packages/agentplane/src/commands/pr/flow-status.ts |  12 +-
 packages/agentplane/src/commands/pr/open.ts        |   3 +
 .../commands/shared/task-handoff-reader.test.ts    | 163 +++++++++++
 .../src/commands/shared/task-handoff-reader.ts     |  78 +++++
 .../commands/task/direct-task-verification.test.ts | 115 ++++++++
 .../src/commands/task/direct-task-verification.ts  | 181 ++++++++----
 .../src/commands/task/handoff-show.command.ts      |  37 ++-
 .../agentplane/src/commands/task/handoff.shared.ts |  27 +-
 11 files changed, 1058 insertions(+), 96 deletions(-)
```

</details>
