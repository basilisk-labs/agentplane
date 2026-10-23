Task: `202610231307-CNXADT`
Title: Exclude JavaScript test files from clone detection without changing the clone baseline
Canonical task record: `.agentplane/tasks/202610231307-CNXADT/README.md`

## Summary

Exclude JavaScript test files from clone detection without changing the clone baseline

For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.

## Scope

- In scope: For release 0.7.13, jscpd scans js/mjs but the scanner excludes only TS test/spec suffixes. M05 .test.mjs fixtures create false clone drift. Extend only scanner ignores to js/mjs test/spec files; add a meaningful regression proving tests are omitted and ordinary js/mjs remains scanned. Preserve baseline and metrics threshold. Independent review and full hosted CI before merge.
- Out of scope: unrelated refactors not required for "Exclude JavaScript test files from clone detection without changing the clone baseline".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-23T13:13:22.465Z
- Branch: task/202610231307-CNXADT/exclude-javascript-test-files-from-clone-detecti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/check-clone-baseline-script.test.ts    | 50 +++++++++++++++++++++-
 scripts/checks/check-clone-baseline.mjs            |  4 ++
 2 files changed, 53 insertions(+), 1 deletion(-)
```

</details>
