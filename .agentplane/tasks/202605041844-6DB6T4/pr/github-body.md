Task: `202605041844-6DB6T4`
Title: Harden lifecycle text payload transport

## Summary

Harden lifecycle text payload transport

Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.

## Scope

- In scope: Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.
- Out of scope: unrelated refactors not required for "Harden lifecycle text payload transport".

## Verification

- State: ok
- Note: Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T19:12:41.716Z
- Branch: task/202605041844-6DB6T4/text-payload-transport
- Head: 8ef1e1d31f74

```text
 packages/agentplane/src/cli/bootstrap-guide.ts     |   2 +-
 packages/agentplane/src/cli/command-guide.ts       |  12 +--
 packages/agentplane/src/cli/command-invocations.ts |   7 +-
 .../src/cli/run-cli.core.lifecycle.test.ts         |  77 +++++++++++++++
 packages/agentplane/src/commands/block.run.ts      |   9 +-
 packages/agentplane/src/commands/block.spec.ts     |  26 ++++--
 packages/agentplane/src/commands/finish.run.ts     |  20 +++-
 .../agentplane/src/commands/finish.spec.shared.ts  |  23 ++++-
 packages/agentplane/src/commands/finish.spec.ts    |  19 +++-
 packages/agentplane/src/commands/pr/pr.command.ts  |   9 +-
 packages/agentplane/src/commands/pr/pr.spec.ts     |  25 +++--
 .../agentplane/src/commands/shared/text-payload.ts | 103 +++++++++++++++++++++
 packages/agentplane/src/commands/start.run.ts      |   9 +-
 packages/agentplane/src/commands/start.spec.ts     |  28 ++++--
 .../src/commands/task/comment.command.ts           |  38 ++++++--
 .../src/commands/task/set-status.command.ts        |  34 ++++++-
 .../src/commands/task/start-ready.command.ts       |  34 +++++--
 17 files changed, 413 insertions(+), 62 deletions(-)
```

</details>
