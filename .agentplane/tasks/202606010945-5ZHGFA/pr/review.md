# PR Review

Created: 2026-06-01T09:46:37.574Z

## Task

- Task: `202606010945-5ZHGFA`
- Title: Prepare v0.6.14 patch release documentation
- Status: DOING
- Branch: `task/202606010945-5ZHGFA/prepare-v0-6-14-patch-release-documentation`
- Canonical task record: `.agentplane/tasks/202606010945-5ZHGFA/README.md`

## Verification

- State: ok
- Note: Docs release-prep checks passed: docs:site:generate:check, docs:bootstrap:check, docs:cli:check, docs:recipes:check, docs:scripts:check, release:parity, check-routing, ap doctor, registry availability for 0.6.14, and release-notes coverage for all 41 planned commits. release:tasks:check is deferred until after this DOING release-prep task merges and closes because the gate correctly blocks active release tasks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T09:46:37.574Z
- Branch: task/202606010945-5ZHGFA/prepare-v0-6-14-patch-release-documentation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.6.14.md     | 72 ++++++++++++++++++++++++++++++++++++++++++++
 website/static/llms-full.txt |  7 +++--
 2 files changed, 76 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
