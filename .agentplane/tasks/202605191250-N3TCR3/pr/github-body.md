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
EVALUATOR quality gate passed with cited evidence. Evaluated current branch including lint callback
fix 50db3d2bbeaf: visible-option filtering now uses inline callbacks that satisfy
unicorn/no-array-callback-reference, generated CLI reference remains refreshed, and the original 0.6
legacy cleanup behavior is preserved. Evidence: pre-push full-fast previously passed through docs
freshness and failed only on lint callback references; targeted fix addresses those exact lint
findings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T13:29:01.756Z
- Branch: task/202605191250-N3TCR3/legacy-cleanup-06
- Head: 50db3d2bbeaf

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   6 -
 .../src/cli/run-cli/commands/init/execution.ts     |  11 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   6 +-
 packages/agentplane/src/cli/spec/help-render.ts    |  50 +-
 5 files changed, 606 insertions(+), 39 deletions(-)
```

</details>
