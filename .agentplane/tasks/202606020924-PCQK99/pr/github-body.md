Task: `202606020924-PCQK99`
Title: Refactor release recovery state into focused modules
Canonical task record: `.agentplane/tasks/202606020924-PCQK99/README.md`

## Summary

Refactor release recovery state into focused modules

Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.

## Scope

- In scope: Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.
- Out of scope: unrelated refactors not required for "Refactor release recovery state into focused modules".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/cli/release-recovery-script.test.ts \
  packages/agentplane/src/commands/release/release-next-action-script.test.ts | Result: pass | \
  Evidence: 14 pass, 0 fail. Command: bun run release:recover | Result: pass after copying the base \
  .agentplane/.release/plan artifact into the task worktree as untracked runtime input; output \
  reports v0.6.14 versions bumped without local tag. Command: bun run release:next-action | Result: \
  pass; reports clean tracked working tree needed before release work on this branch. Command: bun \
  run release:parity | Result: pass; core/agentplane/recipes parity 0.6.14. Command: node \
  .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier \
  --write scripts/release/check-release-recovery-state.mjs scripts/lib/release-recovery-report.mjs | \
  Result: pass; unchanged. Scope: release recovery script refactor and report helper extraction.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-02T09:39:34.891Z
- Branch: task/202606020924-PCQK99/refactor-release-recovery-state-into-focused-mod
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/lib/release-recovery-report.mjs          | 239 +++++++++++++++++++++++
 scripts/release/check-release-recovery-state.mjs | 239 +----------------------
 2 files changed, 240 insertions(+), 238 deletions(-)
```

</details>
