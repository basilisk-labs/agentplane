# PR Review

Created: 2026-10-27T12:28:36.271Z

## Task

- Task: `202610271140-974JNN`
- Title: Synchronize adopted PR metadata schema with formatted generation
- Status: DOING
- Branch: `task/202610271140-974JNN/synchronize-adopted-pr-metadata-schema-with-form`
- Canonical task record: `.agentplane/tasks/202610271140-974JNN/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T12:28:36.271Z
- Branch: task/202610271140-974JNN/synchronize-adopted-pr-metadata-schema-with-form
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/schemas/pr-meta.schema.json          | 85 ++++++++++++++++++++++
 .../src/tasks/task-artifact-schema.pr-metadata.ts  | 33 ++++++++-
 .../core/src/tasks/task-artifact-schema.test.ts    | 49 +++++++++++++
 packages/spec/schemas/pr-meta.schema.json          | 85 ++++++++++++++++++++++
 schemas/pr-meta.schema.json                        | 85 ++++++++++++++++++++++
 scripts/generate/sync-schemas.mjs                  |  2 +-
 6 files changed, 337 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
