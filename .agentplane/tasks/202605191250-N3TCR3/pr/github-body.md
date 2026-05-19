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
EVALUATOR quality gate passed with cited evidence. Evaluated implementation commit
0ecb74f9962eb055da26fad2da086136a359b68f: stale init write/conflict presentation for
.agentplane/config.json was removed while loadConfig legacy import fallback stayed intact; disabled
deprecated auto-allow flags are hidden from help/docs rendering while parser rejection remains.
Evidence: task branch PR #3932 and committed scoped diff.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T13:13:39.619Z
- Branch: task/202605191250-N3TCR3/legacy-cleanup-06
- Head: 0ecb74f9962e

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../src/cli/run-cli/commands/init/execution.ts     |  11 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   6 +-
 packages/agentplane/src/cli/spec/help-render.ts    |  12 +-
 4 files changed, 587 insertions(+), 14 deletions(-)
```

</details>
