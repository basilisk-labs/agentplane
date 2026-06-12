# PR Review

Created: 2026-06-12T09:40:00.939Z

## Task

- Task: `202606120937-VC2ZMZ`
- Title: Bound pre-push fast CI in git hooks
- Status: DOING
- Branch: `task/202606120937-VC2ZMZ/bound-pre-push-fast-ci-in-git-hooks`
- Canonical task record: `.agentplane/tasks/202606120937-VC2ZMZ/README.md`

## Verification

- State: ok
- Note: Verified pre-push broad-CI guard: hooks/local-CI regression suite passed; direct broad push input now fails fast with an actionable full-fast diagnostic before running broad local CI; targeted eslint, format check, agentplane build, and policy routing passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T09:40:00.939Z
- Branch: task/202606120937-VC2ZMZ/bound-pre-push-fast-ci-in-git-hooks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 76 ++++++++++++++++++++++
 scripts/checks/run-pre-push-hook.mjs               | 21 ++++++
 2 files changed, 97 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
