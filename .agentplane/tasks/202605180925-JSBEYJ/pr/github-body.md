Task: `202605180925-JSBEYJ`
Title: Add release and dev workflow helper scripts
Canonical task record: `.agentplane/tasks/202605180925-JSBEYJ/README.md`

## Summary

Add release and dev workflow helper scripts

Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.

## Scope

- In scope: Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.
- Out of scope: unrelated refactors not required for "Add release and dev workflow helper scripts".

## Verification

- State: ok
- Note:

```text
Corrected release build dependency order after hosted TS6305 failure; release:check, release CI
contract test, workflows:lint, scripts README check, and targeted eslint passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T10:00:03.917Z
- Branch: task/202605180925-JSBEYJ/release-dev-helper-scripts
- Head: 69f134ac776e

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 package.json                                       |  10 +-
 .../commands/release/release-ci-contract.test.ts   |   2 +-
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
 .../SKILL.md                                       |  26 +-
 19 files changed, 1262 insertions(+), 36 deletions(-)
```

</details>
