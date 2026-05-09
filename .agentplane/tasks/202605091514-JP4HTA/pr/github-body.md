Task: `202605091514-JP4HTA`
Title: Harden managed hook fallback policy
Canonical task record: `.agentplane/tasks/202605091514-JP4HTA/README.md`

## Summary

Harden managed hook fallback policy

Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.

## Scope

- In scope: Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.
- Out of scope: unrelated refactors not required for "Harden managed hook fallback policy".

## Verification

- State: ok
- Note: Managed hook fallback hardening verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T15:18:20.817Z
- Branch: task/202605091514-JP4HTA/hook-global-fallback
- Head: bd06495dc586

```text
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 .../src/cli/bootstrap-framework-dev-script.test.ts |   4 +-
 .../src/cli/run-cli.core.hooks.install.test.ts     |   2 +-
 .../src/cli/run-cli.core.installed-smoke.test.ts   |   2 +-
 .../commands/branch/work-start.hook-shim.test.ts   |   2 +-
 .../src/commands/doctor.command.runtime.test.ts    |   8 +-
 .../src/commands/doctor/hook-readiness.ts          |   8 +-
 packages/agentplane/src/commands/hooks/install.ts  |   8 +-
 .../src/commands/shared/hook-shim-template.ts      |  11 +-
 scripts/bootstrap-framework-dev.mjs                |  19 +-
 10 files changed, 567 insertions(+), 31 deletions(-)
```

</details>
