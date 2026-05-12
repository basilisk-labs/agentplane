Task: `202605111536-F6FWTH`
Title: Harden wait-remote-pr-checks argument parsing
Canonical task record: `.agentplane/tasks/202605111536-F6FWTH/README.md`

## Summary

Harden wait-remote-pr-checks argument parsing

Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.

## Scope

- In scope: Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.
- Out of scope: unrelated refactors not required for "Harden wait-remote-pr-checks argument parsing".

## Verification

- State: ok
- Note: Fixed unknown --* option handling in scripts/wait-remote-pr-checks.mjs and added regression coverage in packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; no behavior change beyond CLI validation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T09:40:55.625Z
- Branch: task/202605111536-F6FWTH/harden-wait-script
- Head: fd0a5eca08d9

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  14 +
 scripts/wait-remote-pr-checks.mjs                  |   3 +
 3 files changed, 569 insertions(+)
```

</details>
