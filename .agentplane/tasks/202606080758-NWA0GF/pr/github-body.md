Task: `202606080758-NWA0GF`
Title: Fix patch release readiness issues
Canonical task record: `.agentplane/tasks/202606080758-NWA0GF/README.md`

## Summary

Fix patch release readiness issues

Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.

## Scope

- In scope: Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.
- Out of scope: unrelated refactors not required for "Fix patch release readiness issues".

## Verification

- State: ok
- Note:

```text
Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed;
docs:cli:check passed; hotspots:check passed; release:check passed; typecheck passed; policy routing
passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before
closeout.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T07:59:25.193Z
- Branch: task/202606080758-NWA0GF/fix-patch-release-readiness
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  1 +
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  2 +-
 .../src/cli/run-cli.core.insights-report.test.ts   |  7 +++
 .../agentplane/src/cli/run-cli.core.intake.test.ts | 64 ++++++++++++++++++++-
 ...-cli.core.lifecycle.finish-close-commit.test.ts |  2 +-
 .../commands/guard/impl/close-message-render.ts    |  4 ++
 .../src/commands/guard/impl/close-message.test.ts  | 14 ++---
 .../src/commands/guard/impl/close-message.ts       |  3 +-
 .../src/commands/insights/insights-report.ts       |  9 ++-
 .../src/commands/intake/intake-report.ts           | 45 ++++++++++++++-
 .../src/commands/intake/intake.command.ts          | 16 ++++++
 .../release/release-next-action-script.test.ts     | 43 +++++++++++++-
 .../src/commands/shared/reconcile-check.test.ts    | 67 ++++++++++++++++++++++
 .../src/commands/shared/reconcile-check.ts         | 17 +++++-
 .../agentplane/src/commands/task/finish-command.ts |  2 +-
 .../agentplane/src/commands/task/finish-execute.ts | 16 ++++++
 .../commands/task/finish.validation.unit.test.ts   |  1 +
 .../src/commands/task/verify-record-execute.ts     |  2 +-
 .../src/commands/task/verify-record.unit.test.ts   |  1 +
 scripts/lib/github-actions-workflow-status.mjs     | 24 +++++++-
 20 files changed, 320 insertions(+), 20 deletions(-)
```

</details>
