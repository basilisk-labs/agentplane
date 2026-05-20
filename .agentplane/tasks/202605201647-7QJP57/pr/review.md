# PR Review

Created: 2026-05-20T17:06:34.863Z

## Task

- Task: `202605201647-7QJP57`
- Title: Prepare v0.7 runner handoff release lane
- Status: DOING
- Branch: `task/202605201647-7QJP57/v0-7-runner-handoff`
- Canonical task record: `.agentplane/tasks/202605201647-7QJP57/README.md`

## Verification

- State: ok
- Note: Public v0.7 runner handoff contract implemented and checked. Passed: focused core schema tests, schemas:check, docs:ia:check, typecheck, bun run test, build, format:check, policy routing, doctor. Hosted execution remains unimplemented.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T17:06:34.863Z
- Branch: task/202605201647-7QJP57/v0-7-runner-handoff
- Head: ac7a148ec07e

```text
 .../blueprint/resolved-snapshot.json               | 470 +++++++++++++++++++++
 docs/developer/cloud-backend-integration-plan.mdx  |  21 +
 docs/reference/runner-handoff.mdx                  |  79 ++++
 packages/core/schemas/runner-handoff.schema.json   | 193 +++++++++
 packages/core/src/index.ts                         |  12 +
 packages/core/src/schemas/index.ts                 |  12 +
 .../tasks/task-artifact-schema.runner-handoff.ts   | 188 +++++++++
 .../core/src/tasks/task-artifact-schema.test.ts    | 203 ++++++++-
 packages/core/src/tasks/task-artifact-schema.ts    |  45 ++
 packages/spec/examples/runner-handoff.json         |  46 ++
 packages/spec/schemas/runner-handoff.schema.json   | 193 +++++++++
 schemas/runner-handoff.schema.json                 | 193 +++++++++
 scripts/generate/sync-schemas.mjs                  |   7 +
 13 files changed, 1655 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
