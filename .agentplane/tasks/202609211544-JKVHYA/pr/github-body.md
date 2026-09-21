Task: `202609211544-JKVHYA`
Title: Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks
Canonical task record: `.agentplane/tasks/202609211544-JKVHYA/README.md`

## Summary

Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks

Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.

## Scope

- In scope: Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
- Out of scope: unrelated refactors not required for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T16:13:15.390Z
- Branch: task/202609211544-JKVHYA/add-fail-closed-release-scope-exclusions-for-dem
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/task-registry-ready-script.test.ts     | 177 ++++++++++++++++++++
 .../write-release-ready-manifest-script.test.ts    |  80 ++++++++-
 scripts/checks/check-task-state.mjs                |  21 ++-
 scripts/lib/release-scope-exclusions.mjs           | 184 +++++++++++++++++++++
 scripts/release/check-task-registry-ready.mjs      |  10 ++
 scripts/release/manifest.mjs                       |  12 +-
 scripts/release/release-scope-exclusions.json      |  45 +++++
 7 files changed, 525 insertions(+), 4 deletions(-)
```

</details>
