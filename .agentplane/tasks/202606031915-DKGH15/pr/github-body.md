Task: `202606031915-DKGH15`
Title: Refactor pre-merge closure metadata helpers
Canonical task record: `.agentplane/tasks/202606031915-DKGH15/README.md`

## Summary

Refactor pre-merge closure metadata helpers

Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.

## Scope

- In scope: Small pre-release refactor: centralize pre-merge closure marker parsing/validation, preserve merged task metadata cleanup from PR #4402, verify release readiness, then publish the next patch release.
- Out of scope: unrelated refactors not required for "Refactor pre-merge closure metadata helpers".

## Verification

- State: ok
- Note:

```text
Focused checks passed: targeted Vitest suite (4 files, 38 tests), bun run typecheck, bun run
format:changed, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and
AGENTPLANE_DEV_AUTO_BOOTSTRAP=0 ap doctor. Doctor OK with only existing historical warnings for
202605221745-8BHZSX and 202606011809-VCQPP7. Automatic framework bootstrap could not complete
locally because @agentplaneorg/core tsup/esbuild service stopped; core JS was restored via bunx tsc
-b packages/core --force for doctor readback.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T19:21:03.823Z
- Branch: task/202606031915-DKGH15/pre-merge-closure-helper-refactor
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606031744-7N0FHQ/pr/meta.json |  7 +++--
 .../agentplane/src/commands/shared/pr-meta.test.ts | 34 ++++++++++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts |  5 ++++
 .../commands/shared/pr-meta/pre-merge-closure.ts   | 26 +++++++++++++++++
 .../src/commands/shared/route-decision.ts          | 10 +------
 .../src/commands/task/hosted-close.command.ts      | 19 +-----------
 .../task/hosted-merge-sync/local-branch.ts         |  9 ++----
 7 files changed, 74 insertions(+), 36 deletions(-)
```

</details>
