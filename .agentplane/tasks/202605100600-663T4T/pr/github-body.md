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
- Note: Verification attempts schema and close-tail unit blockers fixed. Targeted regression tests, typecheck, lint:core, schemas:check, and format:check pass after pre-push failure.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T07:52:48.005Z
- Branch: task/202605100600-663T4T/v05-readiness
- Head: 38033930a723

```text
 .../blueprint/resolved-snapshot.json               | 402 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |   8 +-
 docs/user/commands.mdx                             |   3 +-
 .../src/cli/run-cli.core.blueprint.test.ts         |  25 +-
 .../src/cli/run-cli.core.init.branch-pr.test.ts    |  52 +--
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   8 +-
 .../run-cli.core.init.validation-conflicts.test.ts |  39 +-
 .../src/cli/run-cli/commands/init/execution.ts     |   6 +-
 .../src/commands/blueprints/catalog-cache.ts       | 100 +++++
 .../agentplane/src/commands/blueprints/catalog.ts  |  64 +---
 .../src/commands/doctor/hook-readiness.ts          |  10 +-
 scripts/check-blueprint-release-gate.mjs           |   2 +-
 scripts/check-docs-ia.mjs                          |   2 +
 scripts/oversized-test-baseline.json               |   8 +-
 14 files changed, 609 insertions(+), 120 deletions(-)
```

</details>
