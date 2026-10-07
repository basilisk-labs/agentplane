Task: `202610070509-WJ3M1R`
Title: Repair Recipe API release packaging and Blueprint guards for 0.7.13
Canonical task record: `.agentplane/tasks/202610070509-WJ3M1R/README.md`

## Summary

Repair Recipe API release packaging and Blueprint guards for 0.7.13

Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.

## Scope

- In scope: Repair release blockers observed on native candidate 202610070445-2MV36M commit 3dc39b85e8101ef798864e54a31e4d102dbf48d4. Admit exactly dist/recipe-api.js and dist/recipe-api.d.ts as allowed and required CLI tarball files already declared by package exports. Add only the recipe-api.ts historical artifact-kind type-union cold-reader exception. Preserve all active Blueprint deletion checks, arbitrary-dist/source/test-file rejection, immutable v0.6.24 compatibility baseline, no-Recipe operation, independent EVALUATOR and all release gates. Update only explicit reviewed compatibility delta/candidate snapshot; add regular-CI positive and negative regression tests and verify actual packed exports. Five exact writable paths. Integrate through native branch_pr under existing user release authorization, then resume the separately blocked release candidate with fresh evidence. Do not change versions, publish, infer efficiency savings or resolve M05 measurement debt.
- Out of scope: unrelated refactors not required for "Repair Recipe API release packaging and Blueprint guards for 0.7.13".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T05:22:19.073Z
- Branch: task/202610070509-WJ3M1R/repair-recipe-api-release-packaging-and-blueprin
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/package-tarball-policy.test.ts         | 123 +++++++++++++++++++++
 .../baselines/v0.7-compatibility-candidate.json    |  21 ++--
 .../check-compatibility-contract-baseline.mjs      |  31 +++++-
 scripts/checks/no-blueprint-engine.test.mjs        |  28 +++++
 scripts/lib/package-tarball-policy.mjs             |   4 +
 5 files changed, 198 insertions(+), 9 deletions(-)
```

</details>
