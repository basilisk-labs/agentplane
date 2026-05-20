Task: `202605200826-947S9Q`
Title: Unblock hosted close-tail PR verification
Canonical task record: `.agentplane/tasks/202605200826-947S9Q/README.md`

## Summary

Unblock hosted close-tail PR verification

Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.

## Scope

- In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
- Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for f0aaff1c9: GitHub PR #3962 checks are green, including PR
verification and Release-ready manifest; local workflow lint, protection contract, routing, diff
check, typecheck, and targeted workflow tests passed.
```
- Canonical workflow state lives in the task README.

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
