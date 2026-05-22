# PR Review

Created: 2026-05-22T22:48:31.426Z

## Task

- Task: `202605222245-V6VTG8`
- Title: Narrow pre-push PR-flow test selection for small integrate changes
- Status: DOING
- Branch: `task/202605222245-V6VTG8/narrow-pr-integrate-ci-selection`
- Canonical task record: `.agentplane/tasks/202605222245-V6VTG8/README.md`

## Verification

- State: ok
- Note: Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T22:48:31.426Z
- Branch: task/202605222245-V6VTG8/narrow-pr-integrate-ci-selection
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 23 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.d.ts                |  2 ++
 scripts/lib/local-ci-selection.mjs                 | 23 ++++++++++++++++++++++
 scripts/lib/test-route-registry.mjs                | 10 ++++++++++
 4 files changed, 58 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
