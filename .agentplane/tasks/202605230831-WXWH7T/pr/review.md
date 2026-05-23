# PR Review

Created: 2026-05-23T08:37:51.572Z

## Task

- Task: `202605230831-WXWH7T`
- Title: Harden publish evidence workflow token permissions
- Status: DOING
- Branch: `task/202605230831-WXWH7T/publish-evidence-token-hardening`
- Canonical task record: `.agentplane/tasks/202605230831-WXWH7T/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass).
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T08:37:51.572Z
- Branch: task/202605230831-WXWH7T/publish-evidence-token-hardening
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                        | 16 +++++++++++-----
 .../release/publish-workflow-contract.test.ts        | 20 +++++++++++++++++++-
 2 files changed, 30 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
