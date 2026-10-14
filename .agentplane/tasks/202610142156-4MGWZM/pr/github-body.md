Task: `202610142156-4MGWZM`
Title: Bound GitHub CI aggregate job-output projection
Canonical task record: `.agentplane/tasks/202610142156-4MGWZM/README.md`

## Summary

Bound GitHub CI aggregate job-output projection

Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.

## Scope

- In scope: Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
- Out of scope: unrelated refactors not required for "Bound GitHub CI aggregate job-output projection".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-14T22:29:05.278Z
- Branch: task/202610142156-4MGWZM/bound-github-ci-aggregate-job-output-projection
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/release/github-ci-plan.test.ts    | 141 ++++++++++++++++++---
 scripts/checks/plan-github-ci.mjs                  |  10 +-
 2 files changed, 129 insertions(+), 22 deletions(-)
```

</details>
