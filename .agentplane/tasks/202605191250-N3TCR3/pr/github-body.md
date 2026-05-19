Task: `202605191250-N3TCR3`
Title: Remove stale 0.6 legacy cleanup surfaces
Canonical task record: `.agentplane/tasks/202605191250-N3TCR3/README.md`

## Summary

Remove stale 0.6 legacy cleanup surfaces

Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.

## Scope

- In scope: Clean up stale legacy-facing CLI/init surfaces that are no longer needed for the 0.6 happy path while preserving runtime compatibility fallbacks.
- Out of scope: unrelated refactors not required for "Remove stale 0.6 legacy cleanup surfaces".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed with cited evidence. Evaluated Windows platform-critical fix
5538593f56ce: legacy config.json remains in init conflict/backup handling because saveConfig removes
the legacy file during WORKFLOW migration, while stale init write effect remains removed. Evidence:
hosted Windows failure showed five assertions tied to config.json conflict/backup expectations; fix
restores that safety guard without reintroducing the write_file effect.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:00:30.493Z
- Branch: task/202605191250-N3TCR3/legacy-cleanup-06
- Head: 5538593f56ce

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   6 -
 .../src/cli/run-cli/commands/init/execution.ts     |   9 -
 packages/agentplane/src/cli/spec/docs-render.ts    |   6 +-
 packages/agentplane/src/cli/spec/help-render.ts    |  50 +-
 5 files changed, 605 insertions(+), 38 deletions(-)
```

</details>
