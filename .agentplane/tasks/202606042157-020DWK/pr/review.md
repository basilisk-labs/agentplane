# PR Review

Created: 2026-06-04T21:58:10.023Z

## Task

- Task: `202606042157-020DWK`
- Title: Reduce agent cognitive load and publish next patch
- Status: DOING
- Branch: `task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat`
- Canonical task record: `.agentplane/tasks/202606042157-020DWK/README.md`

## Verification

- State: ok
- Note: Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T21:58:10.023Z
- Branch: task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/route-guidance.test.ts     | 51 ++++++++++++++++++++++
 .../src/commands/shared/route-oracle.test.ts       | 48 ++++++++++++++++++++
 .../agentplane/src/commands/shared/route-oracle.ts |  8 ++++
 .../agentplane/src/commands/task/brief-render.ts   |  4 ++
 .../src/commands/task/next-action.command.ts       |  4 ++
 5 files changed, 115 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
