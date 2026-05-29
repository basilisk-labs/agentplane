Task: `202605290621-KC9ANF`
Title: Release plan command decomposition
Canonical task record: `.agentplane/tasks/202605290621-KC9ANF/README.md`

## Summary

Release plan command decomposition

Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/commands/release/plan.command.ts below the 400-line hotspot warning by extracting semver/change rendering helpers into focused module(s). Preserve release plan validation, incident gate, protected base SHA resolution, generated version/changes/instructions files, and runReleasePlan public API. Acceptance: release plan tests pass, release apply tests importing runReleasePlan pass where relevant, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Release plan command decomposition".

## Verification

- State: ok
- Note:

```text
Release plan helpers extracted into packages/agentplane/src/commands/release/plan.helpers.ts;
runReleasePlan behavior and generated release plan artifacts are preserved. Checks passed: release
plan/apply matrix (31 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run
lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 3 -> 2).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T06:21:37.555Z
- Branch: task/202605290621-KC9ANF/release-plan-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/release/plan.command.ts           | 122 ++-------------------
 .../src/commands/release/plan.helpers.ts           | 113 +++++++++++++++++++
 2 files changed, 124 insertions(+), 111 deletions(-)
```

</details>
