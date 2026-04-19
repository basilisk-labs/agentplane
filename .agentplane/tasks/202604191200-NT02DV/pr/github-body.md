## Summary

Isolate runtime-source tests from ambient AGENTPLANE env

Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.

## Scope

- In scope: Remove hidden dependencies on inherited AGENTPLANE_* environment variables in runtime-source and repo-local-handoff test paths so release verification cannot fail because the invoking shell is in a framework checkout.
- Out of scope: unrelated refactors not required for "Isolate runtime-source tests from ambient AGENTPLANE env".

## Verification

- State: ok
- Note: Isolated runtime-mode tests from inherited AGENTPLANE_* env by introducing a shared runtime test-env helper, wiring runtime-source/runtime.command/repo-local-handoff to it, and adding a regression that proves ambient handoff flags no longer change runtime-source outcomes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T12:36:52.619Z
- Branch: task/202604191200-NT02DV/runtime-env-isolation
- Head: 7dd55032af73

```text
 .../agentplane/src/cli/repo-local-handoff.test.ts  | 13 ++----
 .../src/commands/runtime.command.test.ts           | 11 ++---
 .../agentplane/src/shared/runtime-source.test.ts   | 47 +++++++++++++++++-----
 packages/agentplane/src/testing/runtime-env.ts     | 25 ++++++++++++
 4 files changed, 68 insertions(+), 28 deletions(-)
```

</details>
