Task: `202608122156-EZZZYH`
Title: Add installed-package mixed-scope lifecycle E2E to release qualification
Canonical task record: `.agentplane/tasks/202608122156-EZZZYH/README.md`

## Summary

Add installed-package mixed-scope lifecycle E2E to release qualification

Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.

## Scope

- In scope: Add a mandatory black-box installed-package E2E scenario to the AgentPlane release qualification used for 0.7.6. The scenario must pack the exact clean candidate, install the tarball into an isolated prefix, create a clean temporary Git repository, use only the public installed CLI, run init and semantic task intake, execute a real mixed-scope change spanning source code, tests, documentation, and repository metadata such as .gitignore, perform deterministic verification and evaluator review, and reach an equivalent completed lifecycle with commit and branch/PR-ready outcome. The scenario must not read or mutate internal runtime, quality, recovery, or task artifacts directly and must fail the release gate if any required phase is skipped or simulated. Preserve every existing qualification scenario and add manifest, runner, CI-routing, contract tests, cleanup, and operator documentation needed to make this a blocking 0.7.6 release check.
- Out of scope: unrelated refactors not required for "Add installed-package mixed-scope lifecycle E2E to release qualification".

## Verification

- State: ok
- Note:

```text
Verified exact published SHA ab7abe4d1 and hosted Core CI run 31720631534; installed-package
mixed-scope lifecycle and every Verification Contract group passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-13T16:14:38.568Z
- Branch: task/202608122156-EZZZYH/add-installed-package-mixed-scope-lifecycle-e2e
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |   2 +-
 package.json                                       |   1 +
 .../commands/release/ci-workflow-contract.test.ts  |   4 +-
 .../shared/workflow-step-fingerprint.test.ts       |  14 +
 .../commands/shared/workflow-step-fingerprint.ts   |   1 +
 .../commands/shared/workflow-step-policy-scope.ts  |  21 +-
 scripts/README.md                                  | 120 +--
 .../check-packaged-mixed-scope-lifecycle.mjs       | 816 +++++++++++++++++++++
 .../qualification/release-qualification.test.mjs   |  95 +++
 .../run-v0.7.1-release-qualification.mjs           |   1 +
 .../v0.7.1-release-qualification.json              |  21 +
 11 files changed, 1031 insertions(+), 65 deletions(-)
```

</details>
