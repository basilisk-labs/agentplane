# PR Review

Created: 2026-04-19T13:19:02.863Z
Branch: task/202604191200-507P6G/upgrade-workflow-actions

## Summary

Upgrade release workflows off deprecated Node 20 actions

Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.

## Scope

- In scope: Move GitHub Actions used by Core CI, Docs CI, and Publish to npm onto Node 24-compatible action versions before the runner deprecation becomes a hard release blocker.
- Out of scope: unrelated refactors not required for "Upgrade release workflows off deprecated Node 20 actions".

## Verification

### Plan

1. Review the requested outcome for "Upgrade release workflows off deprecated Node 20 actions". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Updated release-related GitHub workflow action majors off the deprecated Node 20-based set, aligned the release workflow contract tests to the new refs, and re-ran workflow contract plus workflow lint checks.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
