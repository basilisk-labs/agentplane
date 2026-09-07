# PR Review

Created: 2026-09-07T08:23:50.856Z

## Task

- Task: `202609070819-M065D1`
- Title: Keep setup-agentplane installations usable across workflow steps
- Status: DOING
- Branch: `task/202609070819-M065D1/keep-setup-agentplane-installations-usable-acros`
- Canonical task record: `.agentplane/tasks/202609070819-M065D1/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T08:23:50.856Z
- Branch: task/202609070819-M065D1/keep-setup-agentplane-installations-usable-acros
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  23 +-
 .../publish-external-distribution-script.test.ts   | 314 +++++++++++++++------
 .../release/publish-workflow-contract.test.ts      |  59 +++-
 ...ender-scoop-and-setup-standalone-script.test.ts | 119 +++++++-
 .../generate/render-setup-agentplane-action.mjs    |  17 +-
 scripts/release/publish-external-distribution.mjs  |  32 ++-
 6 files changed, 451 insertions(+), 113 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
