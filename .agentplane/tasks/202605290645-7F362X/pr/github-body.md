Task: `202605290645-7F362X`
Title: Hosted close command type decomposition
Canonical task record: `.agentplane/tasks/202605290645-7F362X/README.md`

## Summary

Hosted close command type decomposition

Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.

## Scope

- In scope: Refactor packages/agentplane/src/commands/task/hosted-close.command.ts below the 400-line hotspot warning by extracting small type-only declarations into focused module(s). Preserve task hosted-close behavior, follow-up branch detection export, recovery paths, batch close behavior, and hosted close output. Acceptance: hosted-close command tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check reports zero runtime hotspots.
- Out of scope: unrelated refactors not required for "Hosted close command type decomposition".

## Verification

- State: ok
- Note:

```text
HostedCloseOutcome moved to packages/agentplane/src/commands/task/hosted-close.types.ts;
hosted-close runtime behavior and public exports are preserved. Checks passed: hosted-close tests (6
pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run
format:changed; bun run hotspots:check (zero runtime hotspot warnings).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T06:45:34.955Z
- Branch: task/202605290645-7F362X/hosted-close-command-type-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/task/hosted-close.command.ts | 6 +-----
 packages/agentplane/src/commands/task/hosted-close.types.ts   | 4 ++++
 2 files changed, 5 insertions(+), 5 deletions(-)
```

</details>
