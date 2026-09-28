# PR Review

Created: 2026-09-28T20:11:32.626Z

## Task

- Task: `202609282003-E81FJR`
- Title: Prepare stable AgentPlane 0.7.12 release candidate
- Status: DOING
- Branch: `task/202609282003-E81FJR/prepare-stable-agentplane-0-7-12-release-candida`
- Canonical task record: `.agentplane/tasks/202609282003-E81FJR/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-28T20:11:32.626Z
- Branch: task/202609282003-E81FJR/prepare-stable-agentplane-0-7-12-release-candida
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 bun.lock                                           |  12 +-
 docs/reference/generated-reference.mdx             |  14 +-
 docs/releases/v0.7.12.md                           | 197 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 .../src/commands/release/apply.mutation.ts         |  38 +++-
 .../commands/release/apply.mutation.unit.test.ts   |  43 +++++
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/release/release-scope-exclusions.json      |  25 +++
 14 files changed, 320 insertions(+), 33 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
