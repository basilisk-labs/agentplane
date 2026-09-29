Task: `202609210154-5R1Q9A`
Title: LC-03: extract one Kernel-backed advance-one-step coordinator
Canonical task record: `.agentplane/tasks/202609210154-5R1Q9A/README.md`

## Summary

LC-03: extract one Kernel-backed advance-one-step coordinator

Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.

## Scope

- In scope: Dependency evidence: LC-02 merged as PR #5990 at main 4f28ee5433e7666de75437015b2003a9895073fc. Extract the mature ordinary route, recovery, admission, and effect flow into one internal advance-one-step coordinator that issues typed Task Kernel commands and returns native progress, semantic request, approval, wait, terminal, or effect-in-doubt. Keep public external and managed wrappers behavior-equivalent. Move code instead of copying it; leave no ordinary reducer in advance.command.ts and no competing coordinator in kernel-advance.ts. Persist intent before effects, enforce exact current route preconditions, preserve the current external exchange contract, and stop on loop budget or no progress without rerunning semantic work. Include the post-merge ordering regression exposed by LC-02: complete canonical lifecycle before cleanup that requires the DONE projection.
- Out of scope: unrelated refactors not required for "LC-03: extract one Kernel-backed advance-one-step coordinator".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T02:52:39.274Z
- Branch: task/202609210154-5R1Q9A/canonical-5r1q9a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/advance-task-step.ts         | 599 +++++++++++++++++++++
 .../src/commands/task/advance.command.ts           | 485 +++--------------
 .../agentplane/src/commands/task/kernel-advance.ts | 580 +-------------------
 .../src/commands/task/ordinary-advance-step.ts     | 382 +++++++++++++
 .../commands/task/roadmap-advance-one-step.test.ts |  61 +++
 5 files changed, 1111 insertions(+), 996 deletions(-)
```

</details>
