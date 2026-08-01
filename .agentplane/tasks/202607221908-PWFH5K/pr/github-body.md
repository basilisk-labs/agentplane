Task: `202607221908-PWFH5K`
Title: Enforce mandatory release dependency closure
Canonical task record: `.agentplane/tasks/202607221908-PWFH5K/README.md`

## Summary

Enforce mandatory release dependency closure

RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.

## Scope

- In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
- Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.

## Verification

- State: ok
- Note:

```text
PASS at 24183b04ebd6. Command: bunx vitest run task-registry-ready-script.test.ts
release-ready-manifest-script.test.ts; Result: pass; Evidence: 2 files, 16/16 tests. Scope:
corrected 69-task closure, RF-02/RF-20 omissions, cycle, unknown dependency, optional
classification, missing contract, manifest integration. Command: bun run task-state:check; Result:
pass; Evidence: tasks=3197 release_closure=69. Scope: canonical repository graph. Command: bun run
release:tasks:check --ignore-release-task 202607221908-PWFH5K; Result: pass; Evidence:
release_closure=69. Scope: release readiness excluding only the task under verification. Command:
bun run guards:check; Result: pass; Evidence: shared guards OK and trust ratchet 0. Scope: trust
boundaries. Command: bun run typecheck and bun run test:critical; Result: pass; Evidence: TypeScript
7 and 12/12 critical CLI chunks. Scope: typed build and critical CLI compatibility. Command: bun run
ci:contract; Result: pass; Evidence: all contract, architecture, clone, Knip, and coverage ratchets
passed. Scope: full static contract gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:52:52.216Z
- Branch: task/202607221908-PWFH5K/enforce-mandatory-release-dependency-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/internal/v0.7-refactor-plan.md                |   6 +
 docs/internal/v0.7-release-task-closure.json       |  85 ++++++++
 .../release/task-registry-ready-script.test.ts     | 158 +++++++++++++-
 scripts/checks/check-task-state.mjs                |  38 ++--
 scripts/lib/release-task-closure.mjs               | 237 +++++++++++++++++++++
 5 files changed, 506 insertions(+), 18 deletions(-)
```

</details>
