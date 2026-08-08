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

- State: ok
- Note: Verified deterministic provider failure evidence and final-SHA release qualification acceleration on ac402da87.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T12:31:23.616Z
- Branch: task/202608081216-YAN7DW/parallelize-release-qualification
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   3 +-
 packages/agentplane/src/cli/critical/harness.ts    |   7 +-
 ...cli.critical.agent-efficiency-candidate.test.ts |  98 +++++++++++-
 .../src/cli/run-cli.critical.exit-codes.test.ts    |  37 +++--
 scripts/README.md                                  |   4 +-
 .../bench/capture-agent-efficiency-candidate.mjs   | 146 +++++++++++++-----
 .../qualification/release-qualification.test.mjs   | 138 +++++++++++++++++
 .../run-v0.7.1-release-qualification.mjs           | 165 ++++++++++++++++++++-
 .../v0.7.1-release-qualification.json              |   2 +
 9 files changed, 543 insertions(+), 57 deletions(-)
```

</details>
