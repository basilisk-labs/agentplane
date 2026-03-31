# PR Review

Opened by CODER on 2026-03-31T09:12:10.458Z
Branch: task/202603301856-7SPP8K/delete-obsolete-routing-helpers

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
- Updated: 2026-03-31T09:12:51.473Z
- Branch: task/202603301856-7SPP8K/delete-obsolete-routing-helpers
- Head: 4ec2caeea22c
- Diffstat:
```
 .agentplane/tasks/202603301856-7SPP8K/README.md    | 60 +++++++++++++++++-----
 docs/developer/framework-refactor-program.mdx      |  2 +-
 docs/user/cli-reference.generated.mdx              |  4 +-
 docs/user/commands.mdx                             |  2 +-
 .../run-cli.core.help-snap.test.ts.snap            |  2 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |  2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     | 45 ++++++----------
 packages/agentplane/src/cli/run-cli.ts             | 14 ++---
 packages/agentplane/src/cli/spec/help.ts           |  2 +-
 .../agentplane/src/commands/docs/cli.command.ts    |  4 +-
 10 files changed, 79 insertions(+), 58 deletions(-)
```
<!-- END AUTO SUMMARY -->
