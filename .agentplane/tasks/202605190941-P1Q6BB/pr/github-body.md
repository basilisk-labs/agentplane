Task: `202605190941-P1Q6BB`
Title: Wait for release-ready source before manual publish
Canonical task record: `.agentplane/tasks/202605190941-P1Q6BB/README.md`

## Summary

Wait for release-ready source before manual publish

Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.

## Scope

- In scope: Make the publish workflow wait-aware for workflow_dispatch SHA targets so manual release publication waits for successful Core CI and the release-ready artifact instead of failing while CI is still in progress.
- Out of scope: unrelated refactors not required for "Wait for release-ready source before manual publish".

## Verification

- State: ok
- Note:

```text
Verified wait-aware release-ready source path: focused Vitest resolver/workflow contracts passed;
publish.yml workflow_dispatch now waits for Core CI before resolving release-ready artifacts.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T09:52:55.524Z
- Branch: task/202605190941-P1Q6BB/release-pipeline-hardening
- Head: 792e18735c2c

```text
 .agentplane/tasks/202605190941-5FPGCV/README.md    | 148 +++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .agentplane/tasks/202605190941-Y873RA/README.md    | 147 +++++++
 .../blueprint/resolved-snapshot.json               | 454 ++++++++++++++++++++
 .github/workflows/publish.yml                      |  17 +
 package.json                                       |   1 +
 .../release/check-release-parity-script.test.ts    |  32 +-
 .../release/publish-workflow-contract.test.ts      |  13 +
 .../commands/release/release-ci-contract.test.ts   |  12 +
 .../resolve-release-ready-source-script.test.ts    |  44 ++
 .../release/task-registry-ready-script.test.ts     |  77 ++++
 scripts/README.md                                  |   1 +
 scripts/checks/check-task-state.mjs                |  29 +-
 scripts/lib/release-ready-source.mjs               |  57 ++-
 scripts/lib/release-version-parity.mjs             |  21 +
 scripts/lib/release-version-surfaces.mjs           | 198 +++++++++
 scripts/lib/test-route-registry.mjs                |   1 +
 scripts/release/candidate-prepare.mjs              |   1 +
 scripts/release/check-task-registry-ready.mjs      |  11 +
 scripts/release/resolve-release-ready-source.mjs   |  13 +-
 scripts/release/version-bump.mjs                   | 104 +----
 scripts/release/version-surfaces.json              |  77 ++++
 23 files changed, 2254 insertions(+), 114 deletions(-)
```

</details>
