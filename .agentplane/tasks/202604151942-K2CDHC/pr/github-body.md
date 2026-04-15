## Summary

Record protected-main integrate handoff

When branch_pr integrate refuses local mutation because the base branch requires GitHub pull-request merges, persist a deterministic task handoff snapshot with the next action instead of only printing an error message.

## Scope

- In scope: When branch_pr integrate refuses local mutation because the base branch requires GitHub pull-request merges, persist a deterministic task handoff snapshot with the next action instead of only printing an error message.
- Out of scope: unrelated refactors not required for "Record protected-main integrate handoff".

## Verification

- State: ok
- Note: Protected-base integrate refusal now persists a deterministic handoff artifact before returning E_GIT; targeted integrate regression test passes and still proves main HEAD is unchanged.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T19:45:43.918Z
- Branch: task/202604151942-K2CDHC/protected-main-integrate-handoff
- Head: a5920f38996e

```text
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts | 34 +++++++++++
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 70 +++++++++++++++++++++-
 2 files changed, 102 insertions(+), 2 deletions(-)
```

</details>
