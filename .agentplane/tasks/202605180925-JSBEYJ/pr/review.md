# PR Review

Created: 2026-05-18T09:26:27.050Z

## Task

- Task: `202605180925-JSBEYJ`
- Title: Add release and dev workflow helper scripts
- Status: DOING
- Branch: `task/202605180925-JSBEYJ/release-dev-helper-scripts`
- Canonical task record: `.agentplane/tasks/202605180925-JSBEYJ/README.md`

## Verification

- State: ok
- Note: CLI reference refreshed after canonical verify command example update; docs:cli:check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T09:48:48.138Z
- Branch: task/202605180925-JSBEYJ/release-dev-helper-scripts
- Head: 231b084dc92e

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 .github/workflows/ci.yml                           |   6 +-
 .github/workflows/prepublish.yml                   |   2 +-
 .github/workflows/task-hosted-close.yml            |   2 +-
 docs/user/cli-reference.generated.mdx              |   2 +-
 package.json                                       |  10 +-
 .../commands/release/release-ci-contract.test.ts   |   4 +-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../agentplane/src/commands/task/task.command.ts   |   2 +-
 scripts/README.md                                  |  67 ++--
 scripts/checks/check-task-scope.mjs                |  55 +++
 scripts/checks/deps-triage.mjs                     |  47 +++
 scripts/checks/dev-impact.mjs                      |  41 ++
 scripts/lib/local-ci-selection.mjs                 |   1 +
 scripts/release/candidate-prepare.mjs              |  75 ++++
 scripts/release/evidence-collect.mjs               |  95 +++++
 scripts/release/next-action.mjs                    |  59 +++
 scripts/release/state.mjs                          | 180 +++++++++
 scripts/release/version-bump.mjs                   | 163 ++++++++
 skills/README.md                                   |   3 +
 skills/agentplane-local-dev-operator/SKILL.md      |  52 +++
 .../SKILL.md                                       |  20 +
 22 files changed, 1265 insertions(+), 39 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
