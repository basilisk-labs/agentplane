Task: `202608260947-C6WV4T`
Title: Restore packaged mixed-scope lifecycle qualification on the exact release candidate
Canonical task record: `.agentplane/tasks/202608260947-C6WV4T/README.md`

## Summary

Restore packaged mixed-scope lifecycle qualification on the exact release candidate

Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.

## Scope

- In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.
- Out of scope: unrelated refactors not required for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T09:54:10.346Z
- Branch: task/202608260947-C6WV4T/restore-packaged-mixed-scope-lifecycle-qualifica
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../check-packaged-mixed-scope-lifecycle.mjs       | 32 ++++++++++++++++++++--
 .../qualification/release-qualification.test.mjs   | 30 ++++++++++++++++++++
 2 files changed, 59 insertions(+), 3 deletions(-)
```

</details>
