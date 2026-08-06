# PR Review

Created: 2026-08-06T18:52:19.901Z

## Task

- Task: `202608061850-BZT3D9`
- Title: Land post-merge workflow routing qualification fixes
- Status: DONE
- Branch: `post-merge-BZT3D9-ci-recovery`
- Canonical task record: `.agentplane/tasks/202608061850-BZT3D9/README.md`

## Verification

- State: ok
- Note: CI recovery head locally requalified with deterministic check details; hosted checks pending PR synchronize.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:58:37.876Z
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
<!-- END AUTO SUMMARY -->
