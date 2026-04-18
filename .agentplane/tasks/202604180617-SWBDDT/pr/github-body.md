## Summary

Adopt CommandResult for release and task commands

Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.

## Scope

- In scope: Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.
- Out of scope: unrelated refactors not required for "Adopt CommandResult for release and task commands".

## Verification

- State: ok
- Note: Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:58:45.607Z
- Branch: task/202604180617-SWBDDT/command-result-contract
- Head: 2228a7952661

```text
 packages/agentplane/src/cli/output.test.ts         | 24 +++++++
 packages/agentplane/src/cli/output.ts              | 69 ++++++++++++++++++
 packages/agentplane/src/commands/task/block.ts     | 10 ++-
 packages/agentplane/src/commands/task/comment.ts   | 10 ++-
 packages/agentplane/src/commands/task/update.ts    | 18 +++--
 .../src/commands/task/update.unit.test.ts          | 83 ++++++++++++++++++++++
 6 files changed, 204 insertions(+), 10 deletions(-)
```

</details>
