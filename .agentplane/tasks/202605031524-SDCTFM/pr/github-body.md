Task: `202605031524-SDCTFM`
Title: Cascade hosted branch_pr closure across batch tasks

## Summary

Cascade hosted branch_pr closure across batch tasks

Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.

## Scope

- In scope: Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.
- Out of scope: unrelated refactors not required for "Cascade hosted branch_pr closure across batch tasks".

## Verification

- State: ok
- Note: hosted-close now cascades branch_pr batch closure to included tasks.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:01:25.887Z
- Branch: task/202605031524-SDCTFM/batch-hosted-close-cascade
- Head: ccfe5b3420bd

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 158 +++++++++++++++++++++
 .../agentplane/src/commands/guard/impl/commit.ts   |   4 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   6 +-
 .../src/commands/task/hosted-close.command.ts      | 120 +++++++++++-----
 4 files changed, 252 insertions(+), 36 deletions(-)
```

</details>
