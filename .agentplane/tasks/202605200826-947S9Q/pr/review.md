# PR Review

Created: 2026-05-20T08:27:18.526Z

## Task

- Task: `202605200826-947S9Q`
- Title: Unblock hosted close-tail PR verification
- Status: DOING
- Branch: `task/202605200826-947S9Q/hosted-close-pr-verification`
- Canonical task record: `.agentplane/tasks/202605200826-947S9Q/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed for implementation commit c2b1520b73037e905375aa84aab2a42d13eb9807. Hosted checks on PR #3962 are green, including PR verification and Release-ready manifest; local verification covers publish ordering, hosted-close check-run contract, docs-only fast route, build-before-cold-baseline, typecheck, and policy routing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T09:22:15.760Z
- Branch: task/202605200826-947S9Q/hosted-close-pr-verification
- Head: f0aaff1c90f4

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .github/workflows/ci.yml                           |   2 -
 .github/workflows/publish.yml                      |  46 +-
 .github/workflows/task-hosted-close.yml            |  33 ++
 ...check-github-protection-contract-script.test.ts |  21 +-
 .../release/publish-workflow-contract.test.ts      |   7 +-
 .../commands/release/release-ci-contract.test.ts   |  12 +
 .../task/hosted-close-workflow-contract.test.ts    |   5 +
 .../checks/check-github-protection-contract.mjs    |   2 +-
 scripts/checks/run-local-ci.mjs                    |  31 +-
 10 files changed, 677 insertions(+), 54 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
