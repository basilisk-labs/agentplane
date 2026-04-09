## Summary

Allow explicit internal incident findings to promote into incidents.md

Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.

## Scope

- In scope: Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.
- Out of scope: unrelated refactors not required for "Allow explicit internal incident findings to promote into incidents.md".

## Verification

### Plan

1. Run focused incidents tests for parsing and collection paths. Expected: explicit internal/promoted findings are accepted, while plain local-only findings remain task-local.
2. Run incidents collect/verify regression covering an internal candidate. Expected: incidents registry updates without requiring Fixability: external.
3. Run policy routing and relevant lint/tests. Expected: incidents policy assets and runtime behavior stay aligned.

### Current Status

- State: ok
- Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted incidents and wait-remote coverage for internal finding promotion into incidents.md.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T14:21:26.353Z
- Branch: task/202604091257-PJQH29/internal-incident-promotion
- Head: 33a630ec1f8f

```text
 .agentplane/policy/governance.md                   |   2 +-
 .agentplane/policy/incidents.md                    |   4 +-
 .agentplane/tasks/202604091257-PJQH29/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604091257-PJQH29/pr/diffstat.txt      |   0
 .../tasks/202604091257-PJQH29/pr/github-body.md    |  50 +++++++++
 .../tasks/202604091257-PJQH29/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091257-PJQH29/pr/meta.json |  17 +++
 .../tasks/202604091257-PJQH29/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091257-PJQH29/pr/review.md |  57 ++++++++++
 .../tasks/202604091257-PJQH29/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |   8 +-
 packages/agentplane/assets/policy/governance.md    |   2 +-
 packages/agentplane/assets/policy/incidents.md     |   4 +-
 .../src/cli/run-cli.core.incidents.test.ts         |  96 ++++++++++++++++-
 .../src/commands/task/findings-add.command.ts      |  25 ++++-
 packages/agentplane/src/commands/task/findings.ts  |   9 +-
 .../src/commands/task/verify-command-shared.ts     |  10 +-
 .../src/commands/task/verify-ok.command.ts         |   1 +
 .../agentplane/src/commands/task/verify-record.ts  |   8 ++
 .../src/commands/task/verify-rework.command.ts     |   1 +
 packages/agentplane/src/commands/verify.run.ts     |   1 +
 .../src/runtime/incidents/resolve.test.ts          |   3 +-
 .../agentplane/src/runtime/incidents/resolve.ts    |  33 +++---
 packages/agentplane/src/runtime/incidents/types.ts |   5 +-
 24 files changed, 424 insertions(+), 30 deletions(-)
```

</details>
