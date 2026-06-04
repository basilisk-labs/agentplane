Task: `202606042157-020DWK`
Title: Reduce agent cognitive load and publish next patch
Canonical task record: `.agentplane/tasks/202606042157-020DWK/README.md`

## Batch Tasks

- Primary: `202606042157-020DWK`
- Closure policy: `all_or_fail`
- Included: `202606042204-NX58GD`
- Included: `202606042214-GEJ627`

## Summary

Reduce agent cognitive load and publish next patch

Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.

## Scope

- In scope: Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.
- Out of scope: unrelated refactors not required for "Reduce agent cognitive load and publish next patch".

## Verification

- State: ok
- Note:

```text
Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in
text output, and preserves PR check diagnostics.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T21:58:10.023Z
- Branch: task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606042204-NX58GD/README.md    | 199 +++++++
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .agentplane/tasks/202606042214-GEJ627/README.md    | 190 +++++++
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .../src/adapters/git/git-context-adapter.ts        |   7 +-
 packages/agentplane/src/cli/reason-codes.ts        |  18 +
 .../guard/impl/commands.commit-close.unit.test.ts  |   1 +
 .../impl/commands.commit-non-close.unit.test.ts    |  52 ++
 .../src/commands/guard/impl/commit-diagnostics.ts  |  56 +-
 .../guard/impl/commit-diagnostics.unit.test.ts     |  54 ++
 .../src/commands/guard/impl/commit-runner.ts       |  48 ++
 .../src/commands/shared/route-guidance.test.ts     |  51 ++
 .../src/commands/shared/route-oracle.test.ts       |  48 ++
 .../agentplane/src/commands/shared/route-oracle.ts |   8 +
 .../agentplane/src/commands/task/brief-render.ts   |   4 +
 .../src/commands/task/next-action.command.ts       |   4 +
 packages/agentplane/src/ports/git-port.ts          |   7 +-
 packages/core/src/git/git-client.ts                |   8 +-
 18 files changed, 1896 insertions(+), 5 deletions(-)
```

</details>
