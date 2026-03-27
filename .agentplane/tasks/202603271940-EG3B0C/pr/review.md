# PR Review

Opened by CODER on 2026-03-27T20:08:15.402Z
Branch: task/202603271940-EG3B0C/hosted-closure-automation

## Summary

- 

## Checklist

- [ ] Tests added/updated
- [ ] Lint/format passes
- [ ] Verify passed
- [ ] Docs updated (if needed)

## Handoff Notes

<!-- Add review notes here. -->

<!-- BEGIN AUTO SUMMARY -->
- Updated: 2026-03-27T20:32:47.357Z
- Branch: task/202603271940-EG3B0C/hosted-closure-automation
- Head: 4d9df7aff242
- Diffstat:
```
 .agentplane/tasks/202603271940-EG3B0C/README.md    | 124 ++++++++++++
 .../tasks/202603271940-EG3B0C/pr/diffstat.txt      |  22 ++
 .agentplane/tasks/202603271940-EG3B0C/pr/meta.json |  12 ++
 .agentplane/tasks/202603271940-EG3B0C/pr/review.md |  50 +++++
 .../tasks/202603271940-EG3B0C/pr/verify.log        |   0
 .github/workflows/publish.yml                      |  12 +-
 .github/workflows/task-hosted-close.yml            | 191 +++++++++++++++++
 docs/user/branching-and-pr-artifacts.mdx           |  15 ++
 docs/user/cli-reference.generated.mdx              |  30 +++
 packages/agentplane/src/cli/command-guide.ts       |   1 +
 .../cli/prepare-hosted-task-closure-script.test.ts | 114 +++++++++++
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 213 +++++++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../agentplane/src/commands/guard/impl/commands.ts |  36 ++++
 .../src/commands/guard/impl/commands.unit.test.ts  |   7 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   1 -
 .../task/hosted-close-workflow-contract.test.ts    |  24 +++
 .../src/commands/task/hosted-close.command.ts      | 225 +++++++++++++++++++++
 .../src/commands/task/hosted-merge-sync.test.ts    |  40 +++-
 .../src/commands/task/hosted-merge-sync.ts         | 175 ++++++++++++++--
 .../agentplane/src/commands/task/task.command.ts   |   6 +
 scripts/prepare-hosted-task-closure.mjs            | 128 ++++++++++++
 22 files changed, 1404 insertions(+), 28 deletions(-)
```
<!-- END AUTO SUMMARY -->
