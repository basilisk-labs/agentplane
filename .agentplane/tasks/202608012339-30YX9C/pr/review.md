# PR Review

Created: 2026-08-01T23:40:33.795Z

## Task

- Task: `202608012339-30YX9C`
- Title: Allow documentation tasks to commit canonical site artifacts
- Status: DOING
- Branch: `task/202608012339-30YX9C/allow-documentation-tasks-to-commit-canonical-si`
- Canonical task record: `.agentplane/tasks/202608012339-30YX9C/README.md`

## Verification

- State: needs_rework
- Note: Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T23:41:05.580Z
- Branch: task/202608012339-30YX9C/allow-documentation-tasks-to-commit-canonical-si
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/policy/rules/task-bound-mutation.test.ts   | 70 ++++++++++++++++++++++
 .../src/policy/rules/task-bound-mutation.ts        | 14 ++++-
 website/static/llms-full.txt                       | 49 ++++++++-------
 3 files changed, 112 insertions(+), 21 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
