## Summary

Let verify append promotable incident findings in one command

The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.

## Scope

- In scope: The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.
- Out of scope: unrelated refactors not required for "Let verify append promotable incident findings in one command".

## Verification

### Plan

1. Run the focused verify/findings/incident tests. Expected: verify can append a structured finding in the same command and preserves existing verification behavior. 2. Validate local-only vs default-promotable semantics. Expected: default verify-added findings carry incident-candidate metadata, while explicit local-only entries stay task-local. 3. Run incidents collect on a representative task fixture. Expected: a verify-appended promotable finding can be promoted under the existing incidents rules.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow.

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

- Updated: 2026-04-08T18:57:12.941Z
- Branch: task/202604081816-DCDXVB/verify-incident-finding
- Head: f276e8731274

```text
 .agentplane/tasks/202604081816-DCDXVB/README.md    | 113 +++++++++++++
 .../tasks/202604081816-DCDXVB/pr/diffstat.txt      |   0
 .../tasks/202604081816-DCDXVB/pr/github-body.md    |  48 ++++++
 .../tasks/202604081816-DCDXVB/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604081816-DCDXVB/pr/meta.json |  14 ++
 .../tasks/202604081816-DCDXVB/pr/notes.jsonl       |   0
 .agentplane/tasks/202604081816-DCDXVB/pr/review.md |  55 +++++++
 .../tasks/202604081816-DCDXVB/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |  33 ++++
 packages/agentplane/src/cli/command-invocations.ts |   5 +-
 .../src/cli/run-cli.core.incidents.test.ts         | 178 +++++++++++++++++++++
 packages/agentplane/src/commands/task/findings.ts  | 138 +++++++++++-----
 .../src/commands/task/shared/transitions.ts        |   1 +
 .../src/commands/task/verify-command-shared.ts     | 121 ++++++++++++++
 .../src/commands/task/verify-ok.command.ts         |  11 ++
 .../agentplane/src/commands/task/verify-record.ts  | 133 ++++++++++++++-
 .../src/commands/task/verify-rework.command.ts     |  11 ++
 packages/agentplane/src/commands/verify.run.ts     |   9 ++
 packages/agentplane/src/commands/verify.spec.ts    |  17 +-
 .../src/commands/workflow.verify-hooks.test.ts     |  35 ++++
 20 files changed, 867 insertions(+), 56 deletions(-)
```

</details>
