# PR Review

Created: 2026-05-29T04:27:13.087Z

## Task

- Task: `202605290426-8EM383`
- Title: Upgrade apply command decomposition
- Status: DOING
- Branch: `task/202605290426-8EM383/upgrade-apply-command-decomposition`
- Canonical task record: `.agentplane/tasks/202605290426-8EM383/README.md`

## Verification

- State: ok
- Note: Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold. Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck, arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T04:27:13.087Z
- Branch: task/202605290426-8EM383/upgrade-apply-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/upgrade/apply-git.ts   | 294 +++++++++++++++++++++
 packages/agentplane/src/commands/upgrade/apply.ts  | 289 +-------------------
 2 files changed, 295 insertions(+), 288 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
