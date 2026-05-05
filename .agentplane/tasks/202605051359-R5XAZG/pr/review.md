# PR Review

Created: 2026-05-05T13:59:31.391Z
Branch: task/202605051359-R5XAZG/release-incident-gate

## Summary

Require incident cleanup before release tasks

Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.

## Scope

- In scope: Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.
- Out of scope: unrelated refactors not required for "Require incident cleanup before release tasks".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor.

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

- Updated: 2026-05-05T14:28:46.512Z
- Branch: task/202605051359-R5XAZG/release-incident-gate
- Head: 2cf0cd172f1e

```text
 .agentplane/policy/workflow.release.md             | 12 ++--
 .github/workflows/ci.yml                           |  9 +++
 .github/workflows/prepublish.yml                   |  2 +
 .github/workflows/publish.yml                      | 11 ++++
 docs/developer/release-and-publishing.mdx          | 22 +++++--
 package.json                                       |  3 +-
 .../agentplane/assets/policy/workflow.release.md   | 12 ++--
 .../commands/release/ci-workflow-contract.test.ts  |  4 ++
 .../src/commands/release/plan.command.ts           | 50 ++++++++++++++++
 .../agentplane/src/commands/release/plan.test.ts   | 34 ++++++++++-
 .../release/publish-workflow-contract.test.ts      |  6 ++
 .../commands/release/release-ci-contract.test.ts   |  7 +++
 .../release/release-incidents-script.test.ts       | 67 ++++++++++++++++++++++
 scripts/README.md                                  | 53 ++++++++---------
 scripts/check-release-incidents.mjs                | 50 ++++++++++++++++
 15 files changed, 299 insertions(+), 43 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
