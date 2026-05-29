Task: `202605290426-8EM383`
Title: Upgrade apply command decomposition
Canonical task record: `.agentplane/tasks/202605290426-8EM383/README.md`

## Summary

Upgrade apply command decomposition

Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/commands/upgrade/apply.ts to reduce the runtime hotspot below the warning threshold without changing upgrade apply behavior.
- Out of scope: unrelated refactors not required for "Upgrade apply command decomposition".

## Verification

- State: ok
- Note:

```text
Observed: upgrade apply git helpers moved into apply-git.ts; apply.ts is below hotspot threshold.
Checks: upgrade.safety.test, run-cli.core.upgrade-dirty-state.test, upgrade.merge.test, typecheck,
arch:check, knip:check, lint:core, format:changed, hotspots:check passed.
```
- Canonical workflow state lives in the task README.

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
