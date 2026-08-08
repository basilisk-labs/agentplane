Task: `202608081216-YAN7DW`
Title: Parallelize release qualification without weakening gates
Canonical task record: `.agentplane/tasks/202608081216-YAN7DW/README.md`

## Summary

Parallelize release qualification without weakening gates

Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.

## Scope

- In scope: Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
- Out of scope: unrelated refactors not required for "Parallelize release qualification without weakening gates".

## Verification

- State: needs_rework
- Note: Rework: Unsupported declared check: node --test scripts/qualification/release-qualification.test.mjs
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T12:31:23.616Z
- Branch: task/202608081216-YAN7DW/parallelize-release-qualification
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.critical.agent-efficiency-candidate.test.ts |  49 ++++++-
 .../bench/capture-agent-efficiency-candidate.mjs   | 147 ++++++++++++++++-----
 .../qualification/release-qualification.test.mjs   |  36 +++++
 .../run-v0.7.1-release-qualification.mjs           | 131 +++++++++++++++++-
 .../v0.7.1-release-qualification.json              |   2 +
 5 files changed, 322 insertions(+), 43 deletions(-)
```

</details>
