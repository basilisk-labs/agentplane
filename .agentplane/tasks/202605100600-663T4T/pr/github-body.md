Task: `202605100600-663T4T`
Title: Audit v0.5 readiness and fix blockers
Canonical task record: `.agentplane/tasks/202605100600-663T4T/README.md`

## Summary

Audit v0.5 readiness and fix blockers

Run release-readiness audit for v0.5, verify legacy and new behavior, especially ap init in empty and existing projects plus local/remote recipe and blueprint installation paths; fix blocking code issues found during the audit.

## Scope

- In scope: Run release-readiness audit for v0.5, verify legacy and new behavior, especially ap init in empty and existing projects plus local/remote recipe and blueprint installation paths; fix blocking code issues found during the audit.
- Out of scope: unrelated refactors not required for "Audit v0.5 readiness and fix blockers".

## Verification

- State: ok
- Note: Verified v0.5 readiness fixes: release:check passed; typecheck passed; docs:cli:check and docs:recipes:check passed; doctor and routing policy passed; focused init/blueprint tests passed (64); recipe tests passed (24); task lifecycle test passed (12); release/ACR/blueprint/task-run tests passed (30); packaged CLI smoke passed for empty and existing-code projects with HTTP blueprint catalog refresh, AGENTPLANE_HOME blueprint-catalog cache, project .agentplane/blueprints materialization, and no project .agentplane/blueprint-catalog.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T07:00:30.325Z
- Branch: task/202605100600-663T4T/v05-readiness
- Head: b1a462dfd311

```text
 .../blueprint/resolved-snapshot.json               | 402 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |   8 +-
 docs/user/commands.mdx                             |   3 +-
 .../src/cli/run-cli.core.blueprint.test.ts         |  21 +-
 .../src/cli/run-cli.core.init.branch-pr.test.ts    |  47 +--
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   8 +-
 .../run-cli.core.init.validation-conflicts.test.ts |  34 +-
 .../src/cli/run-cli/commands/init/execution.ts     |   6 +-
 .../agentplane/src/commands/blueprints/catalog.ts  |  53 ++-
 scripts/check-blueprint-release-gate.mjs           |   2 +-
 10 files changed, 512 insertions(+), 72 deletions(-)
```

</details>
