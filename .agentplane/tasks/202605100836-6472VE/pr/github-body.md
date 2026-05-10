Task: `202605100836-6472VE`
Title: Pre-v0.5: split commit allowlist and Git index error taxonomy
Canonical task record: `.agentplane/tasks/202605100836-6472VE/README.md`

## Summary

Pre-v0.5: split commit allowlist and Git index error taxonomy

Add distinct errors for empty allow scope, no allow match, task-artifact denial, locked index, permission failure, race, and stage failure; ensure each reports what happened, where, and safe retry/remediation.

## Scope

- In scope: Add distinct errors for empty allow scope, no allow match, task-artifact denial, locked index, permission failure, race, and stage failure; ensure each reports what happened, where, and safe retry/remediation.
- Out of scope: unrelated refactors not required for "Pre-v0.5: split commit allowlist and Git index error taxonomy".

## Verification

- State: ok
- Note: Verified split error taxonomy and fixed pre-push CI env pollution: hook/local CI now strips task-scoped AgentPlane env before running project checks while preserving AGENTPLANE_FAST_CHANGED_FILES.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T14:30:34.268Z
- Branch: task-202605100836-6472VE-error-taxonomy
- Head: bd12216cf9e1

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 packages/agentplane/src/cli/cli-contract.test.ts   |   6 +
 packages/agentplane/src/cli/exit-codes.ts          |   6 +
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   9 +
 .../src/commands/guard/impl/allow.test.ts          |  78 +++-
 .../agentplane/src/commands/guard/impl/allow.ts    |  80 +++-
 .../agentplane/src/commands/hooks/run.pre-push.ts  |  29 +-
 packages/agentplane/src/shared/errors.ts           |  12 +
 packages/agentplane/src/shared/git-mutation.ts     |   2 +
 scripts/run-local-ci.mjs                           |   8 +
 scripts/run-pre-push-hook.mjs                      |  33 +-
 11 files changed, 731 insertions(+), 37 deletions(-)
```

</details>
