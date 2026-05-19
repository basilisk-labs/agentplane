Task: `202605191535-WB10QC`
Title: Make local test routing more flexible and observable
Canonical task record: `.agentplane/tasks/202605191535-WB10QC/README.md`

## Summary

Make local test routing more flexible and observable

Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.

## Scope

- In scope: Improve the local quality/test routing loop by adding an explainable local CI selector/report path and reducing registry drift for targeted test runs.
- Out of scope: unrelated refactors not required for "Make local test routing more flexible and observable".

## Verification

- State: ok
- Note: Implemented explainable local CI routing and verified targeted selector/report behavior.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:52:41.680Z
- Branch: task/202605191535-WB10QC/flexible-test-routing
- Head: 4083285e3a46

```text
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 package.json                                       |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  59 +-
 .../commands/release/release-ci-contract.test.ts   |   4 +
 scripts/checks/run-local-ci.mjs                    | 137 +++--
 scripts/lib/local-ci-selection.mjs                 | 148 +++++
 6 files changed, 917 insertions(+), 31 deletions(-)
```

</details>
