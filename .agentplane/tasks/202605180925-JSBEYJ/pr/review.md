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
- Note: Follow-up verification after hosted test failure: aligned release and hosted install build routes to build @agentplane/testkit before agentplane; ran release CI contract test, test:fast, release:parity, policy routing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T09:36:03.395Z
- Branch: task/202605180925-JSBEYJ/release-dev-helper-scripts
- Head: 262fe6f63e9a

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 package.json                                       |  10 +-
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
 15 files changed, 1255 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
