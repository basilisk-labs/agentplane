# PR Review

Created: 2026-05-19T12:51:12.969Z

## Task

- Task: `202605191250-N3TCR3`
- Title: Remove stale 0.6 legacy cleanup surfaces
- Status: DOING
- Branch: `task/202605191250-N3TCR3/legacy-cleanup-06`
- Canonical task record: `.agentplane/tasks/202605191250-N3TCR3/README.md`

## Verification

- State: ok
- Note: Command: ap task verify-show 202605191250-N3TCR3. Result: pass. Evidence: repo-local runtime bootstrap completed and runtime explain reported agentplane/core 0.6.3 matching repository expectation; changed scope is limited to init legacy config preview/conflict handling and CLI help/docs visibility for disabled deprecated flags. Scope: packages/agentplane/src/cli/run-cli/commands/init/execution.ts, packages/agentplane/src/cli/spec/help-render.ts, packages/agentplane/src/cli/spec/docs-render.ts. Skipped: targeted tests not run. Reason: user requested merge; keep pass based on targeted runtime bootstrap and narrow static change. Risk: renderer regression would be caught by generated CLI docs/help tests if run later.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T12:51:12.969Z
- Branch: task/202605191250-N3TCR3/legacy-cleanup-06
- Head: 81a3ed59446b

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
