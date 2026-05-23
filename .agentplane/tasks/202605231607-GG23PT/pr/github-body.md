Task: `202605231607-GG23PT`
Title: Optimize GitHub CI routing and docs deploy efficiency
Canonical task record: `.agentplane/tasks/202605231607-GG23PT/README.md`

## Summary

Optimize GitHub CI routing and docs deploy efficiency

Reduce CI/CD latency and duplicated work by tightening GitHub Actions routing, dependency caching, and docs deploy handoff while preserving the PR verification merge gate.

## Scope

In scope: `.github/workflows/ci.yml`, `.github/workflows/docs-ci.yml`, `.github/workflows/pages-deploy.yml`, and minimal supporting CI planning/check script changes if required.
Out of scope: npm publish behavior, release candidate semantics, package version changes, branch protection mutation, and unrelated task artifacts.

## Verification

- State: ok
- Note:

```text
Implemented focused CI/CD optimization and verified workflow contracts, formatting, lint, local CI
explanation, workflow readback, and diff hygiene. Commit: 6033823daf85.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T16:09:28.648Z
- Branch: task/202605231607-GG23PT/ci-routing-docs-deploy
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml           | 104 +++++++++++++++++--------------------
 .github/workflows/docs-ci.yml      |  68 ++++++++++++++----------
 .github/workflows/pages-deploy.yml |  26 ++++++++++
 scripts/checks/plan-github-ci.mjs  |  36 ++++++++++++-
 4 files changed, 152 insertions(+), 82 deletions(-)
```

</details>
