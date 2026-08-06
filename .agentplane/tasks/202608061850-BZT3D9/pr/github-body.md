Task: `202608061850-BZT3D9`
Title: Land post-merge workflow routing qualification fixes
Canonical task record: `.agentplane/tasks/202608061850-BZT3D9/README.md`

## Summary

Land post-merge workflow routing qualification fixes

Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.

## Scope

- In scope: Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.
- Out of scope: unrelated refactors not required for "Land post-merge workflow routing qualification fixes".

## Verification

- State: ok
- Note: CI recovery head locally requalified with deterministic check details; hosted checks pending PR synchronize.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:58:33.664Z
- Branch: post-merge-BZT3D9-ci-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/cli/run-cli.core.route-decision.test.ts    | 104 --------
 .../src/cli/run-cli.core.task-routing.test.ts      | 134 ++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  15 +-
 .../task/branch-task-supervisor-operations.test.ts |   8 +-
 .../agentplane/src/runtime/task-intake/types.ts    |   3 +-
 .../agentplane/src/runtime/task-routing/resolve.ts |  45 ++--
 .../schemas/task-readme-frontmatter.schema.json    | 269 ++++-----------------
 packages/core/schemas/tasks-export.schema.json     | 255 ++++---------------
 .../schemas/task-readme-frontmatter.schema.json    | 269 ++++-----------------
 packages/spec/schemas/tasks-export.schema.json     | 255 ++++---------------
 schemas/task-readme-frontmatter.schema.json        | 269 ++++-----------------
 schemas/tasks-export.schema.json                   | 255 ++++---------------
 .../baselines/v0.7-compatibility-candidate.json    |  32 ++-
 .../check-compatibility-contract-baseline.mjs      |  18 +-
 website/static/llms-full.txt                       | 119 ++++++---
 16 files changed, 560 insertions(+), 1491 deletions(-)
```

</details>
