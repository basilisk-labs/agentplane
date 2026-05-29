Task: `202605290636-8F6BQR`
Title: Policy taxonomy type decomposition
Canonical task record: `.agentplane/tasks/202605290636-8F6BQR/README.md`

## Summary

Policy taxonomy type decomposition

Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/policy/taxonomy.ts below the 400-line hotspot warning by extracting long type-only taxonomy declarations into focused module(s). Preserve resolvePolicyActionDescriptor behavior, public type exports, and builtin action descriptor data. Acceptance: policy taxonomy tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Policy taxonomy type decomposition".

## Verification

- State: ok
- Note:

```text
KnownPolicyActionId moved to packages/agentplane/src/policy/taxonomy-types.ts and re-exported from
taxonomy.ts; descriptor data and resolvePolicyActionDescriptor behavior are unchanged. Checks
passed: bun test packages/agentplane/src/policy/taxonomy.test.ts (4 pass); bun run typecheck; bun
run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run
hotspots:check (runtime hotspots 2 -> 1).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T06:36:36.542Z
- Branch: task/202605290636-8F6BQR/policy-taxonomy-type-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/policy/taxonomy-types.ts | 35 ++++++++++++++++++++++
 packages/agentplane/src/policy/taxonomy.ts       | 38 ++----------------------
 2 files changed, 38 insertions(+), 35 deletions(-)
```

</details>
