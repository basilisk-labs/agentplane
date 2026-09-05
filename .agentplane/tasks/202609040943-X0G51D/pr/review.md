# PR Review

Created: 2026-09-04T10:05:07.800Z

## Task

- Task: `202609040943-X0G51D`
- Title: Preserve completed WorkItems across command-only material plan refinements
- Status: DONE
- Branch: `task/202609040943-X0G51D/preserve-completed-workitems-across-command-only`
- Canonical task record: `.agentplane/tasks/202609040943-X0G51D/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T10:42:56.596Z
- Branch: task/202609040943-X0G51D/preserve-completed-workitems-across-command-only
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts |  68 ++++++++
 .../task/external-agent-planning-authority.test.ts | 162 ++++++++++++++++++-
 packages/core/src/tasks/task-centric/graph.ts      |   7 +-
 .../src/tasks/task-centric/task-centric.test.ts    | 179 +++++++++++++++++++--
 4 files changed, 400 insertions(+), 16 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
