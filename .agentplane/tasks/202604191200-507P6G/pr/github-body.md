## Summary

Upgrade release workflows off deprecated Node 20 actions

Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.

## Scope

- In scope: Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.
- Out of scope: unrelated refactors not required for "Upgrade release workflows off deprecated Node 20 actions".

## Verification

- State: ok
- Note: Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T13:19:50.431Z
- Branch: task/202604191200-507P6G/upgrade-workflow-actions
- Head: 189ae8abbdc5

```text
 .github/workflows/ci.yml                           | 26 +++++++++++-----------
 .github/workflows/docs-ci.yml                      |  6 ++---
 .github/workflows/pages-deploy.yml                 |  4 ++--
 .github/workflows/prepublish.yml                   |  8 +++----
 .github/workflows/publish.yml                      | 18 +++++++--------
 .github/workflows/task-hosted-close.yml            |  4 ++--
 .github/workflows/workflows-lint.yml               |  4 ++--
 .../commands/release/ci-workflow-contract.test.ts  |  2 +-
 .../release/publish-workflow-contract.test.ts      |  2 +-
 .../release/workflow-node-version-contract.test.ts |  2 +-
 10 files changed, 38 insertions(+), 38 deletions(-)
```

</details>
