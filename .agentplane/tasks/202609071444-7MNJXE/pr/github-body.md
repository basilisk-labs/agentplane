Task: `202609071444-7MNJXE`
Title: Repair CodeQL configuration consistency and triage current GitHub security findings
Canonical task record: `.agentplane/tasks/202609071444-7MNJXE/README.md`

## Summary

Repair CodeQL configuration consistency and triage current GitHub security findings

Investigate GitHub code-scanning setup errors, unstable language coverage and current open alerts. Produce a bounded evidence-backed remediation plan. Preserve ongoing unrelated work and existing CI checks. Do not dismiss alerts, delete analyses, publish, merge or change hosted settings without explicit operator approval.

## Scope

- In scope: Investigate GitHub code-scanning setup errors, unstable language coverage and current open alerts. Produce a bounded evidence-backed remediation plan. Preserve ongoing unrelated work and existing CI checks. Do not dismiss alerts, delete analyses, publish, merge or change hosted settings without explicit operator approval.
- Out of scope: unrelated refactors not required for "Repair CodeQL configuration consistency and triage current GitHub security findings".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T17:26:17.479Z
- Branch: task/202609071444-7MNJXE/repair-codeql-configuration-consistency-and-tria
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |  2 +
 .../src/commands/release/github-ci-plan.test.ts    | 16 +++++
 .../agentplane/src/shared/package-paths.test.ts    | 74 +++++++++++++++++++++-
 packages/agentplane/src/shared/package-paths.ts    | 32 +++++++---
 scripts/lib/github-ci-capabilities.mjs             |  6 ++
 5 files changed, 118 insertions(+), 12 deletions(-)
```

</details>
