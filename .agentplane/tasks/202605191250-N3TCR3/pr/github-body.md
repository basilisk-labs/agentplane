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
EVALUATOR quality gate passed with cited evidence. Evaluated current implementation commits
0ecb74f9962eb055da26fad2da086136a359b68f and 09fbb81c7544 formatting follow-up: init no longer
presents .agentplane/config.json as a new init write/conflict target; disabled deprecated flags are
hidden from help/docs rendering; parser rejection and legacy config import fallback remain
preserved. Evidence: PR #3932 scoped branch diff and repo-local bootstrap success after formatting.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T13:18:51.144Z
- Branch: task/202605191250-N3TCR3/legacy-cleanup-06
- Head: 09fbb81c7544

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../src/cli/run-cli/commands/init/execution.ts     |  11 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   6 +-
 packages/agentplane/src/cli/spec/help-render.ts    |  10 +-
 4 files changed, 585 insertions(+), 14 deletions(-)
```

</details>
