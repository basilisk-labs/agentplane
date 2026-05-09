Task: `202605091905-TE7H8B`
Title: Improve managed hook readiness diagnostics
Canonical task record: `.agentplane/tasks/202605091905-TE7H8B/README.md`

## Summary

Improve managed hook readiness diagnostics

Tighten managed hook install/readiness behavior: detect stale managed hook wrappers, make doctor --fix refresh safe managed hook shims/hooks, and clarify pre-push fallback diagnostics without requiring project-local hook scripts.

## Scope

- In scope: Tighten managed hook install/readiness behavior: detect stale managed hook wrappers, make doctor --fix refresh safe managed hook shims/hooks, and clarify pre-push fallback diagnostics without requiring project-local hook scripts.
- Out of scope: unrelated refactors not required for "Improve managed hook readiness diagnostics".

## Verification

- State: ok
- Note: Focused hook readiness implementation verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T19:13:14.898Z
- Branch: task/202605091905-TE7H8B/hook-readiness-repair
- Head: 00bf0e456038

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 .../src/commands/doctor.command.runtime.test.ts    | 101 ++++-
 packages/agentplane/src/commands/doctor.run.ts     |   4 +-
 packages/agentplane/src/commands/doctor/fixes.ts   |  59 +++
 .../src/commands/doctor/hook-readiness.ts          |  53 ++-
 5 files changed, 699 insertions(+), 14 deletions(-)
```

</details>
