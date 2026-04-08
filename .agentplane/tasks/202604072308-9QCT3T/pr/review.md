# PR Review

Created: 2026-04-08T00:23:41.291Z
Branch: task/202604072308-9QCT3T/verify-note-file

## Summary

Add file-backed note input for verify commands

task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.

## Scope

- In scope: task verify and verify should accept note text from a file so multiline or long verification notes can be recorded without shell or TTY corruption of task artifacts.
- Out of scope: unrelated refactors not required for "Add file-backed note input for verify commands".

## Verification

### Plan

1. Run the targeted vitest verify suite for verify-record, workflow.verify-hooks, and run-cli lifecycle verify; expected: all pass. 2. Run eslint on touched verify command and test files; expected: no lint errors. 3. Review the resulting Verification README entries; expected: --note-file is accepted, --file stays details-only, and file-backed notes are normalized to a single-line Note entry.

### Current Status

- State: ok
- Note: Implemented --note-file for verify/task verify; targeted vitest, eslint, and docs:cli:check passed on commit f3b0427a.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T00:28:55.573Z
- Branch: task/202604072308-9QCT3T/verify-note-file
- Head: f3b0427ac540

```text
 docs/user/cli-reference.generated.mdx              |  21 +++-
 .../src/cli/run-cli.core.lifecycle.verify.test.ts  | 134 ++++++++++++++++++++-
 .../src/commands/task/verify-command-shared.ts     |  46 ++++++-
 .../src/commands/task/verify-ok.command.ts         |   4 +-
 .../agentplane/src/commands/task/verify-record.ts  |  48 +++++++-
 .../src/commands/task/verify-record.unit.test.ts   |  92 +++++++++++++-
 .../src/commands/task/verify-rework.command.ts     |   4 +-
 packages/agentplane/src/commands/verify.run.ts     |   1 +
 packages/agentplane/src/commands/verify.spec.ts    |  16 ++-
 .../src/commands/workflow.verify-hooks.test.ts     |  45 ++++++-
 10 files changed, 393 insertions(+), 18 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
