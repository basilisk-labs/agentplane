Task: `202607302012-FCYR88`
Title: Unblock protected-base conflict rework after main advancement
Canonical task record: `.agentplane/tasks/202607302012-FCYR88/README.md`

## Summary

Unblock protected-base conflict rework after main advancement

Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.

## Scope

- In scope: Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.
- Out of scope: unrelated refactors not required for "Unblock protected-base conflict rework after main advancement".

## Verification

- State: ok
- Note:

```text
Review fix verified: focused protected-base route regression 17 tests, typecheck, targeted
format/lint, and critical suite 12/12 (76 tests) passed on the updated head.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T20:23:18.010Z
- Branch: task/202607302012-FCYR88/protected-base-conflict-rework
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |  2 +-
 .../src/commands/pr/conflict-rework-legacy.ts      | 21 +++++++
 .../pr/conflict-rework-route-eligibility.ts        | 26 +++++++++
 .../pr/conflict-rework.legacy-base.test.ts         | 68 ++++++++++++++++++++++
 .../agentplane/src/commands/pr/conflict-rework.ts  |  7 ++-
 5 files changed, 122 insertions(+), 2 deletions(-)
```

</details>
