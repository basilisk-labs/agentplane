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
- Note:

```text
Evaluator gate pass: local verification and hosted PR checks are green on head
a46645a20944fd4d235ff12a928f54fbc5ece723.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:58:21.579Z
- Branch: task/202605191535-WB10QC/flexible-test-routing
- Head: bdaa9d86c34a

```text
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 package.json                                       |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  59 +-
 .../commands/release/release-ci-contract.test.ts   |   4 +
 scripts/README.md                                  |   2 +
 scripts/checks/run-local-ci.mjs                    | 137 +++--
 scripts/lib/local-ci-selection.mjs                 | 148 +++++
 7 files changed, 919 insertions(+), 31 deletions(-)
```

</details>
