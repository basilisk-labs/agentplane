Task: `202607311812-WBY9EK`
Title: Publish resolved DONE conflict heads before semantic rework gating
Canonical task record: `.agentplane/tasks/202607311812-WBY9EK/README.md`

## Summary

Publish resolved DONE conflict heads before semantic rework gating

When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.

## Scope

- In scope: When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
- Out of scope: unrelated refactors not required for "Publish resolved DONE conflict heads before semantic rework gating".

## Verification

- State: ok
- Note:

```text
PASS at ec05273fe448 under the PLANNER-authored contract: 35 focused tests prove verified
DONE/no-queue fast-forward publication and aligned-authority gating; all 12 critical chunks,
typecheck, routing, format, and diff checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T18:20:52.699Z
- Branch: task/202607311812-WBY9EK/publish-resolved-done-conflict-heads-before-sema
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.pr-conflict-publication.test.ts   | 279 +++++++++++++++++++++
 .../src/commands/pr/conflict-rework.test.ts        |  29 +++
 .../agentplane/src/commands/pr/conflict-rework.ts  |  42 ++--
 3 files changed, 336 insertions(+), 14 deletions(-)
```

</details>
