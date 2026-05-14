# PR Review

Created: 2026-05-14T14:02:12.360Z

## Task

- Task: `202605141400-RT8HXD`
- Title: Harden release publish evidence and external metadata
- Status: DOING
- Branch: `task/202605141400-RT8HXD/release-evidence-hardening`
- Canonical task record: `.agentplane/tasks/202605141400-RT8HXD/README.md`

## Verification

- State: ok
- Note: Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5, publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check clean.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T14:09:49.252Z
- Branch: task/202605141400-RT8HXD/release-evidence-hardening
- Head: 6e8a0f7a57f7

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 .../publish-external-distribution-script.test.ts   |  89 ++++
 .../release/release-task-evidence-script.test.ts   |  47 ++
 scripts/release/publish-external-distribution.mjs  |   7 +-
 scripts/release/release-task-evidence.mjs          |   1 +
 5 files changed, 667 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
