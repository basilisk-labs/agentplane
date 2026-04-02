# PR Review

Opened by CODER on 2026-04-02T16:36:01.928Z
Branch: task/202604021603-CK5W52/fix-npm-install-release

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
- Updated: 2026-04-02T17:16:46.341Z
- Branch: task/202604021603-CK5W52/fix-npm-install-release
- Head: ddb14c3ea97d
- Diffstat:
```
 .agentplane/tasks/202604021603-CK5W52/README.md    | 134 +++++++++++++++++++++
 .../tasks/202604021603-CK5W52/pr/diffstat.txt      |  25 ++++
 .agentplane/tasks/202604021603-CK5W52/pr/meta.json |  12 ++
 .agentplane/tasks/202604021603-CK5W52/pr/review.md |  53 ++++++++
 .../tasks/202604021603-CK5W52/pr/verify.log        |   0
 bun.lock                                           |   1 -
 docs/developer/workflow-harness-test-matrix.mdx    |  20 ++-
 docs/releases/v0.3.9.md                            |  36 ++++++
 packages/agentplane/package.json                   |   1 -
 .../src/cli/run-cli.test-helpers.test.ts           |  37 ++++++
 .../agentplane/src/cli/run-cli.test-helpers.ts     |  36 ++++--
 packages/agentplane/src/commands/recipes.ts        |   8 +-
 .../agentplane/src/commands/recipes/impl/apply.ts  |   7 +-
 .../src/commands/recipes/impl/commands/explain.ts  |   2 +-
 .../src/commands/recipes/impl/commands/install.ts  |   7 +-
 .../src/commands/recipes/impl/installed-recipes.ts |   9 +-
 .../recipes/impl/project-installed-recipes.ts      |  10 +-
 .../src/commands/recipes/impl/resolver.ts          |   6 +-
 .../src/commands/release.test-helpers.ts           |  31 ++++-
 .../release/check-release-parity-script.test.ts    |  38 ++++++
 packages/agentplane/tsconfig.json                  |   2 +-
 scripts/check-significant-coverage.mjs             |  74 +++++-------
 scripts/check-workflow-harness-coverage.mjs        |  96 +++++++--------
 scripts/lib/release-version-parity.mjs             |  65 +++++++++-
 scripts/run-significant-coverage-suite.mjs         |  35 +-----
 scripts/run-workflow-coverage-suite.mjs            |  33 +----
 26 files changed, 561 insertions(+), 217 deletions(-)
```
<!-- END AUTO SUMMARY -->
